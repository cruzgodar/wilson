type InteractionCallbacks = {
	mousedown: ({ x, y, event }: { x: number, y: number, event: MouseEvent }) => void,

	mouseup: ({ x, y, event }: { x: number, y: number, event: MouseEvent }) => void,

	mouseenter: ({ x, y, event }: { x: number, y: number, event: MouseEvent }) => void,

	mouseleave: ({ x, y, event }: { x: number, y: number, event: MouseEvent }) => void,

	mousemove: ({
		x,
		y,
		xDelta,
		yDelta,
		event
	}: {
		x: number,
		y: number,
		xDelta: number,
		yDelta: number,
		event: MouseEvent
	}) => void,

	mousedrag: ({
		x,
		y,
		xDelta,
		yDelta,
		event
	}: {
		x: number,
		y: number,
		xDelta: number,
		yDelta: number,
		event: MouseEvent
	}) => void,

	touchstart: ({ x, y, event }: { x: number, y: number, event: TouchEvent }) => void,

	touchend: ({ x, y, event }: { x: number, y: number, event: TouchEvent }) => void,

	touchmove: ({
		x,
		y,
		xDelta,
		yDelta,
		event
	}: {
		x: number,
		y: number,
		xDelta: number,
		yDelta: number,
		event: TouchEvent
	}) => void,

	wheel: ({
		x,
		y,
		scrollDelta,
		event
	}: {
		x: number,
		y: number,
		scrollDelta: number,
		event: WheelEvent
	}) => void,
}

const defaultInteractionCallbacks: InteractionCallbacks = {
	mousedown: ({ x, y, event }) => {},
	mouseup: ({ x, y, event }) => {},
	mouseenter: ({ x, y, event }) => {},
	mouseleave: ({ x, y, event }) => {},
	mousemove: ({ x, y, xDelta, yDelta, event }) => {},
	mousedrag: ({ x, y, xDelta, yDelta, event }) => {},
	touchstart: ({ x, y, event }) => {},
	touchend: ({ x, y, event }) => {},
	touchmove: ({ x, y, xDelta, yDelta, event }) => {},
	wheel: ({ x, y, scrollDelta, event }) => {},
};

type DraggableCallBacks = {
	grab: ({ id, x, y, event }: { id: string, x: number, y: number, event?: Event }) => void,

	drag: ({
		id,
		x,
		y,
		xDelta,
		yDelta,
		event
	}: {
		id: string,
		x: number,
		y: number,
		xDelta: number,
		yDelta: number,
		event?: Event
	}) => void,

	release: ({ id, x, y, event }: { id: string, x: number, y: number, event?: Event }) => void,
}

const defaultDraggableCallbacks: DraggableCallBacks = {
	grab: ({ id, x, y, event }) => {},
	drag: ({ id, x, y, xDelta, yDelta, event }) => {},
	release: ({ id, x, y, event }) => {},
};

type InteractionOptions = ({
	useForPanAndZoom?: false
} | {
	useForPanAndZoom?: true,
	onPanAndZoom?: () => void,
	inertia?: boolean,
	rubberbanding?: boolean,
	rubberbandingPanSoftness?: number,
	rubberbandingZoomSoftness?: number,
	panFriction?: number,
	zoomFriction?: number,
	disallowZooming?: boolean,
}) & {
	callbacks?: Partial<InteractionCallbacks>,
};

type DraggableLocations = {[id: string]: [number, number]};

type DraggableOptions = {
	draggables?: DraggableLocations,
	radius?: number,
	static?: boolean,
	callbacks?: Partial<DraggableCallBacks>,
};

type DraggablesData = {
	[id: string]: {
		element: HTMLDivElement,
		location: [number, number],
		currentlyDragging: boolean,
	}
};

type FullscreenOptions = {
	fillScreen?: boolean,
	animate?: boolean,
	crossfade?: boolean,
	closeWithEscape?: boolean,
	restoreScroll?: boolean,
	beforeSwitch?: (isFullscreen: boolean) => void,
	onSwitch?: (isFullscreen: boolean) => void,
} & (
	{
		useFullscreenButton?: true,
		enterFullscreenButtonIconPath: string,
		exitFullscreenButtonIconPath: string,
	} | {
		useFullscreenButton?: false,
	}
);

type ResetButtonOptions = {
	useResetButton?: true,
	resetButtonIconPath?: string,
	onReset?: () => void,
} | {
	useResetButton?: false,
};



type WilsonOptions = (
	{ canvasWidth: number, canvasHeight?: undefined }
	| { canvasHeight: number, canvasWidth?: undefined }
) & {
	worldWidth?: number,
	worldHeight?: number,
	worldCenterX?: number,
	worldCenterY?: number,

	minWorldWidth?: number,
	maxWorldWidth?: number,
	minWorldHeight?: number,
	maxWorldHeight?: number,
	minWorldX?: number,
	maxWorldX?: number,
	minWorldY?: number,
	maxWorldY?: number,
	clampWorldCoordinatesMode?: "one" | "both",
	verbose?: boolean,
	
	animateReset?: boolean,

	onResizeCanvas?: () => void,

	useP3ColorSpace?: boolean,

	reduceMotion?: boolean,

	interactionOptions?: InteractionOptions,
	draggableOptions?: DraggableOptions,
	fullscreenOptions?: FullscreenOptions,
} & ResetButtonOptions;

class Wilson
{
	#destroyed: boolean = false;
	verbose: boolean = false;

	canvas: HTMLCanvasElement;

	// Duplicated properties like this are effectively readonly. Whenever we
	// change the private version, we also change the public one.
	// Writing to the public version does nothing.
	#canvasWidth: number;
	canvasWidth: number;

	#canvasHeight: number;
	canvasHeight: number;

	#lastCanvasWidth: number;
	#lastCanvasHeight: number;

	#canvasAspectRatio: number;

	#worldWidth: number;
	worldWidth: number;

	#worldHeight: number;
	worldHeight: number;

	#worldCenterX: number;
	worldCenterX: number;

	#worldCenterY: number;
	worldCenterY: number;

	#nonFullscreenWorldWidth: number;
	#nonFullscreenWorldHeight: number;

	#minWorldWidth: number;
	#maxWorldWidth: number;
	#minWorldHeight: number;
	#maxWorldHeight: number;
	#minWorldX: number;
	#maxWorldX: number;
	#minWorldY: number;
	#maxWorldY: number;
	clampWorldCoordinatesMode: "one" | "both";

	#onResizeCanvasCallback: () => void;

	#useP3ColorSpace: boolean;
	useP3ColorSpace: boolean;

	reduceMotion: boolean;

	#needDraggablesContainerSizeUpdate: boolean = false;

	#interactionCallbacks: InteractionCallbacks;
	useInteractionForPanAndZoom: boolean;
	usePanAndZoomRubberbanding: boolean = false;
	rubberbandingPanSoftness: number = 3.5;
	rubberbandingZoomSoftness: number = 2;
	disallowZooming: boolean = false;
	#needPanAndZoomUpdate: boolean = false;
	#interactionOnPanAndZoom: () => void = () => {};

	// Used to debounce mouse/touch events on hybrid devices.
	#lastInteractionTimes = {
		grab: Date.now(),
		release: Date.now(),
	};

	#lastInteractionTypes = {
		grab: "mouse",
		release: "mouse",
	};

	

	#numPreviousVelocities: number = 4;
	#lastVelocityFactors: number[] = [];

	#lastPanVelocityX = 0;
	#lastPanVelocityY = 0;
	#lastZoomVelocity: number = 0;

	#lastPanVelocitiesX: number[] = [];
	#lastPanVelocitiesY: number[] = [];
	#lastZoomVelocities: number[] = [];

	#panVelocityX: number = 0;
	#panVelocityY: number = 0;
	#zoomVelocity: number = 0;

	#panFriction: number;
	#zoomFriction: number;

	#panVelocityThreshold: number = 0.001;
	#zoomVelocityThreshold: number = 0.001;




	#draggablesRadius: number;
	#draggablesStatic: boolean;
	#draggableCallbacks: DraggableCallBacks;

	#draggablesContainerWidth: number = 0;
	#draggablesContainerHeight: number = 0;
	#draggablesContainerRestrictedWidth: number = 0;
	#draggablesContainerRestrictedHeight: number = 0;

	
	#currentlyFullscreen: boolean = false;
	currentlyFullscreen: boolean = false;

	animateFullscreen: boolean;
	crossfadeFullscreen: boolean;
	closeFullscreenWithEscape: boolean;
	fullscreenRestoreScroll: boolean = false;
	beforeSwitchFullscreen: (isFullscreen: boolean) => void;
	onSwitchFullscreen: (isFullscreen: boolean) => void;
	#fullscreenOldScroll: number = 0;
	#fullscreenCanvasRect: DOMRect = new DOMRect();
	#fullscreenInitialWindowInnerWidth: number = window.innerWidth;
	#fullscreenInitialWindowInnerHeight: number = window.innerHeight;
	#fullscreenFillScreen: boolean;
	#externalFullscreenOldFillScreen: boolean = false;
	#externalFullscreenActive: boolean = false;
	#fullscreenUseButton: boolean;
	#fullscreenEnterFullscreenButton: HTMLElement | null = null;
	#fullscreenExitFullscreenButton: HTMLElement | null = null;
	#fullscreenEnterFullscreenButtonIconPath?: string;
	#fullscreenExitFullscreenButtonIconPath?: string;



	#draggables: DraggablesData = {};
	draggables: DraggablesData = {};

	#draggableDefaultId: number = 0;
	#currentMouseDraggableId?: string;



	#useResetButton: boolean;
	#resetButton: HTMLElement | null = null;
	#resetButtonTimeoutId?: number;
	#resetButtonIconPath?: string;
	animateReset: boolean;
	onReset: (animate: boolean) => void = () => {};
	#defaultWorldCenterX: number;
	#defaultWorldCenterY: number;
	#defaultWorldWidth: number;
	#defaultWorldHeight: number;
	#defaultDraggableLocations: DraggableLocations = {};

	#appletContainer: HTMLDivElement;
	#canvasContainer: HTMLDivElement;
	#draggablesContainer: HTMLDivElement;
	protected buttonContainer: HTMLDivElement;
	#fullscreenContainer: HTMLDivElement;
	#fullscreenContainerLocation: HTMLDivElement;

	#metaThemeColorElement: HTMLMetaElement | null = document.querySelector("meta[name='theme-color']");
	#oldMetaThemeColor: string | null = null;

	#salt = Date.now().toString(36) + Math.random().toString(36).slice(2);



	constructor(canvas: HTMLCanvasElement, options: WilsonOptions)
	{
		this.canvas = canvas;
		//@ts-expect-error
		canvas.wilson = this;

		const computedStyle = getComputedStyle(this.canvas);
		this.#canvasAspectRatio = parseFloat(computedStyle.width) / parseFloat(computedStyle.height);

		if (!this.#canvasAspectRatio || this.#canvasAspectRatio <= 0 || this.#canvasAspectRatio === Infinity)
		{
			throw new Error("[Wilson] Could not get canvas aspect ratio. Check that the canvas has a nonzero width and height and is displayed on the page.");
		}

		if (options.canvasWidth === undefined && options.canvasHeight === undefined)
		{
			throw new Error("[Wilson] Exactly one of canvasWidth and canvasHeight must be specified.");
		}

		if (options.canvasWidth !== undefined)
		{
			this.#canvasWidth = Math.round(options.canvasWidth);
			this.canvasWidth = this.#canvasWidth;
			
			this.#canvasHeight = Math.round(options.canvasWidth / this.#canvasAspectRatio);
			this.canvasHeight = this.#canvasHeight;
		}

		else
		{
			this.#canvasWidth = Math.round(options.canvasHeight * this.#canvasAspectRatio);
			this.canvasWidth = this.#canvasWidth;

			this.#canvasHeight = Math.round(options.canvasHeight);
			this.canvasHeight = this.#canvasHeight;
		}

		this.#lastCanvasWidth = this.#canvasWidth;
		this.#lastCanvasHeight = this.#canvasHeight;
		

		this.canvas.setAttribute("width", this.#canvasWidth.toString());
		this.canvas.setAttribute("height", this.#canvasHeight.toString());

		const resizeObserver = new ResizeObserver(() =>
		{
			this.#needDraggablesContainerSizeUpdate = true;
		});

		resizeObserver.observe(this.canvas);

		this.verbose = options.verbose ?? false;

		
		
		if (options.worldWidth !== undefined && options.worldHeight !== undefined)
		{
			this.#worldWidth = options.worldWidth;
			this.worldWidth = this.#worldWidth;

			this.#worldHeight = options.worldHeight;
			this.worldHeight = this.#worldHeight;
		}
		
		else if (options.worldHeight !== undefined)
		{
			this.#worldHeight = options.worldHeight;
			this.worldHeight = this.#worldHeight;

			this.#worldWidth = this.#worldHeight * this.#canvasAspectRatio;
			this.worldWidth = this.#worldWidth;
		}

		else if (options.worldWidth !== undefined)
		{
			this.#worldWidth = options.worldWidth;
			this.worldWidth = this.#worldWidth;

			this.#worldHeight = this.#worldWidth / this.#canvasAspectRatio;
			this.worldHeight = this.#worldHeight;
		}

		else
		{
			this.#worldWidth = Math.max(2, 2 * this.#canvasAspectRatio);
			this.worldWidth = this.#worldWidth;

			this.#worldHeight = Math.max(2, 2 / this.#canvasAspectRatio);
			this.worldHeight = this.#worldHeight;
		}

		this.#nonFullscreenWorldWidth = this.#worldWidth;
		this.#nonFullscreenWorldHeight = this.#worldHeight;



		this.#worldCenterX = options.worldCenterX ?? 0;
		this.worldCenterX = this.#worldCenterX;

		this.#worldCenterY = options.worldCenterY ?? 0;
		this.worldCenterY = this.#worldCenterY;

		this.#minWorldX = options.minWorldX ?? -Infinity;
		this.#maxWorldX = options.maxWorldX ?? Infinity;
		this.#minWorldY = options.minWorldY ?? -Infinity;
		this.#maxWorldY = options.maxWorldY ?? Infinity;

		this.#maxWorldWidth = (options.minWorldX !== undefined && options.maxWorldX !== undefined)
			? options.maxWorldX - options.minWorldX
			: options.maxWorldWidth ?? Infinity;
		this.#minWorldWidth = options.minWorldWidth ?? 0;

		this.#maxWorldHeight = (options.minWorldY !== undefined && options.maxWorldY !== undefined)
			? options.maxWorldY - options.minWorldY
			: options.maxWorldHeight ?? Infinity;
		this.#minWorldHeight = options.minWorldHeight ?? 0;

		if (
			this.#minWorldX >= this.#maxWorldX
			|| this.#minWorldY >= this.#maxWorldY
			|| this.#minWorldWidth >= this.#maxWorldWidth
			|| this.#minWorldHeight >= this.#maxWorldHeight
		) {
			throw new Error("[Wilson] minWorldX and minWorldY must be less than maxWorldX and maxWorldY, repsectively");
		}

		this.clampWorldCoordinatesMode = options.clampWorldCoordinatesMode ?? "one";

		

		this.#defaultWorldCenterX = this.#worldCenterX;
		this.#defaultWorldCenterY = this.#worldCenterY;
		this.#defaultWorldWidth = this.#worldWidth;
		this.#defaultWorldHeight = this.#worldHeight;

		this.#useResetButton = options.useResetButton ?? false;
		this.animateReset = options.animateReset ?? true;

		if (options.useResetButton)
		{
			this.#resetButtonIconPath = options.resetButtonIconPath;
			this.onReset = options.onReset ?? (() => {});
		}



		this.#onResizeCanvasCallback = options?.onResizeCanvas ?? (() => {});

		this.#useP3ColorSpace = options.useP3ColorSpace ?? true;
		this.useP3ColorSpace = this.#useP3ColorSpace;

		this.reduceMotion = options.reduceMotion
			?? matchMedia("(prefers-reduced-motion: reduce)").matches;

		this.#interactionCallbacks = { ...defaultInteractionCallbacks, ...options.interactionOptions?.callbacks };
		this.useInteractionForPanAndZoom = options.interactionOptions?.useForPanAndZoom ?? false;

		this.#panFriction = 0.875;
		this.#zoomFriction = 0.85;

		if (options.interactionOptions?.useForPanAndZoom)
		{
			this.#interactionOnPanAndZoom = options.interactionOptions?.onPanAndZoom ?? (() => {});
			this.#panFriction = options.interactionOptions?.panFriction ?? this.#panFriction;
			this.#zoomFriction = options.interactionOptions?.zoomFriction ?? this.#zoomFriction;

			if (options.interactionOptions?.inertia === false)
			{
				this.#panFriction = 0;
				this.#zoomFriction = 0;
				this.#panVelocityThreshold = Infinity;
				this.#zoomVelocityThreshold = Infinity;
			}

			this.usePanAndZoomRubberbanding = options.interactionOptions?.rubberbanding ?? false;
			this.rubberbandingPanSoftness = options.interactionOptions?.rubberbandingPanSoftness ?? 3.5;
			this.rubberbandingZoomSoftness = options.interactionOptions?.rubberbandingZoomSoftness ?? 2;

			this.disallowZooming = options.interactionOptions?.disallowZooming ?? false;

			this.#lastVelocityFactors = Array(this.#numPreviousVelocities).fill(1);

			this.#lastPanVelocitiesX = Array(this.#numPreviousVelocities).fill(0);
			this.#lastPanVelocitiesY = Array(this.#numPreviousVelocities).fill(0);
			this.#lastZoomVelocities = Array(this.#numPreviousVelocities).fill(0);
		}
		
		this.#draggablesRadius = options.draggableOptions?.radius ?? 12;
		this.#draggablesStatic = options.draggableOptions?.static ?? false;
		this.#draggableCallbacks = { ...defaultDraggableCallbacks, ...options.draggableOptions?.callbacks };

		this.#fullscreenFillScreen = options.fullscreenOptions?.fillScreen ?? false;
		this.animateFullscreen = options.fullscreenOptions?.animate ?? true;
		this.crossfadeFullscreen = options.fullscreenOptions?.crossfade ?? false;
		this.closeFullscreenWithEscape = options.fullscreenOptions?.closeWithEscape ?? true;
		this.fullscreenRestoreScroll = options.fullscreenOptions?.restoreScroll ?? true;
		this.beforeSwitchFullscreen = options.fullscreenOptions?.beforeSwitch ?? (() => {});
		this.onSwitchFullscreen = options.fullscreenOptions?.onSwitch ?? (() => {});
		this.#fullscreenUseButton = options.fullscreenOptions?.useFullscreenButton ?? false;

		if (options.fullscreenOptions?.useFullscreenButton)
		{
			this.#fullscreenEnterFullscreenButtonIconPath = options.fullscreenOptions?.enterFullscreenButtonIconPath;
			this.#fullscreenExitFullscreenButtonIconPath = options.fullscreenOptions?.exitFullscreenButtonIconPath;
		}



		// Initialize the container structure.

		this.#appletContainer = document.createElement("div");
		this.#appletContainer.classList.add("WILSON_applet-container");
		this.#appletContainer.classList.add("WILSON_center-content");
		this.canvas.parentElement && this.canvas.parentElement.insertBefore(
			this.#appletContainer,
			this.canvas
		);

		this.#canvasContainer = document.createElement("div");
		this.#canvasContainer.classList.add("WILSON_canvas-container");
		this.#appletContainer.appendChild(this.#canvasContainer);
		this.#canvasContainer.appendChild(this.canvas);



		this.#draggablesContainer = document.createElement("div");
		this.#draggablesContainer.classList.add("WILSON_draggables-container");
		this.#appletContainer.appendChild(this.#draggablesContainer);

		this.#updateDraggablesContainerSize();



		this.buttonContainer = document.createElement("div");
		this.buttonContainer.classList.add("WILSON_button-container");
		this.#canvasContainer.appendChild(this.buttonContainer);



		this.#fullscreenContainer = document.createElement("div");
		this.#fullscreenContainer.classList.add("WILSON_fullscreen-container");

		this.#appletContainer.parentElement && this.#appletContainer.parentElement.insertBefore(
			this.#fullscreenContainer,
			this.#appletContainer
		);
		this.#fullscreenContainer.appendChild(this.#appletContainer);



		this.#fullscreenContainerLocation = document.createElement("div");
		this.#fullscreenContainer.parentElement &&
			this.#fullscreenContainer.parentElement.insertBefore(
				this.#fullscreenContainerLocation,
				this.#fullscreenContainer
			);
		this.#fullscreenContainerLocation.appendChild(this.#fullscreenContainer);



		if (!this.#metaThemeColorElement)
		{
			this.#metaThemeColorElement = document.createElement("meta");
			this.#metaThemeColorElement.setAttribute("name", "theme-color");
			document.head.appendChild(this.#metaThemeColorElement);
		}



		for (const canvas of [this.canvas, this.#draggablesContainer])
		{
			canvas.addEventListener("gesturestart", e => e.preventDefault());
			canvas.addEventListener("gesturechange", e => e.preventDefault());
			canvas.addEventListener("gestureend", e => e.preventDefault());

			canvas.addEventListener("click", e => e.preventDefault());
		}



		this.#clampWorldCoordinates();

		this.#initInteraction();
		this.#initDraggables();
		this.#initResetButton();
		this.#initFullscreen();

		requestAnimationFrame(this.#animationFrameLoop);

		window.addEventListener("resize", this.#onResizeWindow);
		document.documentElement.addEventListener("keydown", this.#handleKeydownEvent);

		if (options.draggableOptions?.draggables)
		{
			this.setDraggables(options.draggableOptions.draggables);

			for (const [id, data] of Object.entries(this.#draggables))
			{
				this.#defaultDraggableLocations[id] = data.location;
			}
		}


		
		if (this.verbose)
		{
			console.log(
				`[Wilson] Initialized a ${this.#canvasWidth}x${this.#canvasHeight} canvas`
				+ (this.canvas.id ? ` with ID ${this.canvas.id}` : "")
			);
		}
	}

	destroy()
	{
		if (this.currentlyFullscreen)
		{
			this.#exitFullscreen(false);
		}

		this.#destroyed = true;

		window.removeEventListener("resize", this.#onResizeWindow);
		document.documentElement.removeEventListener("keydown", this.#handleKeydownEvent);

		document.documentElement.removeEventListener(
			"mousemove",
			this.#documentDraggableMousemoveListener
		);

		document.documentElement.removeEventListener(
			"mouseup",
			this.#documentDraggableMouseupListener
		);

		document.removeEventListener("gesturestart", this.#preventGestures);
		document.removeEventListener("gesturechange", this.#preventGestures);
		document.removeEventListener("gestureend", this.#preventGestures);

		if (
			this.#fullscreenContainerLocation
			&& this.#fullscreenContainerLocation.parentElement
		) {
			this.#fullscreenContainerLocation.parentElement.insertBefore(this.canvas, this.#fullscreenContainerLocation);
		}

		this.#fullscreenContainerLocation.remove();
	}

	replaceCanvas()
	{
		const newCanvas = document.createElement("canvas");

		// Copy attributes
		newCanvas.width = this.canvas.width;
		newCanvas.height = this.canvas.height;
		newCanvas.id = this.canvas.id;
		newCanvas.className = this.canvas.className;

		// Copy inline styles
		newCanvas.style.cssText = this.canvas.style.cssText;

		// Copy data attributes
		for (const key of Object.keys(this.canvas.dataset))
		{
			newCanvas.dataset[key] = this.canvas.dataset[key];
		}

		// Replace in DOM
		if (this.canvas.parentNode)
		{
			this.canvas.parentNode.replaceChild(newCanvas, this.canvas);
		}

		this.canvas = newCanvas;

		return newCanvas;
	}

	

	setCurrentStateAsDefault()
	{
		this.#defaultWorldCenterX = this.#worldCenterX;
		this.#defaultWorldCenterY = this.#worldCenterY;
		this.#defaultWorldWidth = this.#nonFullscreenWorldWidth;
		this.#defaultWorldHeight = this.#nonFullscreenWorldHeight;

		this.#defaultDraggableLocations = {};
		for (const id in this.#draggables)
		{
			this.#defaultDraggableLocations[id] = [...this.#draggables[id].location];
		}
	}

	#getDefaultWorldSize(): [number, number]
	{
		if (this.#currentlyFullscreen && this.#fullscreenFillScreen)
		{
			const windowAspectRatio = window.innerWidth / window.innerHeight;

			const aspectRatioChange = windowAspectRatio / this.#canvasAspectRatio;

			return [
				Math.max(this.#defaultWorldWidth * aspectRatioChange, this.#defaultWorldWidth),
				Math.max(this.#defaultWorldHeight / aspectRatioChange, this.#defaultWorldHeight),
			];
		}

		return [
			this.#defaultWorldWidth,
			this.#defaultWorldHeight,
		];
	}

	resetWorldCoordinates(animate: boolean = this.animateReset)
	{
		const [width, height] = this.#getDefaultWorldSize();

		if (!animate)
		{
			this.resizeWorld({
				width,
				height,
				centerX: this.#defaultWorldCenterX,
				centerY: this.#defaultWorldCenterY,
				showResetButton: false,
			});

			return;
		}

		const duration = 350;
		const startTime = performance.now();

		const oldWorldCenterX = this.#worldCenterX;
		const oldWorldCenterY = this.#worldCenterY;
		const oldWorldWidth = this.#worldWidth;
		const oldWorldHeight = this.#worldHeight;
		
		const update = (currentTime: number) =>
		{
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);
			// Ease-in-out quad
			const t = progress < 0.5 
				? 2 * progress * progress 
				: 1 - Math.pow(-2 * progress + 2, 2) / 2;

			this.resizeWorld({
				width: (1 - t) * oldWorldWidth + t * width,
				height: (1 - t) * oldWorldHeight + t * height,
				centerX: (1 - t) * oldWorldCenterX + t * this.#defaultWorldCenterX,
				centerY: (1 - t) * oldWorldCenterY + t * this.#defaultWorldCenterY,
				showResetButton: false,
			});
			
			if (progress < 1)
			{
				requestAnimationFrame(update);
			}
		};
		
		requestAnimationFrame(update);
	}

	resetDraggables(animate: boolean = this.animateReset)
	{
		for (const id in this.#draggables)
		{
			this.#draggableCallbacks.grab({
				id,
				x: this.#draggables[id].location[0],
				y: this.#draggables[id].location[1],
			});
		}

		const oldDraggableLocations: DraggableLocations = {};

		for (const id in this.#draggables)
		{
			oldDraggableLocations[id] = [...this.#draggables[id].location];
		}

		if (!animate)
		{
			this.#setDraggables(this.#defaultDraggableLocations, false);

			for (const id in this.#draggables)
			{
				this.#draggableCallbacks.drag({
					id,
					x: this.#draggables[id].location[0],
					y: this.#draggables[id].location[1],
					xDelta: this.#draggables[id].location[0] - oldDraggableLocations[id][0],
					yDelta: this.#draggables[id].location[1] - oldDraggableLocations[id][1],
				});
			}

			for (const id in this.#draggables)
			{
				this.#draggableCallbacks.release({
					id,
					x: this.#draggables[id].location[0],
					y: this.#draggables[id].location[1],
				});
			}

			return;
		}

		const duration = 350;
		const startTime = performance.now();

		const updatedDraggableLocations: DraggableLocations = {};
		let lastDraggableLocations: DraggableLocations = structuredClone(oldDraggableLocations);
		
		const update = (currentTime: number) =>
		{
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);
			// Ease-in-out quad
			const t = progress < 0.5 
				? 2 * progress * progress 
				: 1 - Math.pow(-2 * progress + 2, 2) / 2;

			for (const id in this.#draggables)
			{
				updatedDraggableLocations[id] = [
					(1 - t) * oldDraggableLocations[id][0] + t * this.#defaultDraggableLocations[id][0],
					(1 - t) * oldDraggableLocations[id][1] + t * this.#defaultDraggableLocations[id][1]
				];

				this.#setDraggables(updatedDraggableLocations, false);
				
				this.#draggableCallbacks.drag({
					id,
					x: this.#draggables[id].location[0],
					y: this.#draggables[id].location[1],
					xDelta: this.#draggables[id].location[0] - lastDraggableLocations[id][0],
					yDelta: this.#draggables[id].location[1] - lastDraggableLocations[id][1],
				});
			}

			lastDraggableLocations = structuredClone(updatedDraggableLocations);
			
			if (progress < 1)
			{
				requestAnimationFrame(update);
			}

			else
			{
				for (const id in this.#draggables)
				{
					this.#draggableCallbacks.release({
						id,
						x: this.#draggables[id].location[0],
						y: this.#draggables[id].location[1],
					});
				}
			}
		};
		
		requestAnimationFrame(update);
	}

	reset()
	{
		this.resetWorldCoordinates();
		this.resetDraggables();
		this.onReset(this.animateReset);

		if (this.#resetButton)
		{
			this.#resetButton.style.opacity = "0";

			clearTimeout(this.#resetButtonTimeoutId);

			this.#resetButtonTimeoutId = window.setTimeout(() =>
			{
				if (this.#resetButton)
				{
					this.#resetButton.style.display = "none";
				}
			}, 150);
		}
	}



	#onResizeWindow = () =>
	{
		const update = () =>
		{
			if (this.#currentlyFullscreen && this.#fullscreenFillScreen)
			{
				// Resize the canvas to fill the screen but keep the same total number of pixels.
				const windowAspectRatio = window.innerWidth / window.innerHeight;

				const aspectRatioChange = windowAspectRatio / this.#canvasAspectRatio;

				
				this.canvas.style.width = "100vw";
				this.canvas.style.height = "100vh";
				// A sketchy hack to make rotating on iOS work properly.
				requestAnimationFrame(() => this.canvas.style.height = "100%");

				this.#worldWidth = Math.max(
					this.#nonFullscreenWorldWidth * aspectRatioChange,
					this.#nonFullscreenWorldWidth
				);
				this.worldWidth = this.#worldWidth;

				this.#worldHeight = Math.max(
					this.#nonFullscreenWorldHeight / aspectRatioChange,
					this.#nonFullscreenWorldHeight
				);
				this.worldHeight = this.#worldHeight;

				this.#clampWorldCoordinates();



				const width = Math.round(
					Math.sqrt(this.#canvasWidth * this.#canvasHeight * windowAspectRatio)
				);

				if (this.#resizeCanvas({ width }))
				{
					this.#onResizeCanvasCallback();
				}
			}

			this.#needDraggablesContainerSizeUpdate = true;
		};

		update();
		setTimeout(update, 10);
		setTimeout(update, 50);
	}

	#handleKeydownEvent = (e: KeyboardEvent) =>
	{
		if (e.key === "Escape" && this.#currentlyFullscreen && this.closeFullscreenWithEscape && !this.#externalFullscreenActive)
		{
			e.preventDefault();
			e.stopPropagation();
			this.exitFullscreen();
		}
	}
	
	

	protected resizeCanvasGPU = () => {}

	#resizeCanvas(
		dimensions: { width: number, height?: undefined }
		| { height: number, width?: undefined }
	) {
		const aspectRatio = (this.#currentlyFullscreen && this.#fullscreenFillScreen)
			? window.innerWidth / window.innerHeight
			: this.#canvasAspectRatio;
		
		if (dimensions.width !== undefined)
		{
			this.#canvasWidth = Math.round(dimensions.width);
			this.canvasWidth = this.#canvasWidth;

			this.#canvasHeight = Math.round(dimensions.width / aspectRatio);
			this.canvasHeight = this.#canvasHeight;
		}

		else
		{
			this.#canvasWidth = Math.round(dimensions.height * aspectRatio);
			this.canvasWidth = this.#canvasWidth;

			this.#canvasHeight = Math.round(dimensions.height);
			this.canvasHeight = this.#canvasHeight;
		}

		if (
			this.#lastCanvasWidth !== this.#canvasWidth
			|| this.#lastCanvasHeight !== this.#canvasHeight
		) {
			this.canvas.setAttribute("width", this.#canvasWidth.toString());
			this.canvas.setAttribute("height", this.#canvasHeight.toString());

			this.resizeCanvasGPU();

			this.#lastCanvasWidth = this.#canvasWidth;
			this.#lastCanvasHeight = this.#canvasHeight;

			return true;
		}

		return false;
	}

	resizeCanvas(
		dimensions: { width: number, height?: undefined }
		| { height: number, width?: undefined }
	) {
		if (!this.#currentlyFullscreen)
		{
			const computedStyle = getComputedStyle(this.canvas);
			this.#canvasAspectRatio = parseFloat(computedStyle.width) / parseFloat(computedStyle.height);
		}

		if (this.#resizeCanvas(dimensions))
		{
			this.#onResizeCanvasCallback();
		}
	}

	resizeWorld({
		width,
		height,
		centerX,
		centerY,
		minWidth,
		maxWidth,
		minHeight,
		maxHeight,
		minX,
		maxX,
		minY,
		maxY,
		showResetButton = true,
	}: {
		width?: number,
		height?: number,
		centerX?: number,
		centerY?: number,
		minWidth?: number,
		maxWidth?: number,
		minHeight?: number,
		maxHeight?: number,
		minX?: number,
		maxX?: number,
		minY?: number,
		maxY?: number,
		showResetButton: boolean,
	}) {
		const lastWorldWidth = this.#worldWidth;
		const lastWorldHeight = this.#worldHeight;
		const lastWorldCenterX = this.#worldCenterX;
		const lastWorldCenterY = this.#worldCenterY;

		const aspectRatio = (this.#currentlyFullscreen && this.#fullscreenFillScreen)
			? window.innerWidth / window.innerHeight
			: this.#canvasAspectRatio;
		
		if (width !== undefined && height !== undefined)
		{
			this.#worldWidth = width;
			this.worldWidth = this.#worldWidth;

			this.#worldHeight = height;
			this.worldHeight = this.#worldHeight;

			const aspectRatioChange = aspectRatio / this.#canvasAspectRatio;

			this.#nonFullscreenWorldWidth = width / Math.max(aspectRatioChange, 1);
			this.#nonFullscreenWorldHeight = height * Math.min(aspectRatioChange, 1);
		}

		else if (width !== undefined)
		{
			this.#worldWidth = width;
			this.worldWidth = this.#worldWidth;

			this.#worldHeight = width / aspectRatio;
			this.worldHeight = this.#worldHeight;

			this.#nonFullscreenWorldWidth = width;
			this.#nonFullscreenWorldHeight = width / this.#canvasAspectRatio;
		}

		else if (height !== undefined)
		{
			this.#worldHeight = height;
			this.worldHeight = this.#worldHeight;

			this.#worldWidth = height * aspectRatio;
			this.worldWidth = this.#worldWidth;

			this.#nonFullscreenWorldHeight = height;
			this.#nonFullscreenWorldWidth = height * this.#canvasAspectRatio;
		}

		this.#worldCenterX = centerX ?? this.#worldCenterX;
		this.worldCenterX = this.#worldCenterX;

		this.#worldCenterY = centerY ?? this.#worldCenterY;
		this.worldCenterY = this.#worldCenterY;



		this.#minWorldX = minX ?? this.#minWorldX;
		this.#maxWorldX = maxX ?? this.#maxWorldX;
		this.#minWorldY = minY ?? this.#minWorldY;
		this.#maxWorldY = maxY ?? this.#maxWorldY;

		this.#maxWorldWidth = (minX !== undefined && maxX !== undefined)
			? maxX - minX
			: maxWidth ?? this.#maxWorldWidth;
		this.#minWorldWidth = minWidth ?? this.#minWorldWidth;

		this.#maxWorldHeight = (minY !== undefined && maxY !== undefined)
			? maxY - minY
			: maxHeight ?? this.#maxWorldHeight;
		this.#minWorldHeight = minHeight ?? this.#minWorldHeight;

		if (
			this.#minWorldX >= this.#maxWorldX
			|| this.#minWorldY >= this.#maxWorldY
			|| this.#minWorldWidth >= this.#maxWorldWidth
			|| this.#minWorldHeight >= this.#maxWorldHeight
		) {
			throw new Error("[Wilson] minWorldX and minWorldY must be less than maxWorldX and maxWorldY, repsectively");
		}



		this.#clampWorldCoordinates();
		this.#updateDraggablesLocation();

		const differentFromLastWorldSize = this.#worldWidth !== lastWorldWidth
			|| this.#worldHeight !== lastWorldHeight
			|| this.#worldCenterX !== lastWorldCenterX
			|| this.#worldCenterY !== lastWorldCenterY;

		if (showResetButton && differentFromLastWorldSize)
		{
			this.showResetButton();
		}

		if (this.useInteractionForPanAndZoom && differentFromLastWorldSize)
		{
			this.#interactionOnPanAndZoom();
		}
	}



	#zeroVelocities()
	{
		this.#panVelocityX = 0;
		this.#panVelocityY = 0;
		this.#zoomVelocity = 0;

		this.#lastPanVelocityX = 0;
		this.#lastPanVelocityY = 0;
		this.#lastZoomVelocity = 0;
		
		this.#lastVelocityFactors = Array(this.#numPreviousVelocities).fill(1);

		this.#lastPanVelocitiesX = Array(this.#numPreviousVelocities).fill(0);
		this.#lastPanVelocitiesY = Array(this.#numPreviousVelocities).fill(0);
		this.#lastZoomVelocities = Array(this.#numPreviousVelocities).fill(0);
	}

	#setLastZoomVelocity(lastZoomVelocity: number)
	{
		if (Math.abs(lastZoomVelocity) > Math.abs(this.#lastZoomVelocity))
		{
			this.#lastZoomVelocity = lastZoomVelocity;
		}
	}

	#setLastPanVelocity(lastPanVelocityX: number, lastPanVelocityY: number)
	{
		if (Math.abs(lastPanVelocityX) > Math.abs(this.#lastPanVelocityX))
		{
			this.#lastPanVelocityX = lastPanVelocityX;
		}

		if (Math.abs(lastPanVelocityY) > Math.abs(this.#lastPanVelocityY))
		{
			this.#lastPanVelocityY = lastPanVelocityY;
		}
	}

	#setZoomVelocity()
	{
		if (this.disallowZooming)
		{
			return;
		}

		this.#zoomVelocity = 0;

		for (let i = 0; i < this.#numPreviousVelocities; i++)
		{
			this.#zoomVelocity += Math.sign(this.#lastZoomVelocities[i])
				* this.#lastZoomVelocities[i] ** 2;
		}

		this.#zoomVelocity = Math.sign(this.#zoomVelocity)
			* Math.sqrt(Math.abs(this.#zoomVelocity) / this.#numPreviousVelocities);

		if (Math.abs(this.#zoomVelocity) < this.#zoomVelocityThreshold)
		{
			this.#zoomVelocity = 0;
		}
	}

	#setPanVelocity()
	{
		this.#panVelocityX = 0;
		this.#panVelocityY = 0;

		for (let i = 0; i < this.#numPreviousVelocities; i++)
		{
			this.#panVelocityX += this.#lastPanVelocitiesX[i]
				* this.#lastVelocityFactors[i];
			this.#panVelocityY += this.#lastPanVelocitiesY[i]
				* this.#lastVelocityFactors[i];
		}

		this.#panVelocityX /= this.#numPreviousVelocities;
		this.#panVelocityY /= this.#numPreviousVelocities;

		const totalPanVelocitySquared = this.#panVelocityX * this.#panVelocityX
			+ this.#panVelocityY * this.#panVelocityY;

		const threshold = this.#panVelocityThreshold
			* Math.min(this.#worldWidth, this.#worldHeight);

		if (totalPanVelocitySquared < threshold * threshold)
		{
			this.#panVelocityX = 0;
			this.#panVelocityY = 0;
		}
	}
	
	#currentlyDragging: boolean = false;
	#currentlyPinching: boolean = false;
	#currentlyWheeling: boolean = false;
	#currentlyWheelingTimeoutId: number = -1;
	#ignoreTouchendCooldown: number = 0;
	#atMaxWorldSize: boolean = false;
	#atMinWorldSize: boolean = false;
	#lastInteractionRow: number = 0;
	#lastInteractionCol: number = 0;
	#lastInteractionRow2: number = 0;
	#lastInteractionCol2: number = 0;

	#clampWorldCoordinates(dt: number = 1)
	{
		this.#atMaxWorldSize = false;
		this.#atMinWorldSize = false;

		const applyFactor = (factor: number) =>
		{
			if (this.usePanAndZoomRubberbanding)
			{
				if (this.#currentlyPinching)
				{
					return;
				}

				// Frame-rate independent zoom snap-back using exponential decay.
				// The rate is calibrated so that at 60fps (dt = 1/60), the per-frame
				// correction matches the old behavior with the same softness value.
				// At dt = 1 (default for non-animation calls), this gives full correction.
				const wheelFactor = this.#currentlyWheeling ? 1.5 : 1;
				const zoomSnapRate = -60 * Math.log(
					1 - 1 / (this.rubberbandingZoomSoftness * wheelFactor)
				);
				const zoomExponent = 1 - Math.exp(-zoomSnapRate * dt);

				factor = Math.pow(factor, zoomExponent);

				if (Math.abs(factor - 1) > this.#zoomVelocityThreshold)
				{
					this.#needPanAndZoomUpdate = true;
				}
			}

			this.#worldHeight *= factor;
			this.worldHeight = this.#worldHeight;

			this.#worldWidth *= factor;
			this.worldWidth = this.#worldWidth;

			this.#nonFullscreenWorldHeight *= factor;
			this.#nonFullscreenWorldWidth *= factor;
		};

		let factor1 = 1;
		let factor2 = 1;

		if (this.#worldWidth < this.#minWorldWidth)
		{
			factor1 = this.#minWorldWidth / this.#worldWidth;
		}

		else if (this.#worldWidth > this.#maxWorldWidth)
		{
			factor1 = this.#maxWorldWidth / this.#worldWidth;
		}

		if (this.#worldHeight < this.#minWorldHeight)
		{
			factor2 = this.#minWorldHeight / this.#worldHeight;
		}

		else if (this.#worldHeight > this.#maxWorldHeight)
		{
			factor2 = this.#maxWorldHeight / this.#worldHeight;
		}

		const maxFactor = Math.max(factor1, factor2);
		const minFactor = Math.min(factor1, factor2);

		if (this.clampWorldCoordinatesMode === "both")
		{
			if (minFactor < 1)
			{
				applyFactor(minFactor);
				this.#atMaxWorldSize = true;
			}

			else if (maxFactor > 1)
			{
				applyFactor(maxFactor);
				this.#atMinWorldSize = true;
			}
		}

		else
		{
			if (maxFactor < 1)
			{
				applyFactor(maxFactor);
				this.#atMaxWorldSize = true;
			}

			else if (minFactor > 1)
			{
				applyFactor(minFactor);
				this.#atMinWorldSize = true;
			}
		}

		

		if (
			(this.usePanAndZoomRubberbanding && !this.#currentlyDragging)
			|| !this.usePanAndZoomRubberbanding
		) {
			const xIncrease = Math.max(this.#minWorldX + this.#worldWidth / 2 - this.#worldCenterX, 0);
			const xDecrease = Math.max(this.#worldCenterX - (this.#maxWorldX - this.#worldWidth / 2), 0);

			const yIncrease = Math.max(this.#minWorldY + this.#worldHeight / 2 - this.#worldCenterY, 0);
			const yDecrease = Math.max(this.#worldCenterY - (this.#maxWorldY - this.#worldHeight / 2), 0);

			let xAdjust = (xIncrease !== 0 && xDecrease !== 0 || this.#worldWidth >= this.#maxWorldWidth)
				? (this.#maxWorldX + this.#minWorldX) / 2 - this.#worldCenterX
				: xIncrease - xDecrease;

			let yAdjust = (yIncrease !== 0 && yDecrease !== 0 || this.#worldHeight >= this.#maxWorldHeight)
				? (this.#maxWorldY + this.#minWorldY) / 2 - this.#worldCenterY
				: yIncrease - yDecrease;

			if (this.usePanAndZoomRubberbanding)
			{
				// Frame-rate independent pan snap-back using exponential decay.
				// The rate is calibrated so that at 60fps (dt = 1/60), the per-frame
				// correction matches the old behavior with the same softness value.
				// At dt = 1 (default for non-animation calls), correction ≈ 1.0.
				const panSnapRate = -60 * Math.log(
					1 - 1 / this.rubberbandingPanSoftness
				);
				const panCorrection = 1 - Math.exp(-panSnapRate * dt);

				xAdjust *= panCorrection;
				yAdjust *= panCorrection;
			}

			xAdjust = isNaN(xAdjust) ? 0 : xAdjust;
			yAdjust = isNaN(yAdjust) ? 0 : yAdjust;

			this.#worldCenterX += xAdjust;
			this.worldCenterX = this.#worldCenterX;

			this.#worldCenterY += yAdjust;
			this.worldCenterY = this.#worldCenterY;

			const threshold = this.#panVelocityThreshold
				* Math.min(this.#worldWidth, this.#worldHeight);

			if (
				this.usePanAndZoomRubberbanding
				&& xAdjust ** 2 + yAdjust ** 2 > threshold * threshold
			) {
				this.#needPanAndZoomUpdate = true;
			}
		}
	}

	#getPanOverscroll()
	{
		const rightBound = this.#maxWorldX - this.#worldWidth / 2;
		const leftBound = this.#minWorldX + this.#worldWidth / 2;
		const xSatisfiable = rightBound >= leftBound;

		let overX = 0;

		if (xSatisfiable)
		{
			if (this.#worldCenterX > rightBound)
			{
				overX = this.#worldCenterX - rightBound;
			}

			else if (this.#worldCenterX < leftBound)
			{
				overX = this.#worldCenterX - leftBound;
			}
		}

		const topBound = this.#maxWorldY - this.#worldHeight / 2;
		const bottomBound = this.#minWorldY + this.#worldHeight / 2;
		const ySatisfiable = topBound >= bottomBound;

		let overY = 0;

		if (ySatisfiable)
		{
			if (this.#worldCenterY > topBound)
			{
				overY = this.#worldCenterY - topBound;
			}

			else if (this.#worldCenterY < bottomBound)
			{
				overY = this.#worldCenterY - bottomBound;
			}
		}

		return { overX, overY, xSatisfiable, ySatisfiable };
	}

	#getZoomOverscroll()
	{
		const tooLargeWidth = this.#worldWidth > this.#maxWorldWidth;
		const tooLargeHeight = this.#worldHeight > this.#maxWorldHeight;
		const tooSmallWidth = this.#worldWidth < this.#minWorldWidth;
		const tooSmallHeight = this.#worldHeight < this.#minWorldHeight;

		let overWidthRatio = 0;

		if (tooLargeWidth)
		{
			overWidthRatio = this.#worldWidth / this.#maxWorldWidth - 1;
		}

		else if (tooSmallWidth)
		{
			overWidthRatio = 1 - this.#worldWidth / this.#minWorldWidth;
		}

		let overHeightRatio = 0;

		if (tooLargeHeight)
		{
			overHeightRatio = this.#worldHeight / this.#maxWorldHeight - 1;
		}

		else if (tooSmallHeight)
		{
			overHeightRatio = 1 - this.#worldHeight / this.#minWorldHeight;
		}

		return {
			overWidthRatio,
			overHeightRatio,
			tooLargeWidth,
			tooLargeHeight,
			tooSmallWidth,
			tooSmallHeight,
		};
	}

	#onMousedown(e: MouseEvent)
	{
		if (e.target instanceof HTMLElement && e.target.classList.contains("WILSON_draggable"))
		{
			return;
		}

		if (this.useInteractionForPanAndZoom)
		{
			e.preventDefault();
		}
		
		this.#currentlyDragging = true;

		if (this.useInteractionForPanAndZoom)
		{
			this.#zeroVelocities();
		}

		const [x, y] = this.#interpolatePageToWorld([e.clientY, e.clientX]);
		this.#lastInteractionRow = e.clientY;
		this.#lastInteractionCol = e.clientX;

		if (
			Date.now() - this.#lastInteractionTimes.grab <= 33
			&& this.#lastInteractionTypes.grab === "touch"
		) {
			return;
		}

		this.#lastInteractionTimes.grab = Date.now();
		this.#lastInteractionTypes.grab = "mouse";
		
		this.#interactionCallbacks.mousedown({ x, y, event: e });
	}

	#onMouseup(e: MouseEvent)
	{
		if (e.target instanceof HTMLElement && e.target.classList.contains("WILSON_draggable"))
		{
			return;
		}

		if (this.useInteractionForPanAndZoom)
		{
			e.preventDefault();
		}

		if (this.useInteractionForPanAndZoom && this.#currentlyDragging)
		{
			this.#setPanVelocity();
			this.#needPanAndZoomUpdate = true;
		}

		this.#currentlyDragging = false;

		const [x, y] = this.#interpolatePageToWorld([e.clientY, e.clientX]);
		this.#lastInteractionRow = e.clientY;
		this.#lastInteractionCol = e.clientX;

		if (
			Date.now() - this.#lastInteractionTimes.release <= 33
			&& this.#lastInteractionTypes.grab === "touch"
		) {
			return;
		}

		this.#lastInteractionTimes.release = Date.now();
		this.#lastInteractionTypes.release = "mouse";
		
		this.#interactionCallbacks.mouseup({ x, y, event: e });
	}

	#onMouseenter(e: MouseEvent)
	{
		if (this.useInteractionForPanAndZoom)
		{
			e.preventDefault();
		}

		const [x, y] = this.#interpolatePageToWorld([e.clientY, e.clientX]);
		this.#lastInteractionRow = e.clientY;
		this.#lastInteractionCol = e.clientX;
		
		this.#interactionCallbacks.mouseenter({ x, y, event: e });
	}

	#onMouseleave(e: MouseEvent)
	{
		if (e.target instanceof HTMLElement && e.target.classList.contains("WILSON_draggable"))
		{
			return;
		}

		if (this.useInteractionForPanAndZoom)
		{
			e.preventDefault();
		}

		if (this.useInteractionForPanAndZoom && this.#currentlyDragging)
		{
			this.#setPanVelocity();
			this.#needPanAndZoomUpdate = true;
		}

		this.#currentlyDragging = false;

		const [x, y] = this.#interpolatePageToWorld([e.clientY, e.clientX]);
		this.#lastInteractionRow = e.clientY;
		this.#lastInteractionCol = e.clientX;
		
		this.#interactionCallbacks.mouseleave({ x, y, event: e });
	}

	#onMousemove(e: MouseEvent)
	{
		if (this.useInteractionForPanAndZoom)
		{
			e.preventDefault();
		}

		const [x, y] = this.#interpolatePageToWorld([e.clientY, e.clientX]);
		const [lastX, lastY] = this.#interpolatePageToWorld([
			this.#lastInteractionRow,
			this.#lastInteractionCol
		]);

		const callback = this.#currentlyDragging
			? this.#interactionCallbacks.mousedrag
			: this.#interactionCallbacks.mousemove;

		if (this.useInteractionForPanAndZoom && this.#currentlyDragging)
		{
			let deltaX = -(x - lastX);
			let deltaY = -(y - lastY);

			// Apply rubber band resistance when dragging past bounds.
			// Uses a reciprocal curve: at zero overscroll, full tracking (1:1);
			// at half the viewport past bounds, tracking is halved.
			// Only resists when pushing FURTHER past bounds, not when dragging back.
			if (this.usePanAndZoomRubberbanding)
			{
				const { overX, overY, xSatisfiable, ySatisfiable }
					= this.#getPanOverscroll();

				if (xSatisfiable && overX !== 0)
				{
					const pushingFurther = (overX > 0 && deltaX > 0)
						|| (overX < 0 && deltaX < 0);

					if (pushingFurther)
					{
						deltaX *= 1 / (1 + Math.abs(overX)
							/ (this.#worldWidth * 0.5));
					}
				}

				if (ySatisfiable && overY !== 0)
				{
					const pushingFurther = (overY > 0 && deltaY > 0)
						|| (overY < 0 && deltaY < 0);

					if (pushingFurther)
					{
						deltaY *= 1 / (1 + Math.abs(overY)
							/ (this.#worldHeight * 0.5));
					}
				}
			}

			this.#worldCenterX += deltaX;
			this.worldCenterX = this.#worldCenterX;

			this.#worldCenterY += deltaY;
			this.worldCenterY = this.#worldCenterY;

			this.#setLastPanVelocity(deltaX, deltaY);

			this.#needPanAndZoomUpdate = true;
		}

		callback({ x, y, xDelta: x - lastX, yDelta: y - lastY, event: e });

		this.#lastInteractionRow = e.clientY;
		this.#lastInteractionCol = e.clientX;
	}


	
	// All parameters are in world coordinates.
	#updateFromPinching({
		touch1,
		touch2,
		lastTouch1,
		lastTouch2
	}: {
		touch1: [number, number],
		touch2: [number, number],
		lastTouch1: [number, number],
		lastTouch2: [number, number]
	}) {
		if (this.disallowZooming)
		{
			return;
		}

		this.#zoomFixedPoint = [
			(touch1[0] + touch2[0]) / 2,
			(touch1[1] + touch2[1]) / 2
		];

		const distance = Math.sqrt(
			(touch1[0] - touch2[0]) ** 2
			+ (touch1[1] - touch2[1]) ** 2
		)

		const lastDistance = Math.sqrt(
			(lastTouch1[0] - lastTouch2[0]) ** 2
			+ (lastTouch1[1] - lastTouch2[1]) ** 2
		);

		const centerProportion = [
			(this.#zoomFixedPoint[0] - this.#worldCenterX) / this.#worldWidth,
			(this.#zoomFixedPoint[1] - this.#worldCenterY) / this.#worldHeight
		];

		let scale = lastDistance / distance;

		// Apply zoom resistance during pinch when past bounds.
		if (this.usePanAndZoomRubberbanding && scale !== 1)
		{
			const {
				overWidthRatio, overHeightRatio,
				tooLargeWidth, tooLargeHeight,
				tooSmallWidth, tooSmallHeight
			} = this.#getZoomOverscroll();

			const overZoomRatio = Math.max(overWidthRatio, overHeightRatio);

			const zoomingPastMax = (scale > 1)
				&& (tooLargeWidth || tooLargeHeight);
			const zoomingPastMin = (scale < 1)
				&& (tooSmallWidth || tooSmallHeight);

			if ((zoomingPastMax || zoomingPastMin) && overZoomRatio > 0)
			{
				const resistance = 1 / (1 + overZoomRatio * 3);
				scale = 1 + (scale - 1) * resistance;
			}
		}

		this.#worldWidth *= scale;
		this.worldWidth = this.#worldWidth;

		this.#worldHeight *= scale;
		this.worldHeight = this.#worldHeight;

		this.#nonFullscreenWorldWidth *= scale;
		this.#nonFullscreenWorldHeight *= scale;

		this.#setLastZoomVelocity((scale - 1) * 200);



		const newFixedPointX = centerProportion[0] * this.#worldWidth;
		const newFixedPointY = centerProportion[1] * this.#worldHeight;

		const newWorldCenterX = this.#zoomFixedPoint[0] - newFixedPointX;
		const newWorldCenterY = this.#zoomFixedPoint[1] - newFixedPointY;

		this.#worldCenterX = newWorldCenterX;
		this.worldCenterX = this.#worldCenterX;

		this.#worldCenterY = newWorldCenterY;
		this.worldCenterY = this.#worldCenterY;
	}
	
	#onTouchstart(e: TouchEvent)
	{
		if (e.target instanceof HTMLElement && e.target.classList.contains("WILSON_draggable"))
		{
			return;
		}

		if (this.useInteractionForPanAndZoom)
		{
			e.preventDefault();
		}

		this.#currentlyDragging = true;

		if (this.useInteractionForPanAndZoom)
		{
			this.#zeroVelocities();
		}
		
		const [x, y] = this.#interpolatePageToWorld([e.touches[0].clientY, e.touches[0].clientX]);

		this.#lastInteractionRow = e.touches[0].clientY;
		this.#lastInteractionCol = e.touches[0].clientX;

		if (e.touches.length > 1)
		{
			this.#currentlyPinching = true;
			this.#lastInteractionRow2 = e.touches[1].clientY;
			this.#lastInteractionCol2 = e.touches[1].clientX;
		}

		if (
			Date.now() - this.#lastInteractionTimes.grab <= 33
			&& this.#lastInteractionTypes.grab === "mouse"
		) {
			return;
		}

		this.#lastInteractionTimes.grab = Date.now();
		this.#lastInteractionTypes.grab = "touch";
		
		this.#interactionCallbacks.touchstart({ x, y, event: e });
	}

	#onTouchend(e: TouchEvent)
	{
		if (e.target instanceof HTMLElement && e.target.classList.contains("WILSON_draggable"))
		{
			return;
		}

		if (this.useInteractionForPanAndZoom)
		{
			e.preventDefault();
		}

		if (this.#ignoreTouchendCooldown !== 0)
		{
			if (e.touches.length === 0)
			{
				this.#currentlyDragging = false;
			}

			return;
		}



		if (this.useInteractionForPanAndZoom && this.#currentlyDragging && this.#ignoreTouchendCooldown === 0)
		{
			this.#setPanVelocity();
			this.#needPanAndZoomUpdate = true;
		}

		if (e.touches.length === 0)
		{
			this.#currentlyDragging = false;
		}

		const [x, y] = e.touches.length === 0
			? this.#interpolatePageToWorld([
				this.#lastInteractionRow,
				this.#lastInteractionCol
			])
			: this.#interpolatePageToWorld([
				e.touches[0].clientY,
				e.touches[0].clientX
			]);

		if (e.touches.length !== 0)
		{
			this.#lastInteractionRow = e.touches[0].clientY;
			this.#lastInteractionCol = e.touches[0].clientX;
		}

		if (e.touches.length > 1)
		{
			this.#lastInteractionRow2 = e.touches[1].clientY;
			this.#lastInteractionCol2 = e.touches[1].clientX;
		}

		else
		{
			if (this.#currentlyPinching)
			{
				this.#ignoreTouchendCooldown = 350;
				this.#setZoomVelocity();
				this.#needPanAndZoomUpdate = true;
			}

			this.#currentlyPinching = false;
		}

		if (
			Date.now() - this.#lastInteractionTimes.release <= 33
			&& this.#lastInteractionTypes.grab === "mouse"
		) {
			return;
		}

		this.#lastInteractionTimes.release = Date.now();
		this.#lastInteractionTypes.release = "touch";
		
		this.#interactionCallbacks.touchend({ x, y, event: e });
	}

	#onTouchmove(e: TouchEvent)
	{
		if (this.useInteractionForPanAndZoom)
		{
			e.preventDefault();
		}

		if (this.#ignoreTouchendCooldown !== 0)
		{
			return;
		}
		
		const [x, y] = this.#interpolatePageToWorld([
			e.touches[0].clientY,
			e.touches[0].clientX
		]);

		const [lastX, lastY] = this.#interpolatePageToWorld([
			this.#lastInteractionRow,
			this.#lastInteractionCol
		]);

		if (this.useInteractionForPanAndZoom && this.#currentlyDragging)
		{
			if (e.touches.length > 1)
			{
				const touch2 = this.#interpolatePageToWorld([
					e.touches[1].clientY,
					e.touches[1].clientX
				]);

				const lastTouch2 = this.#interpolatePageToWorld([
					this.#lastInteractionRow2,
					this.#lastInteractionCol2
				]);

				this.#updateFromPinching({
					touch1: [x, y],
					touch2,
					lastTouch1: [lastX, lastY],
					lastTouch2,
				});

				const xDelta = (x + touch2[0]) / 2 - (lastX + lastTouch2[0]) / 2;
				const yDelta = (y + touch2[1]) / 2 - (lastY + lastTouch2[1]) / 2;

				this.#worldCenterX -= xDelta;
				this.worldCenterX = this.#worldCenterX;

				this.#worldCenterY -= yDelta;
				this.worldCenterY = this.#worldCenterY;

				this.#setLastPanVelocity(-xDelta, -yDelta);

				this.#lastInteractionRow2 = e.touches[1].clientY,
				this.#lastInteractionCol2 = e.touches[1].clientX;
			}
			
			else
			{
				let deltaX = -(x - lastX);
				let deltaY = -(y - lastY);

				// Apply rubber band resistance when dragging past bounds.
				if (this.usePanAndZoomRubberbanding)
				{
					const { overX, overY, xSatisfiable, ySatisfiable }
						= this.#getPanOverscroll();

					if (xSatisfiable && overX !== 0)
					{
						const pushingFurther = (overX > 0 && deltaX > 0)
							|| (overX < 0 && deltaX < 0);

						if (pushingFurther)
						{
							deltaX *= 1 / (1 + Math.abs(overX)
								/ (this.#worldWidth * 0.5));
						}
					}

					if (ySatisfiable && overY !== 0)
					{
						const pushingFurther = (overY > 0 && deltaY > 0)
							|| (overY < 0 && deltaY < 0);

						if (pushingFurther)
						{
							deltaY *= 1 / (1 + Math.abs(overY)
								/ (this.#worldHeight * 0.5));
						}
					}
				}

				this.#worldCenterX += deltaX;
				this.worldCenterX = this.#worldCenterX;

				this.#worldCenterY += deltaY;
				this.worldCenterY = this.#worldCenterY;

				this.#setLastPanVelocity(deltaX, deltaY);
			}

			this.#needPanAndZoomUpdate = true;
		}
		
		this.#interactionCallbacks.touchmove({
			x,
			y,
			xDelta: x - lastX,
			yDelta: y - lastY,
			event: e
		});

		this.#lastInteractionRow = e.touches[0].clientY;
		this.#lastInteractionCol = e.touches[0].clientX;
	}
	
	#zoomFixedPoint: [number, number] = [0, 0];
	#zoomCanvas(scale: number)
	{
		if (this.disallowZooming)
		{
			return;
		}

		if (
			!this.usePanAndZoomRubberbanding && (
				scale > 1 && this.#atMaxWorldSize
				|| scale < 1 && this.#atMinWorldSize
			)
		) {
			return;
		}

		// Apply zoom resistance when past bounds and rubberbanding is active.
		// Uses a reciprocal curve on the over-zoom ratio so that zooming further
		// past bounds requires increasingly more effort.
		if (this.usePanAndZoomRubberbanding && scale !== 1)
		{
			const {
				overWidthRatio, overHeightRatio,
				tooLargeWidth, tooLargeHeight,
				tooSmallWidth, tooSmallHeight
			} = this.#getZoomOverscroll();

			const overZoomRatio = Math.max(overWidthRatio, overHeightRatio);

			// scale > 1 means world gets larger (zooming out)
			// scale < 1 means world gets smaller (zooming in)
			const zoomingPastMax = (scale > 1)
				&& (tooLargeWidth || tooLargeHeight);
			const zoomingPastMin = (scale < 1)
				&& (tooSmallWidth || tooSmallHeight);

			if ((zoomingPastMax || zoomingPastMin) && overZoomRatio > 0)
			{
				const resistance = 1 / (1 + overZoomRatio * 3);
				scale = 1 + (scale - 1) * resistance;
			}
		}

		const centerProportion = [
			(this.#zoomFixedPoint[0] - this.#worldCenterX) / this.#worldWidth,
			(this.#zoomFixedPoint[1] - this.#worldCenterY) / this.#worldHeight
		];

		this.#worldWidth *= scale;
		this.worldWidth = this.#worldWidth;

		this.#worldHeight *= scale;
		this.worldHeight = this.#worldHeight;

		this.#nonFullscreenWorldWidth *= scale;
		this.#nonFullscreenWorldHeight *= scale;

		const newFixedPointX = centerProportion[0] * this.#worldWidth;
		const newFixedPointY = centerProportion[1] * this.#worldHeight;

		this.#worldCenterX = this.#zoomFixedPoint[0] - newFixedPointX;
		this.worldCenterX = this.#worldCenterX;

		this.#worldCenterY = this.#zoomFixedPoint[1] - newFixedPointY;
		this.worldCenterY = this.#worldCenterY;
		
		this.#needPanAndZoomUpdate = true;
	}

	#onWheel(e: WheelEvent)
	{
		if (this.useInteractionForPanAndZoom && !this.disallowZooming)
		{
			e.preventDefault();
		}

		const [x, y] = this.#interpolatePageToWorld([e.clientY, e.clientX]);

		if (this.useInteractionForPanAndZoom)
		{
			this.#zoomFixedPoint = [x, y];

			if (
				Math.abs(e.deltaY) < 40
				|| this.#currentlyWheeling && Math.abs(e.deltaY) < 90
			) {
				const sigmoided = 60 * (
					2 / (1 + Math.pow(1.035, -e.deltaY)) - 1
				);

				const scale = 1 + sigmoided * 0.005;
				this.#zoomCanvas(scale);
			}

			else
			{
				this.#zoomVelocity = Math.min(
					Math.max(
						this.#zoomVelocity + Math.sign(e.deltaY) * 15,
						-30
					),
					30
				);
			}
		}

		this.#currentlyWheeling = true;

		if (this.#currentlyWheelingTimeoutId !== -1)
		{
			clearTimeout(this.#currentlyWheelingTimeoutId);
		}

		this.#currentlyWheelingTimeoutId = setTimeout(() =>
		{
			this.#currentlyWheeling = false;
			this.#currentlyWheelingTimeoutId = -1;
			this.#needPanAndZoomUpdate = true;
		}, 50) as unknown as number;

		this.#interactionCallbacks.wheel({
			x,
			y,
			scrollDelta: e.deltaY,
			event: e
		});

		this.#lastInteractionRow = e.clientY;
		this.#lastInteractionCol = e.clientX;
	}
	
	#animationFrameLoopPaused = false;
	#lastPanAndZoomTimestamp = -1;
	
	protected set animationFrameLoopPaused(value: boolean)
	{
		if (value === this.#animationFrameLoopPaused)
		{
			return;
		}
		
		this.#animationFrameLoopPaused = value;
		this.#lastPanAndZoomTimestamp = -1;

		if (this.#animationFrameLoopPaused)
		{
			this.#zeroVelocities();
		}

		else
		{
			requestAnimationFrame(this.#animationFrameLoop);
		}
	}

	#animationFrameLoop = (timestamp: number) =>
	{
		if (this.#animationFrameLoopPaused || this.#destroyed)
		{
			return;
		}

		const timeElapsed = timestamp - this.#lastPanAndZoomTimestamp;
		this.#lastPanAndZoomTimestamp = timestamp;

		if (this.useInteractionForPanAndZoom)
		{
			this.#lastZoomVelocities.shift();
			this.#lastZoomVelocities.push(this.#lastZoomVelocity);
			this.#lastZoomVelocity = 0;

			this.#lastPanVelocitiesX.shift();
			this.#lastPanVelocitiesX.push(this.#lastPanVelocityX);
			this.#lastPanVelocityX = 0;

			this.#lastPanVelocitiesY.shift();
			this.#lastPanVelocitiesY.push(this.#lastPanVelocityY);
			this.#lastPanVelocityY = 0;

			// It would seem like we should divide by timeElapsed,
			// but this is a lag compensation measure --- if we're dropping
			// frames, we increase the velocity factor so that the inertia effect
			// isn't halted so quickly.
			this.#lastVelocityFactors.shift();
			this.#lastVelocityFactors.push(
				Math.max(timeElapsed / (1000 / 60), 1)
			);

			this.#ignoreTouchendCooldown = Math.max(0, this.#ignoreTouchendCooldown - timeElapsed);
		}

		if (timeElapsed === 0 || timeElapsed > 10000)
		{
			if (!this.#destroyed)
			{
				requestAnimationFrame(this.#animationFrameLoop);
			}

			return;
		}

		if (this.#zoomVelocity)
		{
			this.#zoomCanvas(1 + this.#zoomVelocity * 0.005);
			this.#zoomVelocity *= Math.pow(
				this.#zoomFriction,
				timeElapsed / (1000 / 60)
			);

			// Extra friction when zoom momentum pushes further past bounds.
			// Rate of 15 means velocity drops to ~22% in 0.1s, roughly 3x
			// faster than normal friction. Only damps velocity in the
			// direction of further overscroll.
			if (this.usePanAndZoomRubberbanding)
			{
				const dt = timeElapsed / 1000;

				const {
					tooLargeWidth, tooLargeHeight,
					tooSmallWidth, tooSmallHeight
				} = this.#getZoomOverscroll();

				// zoomVelocity > 0 means zooming out (world gets larger)
				// zoomVelocity < 0 means zooming in (world gets smaller)
				const pushingPastMax = this.#zoomVelocity > 0
					&& (tooLargeWidth || tooLargeHeight);
				const pushingPastMin = this.#zoomVelocity < 0
					&& (tooSmallWidth || tooSmallHeight);

				if (pushingPastMax || pushingPastMin)
				{
					this.#zoomVelocity *= Math.exp(-15 * dt);
				}
			}

			if (Math.abs(this.#zoomVelocity) < this.#zoomVelocityThreshold)
			{
				this.#zoomVelocity = 0;
			}
		}

		if (this.#panVelocityX || this.#panVelocityY)
		{
			this.#worldCenterX += this.#panVelocityX;
			this.worldCenterX = this.#worldCenterX;

			this.#worldCenterY += this.#panVelocityY;
			this.worldCenterY = this.#worldCenterY;

			this.#needPanAndZoomUpdate = true;

			const frictionFactor = Math.pow(
				this.#panFriction,
				timeElapsed / (1000 / 60)
			);

			this.#panVelocityX *= frictionFactor;
			this.#panVelocityY *= frictionFactor;

			// Extra friction when pan momentum pushes further past bounds.
			if (this.usePanAndZoomRubberbanding)
			{
				const dt = timeElapsed / 1000;
				const { overX, overY, xSatisfiable, ySatisfiable }
					= this.#getPanOverscroll();

				const overscrollDamping = Math.exp(-15 * dt);

				if (xSatisfiable)
				{
					if ((overX > 0 && this.#panVelocityX > 0)
						|| (overX < 0 && this.#panVelocityX < 0))
					{
						this.#panVelocityX *= overscrollDamping;
					}
				}

				if (ySatisfiable)
				{
					if ((overY > 0 && this.#panVelocityY > 0)
						|| (overY < 0 && this.#panVelocityY < 0))
					{
						this.#panVelocityY *= overscrollDamping;
					}
				}
			}

			const totalPanVelocitySquared = this.#panVelocityX * this.#panVelocityX
				+ this.#panVelocityY * this.#panVelocityY;

			const threshold = this.#panVelocityThreshold
				* Math.min(this.#worldWidth, this.#worldHeight);

			if (totalPanVelocitySquared < threshold * threshold)
			{
				this.#panVelocityX = 0;
				this.#panVelocityY = 0;
			}
		}



		if (this.#needPanAndZoomUpdate)
		{
			this.#needPanAndZoomUpdate = false;

			this.#clampWorldCoordinates(timeElapsed / 1000);
			this.#updateDraggablesLocation();
			this.#interactionOnPanAndZoom();
			this.showResetButton();
		}

		if (this.#needDraggablesContainerSizeUpdate)
		{
			requestAnimationFrame(() => this.#updateDraggablesContainerSize());
			this.#needDraggablesContainerSizeUpdate = false;
		}

		

		if (!this.#destroyed)
		{
			requestAnimationFrame(this.#animationFrameLoop);
		}
	}

	#initInteraction()
	{
		for (const canvas of [this.canvas, this.#draggablesContainer])
		{
			canvas.addEventListener("mousedown", (e) => this.#onMousedown(e as MouseEvent));
			canvas.addEventListener("mouseup", (e) => this.#onMouseup(e as MouseEvent));
			canvas.addEventListener("mousemove", (e) => this.#onMousemove(e as MouseEvent));
			canvas.addEventListener("touchstart", (e) => this.#onTouchstart(e as TouchEvent));
			canvas.addEventListener("touchend", (e) => this.#onTouchend(e as TouchEvent));
			canvas.addEventListener("touchmove", (e) => this.#onTouchmove(e as TouchEvent));
			canvas.addEventListener("wheel", (e) => this.#onWheel(e as WheelEvent));

			canvas.addEventListener("mouseenter", (e) => this.#onMouseenter(e as MouseEvent));
			canvas.addEventListener("mouseleave", (e) => this.#onMouseleave(e as MouseEvent));
		}
	}



	#documentDraggableMousemoveListener = (e: MouseEvent) =>
	{
		if (this.#currentMouseDraggableId !== undefined)
		{
			this.#draggableOnMousemove(e, this.#currentMouseDraggableId);
		}
	}

	#documentDraggableMouseupListener = (e: MouseEvent) =>
	{
		if (this.#currentMouseDraggableId !== undefined)
		{
			this.#draggableOnMouseup(e, this.#currentMouseDraggableId);
		}
	}

	#initDraggables()
	{
		document.documentElement.addEventListener("mousemove", this.#documentDraggableMousemoveListener);
		document.documentElement.addEventListener("mouseup", this.#documentDraggableMouseupListener);
	}

	setDraggables(draggables: DraggableLocations)
	{
		let onlyNewDraggables = true;

		for (const id in this.#draggables)
		{
			if (id in draggables)
			{
				onlyNewDraggables = false;
				break;
			}
		}

		this.#setDraggables(draggables, !onlyNewDraggables);
	}

	#setDraggables(draggables: DraggableLocations, showResetButton: boolean)
	{
		for (const [id, location] of Object.entries(draggables))
		{
			const [x, y] = location;

			//First convert to page coordinates.
			const uncappedRow = this.#draggablesContainerRestrictedHeight * (
				1 - ((y - this.#worldCenterY) / this.#worldHeight + .5)
			) + this.#draggablesRadius;

			const uncappedCol = this.#draggablesContainerRestrictedWidth * (
					(x - this.#worldCenterX) / this.#worldWidth + .5
				)
			+ this.#draggablesRadius;

			const row = Math.min(
				Math.max(this.#draggablesRadius, uncappedRow),
				this.#draggablesContainerHeight - this.#draggablesRadius
			);

			const col = Math.min(
				Math.max(this.#draggablesRadius, uncappedCol),
				this.#draggablesContainerWidth - this.#draggablesRadius
			);

			this.#draggableDefaultId++;
			
			if (!this.#draggables[id])
			{
				const element = document.createElement("div");
				element.classList.add("WILSON_draggable");
				element.id = `WILSON_draggable-${id}`;
				element.style.transform = `translate(${col - this.#draggablesRadius}px, ${row - this.#draggablesRadius}px)`;
				
				element.addEventListener("mousedown", e => this.#draggableOnMousedown(e as MouseEvent, id));
				element.addEventListener("mouseup", e => this.#draggableOnMouseup(e as MouseEvent, id));
				element.addEventListener("mousemove", e => this.#draggableOnMousemove(e as MouseEvent, id));
				element.addEventListener("touchstart", e => this.#draggableOnTouchstart(e as TouchEvent, id));
				element.addEventListener("touchend", e => this.#draggableOnTouchend(e as TouchEvent, id));
				element.addEventListener("touchmove", e => this.#draggableOnTouchmove(e as TouchEvent, id));

				this.#draggablesContainer.appendChild(element);

				this.#draggables[id] = {
					element,
					location: [x, y],
					currentlyDragging: false,
				};
				this.draggables[id] = {
					element,
					location: [x, y],
					currentlyDragging: false,
				};

				this.#defaultDraggableLocations[id] = [x, y];
			}

			else
			{
				this.#draggables[id].location = [x, y];
				this.draggables[id].location = [x, y];

				const element = this.#draggables[id].element;
				element.style.transform = `translate(${col - this.#draggablesRadius}px, ${row - this.#draggablesRadius}px)`;

				if (showResetButton)
				{
					this.showResetButton();
				}
			}
		}
	}

	removeDraggables(id: string | string[])
	{
		const ids = Array.isArray(id) ? id : [id];
		
		for (const draggableId of ids)
		{
			this.#draggables[draggableId].element.remove();
			delete this.#draggables[draggableId];
			delete this.draggables[draggableId];
		}
	}

	#draggableOnMousedown(e: MouseEvent, id: string)
	{
		if (this.#draggablesStatic)
		{
			return;
		}

		e.preventDefault();
		
		this.#currentMouseDraggableId = id;
		this.#draggables[id].currentlyDragging = true;
		this.draggables[id].currentlyDragging = true;

		this.#draggableCallbacks.grab({
			id,
			x: this.#draggables[id].location[0],
			y: this.#draggables[id].location[1],
			event: e,
		});
	}

	#draggableOnMouseup(e: MouseEvent, id: string)
	{
		if (this.#draggablesStatic)
		{
			return;
		}
		
		e.preventDefault();

		this.#currentMouseDraggableId = undefined;
		this.#draggables[id].currentlyDragging = false;
		this.draggables[id].currentlyDragging = false;
		this.#currentlyDragging = false;

		this.#draggableCallbacks.release({
			id,
			x: this.#draggables[id].location[0],
			y: this.#draggables[id].location[1],
			event: e,
		});
	}

	#draggableOnMousemove(e: MouseEvent, id: string)
	{
		if (this.#draggablesStatic)
		{
			return;
		}
		
		e.preventDefault();

		if (!this.#draggables[id].currentlyDragging)
		{
			return;
		}

		const rect = this.#draggablesContainer.getBoundingClientRect();
		const row = Math.min(Math.max(this.#draggablesRadius, e.clientY - rect.top), this.#draggablesContainerHeight - this.#draggablesRadius);
		const col = Math.min(Math.max(this.#draggablesRadius, e.clientX - rect.left), this.#draggablesContainerWidth - this.#draggablesRadius);

		this.#draggables[id].element.style.transform = `translate(${col - this.#draggablesRadius}px, ${row - this.#draggablesRadius}px)`;

		const x = (
			(col - this.#draggablesRadius - this.#draggablesContainerRestrictedWidth / 2)
				/ this.#draggablesContainerRestrictedWidth
		) * this.#worldWidth + this.#worldCenterX;
		
		const y = (
			-(row - this.#draggablesRadius - this.#draggablesContainerRestrictedHeight / 2)
				/ this.#draggablesContainerRestrictedHeight
		) * this.#worldHeight + this.#worldCenterY;
		
		this.#draggableCallbacks.drag({
			id,
			x,
			y,
			xDelta: x - this.#draggables[id].location[0],
			yDelta: y - this.#draggables[id].location[1],
			event: e,
		});

		this.#draggables[id].location = [x, y];
		this.draggables[id].location = [x, y];

		this.showResetButton();
	}

	#draggableOnTouchstart(e: TouchEvent, id: string)
	{
		if (this.#draggablesStatic)
		{
			return;
		}
		
		e.preventDefault();

		this.#draggables[id].currentlyDragging = true;
		this.draggables[id].currentlyDragging = true;
		
		this.#draggableCallbacks.grab({
			id,
			x: this.#draggables[id].location[0],
			y: this.#draggables[id].location[1],
			event: e,
		});
	}

	#draggableOnTouchend(e: TouchEvent, id: string)
	{
		if (this.#draggablesStatic)
		{
			return;
		}
		
		e.preventDefault();

		this.#draggables[id].currentlyDragging = false;
		this.draggables[id].currentlyDragging = false;
		this.#currentlyDragging = false;

		this.#draggableCallbacks.release({
			id,
			x: this.#draggables[id].location[0],
			y: this.#draggables[id].location[1],
			event: e,
		});
	}

	#draggableOnTouchmove(e: TouchEvent, id: string)
	{
		if (this.#draggablesStatic)
		{
			return;
		}
		
		e.preventDefault();

		if (!this.#draggables[id].currentlyDragging)
		{
			return;
		}

		const rect = this.#draggablesContainer.getBoundingClientRect();

		const worldCoordinates = Array.from(e.touches).map(touch =>
		{
			const row = Math.min(Math.max(this.#draggablesRadius, touch.clientY - rect.top), this.#draggablesContainerHeight - this.#draggablesRadius);
			const col = Math.min(Math.max(this.#draggablesRadius, touch.clientX - rect.left), this.#draggablesContainerWidth - this.#draggablesRadius);

			const x = (
				(col - this.#draggablesRadius - this.#draggablesContainerRestrictedWidth / 2)
					/ this.#draggablesContainerRestrictedWidth
			) * this.#worldWidth + this.#worldCenterX;
			
			const y = (
				-(row - this.#draggablesRadius - this.#draggablesContainerRestrictedHeight / 2)
					/ this.#draggablesContainerRestrictedHeight
			) * this.#worldHeight + this.#worldCenterY;

			return [x, y, row, col] as [number, number, number, number];
		});



		const distancesFromDraggableCenter = worldCoordinates.map(coordinate =>
		{
			return (coordinate[0] - this.#draggables[id].location[0]) ** 2
				+ (coordinate[1] - this.#draggables[id].location[1]) ** 2;
		});

		let minIndex = 0;
		let minDistance = distancesFromDraggableCenter[0];

		for (let i = 1; i < distancesFromDraggableCenter.length; i++)
		{
			if (distancesFromDraggableCenter[i] < minDistance)
			{
				minIndex = i;
				minDistance = distancesFromDraggableCenter[i];
			}
		}

		const [x, y, row, col] = worldCoordinates[minIndex];

		this.#draggables[id].element.style.transform = `translate(${col - this.#draggablesRadius}px, ${row - this.#draggablesRadius}px)`;



		this.#draggableCallbacks.drag({
			id,
			x,
			y,
			xDelta: x - this.#draggables[id].location[0],
			yDelta: y - this.#draggables[id].location[1],
			event: e,
		});

		this.#draggables[id].location = [x, y];
		this.draggables[id].location = [x, y];

		this.showResetButton();
	}

	#updateDraggablesContainerSize()
	{
		const computedStyle = getComputedStyle(this.canvas);

		const width = this.canvas.clientWidth
			- parseFloat(computedStyle.paddingLeft)
			- parseFloat(computedStyle.paddingRight);

		const height = this.canvas.clientHeight
			- parseFloat(computedStyle.paddingTop)
			- parseFloat(computedStyle.paddingBottom);

		this.#draggablesContainerWidth = width + 2 * this.#draggablesRadius;
		this.#draggablesContainerHeight = height + 2 * this.#draggablesRadius;

		this.#draggablesContainer.style.width = `${this.#draggablesContainerWidth}px`;
		this.#draggablesContainer.style.height = `${this.#draggablesContainerHeight}px`;

		this.#draggablesContainerRestrictedWidth = width;
		this.#draggablesContainerRestrictedHeight = height;

		this.#draggablesContainer.style.marginTop =
			(parseFloat(computedStyle.borderTopWidth)
			+ parseFloat(computedStyle.paddingTop)
			- this.#draggablesRadius) + "px";

		this.#updateDraggablesLocation();
	}

	#updateDraggablesLocation()
	{
		for (const id in this.#draggables)
		{
			const x = this.#draggables[id].location[0];
			const y = this.#draggables[id].location[1];
			const element = this.#draggables[id].element;

			const uncappedRow = this.#draggablesContainerRestrictedHeight * (
				1 - ((y - this.#worldCenterY) / this.#worldHeight + .5)
			) + this.#draggablesRadius;

			const uncappedCol = this.#draggablesContainerRestrictedWidth * (
				(x - this.#worldCenterX) / this.#worldWidth + .5
			) + this.#draggablesRadius;

			const row = Math.min(
				Math.max(this.#draggablesRadius, uncappedRow),
				this.#draggablesContainerHeight - this.#draggablesRadius
			);

			const col = Math.min(
				Math.max(this.#draggablesRadius, uncappedCol),
				this.#draggablesContainerWidth - this.#draggablesRadius
			);

			element.style.transform = `translate(${col - this.#draggablesRadius}px, ${row - this.#draggablesRadius}px)`;
		}
	}



	#initFullscreen()
	{
		if (this.#fullscreenUseButton)
		{
			this.#fullscreenEnterFullscreenButton = document.createElement("div");

			this.#fullscreenEnterFullscreenButton.classList.add("WILSON_enter-fullscreen-button");
			this.#fullscreenEnterFullscreenButton.classList.add("WILSON_button");

			this.buttonContainer.appendChild(this.#fullscreenEnterFullscreenButton);

			const img = document.createElement("img");
			img.src = this.#fullscreenEnterFullscreenButtonIconPath as string;
			this.#fullscreenEnterFullscreenButton.appendChild(img);

			this.#fullscreenEnterFullscreenButton.addEventListener("click", () =>
			{
				this.enterFullscreen();
			});



			this.#fullscreenExitFullscreenButton = document.createElement("div");

			this.#fullscreenExitFullscreenButton.classList.add("WILSON_exit-fullscreen-button");
			this.#fullscreenExitFullscreenButton.classList.add("WILSON_button");

			this.buttonContainer.appendChild(this.#fullscreenExitFullscreenButton);

			const img2 = document.createElement("img");
			img2.src = this.#fullscreenExitFullscreenButtonIconPath as string;
			this.#fullscreenExitFullscreenButton.appendChild(img2);

			this.#fullscreenExitFullscreenButton.addEventListener("click", () =>
			{
				this.exitFullscreen();
			});
		}
	}



	#initResetButton()
	{
		if (this.#useResetButton)
		{
			this.#resetButton = document.createElement("div");
			this.#resetButton.classList.add("WILSON_reset-button");
			this.#resetButton.classList.add("WILSON_button");
			this.buttonContainer.appendChild(this.#resetButton);

			const img = document.createElement("img");
			img.src = this.#resetButtonIconPath as string;
			this.#resetButton.appendChild(img);

			this.#resetButton.addEventListener("click", () =>
			{
				this.reset();
			});
		}
	}

	showResetButton()
	{
		if (this.#resetButton)
		{
			clearTimeout(this.#resetButtonTimeoutId);

			this.#resetButton.style.display = "block";
			
			requestAnimationFrame(() =>
			{
				if (this.#resetButton)
				{
					this.#resetButton.style.opacity = "1";
				}
			});
		}
	}



	#preventGestures = (e: Event) =>
	{
		e.preventDefault();
	}


	
	#canvasOldWidth: number = 0;
	#canvasOldWidthStyle: string = "";
	#canvasOldHeightStyle: string = "";

	#enterFullscreen()
	{
		this.#currentlyFullscreen = true;
		this.currentlyFullscreen = this.#currentlyFullscreen;
		this.#fullscreenInitialWindowInnerWidth = window.innerWidth;
		this.#fullscreenInitialWindowInnerHeight = window.innerHeight;

		this.#fullscreenOldScroll = window.scrollY;

		if (this.#metaThemeColorElement)
		{
			this.#oldMetaThemeColor = this.#metaThemeColorElement.getAttribute("content");
		}

		
		this.#canvasOldWidth = this.#canvasWidth;

		this.#canvasOldWidthStyle = this.canvas.style.width;
		this.#canvasOldHeightStyle = this.canvas.style.height;



		document.body.appendChild(this.#fullscreenContainer);

		this.canvas.classList.add("WILSON_fullscreen");
		this.#canvasContainer.classList.add("WILSON_fullscreen");
		this.#fullscreenContainer.classList.add("WILSON_fullscreen");



		document.documentElement.style.userSelect = "none";

		document.addEventListener("gesturestart", this.#preventGestures);
		document.addEventListener("gesturechange", this.#preventGestures);
		document.addEventListener("gestureend", this.#preventGestures);

		if (this.#metaThemeColorElement)
		{
			this.#metaThemeColorElement.setAttribute("content", "#000000");
		}



		if (this.#fullscreenFillScreen)
		{
			this.#fullscreenContainer.classList.add("WILSON_fullscreen-fill-screen");

			this.canvas.style.width = "100vw";
			this.canvas.style.height = "100%";

			const windowAspectRatio = window.innerWidth / window.innerHeight;

			const aspectRatioChange = windowAspectRatio / this.#canvasAspectRatio;

			this.#worldWidth = Math.max(this.#worldWidth * aspectRatioChange, this.#worldWidth);
			this.worldWidth = this.#worldWidth;

			this.#worldHeight = Math.max(this.#worldHeight / aspectRatioChange, this.#worldHeight);
			this.worldHeight = this.#worldHeight;
			
			this.#clampWorldCoordinates();
		}

		else
		{
			this.canvas.style.width = `min(100vw, calc(100vh * ${this.#canvasAspectRatio}))`;
			this.canvas.style.height = `min(100vh, calc(100vw / ${this.#canvasAspectRatio}))`;
		}

		this.#onResizeWindow();
		this.#updateDraggablesContainerSize();
		this.onSwitchFullscreen(true);

		setTimeout(() =>
		{
			this.#fullscreenInitialWindowInnerWidth = window.innerWidth;
			this.#fullscreenInitialWindowInnerHeight = window.innerHeight;
		}, 100);
	}

	#addEnterFullscreenFillScreenTransitionStyle()
	{
		const canvasRect = this.canvas.getBoundingClientRect();

		this.#fullscreenCanvasRect = canvasRect;

		// The old canvas snaps to being as large as possible, so we correct it.
		const windowAspectRatio = window.innerWidth / window.innerHeight;

		const scaleStart = windowAspectRatio >= this.#canvasAspectRatio
			? canvasRect.height / window.innerHeight
			: canvasRect.width / window.innerWidth;
		const scaleEnd = windowAspectRatio >= this.#canvasAspectRatio
			? window.innerHeight / (window.innerWidth / this.#canvasAspectRatio)
			: 1;

		const oldWidthEnd = Math.min(
			window.innerWidth,
			window.innerHeight * this.#canvasAspectRatio
		);
		const oldHeightEnd = Math.min(
			window.innerHeight,
			window.innerWidth / this.#canvasAspectRatio
		);

		const oldLeftEnd = (window.innerWidth - oldWidthEnd) / 2;
		const oldTopEnd = (window.innerHeight - oldHeightEnd) / 2;

		// Position the center of the new canvas over the old one.
		const newTopStart = canvasRect.top - (window.innerHeight * scaleStart - canvasRect.height) / 2;
		const newLeftStart = canvasRect.left - (window.innerWidth * scaleStart - canvasRect.width) / 2;

		// Compute per-draggable keyframes that track the canvas transform.
		const aspectRatioChange = windowAspectRatio / this.#canvasAspectRatio;
		const fullscreenWorldWidth = Math.max(
			this.#worldWidth * aspectRatioChange, this.#worldWidth
		);
		const fullscreenWorldHeight = Math.max(
			this.#worldHeight / aspectRatioChange, this.#worldHeight
		);

		let draggableRules = "";

		for (const [id, data] of Object.entries(this.#draggables))
		{
			const [wx, wy] = data.location;
			const dx = window.innerWidth
				* ((wx - this.#worldCenterX) / fullscreenWorldWidth + 0.5);
			const dy = window.innerHeight
				* (1 - ((wy - this.#worldCenterY) / fullscreenWorldHeight + 0.5));

			const A = newLeftStart + dx * (scaleStart - 1);
			const B = newTopStart + dy * (scaleStart - 1);

			const name = `WILSON_draggable-${id}-${this.#salt}`;

			draggableRules += `
				@keyframes WILSON_draggable-${id}-enter-move-${this.#salt}
				{
					from { transform: translate(${A}px, ${B}px); }
					to { transform: translate(0px, 0px); }
				}
				::view-transition-group(${name}) { animation: none; }
				::view-transition-old(${name}) { animation: none; opacity: 0; }
				::view-transition-new(${name}) {
					animation-name: WILSON_draggable-${id}-enter-move-${this.#salt};
					animation-fill-mode: both;
				}
			`;
		}

		const temporaryStyle = /* css */`
			@keyframes WILSON_move-out
			{
				from
				{
					transform: translate(${this.#fullscreenCanvasRect.left}px, ${this.#fullscreenCanvasRect.top}px) scale(${scaleStart * scaleEnd});
					transform-origin: top left;
					opacity: 1;
				}

				to
				{
					transform: translate(${oldLeftEnd}px, ${oldTopEnd}px) scale(${scaleEnd});
					transform-origin: top left;
					opacity: 0;
				}
			}

			@keyframes WILSON_move-in
			{
				from
				{
					transform: translate(${newLeftStart}px, ${newTopStart}px) scale(${scaleStart});
					transform-origin: top left;
					opacity: 0;
				}

				to
				{
					transform: translate(0px, 0px) scale(1);
					transform-origin: top left;
					opacity: 1;
				}
			}

			::view-transition-group(WILSON_canvas-${this.#salt})
			{
				animation: none;
			}

			::view-transition-old(WILSON_canvas-${this.#salt})
			{
				animation-name: WILSON_move-out;
				animation-fill-mode: both;
				mix-blend-mode: plus-lighter;
			}

			::view-transition-new(WILSON_canvas-${this.#salt})
			{
				animation-name: WILSON_move-in;
				animation-fill-mode: both;
				mix-blend-mode: plus-lighter;
			}

			${draggableRules}
		`;

		const styleElement = document.createElement("style");
		styleElement.innerHTML = temporaryStyle;
		document.head.appendChild(styleElement);

		return styleElement;
	}

	async enterFullscreen()
	{
		await this.beforeSwitchFullscreen(true);

		const elements = [
			this.#fullscreenEnterFullscreenButton,
			this.#fullscreenExitFullscreenButton,
			this.#resetButton,
			this.canvas,
			...(Object.values(this.#draggables).map(draggable => draggable.element))
		];

		for (const element of elements)
		{
			if (element)
			{
				element.style.removeProperty("view-transition-name");
			}
		}

		// @ts-ignore
		if (document.startViewTransition)
		{
			const styleElement = this.#fullscreenFillScreen && this.animateFullscreen && !this.crossfadeFullscreen
				? this.#addEnterFullscreenFillScreenTransitionStyle()
				: null;

			if (!this.reduceMotion && !this.crossfadeFullscreen && this.animateFullscreen)
			{
				if (this.#fullscreenEnterFullscreenButton)
				{
					this.#fullscreenEnterFullscreenButton.style.setProperty(
						"view-transition-name",
						`WILSON_fullscreen-button-${this.#salt}`
					)
				}

				if (this.#fullscreenExitFullscreenButton)
				{
					this.#fullscreenExitFullscreenButton.style.setProperty(
						"view-transition-name",
						`WILSON_fullscreen-button-${this.#salt}`
					)
				}

				if (this.#resetButton)
				{
					this.#resetButton.style.setProperty(
						"view-transition-name",
						`WILSON_reset-button-${this.#salt}`
					)
				}
				
				this.canvas.style.setProperty("view-transition-name", `WILSON_canvas-${this.#salt}`);

				for (const [id, data] of Object.entries(this.#draggables))
				{
					data.element.style.setProperty("view-transition-name", `WILSON_draggable-${id}-${this.#salt}`);
				}
			}

			// For non-fill-screen mode, suppress the default crossfade on
			// draggable pseudo-elements to prevent an opacity dip in Safari.
			// In fill-screen mode, the fill-screen stylesheet already includes
			// per-draggable keyframe animations that track the canvas transform.
			let draggableStyleElement: HTMLStyleElement | null = null;

			if (!styleElement)
			{
				const draggableIds = Object.keys(this.#draggables);

				if (draggableIds.length > 0)
				{
					const rules = draggableIds.map(id =>
					{
						const name = `WILSON_draggable-${id}-${this.#salt}`;
						return `::view-transition-old(${name}),\n::view-transition-new(${name}) { animation: none; }`;
					}).join("\n");

					draggableStyleElement = document.createElement("style");
					draggableStyleElement.innerHTML = rules;
					document.head.appendChild(draggableStyleElement);
				}
			}

			if (this.animateFullscreen)
			{
				// @ts-ignore
				const transition = document.startViewTransition(() => this.#enterFullscreen());

				if (transition.finished !== undefined)
				{
					await transition.finished;

					styleElement?.remove();
					draggableStyleElement?.remove();
				}

				else
				{
					setTimeout(() =>
					{
						styleElement?.remove();
						draggableStyleElement?.remove();
					}, 1000);
				}
			}

			else
			{
				this.#enterFullscreen();
				draggableStyleElement?.remove();
			}
		}

		else
		{
			this.#enterFullscreen();
		}
	}



	#exitFullscreen(resetMetaThemeColor: boolean = true)
	{
		this.#currentlyFullscreen = false;
		this.currentlyFullscreen = this.#currentlyFullscreen;

		if (this.#fullscreenFillScreen)
		{
			this.#worldWidth = this.#nonFullscreenWorldWidth;
			this.worldWidth = this.#worldWidth;

			this.#worldHeight = this.#nonFullscreenWorldHeight;
			this.worldHeight = this.#worldHeight;
			
			this.#clampWorldCoordinates();
		}


		if (this.#metaThemeColorElement && resetMetaThemeColor)
		{
			if (!this.#oldMetaThemeColor)
			{
				this.#metaThemeColorElement.removeAttribute("content");
			}

			else if (this.#oldMetaThemeColor !== "#000000")
			{
				this.#metaThemeColorElement.setAttribute("content", this.#oldMetaThemeColor);
			}
		}

		this.#fullscreenContainerLocation.appendChild(this.#fullscreenContainer);

		this.canvas.classList.remove("WILSON_fullscreen");
		this.#canvasContainer.classList.remove("WILSON_fullscreen");
		this.#fullscreenContainer.classList.remove("WILSON_fullscreen");



		document.documentElement.style.userSelect = "auto";

		document.removeEventListener("gesturestart", this.#preventGestures);
		document.removeEventListener("gesturechange", this.#preventGestures);
		document.removeEventListener("gestureend", this.#preventGestures);

		
		if (this.#fullscreenFillScreen)
		{
			this.#fullscreenContainer.classList.remove("WILSON_fullscreen-fill-screen");

			if (this.#resizeCanvas({ width: this.#canvasOldWidth }))
			{
				this.#onResizeCanvasCallback();
			}
		}

		this.canvas.style.width = this.#canvasOldWidthStyle;
		this.canvas.style.height = this.#canvasOldHeightStyle;

		this.#onResizeWindow();
		this.#updateDraggablesContainerSize();
		this.onSwitchFullscreen(false);

		// When there are multiple Wilson instances on the same page,
		// one of them might incorrectly try to scroll back to 0.
		if (this.#fullscreenOldScroll && this.fullscreenRestoreScroll)
		{
			window.scrollTo(0, this.#fullscreenOldScroll);
			setTimeout(() => window.scrollTo(0, this.#fullscreenOldScroll), 10);
		}
	}

	#addExitFullscreenFillScreenTransitionStyle() 
	{
		// This one starts aligned to the shrunk canvas, so we have to undo the transforms
		// in weird ways.

		const oldLeftStart = -this.#fullscreenCanvasRect.left;
		const oldTopStart = -this.#fullscreenCanvasRect.top;

		const windowAspectRatio = window.innerWidth / window.innerHeight;
		const scaleStart = this.#fullscreenCanvasRect.width / window.innerWidth;
		const scaleEnd = windowAspectRatio >= this.#canvasAspectRatio
			? window.innerHeight / (window.innerWidth / this.#canvasAspectRatio)
			: 1;

		const oldWidthEnd = window.innerWidth * scaleStart / scaleEnd;
		const oldHeightEnd = window.innerHeight * scaleStart / scaleEnd;
		
		const oldLeftEnd = (this.#fullscreenCanvasRect.width - oldWidthEnd) / 2;
		const oldTopEnd = (this.#fullscreenCanvasRect.height - oldHeightEnd) / 2;


		const newWidthStart = Math.min(
			window.innerWidth,
			window.innerHeight * this.#canvasAspectRatio
		);
		const newHeightStart = Math.min(
			window.innerHeight,
			window.innerWidth / this.#canvasAspectRatio
		);

		const newLeftStart = (window.innerWidth - newWidthStart) / 2 - this.#fullscreenCanvasRect.left;
		const newTopStart = (window.innerHeight - newHeightStart) / 2 - this.#fullscreenCanvasRect.top;

		const S0 = scaleEnd / scaleStart;

		let draggableRules = "";

		for (const [id, data] of Object.entries(this.#draggables))
		{
			const [wx, wy] = data.location;
			const dx = this.#fullscreenCanvasRect.width
				* ((wx - this.#worldCenterX) / this.#nonFullscreenWorldWidth + 0.5);
			const dy = this.#fullscreenCanvasRect.height
				* (1 - ((wy - this.#worldCenterY) / this.#nonFullscreenWorldHeight + 0.5));

			const A = newLeftStart + dx * (S0 - 1);
			const B = newTopStart + dy * (S0 - 1);

			const name = `WILSON_draggable-${id}-${this.#salt}`;

			draggableRules += `
				@keyframes WILSON_draggable-${id}-move-${this.#salt}
				{
					from { transform: translate(${A}px, ${B}px); }
					to { transform: translate(0px, 0px); }
				}
				::view-transition-group(${name}) { animation: none; }
				::view-transition-old(${name}) { animation: none; opacity: 0; }
				::view-transition-new(${name}) {
					animation-name: WILSON_draggable-${id}-move-${this.#salt};
					animation-fill-mode: both;
				}
			`;
		}

		const temporaryStyle = /* css */`
			@keyframes WILSON_move-out-${this.#salt}
			{
				from
				{
					transform: translate(${oldLeftStart}px, ${oldTopStart}px) scale(${1 / scaleStart});
					transform-origin: top left;
					opacity: 1;
				}

				to
				{
					transform: translate(${oldLeftEnd}px, ${oldTopEnd}px) scale(${1 / scaleEnd});
					transform-origin: top left;
					opacity: 0;
				}
			}

			@keyframes WILSON_move-in-${this.#salt}
			{
				from
				{
					transform: translate(${newLeftStart}px, ${newTopStart}px) scale(${scaleEnd / scaleStart});
					transform-origin: top left;
					opacity: 0;
				}

				to
				{
					transform: translate(0px, 0px) scale(1);
					transform-origin: top left;
					opacity: 1;
				}
			}

			::view-transition-group(WILSON_canvas-${this.#salt})
			{
				animation: none;
			}

			::view-transition-old(WILSON_canvas-${this.#salt})
			{
				animation-name: WILSON_move-out-${this.#salt};
				animation-fill-mode: both;
				mix-blend-mode: plus-lighter;
			}

			::view-transition-new(WILSON_canvas-${this.#salt})
			{
				animation-name: WILSON_move-in-${this.#salt};
				animation-fill-mode: both;
				mix-blend-mode: plus-lighter;
			}

			${draggableRules}
		`;

		const styleElement = document.createElement("style");
		styleElement.innerHTML = temporaryStyle;
		document.head.appendChild(styleElement);

		return styleElement;
	}

	async exitFullscreen()
	{
		await this.beforeSwitchFullscreen(false);

		const elements = [
			this.#fullscreenEnterFullscreenButton,
			this.#fullscreenExitFullscreenButton,
			this.#resetButton,
			this.canvas,
			...(Object.values(this.#draggables).map(draggable => draggable.element))
		];

		for (const element of elements)
		{
			if (element)
			{
				element.style.removeProperty("view-transition-name");
			}
		}

		// @ts-ignore
		if (document.startViewTransition)
		{
			const styleElement = this.#fullscreenFillScreen && this.animateFullscreen && !this.crossfadeFullscreen
				? this.#addExitFullscreenFillScreenTransitionStyle()
				: null;

			if (
				!this.reduceMotion
				&& !this.crossfadeFullscreen
				&& this.animateFullscreen
				&& (
					!this.#fullscreenFillScreen
					|| (
						window.innerWidth == this.#fullscreenInitialWindowInnerWidth
						&& window.innerHeight == this.#fullscreenInitialWindowInnerHeight
					)
				)
			) {
				if (this.#fullscreenEnterFullscreenButton)
				{
					this.#fullscreenEnterFullscreenButton.style.setProperty(
						"view-transition-name",
						`WILSON_fullscreen-button-${this.#salt}`
					)
				}

				if (this.#fullscreenExitFullscreenButton)
				{
					this.#fullscreenExitFullscreenButton.style.setProperty(
						"view-transition-name",
						`WILSON_fullscreen-button-${this.#salt}`
					)
				}

				if (this.#resetButton)
				{
					this.#resetButton.style.setProperty(
						"view-transition-name",
						`WILSON_reset-button-${this.#salt}`
					)
				}
				
				this.canvas.style.setProperty("view-transition-name", `WILSON_canvas-${this.#salt}`);

				for (const [id, data] of Object.entries(this.#draggables))
				{
					data.element.style.setProperty("view-transition-name", `WILSON_draggable-${id}-${this.#salt}`);
				}
			}

			// For non-fill-screen mode, suppress the default crossfade on
			// draggable pseudo-elements to prevent an opacity dip in Safari.
			// In fill-screen mode, the fill-screen stylesheet already includes
			// per-draggable keyframe animations that track the canvas transform.
			let draggableStyleElement: HTMLStyleElement | null = null;

			if (!styleElement)
			{
				const draggableIds = Object.keys(this.#draggables);

				if (draggableIds.length > 0)
				{
					const rules = draggableIds.map(id =>
					{
						const name = `WILSON_draggable-${id}-${this.#salt}`;
						return `::view-transition-old(${name}),\n::view-transition-new(${name}) { animation: none; }`;
					}).join("\n");

					draggableStyleElement = document.createElement("style");
					draggableStyleElement.innerHTML = rules;
					document.head.appendChild(draggableStyleElement);
				}
			}

			if (this.animateFullscreen)
			{
				// @ts-ignore
				const transition = document.startViewTransition(() => this.#exitFullscreen());

				if (transition.finished !== undefined)
				{
					await transition.finished;

					styleElement?.remove();
					draggableStyleElement?.remove();
				}

				else
				{
					setTimeout(() =>
					{
						styleElement?.remove();
						draggableStyleElement?.remove();
					}, 1000);
				}
			}

			else
			{
				this.#exitFullscreen();
				draggableStyleElement?.remove();
			}
		}

		else
		{
			this.#exitFullscreen();
		}

		for (const element of elements)
		{
			if (element)
			{
				element.style.removeProperty("view-transition-name");
			}
		}
	}

	// Enters fullscreen state for the canvas (resizes buffer, updates world
	// coordinates) without managing its own fullscreen container. Used when
	// an external system (e.g. desmos fullscreen) handles the container.
	enterManagedFullscreen()
	{
		this.#externalFullscreenActive = true;
		this.#externalFullscreenOldFillScreen = this.#fullscreenFillScreen;
		this.#fullscreenFillScreen = true;

		this.#currentlyFullscreen = true;
		this.currentlyFullscreen = true;

		this.#canvasOldWidth = this.#canvasWidth;
		this.#canvasOldWidthStyle = this.canvas.style.width;
		this.#canvasOldHeightStyle = this.canvas.style.height;

		this.canvas.style.width = "100vw";
		this.canvas.style.height = "100%";

		const windowAspectRatio = window.innerWidth / window.innerHeight;
		const aspectRatioChange = windowAspectRatio / this.#canvasAspectRatio;

		this.#worldWidth = Math.max(this.#worldWidth * aspectRatioChange, this.#worldWidth);
		this.worldWidth = this.#worldWidth;

		this.#worldHeight = Math.max(this.#worldHeight / aspectRatioChange, this.#worldHeight);
		this.worldHeight = this.#worldHeight;

		this.#clampWorldCoordinates();

		this.#onResizeWindow();
		this.onSwitchFullscreen(true);
	}

	exitManagedFullscreen()
	{
		this.#externalFullscreenActive = false;
		this.#currentlyFullscreen = false;
		this.currentlyFullscreen = false;

		this.#worldWidth = this.#nonFullscreenWorldWidth;
		this.worldWidth = this.#worldWidth;

		this.#worldHeight = this.#nonFullscreenWorldHeight;
		this.worldHeight = this.#worldHeight;

		this.#clampWorldCoordinates();

		this.#fullscreenFillScreen = this.#externalFullscreenOldFillScreen;

		if (this.#resizeCanvas({ width: this.#canvasOldWidth }))
		{
			this.#onResizeCanvasCallback();
		}

		this.canvas.style.width = this.#canvasOldWidthStyle;
		this.canvas.style.height = this.#canvasOldHeightStyle;

		this.#onResizeWindow();
		this.onSwitchFullscreen(false);
	}

	#interpolatePageToWorld([row, col]: [number, number]): [number, number]
	{
		const rect = this.canvas.getBoundingClientRect();
		const computedStyle = window.getComputedStyle(this.canvas);
		const extraTop = parseFloat(computedStyle.paddingTop)
			+ parseFloat(computedStyle.borderTopWidth);
		const extraBottom = parseFloat(computedStyle.paddingBottom)
			+ parseFloat(computedStyle.borderBottomWidth);
		const extraLeft = parseFloat(computedStyle.paddingLeft)
			+ parseFloat(computedStyle.borderLeftWidth);
		const extraRight = parseFloat(computedStyle.paddingRight)
			+ parseFloat(computedStyle.borderRightWidth);

		const canvasPageWidth = rect.width - extraLeft - extraRight;
		const canvasPageHeight = rect.height - extraTop - extraBottom;

		const canvasRow = (row - rect.top - extraTop) * (this.canvasHeight / canvasPageHeight);
		const canvasCol = (col - rect.left - extraLeft) * (this.canvasWidth / canvasPageWidth);

		return this.interpolateCanvasToWorld([canvasRow, canvasCol]);
	}

	interpolateCanvasToWorld([row, col]: [number, number]): [number, number]
	{
		return [
			(col / this.#canvasWidth - .5) * this.#worldWidth
				+ this.#worldCenterX,
			(.5 - row / this.#canvasHeight) * this.#worldHeight
				+ this.#worldCenterY
		];
	}

	interpolateWorldToCanvas([x, y]: [number, number]): [number, number]
	{
		return [
			Math.floor((.5 - (y - this.#worldCenterY) / this.#worldHeight)
				* this.#canvasHeight),
			Math.floor(((x - this.#worldCenterX) / this.#worldWidth + .5)
				* this.#canvasWidth)
		];
	}
}



export type WilsonCPUOptions = WilsonOptions & {
	willReadFrequently?: boolean,
};

export class WilsonCPU extends Wilson
{
	ctx: CanvasRenderingContext2D;

	constructor(canvas: HTMLCanvasElement, options: WilsonCPUOptions)
	{
		super(canvas, options);

		const colorSpace = (this.useP3ColorSpace && matchMedia("(color-gamut: p3)").matches)
			? "display-p3"
			: "srgb";

		const willReadFrequently = options.willReadFrequently ?? false;

		const ctx = this.canvas.getContext("2d", {
			colorSpace,
			willReadFrequently,
		});

		if (!ctx)
		{
			throw new Error(`[Wilson] Could not get 2d context for canvas: ${ctx}`);
		}

		this.ctx = ctx;

		this.ctx = canvas.getContext("2d")!;
	}

	drawFrame(image: Uint8ClampedArray)
	{
		this.ctx.putImageData(
			new ImageData(
				// @ts-ignore
				image,
				this.canvasWidth,
				this.canvasHeight
			),
			0,
			0
		);
	}

	downloadFrame(filename: string)
	{
		this.canvas.toBlob((blob) =>
		{
			if (!blob)
			{
				if (this.verbose)
				{
					console.error(`[Wilson] Could not create a blob from a canvas with ID ${this.canvas.id}`);
				}

				return;
			}

			const link = document.createElement("a");

			link.download = filename;

			link.href = window.URL.createObjectURL(blob);

			link.click();

			link.remove();
		});
	}
}



type ShaderProgramId = string;
type UniformType = "int"
	| "float"
	| "vec2"
	| "vec3"
	| "vec4"
	| "intArray"
	| "floatArray"
	| "vec2Array"
	| "vec3Array"
	| "vec4Array"
	| "mat2"
	| "mat3"
	| "mat4";
type UniformValue = number | number[] | number[][] | Float32Array;
type UniformInitializers = {[name: string]: UniformValue};

const uniformFunctions: {[key in UniformType]: any} = {
	int: (
		gl: WebGLRenderingContext | WebGL2RenderingContext,
		location: WebGLUniformLocation,
		value: number
	) => gl.uniform1i(location, value),
	
	float: (
		gl: WebGLRenderingContext | WebGL2RenderingContext,
		location: WebGLUniformLocation,
		value: number
	) => gl.uniform1f(location, value),
	
	vec2: (
		gl: WebGLRenderingContext | WebGL2RenderingContext,
		location: WebGLUniformLocation,
		value: [number, number]
	) => gl.uniform2fv(location, value),

	vec3: (
		gl: WebGLRenderingContext | WebGL2RenderingContext,
		location: WebGLUniformLocation,
		value: [number, number, number]
	) => gl.uniform3fv(location, value),
	
	vec4: (
		gl: WebGLRenderingContext | WebGL2RenderingContext,
		location: WebGLUniformLocation,
		value: [number, number, number, number]
	) => gl.uniform4fv(location, value),

	intArray: (
		gl: WebGLRenderingContext | WebGL2RenderingContext,
		location: WebGLUniformLocation,
		value: number[]
	) => gl.uniform1iv(location, value),
	
	floatArray: (
		gl: WebGLRenderingContext | WebGL2RenderingContext,
		location: WebGLUniformLocation,
		value: number[]
	) => gl.uniform1fv(location, value),
	
	vec2Array: (
		gl: WebGLRenderingContext | WebGL2RenderingContext,
		location: WebGLUniformLocation,
		value: Float32Array | [number, number][]
	) => {
		return value instanceof Float32Array
			? gl.uniform2fv(location, value)
			: gl.uniform2fv(location, value.flat());
	},

	vec3Array: (
		gl: WebGLRenderingContext | WebGL2RenderingContext,
		location: WebGLUniformLocation,
		value: Float32Array | [number, number, number][]
	) => {
		return value instanceof Float32Array
			? gl.uniform3fv(location, value)
			: gl.uniform3fv(location, value.flat());
	},
	
	vec4Array: (
		gl: WebGLRenderingContext | WebGL2RenderingContext,
		location: WebGLUniformLocation,
		value: Float32Array | [number, number, number, number][]
	) => {
		return value instanceof Float32Array
			? gl.uniform4fv(location, value)
			: gl.uniform4fv(location, value.flat());
	},

	mat2: (
		gl: WebGLRenderingContext | WebGL2RenderingContext,
		location: WebGLUniformLocation,
		value: Float32Array | [[number, number], [number, number]]
	) => {
		return value instanceof Float32Array
			? gl.uniformMatrix2fv(location, false, value)
			: gl.uniformMatrix2fv(location, false, [value[0][0], value[1][0], value[0][1], value[1][1]]);
	},
	
	mat3: (
		gl: WebGLRenderingContext | WebGL2RenderingContext,
		location: WebGLUniformLocation,
		value: Float32Array | [[number, number, number], [number, number, number], [number, number, number]]
	) => {
		return value instanceof Float32Array
			? gl.uniformMatrix3fv(location, false, value)
			: gl.uniformMatrix3fv(location, false, [value[0][0], value[1][0], value[2][0], value[0][1], value[1][1], value[2][1], value[0][2], value[1][2], value[2][2]]);
	},
	
	mat4: (
		gl: WebGLRenderingContext | WebGL2RenderingContext,
		location: WebGLUniformLocation,
		value: Float32Array | [[number, number, number, number], [number, number, number, number], [number, number, number, number], [number, number, number, number]]
	) => {
		return value instanceof Float32Array
			? gl.uniformMatrix4fv(location, false, value)
			: gl.uniformMatrix4fv(location, false, [value[0][0], value[1][0], value[2][0], value[3][0], value[0][1], value[1][1], value[2][1], value[3][1], value[0][2], value[1][2], value[2][2], value[3][2], value[0][3], value[1][3], value[2][3], value[3][3]]);
	},
};

type ReadPixelsOptions = {
	row: number,
	col: number,
	height: number,
	width: number,
	format: "unsignedByte" | "float",
}

type SingleShader = {
	shader: string,
	uniforms?: UniformInitializers
};

type MultipleShaders = {
	shaders: {[id: ShaderProgramId]: string},
	uniforms?: {[id: ShaderProgramId]: UniformInitializers},
};

const XR_MODE = "immersive-vr";
const REFERENCE_SPACE = "local";

type WilsonGPUXRData = {
	session: XRSession,
	refSpace: XRReferenceSpace,
	baseLayer: XRWebGLLayer,
};

export type RenderXRFrame = (data: {
	view: XRView,
	projectionMatrix: Float32Array,
	cameraToWorld: Float32Array,
	eye: XREye,
	viewIndex: number,
	numViews: number,
	viewport: XRViewport,
	time: number,
	deltaTime: number,
	frame: XRFrame,
	refSpace: XRReferenceSpace,
	position: DOMPointReadOnly,
	emulatedPosition: boolean,
	session: XRSession,
	pose: XRViewerPose,
}) => void;

export type OnXRFrameStart = (data: {
	time: number,
	deltaTime: number,
	frame: XRFrame,
	session: XRSession,
	refSpace: XRReferenceSpace,
	pose: XRViewerPose,
}) => void;



// The xr-standard mapping, in order. Anything past index 5 is device-specific and lands in
// `extraButtons` instead (the Quest's thumbrest, for instance). The system/menu button is
// reserved by the runtime and is never exposed here at all.
const XR_BUTTON_NAMES = ["trigger", "squeeze", "touchpad", "thumbstick", "a", "b"] as const;

export type XRButtonName = (typeof XR_BUTTON_NAMES)[number];

export type XRButtonState = {
	pressed: boolean,
	touched: boolean,
	value: number,
	// True only on the frame the button changed, so applets can poll for edges rather than
	// tracking them by hand.
	justPressed: boolean,
	justReleased: boolean,
};

// The matrix is a persistent buffer that's overwritten every frame, so that posing controllers
// doesn't allocate on the hot path. Copy it if it needs to outlive the frame.
export type XRControllerPose = {
	matrix: Float32Array,
	position: DOMPointReadOnly,
	orientation: DOMPointReadOnly,
	linearVelocity: DOMPointReadOnly | undefined,
	angularVelocity: DOMPointReadOnly | undefined,
	emulatedPosition: boolean,
};

export type XRHandJoints = {
	[joint in XRHandJoint]?: {
		matrix: Float32Array,
		position: DOMPointReadOnly,
		orientation: DOMPointReadOnly,
		radius: number | undefined,
	}
};

export type WilsonXRController = {
	inputSource: XRInputSource,
	handedness: XRHandedness,
	targetRayMode: XRTargetRayMode,
	profiles: readonly string[],
	// "xr-standard" on anything that follows the standard layout. Empty on devices that don't,
	// in which case the named buttons below are a best-effort positional guess.
	mapping: GamepadMappingType,

	// Null on frames where the device isn't tracked. Buttons keep working when this happens,
	// since a controller that's momentarily out of view is still being pressed.
	targetRay: XRControllerPose | null,
	grip: XRControllerPose | null,

	buttons: {[name in XRButtonName]: XRButtonState},
	extraButtons: XRButtonState[],

	// Y is negated from the raw axis value, so that +y is forward/up.
	thumbstick: [number, number],
	touchpad: [number, number],
	// The raw, unmodified axis values.
	axes: readonly number[],

	// Driven by the session's own events rather than by polling, so these are also set for
	// input sources with no gamepad at all, like hands and gaze.
	selecting: boolean,
	squeezing: boolean,

	hand: XRHandJoints | null,

	pulse: (intensity: number, duration: number) => Promise<boolean>,
};

export type OnXRControllerChange = (data: {
	controller: WilsonXRController,
	controllers: WilsonXRController[],
	session: XRSession,
}) => void;

export type OnXRInputSourceEvent = (data: {
	controller: WilsonXRController,
	inputSource: XRInputSource,
	// Resolved from the event's own frame, so these are the poses at the moment of the action
	// rather than at the last rendered frame.
	targetRay: XRControllerPose | null,
	grip: XRControllerPose | null,
	frame: XRFrame,
	refSpace: XRReferenceSpace,
	session: XRSession,
}) => void;

export type OnXRButtonEvent = (data: {
	controller: WilsonXRController,
	// Null for device-specific buttons past the end of the xr-standard mapping.
	name: XRButtonName | null,
	index: number,
	state: XRButtonState,
	time: number,
	frame: XRFrame,
	refSpace: XRReferenceSpace,
	session: XRSession,
}) => void;

// The public controller object, plus the persistent buffers backing it. The pose objects are
// held here rather than on the controller so that losing tracking can null out the controller's
// fields without throwing away their matrices.
type WilsonXRControllerData = {
	controller: WilsonXRController,
	targetRayPose: XRControllerPose,
	gripPose: XRControllerPose,
	handJoints: XRHandJoints,
	warnedAboutMapping: boolean,
};

function createXRButtonState(): XRButtonState
{
	return {
		pressed: false,
		touched: false,
		value: 0,
		justPressed: false,
		justReleased: false,
	};
}

function createXRControllerPose(): XRControllerPose
{
	return {
		matrix: new Float32Array(16),
		position: new DOMPointReadOnly(0, 0, 0, 1),
		orientation: new DOMPointReadOnly(0, 0, 0, 1),
		linearVelocity: undefined,
		angularVelocity: undefined,
		emulatedPosition: false,
	};
}

type XRButtonOptions = {
	useXRButton?: true,
	xrButtonIconPath?: string,
} | {
	useXRButton?: false,
};

type WilsonGPUXROptions = { useXR?: false } | ({
	useXR: true,

	renderXRFrame: RenderXRFrame,

	onEnterXR?: () => void,
	onExitXR?: () => void,
	onXRFrameStart?: OnXRFrameStart,
	onXRVisibilityChange?: (state: XRVisibilityState) => void,
	onXRFrameRateChange?: (frameRate: number | undefined) => void,

	onXRControllerConnect?: OnXRControllerChange,
	onXRControllerDisconnect?: OnXRControllerChange,

	onXRSelectStart?: OnXRInputSourceEvent,
	onXRSelect?: OnXRInputSourceEvent,
	onXRSelectEnd?: OnXRInputSourceEvent,
	
	onXRSqueezeStart?: OnXRInputSourceEvent,
	onXRSqueeze?: OnXRInputSourceEvent,
	onXRSqueezeEnd?: OnXRInputSourceEvent,

	onXRButtonDown?: OnXRButtonEvent,
	onXRButtonUp?: OnXRButtonEvent,

	useXRHandTracking?: boolean,

	xrRequiredFeatures?: string[],
	xrOptionalFeatures?: string[],
	xrDepthNear?: number,
	xrDepthFar?: number,

	xrFramebufferScaleFactor?: number;

	xrViewportScale?: number | null; // null uses the device's own recommended value.

	xrFixedFoveation?: number;

	xrTargetFrameRate?: number;
} & XRButtonOptions);

export type WilsonGPUOptions = WilsonOptions
	& (SingleShader | MultipleShaders)
	& { useWebGL2?: boolean }
	& WilsonGPUXROptions

export class WilsonGPU extends Wilson
{
	gl: WebGLRenderingContext | WebGL2RenderingContext;

	#useWebGL2: boolean;

	#shaderPrograms: {[id: ShaderProgramId]: WebGLProgram} = {};

	#shaderProgramSources: {[id: ShaderProgramId]: string} = {};

	#uniforms: {
		[id: ShaderProgramId]: {
			[name: string]: {
				location: WebGLUniformLocation,
				type: UniformType,
				value?: UniformValue
			}
		}
	} = {};


	
	#useXR: boolean;

	#useXRButton: boolean = false;
	#xrButtonIconPath?: string;
	#xrButton: HTMLElement | null = null;

	xrIsSupported: Promise<boolean> = Promise.resolve(false);
	#xrIsSupportedNow: boolean | null = null; // Resolves to a boolean once known.

	#renderXRFrame: RenderXRFrame = () => {};

	// The single source of truth about the base layer; if that ever gets changed,
	// this needs to reflect it.
	#xrData?: WilsonGPUXRData;

	#xrRequiredFeatures: string[] = [];
	#xrOptionalFeatures: string[] = [];
	#xrDepthNear: number = 0.1;
	#xrDepthFar: number = 1000;

	#xrFramebufferScaleFactor: number = 1;

	#xrViewportScale: number | null = null;
	#lastAppliedXRViewportScales: number[] = [];

	get xrViewportScale() { return this.#xrViewportScale; }
	set xrViewportScale(value: number | null)
	{
		if (value !== null && (value <= 0 || value > 1) && this.verbose)
		{
			console.warn("[Wilson] Setting xrViewportScale outside of (0, 1] has no effect.");
		}

		this.#xrViewportScale = value;
	}

	#xrTargetFrameRate: number | undefined;

	get xrSupportedFrameRates() { return this.#xrData?.session.supportedFrameRates; }
	get xrFrameRate() { return this.#xrData?.session.frameRate; }

	get xrTargetFrameRate() { return this.#xrTargetFrameRate; }

	set xrTargetFrameRate(value: number | undefined)
	{
		this.#xrTargetFrameRate = value;
		this.#applyXRTargetFrameRate();
	}

	#lastXRTime: number | undefined = undefined;

	get inXR() { return this.#xrData !== undefined; }
	#enteringXR: boolean = false;

	get xrFramebufferWidth() { return this.#xrData?.baseLayer.framebufferWidth; }
	get xrFramebufferHeight() { return this.#xrData?.baseLayer.framebufferHeight; }
	
	#xrFixedFoveation: number | undefined;

	get xrFixedFoveation()
	{
		// When in an XR session, return the actual foveation value; it may be undefined if
		// the headset doesn't support it. Outside a session, the base layer doesn't exist,
		// so return the value that was passed in, if any.
		if (this.#xrData)
		{
			// WebXR declares fixedFoveation as nullable, but the WebXR type is number | undefined,
			// so this normalizes null away.
			return this.#xrData.baseLayer.fixedFoveation ?? undefined;
		}

		return this.#xrFixedFoveation;
	}

	set xrFixedFoveation(value: number | undefined)
	{
		this.#xrFixedFoveation = value;

		const baseLayer = this.#xrData?.baseLayer;

		if (baseLayer)
		{
			baseLayer.fixedFoveation = value;
		}
	}

	#xrCallbacks: {
		onEnter: () => void,
		onExit: () => void,
		onFrameStart: OnXRFrameStart,
		onVisibilityChange: (state: XRVisibilityState) => void,
		onFrameRateChange: (frameRate: number | undefined) => void,
		onControllerConnect: OnXRControllerChange,
		onControllerDisconnect: OnXRControllerChange,
		onSelectStart: OnXRInputSourceEvent,
		onSelect: OnXRInputSourceEvent,
		onSelectEnd: OnXRInputSourceEvent,
		onSqueezeStart: OnXRInputSourceEvent,
		onSqueeze: OnXRInputSourceEvent,
		onSqueezeEnd: OnXRInputSourceEvent,
		onButtonDown: OnXRButtonEvent,
		onButtonUp: OnXRButtonEvent,
	} = {
		onEnter: () => {},
		onExit: () => {},
		onFrameStart: () => {},
		onVisibilityChange: () => {},
		onFrameRateChange: () => {},
		onControllerConnect: () => {},
		onControllerDisconnect: () => {},
		onSelectStart: () => {},
		onSelect: () => {},
		onSelectEnd: () => {},
		onSqueezeStart: () => {},
		onSqueeze: () => {},
		onSqueezeEnd: () => {},
		onButtonDown: () => {},
		onButtonUp: () => {}
	};

	#useXRHandTracking: boolean = false;

	// Keyed on the XRInputSource, whose object identity is stable for as long as the device
	// stays connected.
	#xrControllerData: Map<XRInputSource, WilsonXRControllerData> = new Map();

	// Rebuilt whenever the set of input sources changes, so that applets can hold onto it for
	// the duration of a frame without it being reallocated underneath them.
	#xrControllerList: WilsonXRController[] = [];

	get xrControllers(): WilsonXRController[] { return this.#xrControllerList; }

	getXRController(handedness: XRHandedness): WilsonXRController | undefined
	{
		return this.#xrControllerList.find(controller => controller.handedness === handedness);
	}

	// Used to restore the eye viewport correctly when switching back to the
	// headset's framebuffer.
	#xrViewport: XRViewport | null = null;



	#logShaderSource(source: string, infoLog: string)
	{
		const match = infoLog.match(/\b0:(\d+)/);

		if (!match)
		{
			console.log(source);
			return;
		}

		const errorLine = parseInt(match[1]);
		const lines = source.split("\n");
		
		const numContextLines = 4;

		const start = Math.max(0, errorLine - numContextLines - 1);
		const end = Math.min(lines.length, errorLine + numContextLines);

		const normalStyle = "";
		const errorStyle = "color: red; font-weight: bold";

		const parts: string[] = [];
		const styles: string[] = [];

		for (let i = start; i < end; i++)
		{
			const lineNum = String(i + 1).padStart(4);
			parts.push(`%c${lineNum} | ${lines[i]}`);
			styles.push(i + 1 === errorLine ? errorStyle : normalStyle);
		}

		console.log(parts.join("\n"), ...styles);
	}

	constructor(canvas: HTMLCanvasElement, options: WilsonGPUOptions)
	{
		super(canvas, options);

		this.#useWebGL2 = options.useWebGL2 ?? true;

		this.#useXR = options.useXR ?? false;

		if (options.useXR)
		{
			this.#useXRButton = options.useXRButton ?? false;
			this.#xrButtonIconPath = options.useXRButton ? options.xrButtonIconPath : undefined;
			this.#initXRButton();

			this.#checkXRSupport();

			navigator.xr?.addEventListener("devicechange", this.#onDeviceChange);

			this.#renderXRFrame = options.renderXRFrame;

			this.#xrCallbacks = {
				onEnter: options.onEnterXR ?? (() => {}),
				onExit: options.onExitXR ?? (() => {}),
				onFrameStart: options.onXRFrameStart ?? (() => {}),
				onVisibilityChange: options.onXRVisibilityChange ?? (() => {}),
				onFrameRateChange: options.onXRFrameRateChange ?? (() => {}),
				onControllerConnect: options.onXRControllerConnect ?? (() => {}),
				onControllerDisconnect: options.onXRControllerDisconnect ?? (() => {}),
				onSelectStart: options.onXRSelectStart ?? (() => {}),
				onSelect: options.onXRSelect ?? (() => {}),
				onSelectEnd: options.onXRSelectEnd ?? (() => {}),
				onSqueezeStart: options.onXRSqueezeStart ?? (() => {}),
				onSqueeze: options.onXRSqueeze ?? (() => {}),
				onSqueezeEnd: options.onXRSqueezeEnd ?? (() => {}),
				onButtonDown: options.onXRButtonDown ?? (() => {}),
				onButtonUp: options.onXRButtonUp ?? (() => {})
			};

			this.#xrRequiredFeatures = options.xrRequiredFeatures ?? [];
			this.#xrOptionalFeatures = options.xrOptionalFeatures ?? [];

			this.#useXRHandTracking = options.useXRHandTracking ?? false;

			// Hand tracking only produces input sources with a `hand` if the session was asked
			// for it. Optional rather than required, so that a headset without it can still
			// start a session.
			if (
				this.#useXRHandTracking
				&& !this.#xrRequiredFeatures.includes("hand-tracking")
				&& !this.#xrOptionalFeatures.includes("hand-tracking"))
			{
				this.#xrOptionalFeatures = [...this.#xrOptionalFeatures, "hand-tracking"];
			}

			this.#xrDepthNear = options.xrDepthNear ?? 0.1;
			this.#xrDepthFar = options.xrDepthFar ?? 1000;

			this.#xrFramebufferScaleFactor = options.xrFramebufferScaleFactor ?? 1;

			this.#xrViewportScale = options.xrViewportScale ?? null;

			// Foveated rendering defaults to on.
			this.#xrFixedFoveation = options.xrFixedFoveation ?? 0.3;

			this.#xrTargetFrameRate = options.xrTargetFrameRate;
		}

		const getContextOptions: WebGLContextAttributes = {
			xrCompatible: this.#useXR,
			powerPreference: "high-performance",
			antialias: false,
			depth: false,
			stencil: false,
		};

		const gl = this.#useWebGL2
			? canvas.getContext("webgl2", getContextOptions) ?? canvas.getContext("webgl", getContextOptions)
			: canvas.getContext("webgl", getContextOptions);

		if (!gl)
		{
			throw new Error("[Wilson] Failed to get WebGL or WebGL2 context.");
		}

		this.gl = gl;

		this.gl.getExtension("KHR_parallel_shader_compile");

		if (
			this.gl instanceof WebGL2RenderingContext
			&& !this.gl.getExtension("EXT_color_buffer_float")
			&& this.verbose
		) {
			console.warn("[Wilson] No support for float textures.");
		}

		else if (
			this.gl instanceof WebGLRenderingContext
			&& !this.gl.getExtension("OES_texture_float")
			&& this.verbose
		) {
			console.warn("[Wilson] No support for float textures.");
		}

		if ("drawingBufferColorSpace" in this.gl && this.useP3ColorSpace)
		{
			this.gl.drawingBufferColorSpace = "display-p3";
		}



		if ("shader" in options)
		{
			this.loadShader({
				shader: options.shader,
				uniforms: options.uniforms,
			});
		}

		else if ("shaders" in options)
		{
			for (const [id, shader] of Object.entries(options.shaders))
			{
				this.loadShader({
					id,
					shader,
					uniforms: options.uniforms?.[id],
				});
			}
		}

		else
		{
			throw new Error("[Wilson] Must provide either a single shader or multiple shaders.");
		}
	}

	#checkXRSupport()
	{
		this.#xrIsSupportedNow = null;

		this.xrIsSupported = (
			navigator.xr
				? navigator.xr.isSessionSupported(XR_MODE)
				: Promise.resolve(false)
		)
			.catch(() => false)
			.then(supported =>
			{
				this.#xrIsSupportedNow = supported;

				if (this.#xrButton)
				{
					this.#xrButton.style.display = supported ? "block" : "none";
				}

				return supported;
			});

		return this.xrIsSupported;
	}

	// Needs to be an arrow function to maintain its binding when passed to addEventListener
	#onDeviceChange = () =>
	{
		this.#checkXRSupport();
	};

	#initXRButton()
	{
		if (this.#useXRButton)
		{
			this.#xrButton = document.createElement("div");
			this.#xrButton.classList.add("WILSON_xr-button");
			this.#xrButton.classList.add("WILSON_button");

			// If #xrIsSupportedNow is a boolean already, this will correctly set the style.
			// If it's still null, it will keep it hidden until #checkXRSupport finishes.
			this.#xrButton.style.display = this.#xrIsSupportedNow ? "block" : "none";

			this.buttonContainer.appendChild(this.#xrButton);

			const img = document.createElement("img");
			img.src = this.#xrButtonIconPath as string;
			this.#xrButton.appendChild(img);

			this.#xrButton.addEventListener("click", () => this.enterXR());
		}
	}



	drawFrame()
	{
		this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
	}

	#numShaders = 0;
	#currentShaderId: ShaderProgramId = "0";
	#currentProgram: WebGLProgram | null = null;

	loadShader({
		id = this.#numShaders.toString(),
		shader,
		uniforms = {}
	}: {
		id?: ShaderProgramId,
		shader: string,
		uniforms?: UniformInitializers
	}) {
		const vertexShaderSource = /* glsl*/`
			attribute vec3 position;
			varying vec2 uv;

			void main(void)
			{
				gl_Position = vec4(position, 1.0);

				//Interpolate quad coordinates in the fragment shader.
				uv = position.xy;
			}
		`;

		const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
		const fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);

		if (!vertexShader || !fragShader)
		{
			throw new Error(`[Wilson] Couldn't create shader: ${vertexShader}, ${fragShader}`);
		}

		this.#shaders.push(vertexShader, fragShader);

		const shaderProgram = this.gl.createProgram();

		if (!shaderProgram)
		{
			throw new Error(`[Wilson] Couldn't create shader program. Full shader source: ${shader}`);
		}

		this.#shaderPrograms[id] = shaderProgram;
		this.#shaderProgramSources[id] = shader;
		this.#numShaders++;

		this.gl.attachShader(this.#shaderPrograms[id], vertexShader);
		this.gl.attachShader(this.#shaderPrograms[id], fragShader);

		this.gl.shaderSource(vertexShader, vertexShaderSource);
		this.gl.shaderSource(fragShader, shader);

		this.gl.compileShader(vertexShader);
		this.gl.compileShader(fragShader);

		if (!this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS))
		{
			const infoLog = this.gl.getShaderInfoLog(vertexShader) ?? "";
			this.#logShaderSource(vertexShaderSource, infoLog);

			console.groupCollapsed(`[Wilson] Full non-compiled vertex shader source:`);
			console.log(shader);
			console.groupEnd();

			throw new Error(`[Wilson] Couldn't compile vertex shader with id ${id}. ${infoLog}`);
		}

		if (!this.gl.getShaderParameter(fragShader, this.gl.COMPILE_STATUS))
		{
			const infoLog = this.gl.getShaderInfoLog(fragShader) ?? "";
			this.#logShaderSource(shader, infoLog);

			console.groupCollapsed(`[Wilson] Full non-compiled fragment shader source:`);
			console.log(shader);
			console.groupEnd();

			throw new Error(`[Wilson] Couldn't compile fragment shader with id ${id}. ${infoLog}`);
		}

		this.gl.linkProgram(this.#shaderPrograms[id]);

		if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS))
		{
			throw new Error(`[Wilson] Couldn't link shader program with id ${id}: ${this.gl.getProgramInfoLog(shaderProgram)}`);
		}

		this.useShader(id);

		const positionBuffer = this.gl.createBuffer();

		if (!positionBuffer)
		{
			throw new Error(`[Wilson] Couldn't create position buffer with id ${id}.`);
		}

		this.#positionBuffers.push(positionBuffer);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

		const quad = [
			-1, -1, 0,
			-1,  1, 0,
			 1, -1, 0,
			 1,  1, 0
		];
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(quad), this.gl.STATIC_DRAW);

		const positionAttribute = this.gl.getAttribLocation(this.#shaderPrograms[id], "position");

		if (positionAttribute === -1)
		{
			console.groupCollapsed(`[Wilson] Full non-compiled fragment shader source:`);
			console.log(shader);
			console.groupEnd();
			
			throw new Error(`[Wilson] Couldn't get position attribute for shader with id ${id}.`);
		}

		this.gl.enableVertexAttribArray(positionAttribute);
		this.gl.vertexAttribPointer(positionAttribute, 3, this.gl.FLOAT, false, 0, 0);
		this.gl.viewport(0, 0, this.canvasWidth, this.canvasHeight);



		// Initialize the uniforms.
		this.#uniforms[id] = {};

		for (const [name, value] of Object.entries(uniforms))
		{
			const location = this.gl.getUniformLocation(this.#shaderPrograms[id], name);

			if (location === null)
			{
				if (this.verbose)
				{
					console.warn(`[Wilson] Couldn't get uniform location for ${name} in shader with id ${id}. Check that it is used in the shader (so that it is not compiled away).`);
				}

				continue;
			}

			// Match strings like "uniform int foo;" to "int".
			const match = shader.match(
				new RegExp(`uniform\\s+(\\S+?)\\s+${name}(\\[\\d+\\])?\\s*;`)
			);
			if (!match)
			{
				console.groupCollapsed(`[Wilson] Full non-compiled fragment shader source:`);
				console.log(shader);
				console.groupEnd();
				
				throw new Error(`[Wilson] Couldn't find uniform ${name} in shader with id ${id}.`);
			}
			
			const type = match[1].trim() + (match[2] ? "Array" : "");

			if (!(type in uniformFunctions))
			{
				console.groupCollapsed(`[Wilson] Full non-compiled fragment shader source:`);
				console.log(shader);
				console.groupEnd();
				
				throw new Error(`[Wilson] Invalid uniform type ${type} for uniform ${name} in shader with id ${id}.`);
			}

			this.#uniforms[id][name] = { location, type: type as UniformType };
			this.setUniforms({ [name]: value });
		}
	}

	setUniform(name: string, value: UniformValue, shader: ShaderProgramId = this.#currentShaderId)
	{
		this.#useProgram(this.#shaderPrograms[shader]);
		
		if (this.#uniforms[shader][name] !== undefined)
		{
			const { location, type } = this.#uniforms[shader][name];
			const uniformFunction = uniformFunctions[type];
			this.#uniforms[shader][name].value = value;
			uniformFunction(this.gl, location, value);
		}
		
		this.#useProgram(this.#shaderPrograms[this.#currentShaderId]);
	}

	setUniforms(uniforms: UniformInitializers, shader: ShaderProgramId = this.#currentShaderId)
	{
		this.#useProgram(this.#shaderPrograms[shader]);
		
		for (const [name, value] of Object.entries(uniforms))
		{
			if (this.#uniforms[shader][name] === undefined)
			{
				continue;
			}
			
			const { location, type } = this.#uniforms[shader][name];
			const uniformFunction = uniformFunctions[type];
			this.#uniforms[shader][name].value = value;
			uniformFunction(this.gl, location, value);
		}
		
		this.#useProgram(this.#shaderPrograms[this.#currentShaderId]);
	}

	useShader(id: ShaderProgramId)
	{
		this.#currentShaderId = id;
		this.#useProgram(this.#shaderPrograms[id]);
	}

	#useProgram(program: WebGLProgram)
	{
		if (program === this.#currentProgram)
		{
			return;
		}

		this.#currentProgram = program;
		this.gl.useProgram(program);
	}

	

	#framebuffers: {[id: string]: WebGLFramebuffer} = {};
	#textures: {
		[id: string]: {
			texture: WebGLTexture,
			width: number,
			height: number,
			type: "unsignedByte" | "float"
		}
	} = {};

	#currentFramebufferId: string | null = null;
	#currentTextureId: string | null = null;

	#positionBuffers: WebGLBuffer[] = [];
	#shaders: WebGLShader[] = [];

	createFramebufferTexturePair({
		id,
		width,
		height,
		textureType
	}: {
		id: string,
		width?: number,
		height?: number,
		textureType: "unsignedByte" | "float"
	}) {
		const currentFramebufferId = this.#currentFramebufferId;
		const currentTextureId = this.#currentTextureId;
		
		// Delete any existing pair with this ID so they don't leak.
		this.deleteFramebufferTexturePair(id);

		// Set default width and height.
		if (this.#useXR && this.inXR)
		{
			width ??= this.xrFramebufferWidth;
			height ??= this.xrFramebufferHeight;

			if (width === undefined || height === undefined)
			{
				throw new Error("[Wilson] Cannot get XR framebuffer size.")
			}
		}

		else
		{
			width ??= this.canvasWidth;
			height ??= this.canvasHeight;
		}



		if (textureType !== "unsignedByte" && textureType !== "float")
		{
			throw new Error(`[Wilson] Invalid texture type "${textureType}".`);
		}
		
		const framebuffer = this.gl.createFramebuffer();

		if (!framebuffer)
		{
			throw new Error(`[Wilson] Couldn't create a framebuffer with id ${id}.`);
		}

		const texture = this.gl.createTexture();

		if (!texture)
		{
			throw new Error(`[Wilson] Couldn't create a texture with id ${id}.`);
		}



		this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
		this.#currentTextureId = id;

		this.gl.texImage2D(
			this.gl.TEXTURE_2D,
			0,
			(textureType === "float" && this.gl instanceof WebGL2RenderingContext)
				? this.gl.RGBA32F
				: this.gl.RGBA,
			width,
			height,
			0,
			this.gl.RGBA,
			textureType === "float"
				? this.gl.FLOAT
				: this.gl.UNSIGNED_BYTE,
			null
		);

		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);

		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, framebuffer);
		this.#currentFramebufferId = id;

		this.gl.framebufferTexture2D(
			this.gl.FRAMEBUFFER,
			this.gl.COLOR_ATTACHMENT0,
			this.gl.TEXTURE_2D,
			texture,
			0
		);

		this.#framebuffers[id] = framebuffer;
		this.#textures[id] = {
			texture,
			width,
			height,
			type: textureType,
		};

		this.useFramebuffer(currentFramebufferId);
		this.useTexture(currentTextureId);
	}

	deleteFramebufferTexturePair(id: string)
	{
		if (this.#framebuffers[id])
		{
			// Deleting a bound framebuffer makes WebGL revert the binding to the default one,
			// so the cached ID has to follow.
			if (this.#currentFramebufferId === id)
			{
				this.#currentFramebufferId = null;
			}

			this.gl.deleteFramebuffer(this.#framebuffers[id]);
			delete this.#framebuffers[id];
		}

		if (this.#textures[id])
		{
			// Likewise, deleting a bound texture reverts the binding to null.
			if (this.#currentTextureId === id)
			{
				this.#currentTextureId = null;
			}

			this.gl.deleteTexture(this.#textures[id].texture);
			delete this.#textures[id];
		}
	}

	useFramebuffer(id: string | null)
	{
		if (id === this.#currentFramebufferId)
		{
			return;
		}

		if (id !== null && !this.#framebuffers[id])
		{
			throw new Error(`[Wilson] No framebuffer with ID ${id}.`);
		}

		this.#currentFramebufferId = id;

		if (id === null)
		{
			if (this.#xrData)
			{
				this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.#xrData.baseLayer.framebuffer);

				if (this.#xrViewport)
				{
					const { x, y, width, height } = this.#xrViewport;
					this.gl.viewport(x, y, width, height);
				}

				return;
			}

			this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
			return;
		}

		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.#framebuffers[id]);
	}

	useTexture(id: string | null)
	{
		if (id === this.#currentTextureId)
		{
			return;
		}

		if (id !== null && !this.#textures[id])
		{
			throw new Error(`[Wilson] No texture with ID ${id}.`);
		}
		
		this.#currentTextureId = id;
		
		if (id === null)
		{
			this.gl.bindTexture(this.gl.TEXTURE_2D, null);
			return;
		}

		this.gl.bindTexture(this.gl.TEXTURE_2D, this.#textures[id].texture);
	}

	setTexture({
		id,
		data,
	}: {
		id: string,
		data: Uint8Array | Float32Array | TexImageSource | null
	}) {
		if (!this.#textures[id])
		{
			throw new Error(`[Wilson] Tried to set a texture with id ${id}, but it doesn't exist.`);
		}

		if (
			(data instanceof Uint8Array && this.#textures[id].type !== "unsignedByte")
			|| (data instanceof Float32Array && this.#textures[id].type !== "float")
		) {
			throw new Error(`[Wilson] Tried to set a texture with id ${id}, but the data type does not match the texture type (the data type should be a ${this.#textures[id].type === 'unsignedByte' ? 'Uint8Array' : 'Float32Array'}).`);
		}

		const oldId = this.#currentTextureId;

		this.useTexture(id);

		if (data === null || data instanceof Uint8Array || data instanceof Float32Array)
		{
			this.gl.texImage2D(
				this.gl.TEXTURE_2D,
				0,
				(this.#textures[id].type === "float" && this.gl instanceof WebGL2RenderingContext)
					? this.gl.RGBA32F
					: this.gl.RGBA,
				this.#textures[id].width,
				this.#textures[id].height,
				0,
				this.gl.RGBA,
				this.#textures[id].type === "float"
					? this.gl.FLOAT
					: this.gl.UNSIGNED_BYTE,
				data
			);
		}

		else
		{
			this.gl.texImage2D(
				this.gl.TEXTURE_2D,
				0,
				this.gl.RGBA,
				this.gl.RGBA,
				this.gl.UNSIGNED_BYTE,
				data
			);
		}

		this.useTexture(oldId);
	}

	readPixels(options: ReadPixelsOptions)
	{
		const defaultOptions: ReadPixelsOptions = {
			row: 0,
			col: 0,
			height: this.canvasHeight,
			width: this.canvasWidth,
			format: "unsignedByte",
		};

		const { row, col, height, width, format } = { ...defaultOptions, ...(options ?? {}) };

		const pixels = format === "float"
			? new Float32Array(width * height * 4)
			: new Uint8Array(width * height * 4);

		this.gl.readPixels(
			col,
			row,
			width,
			height,
			this.gl.RGBA,
			format === "float"
				? this.gl.FLOAT
				: this.gl.UNSIGNED_BYTE,
			pixels
		);

		return pixels;
	}



	protected resizeCanvasGPU = () =>
	{
		this.gl.viewport(0, 0, this.canvasWidth, this.canvasHeight);
	};

	downloadFrame(filename: string, drawNewFrame: boolean = true)
	{
		if (drawNewFrame)
		{
			this.drawFrame();
		}

		this.canvas.toBlob((blob) =>
		{
			if (!blob)
			{
				console.error("[Wilson] Could not create a canvas blob");
				return;
			}

			const link = document.createElement("a");

			link.download = filename;

			link.href = window.URL.createObjectURL(blob);

			link.click();

			link.remove();
		});
	}

	async readHighResPixels({
		resolution = Math.round(Math.sqrt(this.canvasWidth * this.canvasHeight)),
		uniforms = {},
		format = "unsignedByte",
	}: {
		resolution?: number,
		uniforms?: UniformInitializers,
		format?: "unsignedByte" | "float",
	}): Promise<{
		pixels: Uint8Array | Float32Array,
		width: number,
		height: number,
	}> {
		const workerCode = `${""}
			const uniformFunctions = {
				int: (
					gl,
					location,
					value,
				) => gl.uniform1i(location, value),
				
				float: (
					gl,
					location,
					value,
				) => gl.uniform1f(location, value),
				
				vec2: (
					gl,
					location,
					value,
				) => gl.uniform2fv(location, value),

				vec3: (
					gl,
					location,
					value,
				) => gl.uniform3fv(location, value),
				
				vec4: (
					gl,
					location,
					value,
				) => gl.uniform4fv(location, value),

				intArray: (
					gl,
					location,
					value,
				) => gl.uniform1iv(location, value),
				
				floatArray: (
					gl,
					location,
					value,
				) => gl.uniform1fv(location, value),
				
				vec2Array: (
					gl,
					location,
					value,
				) => {
					return value instanceof Float32Array
						? gl.uniform2fv(location, value)
						: gl.uniform2fv(location, value.flat());
				},

				vec3Array: (
					gl,
					location,
					value,
				) => {
					return value instanceof Float32Array
						? gl.uniform3fv(location, value)
						: gl.uniform3fv(location, value.flat());
				},
				
				vec4Array: (
					gl,
					location,
					value,
				) => {
					return value instanceof Float32Array
						? gl.uniform4fv(location, value)
						: gl.uniform4fv(location, value.flat());
				},

				mat2: (
					gl,
					location,
					value,
				) => {
					return value instanceof Float32Array
						? gl.uniformMatrix2fv(location, false, value)
						: gl.uniformMatrix2fv(location, false, [value[0][0], value[1][0], value[0][1], value[1][1]]);
				},
				
				mat3: (
					gl,
					location,
					value,
				) => {
					return value instanceof Float32Array
						? gl.uniformMatrix3fv(location, false, value)
						: gl.uniformMatrix3fv(location, false, [value[0][0], value[1][0], value[2][0], value[0][1], value[1][1], value[2][1], value[0][2], value[1][2], value[2][2]]);
				},
				
				mat4: (
					gl,
					location,
					value,
				) => {
					return value instanceof Float32Array
						? gl.uniformMatrix4fv(location, false, value)
						: gl.uniformMatrix4fv(location, false, [value[0][0], value[1][0], value[2][0], value[3][0], value[0][1], value[1][1], value[2][1], value[3][1], value[0][2], value[1][2], value[2][2], value[3][2], value[0][3], value[1][3], value[2][3], value[3][3]]);
				},
			};

			self.addEventListener("message", (event) => 
			{
				const { offscreen, canvasWidth, canvasHeight, shader, uniforms, options } = event.data;

				const gl = options.useWebGL2
					? offscreen.getContext("webgl2") ?? offscreen.getContext("webgl")
					: offscreen.getContext("webgl");

				if (!gl)
				{
					throw new Error("[Wilson] Failed to get WebGL or WebGL2 context.");
				}

				gl.getExtension("KHR_parallel_shader_compile");

				if (
					gl instanceof WebGL2RenderingContext
					&& !gl.getExtension("EXT_color_buffer_float")
				) {
					// No support for float textures.
				}

				else if (
					gl instanceof WebGLRenderingContext
					&& !gl.getExtension("OES_texture_float")
				) {
					// No support for float textures.
				}

				if ("drawingBufferColorSpace" in gl && options.useP3ColorSpace)
				{
					gl.drawingBufferColorSpace = "display-p3";
				}

				const vertexShaderSource = \`
					attribute vec3 position;
					varying vec2 uv;

					void main(void)
					{
						gl_Position = vec4(position, 1.0);

						// !!!IMPORTANT!!!
						// Flip the y coordinate because WebGL's coordinate system is different from the one used by ctx, and this is the fastest way to fix that.
						uv = vec2(position.x, -position.y);
					}
				\`;

				const vertexShader = gl.createShader(gl.VERTEX_SHADER);
				const fragShader = gl.createShader(gl.FRAGMENT_SHADER);

				const shaderProgram = gl.createProgram();

				gl.attachShader(shaderProgram, vertexShader);
				gl.attachShader(shaderProgram, fragShader);

				gl.shaderSource(vertexShader, vertexShaderSource);
				gl.shaderSource(fragShader, shader);

				gl.compileShader(vertexShader);
				gl.compileShader(fragShader);

				if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
				{
					console.groupCollapsed("[Wilson] Full non-compiled vertex shader source:");
					console.log(vertexShaderSource);
					console.groupEnd();

					throw new Error("[Wilson] Couldn't compile vertex shader: " + gl.getShaderInfoLog(vertexShader));
				}

				if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS))
				{
					console.groupCollapsed("[Wilson] Full non-compiled fragment shader source:");
					console.log(shader);
					console.groupEnd();

					throw new Error("[Wilson] Couldn't compile fragment shader: " + gl.getShaderInfoLog(fragShader));
				}

				gl.linkProgram(shaderProgram);

				gl.useProgram(shaderProgram);

				const positionBuffer = gl.createBuffer();

				gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

				const quad = [
					-1, -1, 0,
					-1,  1, 0,
					1, -1, 0,
					1,  1, 0
				];
				gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(quad), gl.STATIC_DRAW);

				const positionAttribute = gl.getAttribLocation(shaderProgram, "position");

				gl.enableVertexAttribArray(positionAttribute);
				gl.vertexAttribPointer(positionAttribute, 3, gl.FLOAT, false, 0, 0);
				gl.viewport(0, 0, canvasWidth, canvasHeight);

				for (const [name, data] of Object.entries(uniforms))
				{
					const location = gl.getUniformLocation(shaderProgram, name);
					const type = data.type;
					const uniformFunction = uniformFunctions[type];
					uniformFunction(gl, location, data.value);
				}



				const framebuffer = gl.createFramebuffer();

				const texture = gl.createTexture();

				gl.bindTexture(gl.TEXTURE_2D, texture);

				gl.texImage2D(
					gl.TEXTURE_2D,
					0,
					(${format === "float"} && gl instanceof WebGL2RenderingContext)
						? gl.RGBA32F
						: gl.RGBA,
					canvasWidth,
					canvasHeight,
					0,
					gl.RGBA,
					${format === "float"}
						? gl.FLOAT
						: gl.UNSIGNED_BYTE,
					null
				);

			

				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

				gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

				gl.framebufferTexture2D(
					gl.FRAMEBUFFER,
					gl.COLOR_ATTACHMENT0,
					gl.TEXTURE_2D,
					texture,
					0
				);

				gl.bindTexture(gl.TEXTURE_2D, null);



				gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

				gl.finish();
			
				const pixels = new ${format === "float" ? "Float32Array" : "Uint8Array"}(canvasWidth * canvasHeight * 4);
				gl.readPixels(0, 0, canvasWidth, canvasHeight, gl.RGBA, ${format === "float" ? "gl.FLOAT" : "gl.UNSIGNED_BYTE"}, pixels);

				self.postMessage({
					type: "frame-ready",
					pixels,
				});
			});
		`;

		const blob = new Blob([workerCode], { type: "application/javascript" });
		const workerUrl = URL.createObjectURL(blob);
		const worker = new Worker(workerUrl);

		const canvasWidth = Math.round(
			Math.sqrt(resolution * resolution * this.canvasWidth / this.canvasHeight)
		);
		
		const canvasHeight = Math.round(
			Math.sqrt(resolution * resolution * this.canvasHeight / this.canvasWidth)
		);

		let resolve: ({
			pixels,
			width,
			height,
		}: {
			pixels: Uint8Array | Float32Array,
			width: number,
			height: number,
		}) => void;

		const promise = new Promise<{
			pixels: Uint8Array | Float32Array,
			width: number,
			height: number,
		}>((r) => (resolve = r));

		worker.addEventListener("message", (event) => 
		{
			if (event.data.type === "frame-ready")
			{
				const { pixels } = event.data;

				resolve({
					pixels,
					width: canvasWidth,
					height: canvasHeight,
				});
			}
		});

		// Clean up the blob URL
		URL.revokeObjectURL(workerUrl);

		const offscreen = new OffscreenCanvas(canvasWidth, canvasHeight);

		const uniformData: {[name: string]: {type: UniformType, value: any}} = {};

		for (const [name, data] of Object.entries(this.#uniforms[this.#currentShaderId]))
		{
			uniformData[name] = {
				type: data.type,
				value: data.value,
			};
		}

		for (const [name, value] of Object.entries(uniforms))
		{
			uniformData[name].value = value;
		}
		
		worker.postMessage({
			offscreen,
			shader: this.#shaderProgramSources[this.#currentShaderId],
			uniforms: uniformData,
			canvasWidth,
			canvasHeight,

			options: {
				useWebGL2: this.#useWebGL2,
				useP3ColorSpace: this.useP3ColorSpace,
			}
		}, [offscreen]);

		return promise;
	}

	async downloadHighResFrame(
		filename: string,
		resolution: number = Math.round(Math.sqrt(this.canvasWidth * this.canvasHeight)),
		uniforms: UniformInitializers = {}
	) {
		const { pixels, width, height } = await this.readHighResPixels({
			resolution,
			uniforms,
		});
		
		const colorSpace = (this.useP3ColorSpace && matchMedia("(color-gamut: p3)").matches)
			? "display-p3"
			: "srgb";

		const imageData = new ImageData(new Uint8ClampedArray(pixels), width, height, { colorSpace });

		const canvas = document.createElement("canvas");

		canvas.width = width;
		canvas.height = height;

		const ctx = canvas.getContext("2d", {
			colorSpace,
		});

		if (!ctx)
		{
			if (this.verbose)
			{
				console.error("[Wilson] Could not get 2d context for canvas");
			}

			return;
		}

		ctx.putImageData(imageData, 0, 0);

		canvas.toBlob((blob) =>
		{
			if (!blob)
			{
				if (this.verbose)
				{
					console.error("[Wilson] Could not create a canvas blob.");
				}

				return;
			}

			const link = document.createElement("a");

			link.download = filename;

			link.href = window.URL.createObjectURL(blob);

			link.click();

			link.remove();
		});
	}



	async enterXR(): Promise<boolean>
	{
		if (!this.#useXR)
		{
			throw new Error("[Wilson] `useXR` must be `true` in the constructor options in order to call `enterXR`.");
		}

		if (this.inXR || this.#enteringXR || this.#xrIsSupportedNow === false)
		{
			return false;
		}



		this.#enteringXR = true;

		if (
			!navigator.xr
			|| this.#xrIsSupportedNow !== true && !(await this.#checkXRSupport()))
		{
			this.#enteringXR = false;

			return false;
		}

		let session: XRSession;

		try
		{
			session = await navigator.xr.requestSession(XR_MODE, {
				requiredFeatures: this.#xrRequiredFeatures,
				optionalFeatures: this.#xrOptionalFeatures,
			});
		}

		catch(ex)
		{
			if (this.verbose)
			{
				console.error(`[Wilson] Couldn't create XR session: ${ex}`);
			}

			this.#enteringXR = false;

			return false;
		}


		
		try
		{
			const baseLayer = new XRWebGLLayer(session, this.gl, {
				antialias: false,
				depth: false,
				stencil: false,
				alpha: true,
				// Initialize the framebuffer (both eyes, side-by-side). Headsets can run in a low-res
				// mode by default for headroom, so the first factor here ensures we're rendering all the
				// pixels available. The second factor is per-applet and can scale it down for a
				// construction-time quality cap.
				framebufferScaleFactor: XRWebGLLayer.getNativeFramebufferScaleFactor(session)
					* this.#xrFramebufferScaleFactor
			});
			
			session.updateRenderState({
				baseLayer,
				depthNear: this.#xrDepthNear,
				depthFar: this.#xrDepthFar
			});
		
			const refSpace = await session.requestReferenceSpace(REFERENCE_SPACE);

			this.#xrData = { session, refSpace, baseLayer };

			this.#applyXRTargetFrameRate();
			// Calls the setter, so it updates on baseLayer.
			this.xrFixedFoveation = this.#xrFixedFoveation;

			session.addEventListener("visibilitychange", () =>
			{
				this.#xrCallbacks.onVisibilityChange(session.visibilityState);
			});

			session.addEventListener("frameratechange", () =>
			{
				this.#xrCallbacks.onFrameRateChange(session.frameRate);
			});

			session.addEventListener("inputsourceschange", this.#onXRInputSourcesChange);

			session.addEventListener("selectstart", event =>
				this.#dispatchXRInputSourceEvent(event, "onSelectStart", { selecting: true }));

			session.addEventListener("select", event =>
				this.#dispatchXRInputSourceEvent(event, "onSelect"));

			session.addEventListener("selectend", event =>
				this.#dispatchXRInputSourceEvent(event, "onSelectEnd", { selecting: false }));

			session.addEventListener("squeezestart", event =>
				this.#dispatchXRInputSourceEvent(event, "onSqueezeStart", { squeezing: true }));

			session.addEventListener("squeeze", event =>
				this.#dispatchXRInputSourceEvent(event, "onSqueeze"));

			session.addEventListener("squeezeend", event =>
				this.#dispatchXRInputSourceEvent(event, "onSqueezeEnd", { squeezing: false }));

			session.addEventListener("end", this.#onXREnd);
			session.requestAnimationFrame(this.#onXRFrame);

			this.#enteringXR = false;

			this.#xrCallbacks.onEnter();
			this.animationFrameLoopPaused = true;

			// Controllers that were already connected when the session started don't necessarily
			// arrive via inputsourceschange, and this populates xrControllers before enterXR
			// resolves. After onEnter, so that a session is never reported as having controllers
			// before it's reported as having started.
			this.#syncXRControllers();

			return true;
		}

		catch(ex)
		{
			if (this.verbose)
			{
				console.error(`[Wilson] Couldn't enter XR: ${ex}`);
			}

			this.#xrData = undefined;
			this.#enteringXR = false;

			await session.end().catch(() => {});

			return false;
		}
	}

	#onXRFrame = (time: number, frame: XRFrame) =>
	{
		if (!this.#xrData)
		{
			return;
		}

		const deltaTime = time - (this.#lastXRTime ?? time);
		this.#lastXRTime = time;

		const { session, refSpace, baseLayer } = this.#xrData;

		// Queue the next frame first so an exception mid-render doesn't stall the loop.
		session.requestAnimationFrame(this.#onXRFrame);

		if (session.visibilityState === "hidden")
		{
			// Treat skipped frames as a discontinuity.
			this.#lastXRTime = undefined;

			// The runtime has taken input for a system menu, and it won't report the releases.
			// Without this, a button held when the menu opened would still read as pressed once
			// the applet comes back.
			for (const { controller } of this.#xrControllerData.values())
			{
				this.#releaseXRControllerButtons(
					controller,
					{ time, frame, refSpace, session }
				);
			}

			return;
		}

		// Deliberately ahead of the viewer pose check below: a controller's buttons and axes are
		// still perfectly valid on a frame where head tracking dropped out, and skipping the poll
		// would desync every justPressed edge.
		this.#updateXRControllers(time, frame, refSpace, session);

		const pose = frame.getViewerPose(refSpace);

		// Null when tracking is temporarily lost — skip the frame.
		if (!pose)
		{
			this.#lastXRTime = undefined;
			return;
		}

		// This binds the framebuffer directly since useFramebuffer() early-returns
		// if the ID matches the current one, and both the canvas and the XR framebuffer
		// use null as their ID.
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, baseLayer.framebuffer);
		this.#currentFramebufferId = null;

		this.gl.clear(this.gl.COLOR_BUFFER_BIT);



		const { views, emulatedPosition } = pose;

		// Give the callback a predictable, full-framebuffer viewport; the loop below
		// sets the per-eye viewport before each view renders.
		this.gl.viewport(0, 0, baseLayer.framebufferWidth, baseLayer.framebufferHeight);

		this.#xrCallbacks.onFrameStart({
			time,
			deltaTime,
			frame,
			session,
			refSpace,
			pose
		});

		try
		{
			// One view per eye (two for stereo VR), sharing the framebuffer via side-by-side viewports.
			for (let viewIndex = 0; viewIndex < views.length; viewIndex++)
			{
				const view = views[viewIndex];
				
				const scale = this.#xrViewportScale ?? view.recommendedViewportScale;

				if (scale && scale !== this.#lastAppliedXRViewportScales[viewIndex])
				{
					view.requestViewportScale(scale);
					this.#lastAppliedXRViewportScales[viewIndex] = scale;
				}
				
				const viewport = baseLayer.getViewport(view);

				if (!viewport)
				{
					// Skip this eye, not the whole frame
					continue;
				}

				this.#xrViewport = viewport;
				this.gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
		
				this.#renderXRFrame({
					view,
					projectionMatrix: view.projectionMatrix,
					cameraToWorld: view.transform.matrix,
					eye: view.eye,
					viewIndex,
					numViews: views.length,
					viewport,
					time,
					deltaTime,
					frame,
					refSpace,
					position: view.transform.position,
					emulatedPosition,
					session,
					pose,
				});
			}
		}
		
		finally
		{
			this.#xrViewport = null;
		}
	}



	// Needs to be an arrow function to maintain its binding when passed to addEventListener.
	#onXRInputSourcesChange = () =>
	{
		this.#syncXRControllers();
	};

	// Reconciles the controller map against the session's live input source list. This is
	// idempotent, so it can be called both from the inputsourceschange event and from the frame
	// loop; the event gives prompt notification, and the frame loop covers the initial set,
	// which some runtimes populate without firing the event.
	#syncXRControllers()
	{
		if (!this.#xrData)
		{
			return;
		}

		const { session } = this.#xrData;
		const inputSources = session.inputSources;

		let added: WilsonXRController[] | null = null;
		let removed: WilsonXRController[] | null = null;

		for (const inputSource of inputSources)
		{
			if (!this.#xrControllerData.has(inputSource))
			{
				const data = this.#createXRControllerData(inputSource);
				this.#xrControllerData.set(inputSource, data);

				(added = added ?? []).push(data.controller);
			}
		}

		for (const [inputSource, data] of this.#xrControllerData)
		{
			let stillConnected = false;

			for (const currentInputSource of inputSources)
			{
				if (currentInputSource === inputSource)
				{
					stillConnected = true;
					break;
				}
			}

			if (!stillConnected)
			{
				// Reset silently rather than dispatching button events for a device that no
				// longer exists; onControllerDisconnect is the signal for that.
				this.#releaseXRControllerButtons(data.controller, null);

				data.controller.targetRay = null;
				data.controller.grip = null;
				data.controller.selecting = false;
				data.controller.squeezing = false;

				this.#xrControllerData.delete(inputSource);

				(removed = removed ?? []).push(data.controller);
			}
		}

		if (!added && !removed)
		{
			return;
		}

		this.#xrControllerList = [];

		for (const data of this.#xrControllerData.values())
		{
			this.#xrControllerList.push(data.controller);
		}

		if (removed)
		{
			for (const controller of removed)
			{
				this.#xrCallbacks.onControllerDisconnect({
					controller,
					controllers: this.#xrControllerList,
					session
				});
			}
		}

		if (added)
		{
			for (const controller of added)
			{
				this.#xrCallbacks.onControllerConnect({
					controller,
					controllers: this.#xrControllerList,
					session
				});
			}
		}
	}

	#createXRControllerData(inputSource: XRInputSource): WilsonXRControllerData
	{
		const buttons = {} as {[name in XRButtonName]: XRButtonState};

		for (const name of XR_BUTTON_NAMES)
		{
			buttons[name] = createXRButtonState();
		}

		const controller: WilsonXRController = {
			inputSource,
			handedness: inputSource.handedness,
			targetRayMode: inputSource.targetRayMode,
			profiles: inputSource.profiles,
			mapping: inputSource.gamepad?.mapping ?? "",

			targetRay: null,
			grip: null,

			buttons,
			extraButtons: [],

			thumbstick: [0, 0],
			touchpad: [0, 0],
			axes: [],

			selecting: false,
			squeezing: false,

			hand: null,

			pulse: (intensity: number, duration: number) =>
			{
				// WebXR uses the Gamepad API's hapticActuators rather than the vibrationActuator
				// that the mainline API settled on, and plenty of devices have neither.
				const actuator = inputSource.gamepad?.hapticActuators?.[0];

				if (!actuator)
				{
					return Promise.resolve(false);
				}

				return actuator
					.pulse(Math.min(Math.max(intensity, 0), 1), duration)
					.catch(() => false);
			},
		};

		return {
			controller,
			targetRayPose: createXRControllerPose(),
			gripPose: createXRControllerPose(),
			handJoints: {},
			warnedAboutMapping: false,
		};
	}

	// Fills `target` if one is given, and allocates otherwise. Poses read during the frame loop
	// reuse persistent buffers; poses read when an input event fires are rare enough to allocate.
	#readXRPose(
		frame: XRFrame,
		space: XRSpace,
		refSpace: XRReferenceSpace,
		target?: XRControllerPose
	): XRControllerPose | null {
		let pose: XRPose | undefined;

		try
		{
			pose = frame.getPose(space, refSpace);
		}

		catch(ex)
		{
			return null;
		}

		if (!pose)
		{
			return null;
		}

		const result = target ?? createXRControllerPose();

		result.matrix.set(pose.transform.matrix);
		result.position = pose.transform.position;
		result.orientation = pose.transform.orientation;
		result.linearVelocity = pose.linearVelocity;
		result.angularVelocity = pose.angularVelocity;
		result.emulatedPosition = pose.emulatedPosition;

		return result;
	}

	#updateXRControllers(
		time: number,
		frame: XRFrame,
		refSpace: XRReferenceSpace,
		session: XRSession
	) {
		this.#syncXRControllers();

		// Button transitions are collected and dispatched after every controller has been
		// updated, so that a callback reading a second controller sees this frame's state
		// rather than the last frame's.
		let buttonEvents: {
			controller: WilsonXRController,
			name: XRButtonName | null,
			index: number,
			state: XRButtonState,
			pressed: boolean,
		}[] | null = null;

		for (const data of this.#xrControllerData.values())
		{
			const { controller } = data;
			const { inputSource } = controller;

			controller.targetRay = this.#readXRPose(
				frame,
				inputSource.targetRaySpace,
				refSpace,
				data.targetRayPose
			);

			controller.grip = inputSource.gripSpace
				? this.#readXRPose(frame, inputSource.gripSpace, refSpace, data.gripPose)
				: null;

			if (this.#useXRHandTracking && inputSource.hand && frame.getJointPose)
			{
				controller.hand = data.handJoints;

				for (const [jointName, jointSpace] of inputSource.hand)
				{
					const jointPose = frame.getJointPose(jointSpace, refSpace);

					if (!jointPose)
					{
						// Better to drop the joint than to report a stale position for it.
						delete data.handJoints[jointName];
						continue;
					}

					let joint = data.handJoints[jointName];

					if (!joint)
					{
						joint = {
							matrix: new Float32Array(16),
							position: jointPose.transform.position,
							orientation: jointPose.transform.orientation,
							radius: jointPose.radius,
						};

						data.handJoints[jointName] = joint;
					}

					joint.matrix.set(jointPose.transform.matrix);
					joint.position = jointPose.transform.position;
					joint.orientation = jointPose.transform.orientation;
					joint.radius = jointPose.radius;
				}
			}

			else
			{
				controller.hand = null;
			}



			const gamepad = inputSource.gamepad;

			// Hands and gaze input have no gamepad at all; their state comes from the session's
			// select and squeeze events instead.
			if (!gamepad)
			{
				continue;
			}

			controller.mapping = gamepad.mapping;

			if (gamepad.mapping !== "xr-standard" && !data.warnedAboutMapping)
			{
				data.warnedAboutMapping = true;

				if (this.verbose)
				{
					console.warn(
						`[Wilson] An XR controller (${inputSource.handedness}, profiles `
						+ `${inputSource.profiles.join(", ")}) reports a "${gamepad.mapping}" `
						+ `mapping rather than "xr-standard", so its named buttons and axes are `
						+ `a guess. Use its raw buttons and axes if they're wrong.`
					);
				}
			}

			const axes = gamepad.axes;

			controller.axes = axes;

			// The raw axes are +y down, which is backwards from how a stick is usually read.
			controller.touchpad[0] = axes[0] ?? 0;
			controller.touchpad[1] = -(axes[1] ?? 0);
			controller.thumbstick[0] = axes[2] ?? 0;
			controller.thumbstick[1] = -(axes[3] ?? 0);

			// Buttons that vanish from the gamepad between frames would otherwise keep whatever
			// edge they last had forever.
			this.#clearXRButtonEdges(controller);

			for (let i = 0; i < gamepad.buttons.length; i++)
			{
				const name = i < XR_BUTTON_NAMES.length ? XR_BUTTON_NAMES[i] : null;

				let state: XRButtonState;

				if (name)
				{
					state = controller.buttons[name];
				}

				else
				{
					const extraIndex = i - XR_BUTTON_NAMES.length;

					if (!controller.extraButtons[extraIndex])
					{
						controller.extraButtons[extraIndex] = createXRButtonState();
					}

					state = controller.extraButtons[extraIndex];
				}

				const button = gamepad.buttons[i];
				const wasPressed = state.pressed;

				state.pressed = button.pressed;
				state.touched = button.touched;
				state.value = button.value;
				state.justPressed = button.pressed && !wasPressed;
				state.justReleased = !button.pressed && wasPressed;

				if (state.justPressed || state.justReleased)
				{
					(buttonEvents = buttonEvents ?? []).push({
						controller,
						name,
						index: i,
						state,
						pressed: state.pressed
					});
				}
			}
		}

		if (!buttonEvents)
		{
			return;
		}

		for (const { controller, name, index, state, pressed } of buttonEvents)
		{
			const callback = pressed
				? this.#xrCallbacks.onButtonDown
				: this.#xrCallbacks.onButtonUp;

			callback({
				controller,
				name,
				index,
				state,
				time,
				frame,
				refSpace,
				session
			});
		}
	}

	#clearXRButtonEdges(controller: WilsonXRController)
	{
		for (const name of XR_BUTTON_NAMES)
		{
			controller.buttons[name].justPressed = false;
			controller.buttons[name].justReleased = false;
		}

		for (const state of controller.extraButtons)
		{
			state.justPressed = false;
			state.justReleased = false;
		}
	}

	// Forces every button up, dispatching the releases if a frame is available to report them
	// with. Idempotent, since a second call finds nothing still pressed.
	#releaseXRControllerButtons(
		controller: WilsonXRController,
		dispatch: {
			time: number,
			frame: XRFrame,
			refSpace: XRReferenceSpace,
			session: XRSession
		} | null
	) {
		for (let i = 0; i < XR_BUTTON_NAMES.length + controller.extraButtons.length; i++)
		{
			const name = i < XR_BUTTON_NAMES.length ? XR_BUTTON_NAMES[i] : null;

			const state = name
				? controller.buttons[name]
				: controller.extraButtons[i - XR_BUTTON_NAMES.length];

			const wasPressed = state.pressed;

			state.pressed = false;
			state.touched = false;
			state.value = 0;
			state.justPressed = false;
			state.justReleased = wasPressed;

			if (wasPressed && dispatch)
			{
				this.#xrCallbacks.onButtonUp({
					controller,
					name,
					index: i,
					state,
					time: dispatch.time,
					frame: dispatch.frame,
					refSpace: dispatch.refSpace,
					session: dispatch.session
				});
			}
		}

		controller.thumbstick[0] = 0;
		controller.thumbstick[1] = 0;
		controller.touchpad[0] = 0;
		controller.touchpad[1] = 0;
	}

	#dispatchXRInputSourceEvent(
		event: XRInputSourceEvent,
		callbackName: "onSelectStart" | "onSelect" | "onSelectEnd"
			| "onSqueezeStart" | "onSqueeze" | "onSqueezeEnd",
		state?: { selecting?: boolean, squeezing?: boolean }
	) {
		if (!this.#xrData)
		{
			return;
		}

		const { session, refSpace } = this.#xrData;

		// An input source's very first event can arrive before the frame loop has seen it.
		this.#syncXRControllers();

		const data = this.#xrControllerData.get(event.inputSource);

		if (!data)
		{
			return;
		}

		const { controller } = data;

		if (state?.selecting !== undefined)
		{
			controller.selecting = state.selecting;
		}

		if (state?.squeezing !== undefined)
		{
			controller.squeezing = state.squeezing;
		}

		// The frame delivered with an input event isn't an animation frame — getViewerPose
		// would throw on it — but getPose is what's wanted here anyway, and it gives the poses
		// at the moment of the action rather than at the last rendered frame.
		const targetRay = this.#readXRPose(
			event.frame,
			controller.inputSource.targetRaySpace,
			refSpace
		);

		const grip = controller.inputSource.gripSpace
			? this.#readXRPose(event.frame, controller.inputSource.gripSpace, refSpace)
			: null;

		this.#xrCallbacks[callbackName]({
			controller,
			inputSource: event.inputSource,
			targetRay,
			grip,
			frame: event.frame,
			refSpace,
			session
		});
	}

	#onXREnd = () =>
	{
		const session = this.#xrData?.session;
		const disconnected = this.#xrControllerList;

		this.#xrData = undefined;
		this.#lastAppliedXRViewportScales = [];
		this.#lastXRTime = undefined;

		this.#xrControllerData.clear();
		this.#xrControllerList = [];

		// This binds the framebuffer directly since useFramebuffer() early-returns
		// if the ID matches the current one, and both the canvas and the XR framebuffer
		// use null as their ID.
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
		this.#currentFramebufferId = null;
		this.resizeCanvasGPU();

		this.animationFrameLoopPaused = false;

		// Every controller goes away with the session, so applets holding onto them hear about
		// it the same way they would if a controller had been switched off mid-session.
		if (session)
		{
			for (const controller of disconnected)
			{
				this.#releaseXRControllerButtons(controller, null);

				controller.targetRay = null;
				controller.grip = null;
				controller.selecting = false;
				controller.squeezing = false;

				this.#xrCallbacks.onControllerDisconnect({
					controller,
					controllers: this.#xrControllerList,
					session
				});
			}
		}

		this.#xrCallbacks.onExit();
	}

	#clearXRFunctions()
	{
		this.#xrCallbacks = {
			onEnter: () => {},
			onExit: () => {},
			onFrameStart: () => {},
			onVisibilityChange: (state: XRVisibilityState) => {},
			onFrameRateChange: (frameRate: number | undefined) => {},
			onControllerConnect: () => {},
			onControllerDisconnect: () => {},
			onSelectStart: () => {},
			onSelect: () => {},
			onSelectEnd: () => {},
			onSqueezeStart: () => {},
			onSqueeze: () => {},
			onSqueezeEnd: () => {},
			onButtonDown: () => {},
			onButtonUp: () => {}
		};

		this.#renderXRFrame = () => {};
	}
	
	async exitXR()
	{
		if (!this.#xrData)
		{
			return;
		}

		await this.#xrData.session.end();
	}

	#applyXRTargetFrameRate()
	{
		const session = this.#xrData?.session;

		if (!session || this.#xrTargetFrameRate === undefined)
		{
			return;
		}

		const supportedFrameRates = session.supportedFrameRates;

		if (!supportedFrameRates || supportedFrameRates.length === 0)
		{
			if (this.verbose)
			{
				console.warn("[Wilson] This device doesn't support setting the XR frame rate.");
			}

			return;
		}

		// updateTargetFrameRate rejects on anything not in supportedFrameRates.
		let closestRate = supportedFrameRates[0];

		for (const rate of supportedFrameRates)
		{
			if (
				Math.abs(rate - this.#xrTargetFrameRate)
					< Math.abs(closestRate - this.#xrTargetFrameRate)
			) {
				closestRate = rate;
			}
		}

		if (this.verbose)
		{
			console.log(`[Wilson] Available XR framerates are ${supportedFrameRates}; using ${closestRate}.`);
		}

		session.updateTargetFrameRate(closestRate).catch((ex) =>
		{
			if (this.verbose)
			{
				console.warn(`[Wilson] Couldn't set the XR frame rate: ${ex}`);
			}
		});
	}




	destroy()
	{
		super.destroy();

		

		this.#clearXRFunctions();

		this.exitXR().catch(() => {});

		this.#xrControllerData.clear();
		this.#xrControllerList = [];

		navigator.xr?.removeEventListener("devicechange", this.#onDeviceChange);



		// Delete all textures.
		for (const id in this.#textures)
		{
			this.gl.deleteTexture(this.#textures[id].texture);
		}
		this.#textures = {};

		// Delete all framebuffers.
		for (const id in this.#framebuffers)
		{
			this.gl.deleteFramebuffer(this.#framebuffers[id]);
		}
		this.#framebuffers = {};

		// Delete all shader programs (this also detaches shaders).
		for (const id in this.#shaderPrograms)
		{
			this.gl.deleteProgram(this.#shaderPrograms[id]);
		}
		this.#shaderPrograms = {};
		this.#shaderProgramSources = {};
		this.#currentProgram = null;

		// Delete all buffers.
		for (const buffer of this.#positionBuffers)
		{
			this.gl.deleteBuffer(buffer);
		}
		this.#positionBuffers = [];

		// Delete all shaders.
		for (const shader of this.#shaders)
		{
			this.gl.deleteShader(shader);
		}
		this.#shaders = [];

		// Clear uniform references.
		this.#uniforms = {};

		// Lose the WebGL context to free up the context slot.
		const loseContext = this.gl.getExtension("WEBGL_lose_context");
		if (loseContext)
		{
			loseContext.loseContext();
		}
	}
}