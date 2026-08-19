export type InteractionCallbacks = {
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

export type DraggableCallBacks = {
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

export type InteractionOptions = ({
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

export type DraggableLocations = {[id: string]: [number, number]};

export type DraggableOptions = {
	draggables?: DraggableLocations,
	radius?: number,
	static?: boolean,
	callbacks?: Partial<DraggableCallBacks>,
};

export type DraggablesData = {
	[id: string]: {
		element: HTMLDivElement,
		location: [number, number],
		currentlyDragging: boolean,
	}
};

export type FullscreenOptions = {
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

/*
	An extra element that travels with the built-in buttons during a fullscreen
	transition. Elements that aren't shown in one of the two states declare it
	here rather than hiding themselves in CSS: a view transition has nothing to
	animate a one-sided element against, so a stylesheet `display: none` leaves
	its snapshot fading in place while everything around it slides. Wilson
	instead does the hiding itself and animates the element to (or from) the spot
	it would have occupied, so it moves along with its neighbors while they close
	the gap where it was.
*/
export type FullscreenViewTransitionElement = {
	element: HTMLElement,
	hideInFullscreen?: boolean,
	hideOutOfFullscreen?: boolean,
};

type FullscreenTransitionElementRect = {
	rect: DOMRect,
	hidden: boolean,
};

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

	protected additionalFullscreenViewTransitionElements: FullscreenViewTransitionElement[] = [];
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

		this.#syncFullscreenHiddenElements();



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



	protected addFullscreenViewTransitionElement(entry: FullscreenViewTransitionElement)
	{
		this.additionalFullscreenViewTransitionElements.push(entry);
		this.#syncFullscreenHiddenElements();
	}

	// Wilson owns the hiding of one-sided transition elements so that it can briefly
	// undo it to measure them -- see #fullscreenTransitionElementRect.
	#syncFullscreenHiddenElements()
	{
		for (const entry of this.additionalFullscreenViewTransitionElements)
		{
			entry.element.classList.toggle(
				"WILSON_fullscreen-hidden",
				!!(this.#currentlyFullscreen ? entry.hideInFullscreen : entry.hideOutOfFullscreen)
			);
		}
	}

	/*
		The rect an element occupies, or the one it would occupy if it weren't hidden
		for the current fullscreen state. Un-hiding for the measurement forces a
		layout but never paints, and letting the layout engine answer the question
		means any arrangement of buttons works without hardcoded geometry.
	*/
	#fullscreenTransitionElementRect(element: HTMLElement)
	{
		const hidden = element.classList.contains("WILSON_fullscreen-hidden");

		if (hidden)
		{
			element.classList.remove("WILSON_fullscreen-hidden");
		}

		const rect = element.getBoundingClientRect();

		if (hidden)
		{
			element.classList.add("WILSON_fullscreen-hidden");
		}

		return { rect, hidden };
	}

	#measureFullscreenTransitionElements()
	{
		return this.additionalFullscreenViewTransitionElements.map(
			({ element }) => this.#fullscreenTransitionElementRect(element)
		);
	}

	/*
		An element shown in only one of the two states has no counterpart for the
		browser to interpolate against, so its snapshot would just fade where it
		stands while every other button slides. Give it keyframes running between
		where it is and where it would be instead, so it drifts along with the rest
		of the row and lands (invisible) exactly where the layout closed over it.
	*/
	#addFullscreenHiddenElementTransitionStyle(
		before: FullscreenTransitionElementRect[],
		after: FullscreenTransitionElementRect[]
	) {
		let rules = "";

		for (let i = 0; i < this.additionalFullscreenViewTransitionElements.length; i++)
		{
			const oldState = before[i];
			const newState = after[i];

			// Nothing to do when the element is on both sides (the default group
			// animation already moves it) or on neither (there's no snapshot at all).
			if (
				!oldState
				|| !newState
				|| oldState.hidden === newState.hidden
				|| (!oldState.rect.width && !oldState.rect.height)
				|| (!newState.rect.width && !newState.rect.height)
			) {
				continue;
			}

			const name = `WILSON_transitioning-element-${i}-${this.#salt}`;
			const keyframesName = `WILSON_transitioning-element-${i}-fade-${this.#salt}`;

			const dx = newState.rect.left - oldState.rect.left;
			const dy = newState.rect.top - oldState.rect.top;

			/*
				The scaleX squeezes the snapshot down to nothing so that the element
				reads as collapsing out of the row rather than merely fading. Scaling
				about the default center origin lands the collapse on the midpoint of
				the slot the element would have filled, which is where its neighbors
				meet -- the translate is written first so it applies after the scale.

				Only ::view-transition-old exists when the element is leaving, and only
				::view-transition-new when it's arriving.
			*/
			rules += newState.hidden
				? `
					@keyframes ${keyframesName}
					{
						from { transform: translate(0px, 0px) scaleX(1); opacity: 1; }
						to { transform: translate(${dx}px, ${dy}px) scaleX(0); opacity: 0; }
					}

					::view-transition-group(${name}) { animation: none; }

					::view-transition-old(${name})
					{
						animation-name: ${keyframesName};
						animation-fill-mode: both;
					}
				`
				: `
					@keyframes ${keyframesName}
					{
						from { transform: translate(${-dx}px, ${-dy}px) scaleX(0); opacity: 0; }
						to { transform: translate(0px, 0px) scaleX(1); opacity: 1; }
					}

					::view-transition-group(${name}) { animation: none; }

					::view-transition-new(${name})
					{
						animation-name: ${keyframesName};
						animation-fill-mode: both;
					}
				`;
		}

		if (!rules)
		{
			return null;
		}

		const styleElement = document.createElement("style");
		styleElement.innerHTML = rules;
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
			...(Object.values(this.#draggables).map(entry => entry.element)),
			...this.additionalFullscreenViewTransitionElements.map(entry => entry.element),
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

			const useTransitionNames = !this.reduceMotion
				&& !this.crossfadeFullscreen
				&& this.animateFullscreen;

			if (useTransitionNames)
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

				for (let i = 0; i < this.additionalFullscreenViewTransitionElements.length; i++)
				{
					const entry = this.additionalFullscreenViewTransitionElements[i];

					if (entry)
					{
						entry.element.style.setProperty(
							"view-transition-name",
							`WILSON_transitioning-element-${i}-${this.#salt}`
						);
					}
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
				const rectsBefore = useTransitionNames
					? this.#measureFullscreenTransitionElements()
					: null;

				// Where the one-sided elements end up is only knowable once the new state
				// is laid out, so the style goes in from inside the callback -- still
				// before the browser captures the new snapshots.
				let hiddenElementStyleElement: HTMLStyleElement | null = null;

				// @ts-ignore
				const transition = document.startViewTransition(() =>
				{
					this.#enterFullscreen();

					if (rectsBefore)
					{
						hiddenElementStyleElement = this.#addFullscreenHiddenElementTransitionStyle(
							rectsBefore,
							this.#measureFullscreenTransitionElements()
						);
					}
				});

				const removeStyleElements = () =>
				{
					styleElement?.remove();
					draggableStyleElement?.remove();
					hiddenElementStyleElement?.remove();
				};

				if (transition.finished !== undefined)
				{
					await transition.finished;

					removeStyleElements();
				}

				else
				{
					setTimeout(removeStyleElements, 1000);
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

		this.#syncFullscreenHiddenElements();



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
			...(Object.values(this.#draggables).map(entry => entry.element)),
			...this.additionalFullscreenViewTransitionElements.map(entry => entry.element),
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

			const useTransitionNames = !this.reduceMotion
				&& !this.crossfadeFullscreen
				&& this.animateFullscreen
				&& (
					!this.#fullscreenFillScreen
					|| (
						window.innerWidth == this.#fullscreenInitialWindowInnerWidth
						&& window.innerHeight == this.#fullscreenInitialWindowInnerHeight
					)
				);

			if (useTransitionNames)
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

				for (let i = 0; i < this.additionalFullscreenViewTransitionElements.length; i++)
				{
					const entry = this.additionalFullscreenViewTransitionElements[i];

					if (entry)
					{
						entry.element.style.setProperty(
							"view-transition-name",
							`WILSON_transitioning-element-${i}-${this.#salt}`
						);
					}
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
				const rectsBefore = useTransitionNames
					? this.#measureFullscreenTransitionElements()
					: null;

				// Where the one-sided elements come from is only knowable once the new
				// state is laid out, so the style goes in from inside the callback --
				// still before the browser captures the new snapshots.
				let hiddenElementStyleElement: HTMLStyleElement | null = null;

				// @ts-ignore
				const transition = document.startViewTransition(() =>
				{
					this.#exitFullscreen();

					if (rectsBefore)
					{
						hiddenElementStyleElement = this.#addFullscreenHiddenElementTransitionStyle(
							rectsBefore,
							this.#measureFullscreenTransitionElements()
						);
					}
				});

				const removeStyleElements = () =>
				{
					styleElement?.remove();
					draggableStyleElement?.remove();
					hiddenElementStyleElement?.remove();
				};

				if (transition.finished !== undefined)
				{
					await transition.finished;

					removeStyleElements();
				}

				else
				{
					setTimeout(removeStyleElements, 1000);
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

	// A blob URL pins the whole blob in memory until it's revoked or the page goes away, and a
	// high-res png runs to tens of megabytes, so leaving them behind is not cheap.
	//
	// The revoke can't happen inline: click() only queues the download, and the browser reads
	// the URL afterwards, so pulling it out from under that cancels the download. Waiting a
	// task would technically be enough, but the ordering between that task and the download's
	// isn't guaranteed, and Safari in particular has wanted more room. A few seconds is
	// invisible to the user and still returns the memory promptly instead of at unload.
	protected downloadBlob(blob: Blob, filename: string)
	{
		const url = window.URL.createObjectURL(blob);

		const link = document.createElement("a");

		link.download = filename;

		link.href = url;

		link.click();

		link.remove();

		setTimeout(() => window.URL.revokeObjectURL(url), DOWNLOAD_URL_LIFETIME);
	}
}

const DOWNLOAD_URL_LIFETIME = 10000;



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

			this.downloadBlob(blob, filename);
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
export type UniformInitializers = {[name: string]: UniformValue};

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

export type ReadPixelsOptions = {
	row: number,
	col: number,
	height: number,
	width: number,
	format: "unsignedByte" | "float",
}

// Big enough that the per-tile overhead disappears, small enough that one tile is roughly a
// frame's worth of GPU work even for an expensive shader.
const DEFAULT_HIGH_RES_TILE_SIZE = 512;

// Only exists for the duration of a high-res render. Named so that it can't collide with a
// framebuffer the caller made, since creating a pair deletes any existing one with its id.
const HIGH_RES_FRAMEBUFFER_ID = "__wilsonHighResTile";

// One tile of a high-res render, ready to be placed in the finished image. col and row are
// its top left corner there, but the rows inside pixels run bottom-up, the way readPixels
// returns them.
export type HighResTile = {
	pixels: Uint8Array | Float32Array,
	col: number,
	row: number,
	width: number,
	height: number,
};

// Draws one tile. The default just draws the current shader, but anything that ends with the
// finished tile in the given framebuffer works, which is what makes multi-pass renders
// possible. Shaders keep using uv as the coordinate over the whole image; a pass that samples
// a framebuffer an earlier pass of the same tile wrote should use uvTile instead. Every tile
// is this same size, so intermediate framebuffers can be created once at it and reused.
export type RenderHighResTile = (data: {
	framebufferId: string,
	width: number,
	height: number,
}) => void;

type HighResEncoder = {
	addTile: (tile: HighResTile) => void,
	finish: () => Promise<Blob | null>,
	destroy: () => void,
};

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

// Shared between the layer built when a session starts and every replacement that
// xrFramebufferScale swaps in, so that changing the scale can't quietly change anything
// else about the framebuffer.
const XR_LAYER_OPTIONS: XRWebGLLayerInit = {
	antialias: false,
	depth: false,
	stencil: false,
	alpha: true,
};

type WilsonGLXRData = {
	session: XRSession,
	refSpace: XRReferenceSpace,
	baseLayer: XRWebGLLayer,
};

// Only the things that differ between the eyes. Everything that's fixed for the whole frame
// is handed to onFrameStart instead, which runs once before either eye.
export type RenderXRFrame = (data: {
	projectionMatrix: Float32Array,
	cameraToWorld: Float32Array,
	eye: XREye,
	viewIndex: number,
	// The per-eye escape hatch, for anything Wilson doesn't wrap.
	view: XRView,
}) => void;

// The session and reference space aren't here because they're the same for the whole session;
// read them off the Wilson instance as xrSession and xrRefSpace.
export type OnXRFrameStart = (data: {
	time: number,
	deltaTime: number,
	frame: XRFrame,
	pose: XRViewerPose,
}) => void;



// The xr-standard mapping, in order. Anything past index 5 is device-specific (the Quest's
// thumbrest, for instance) and isn't exposed, and the system/menu button is reserved by the
// runtime and is never visible to the page at all.
const XR_BUTTON_NAMES = ["trigger", "squeeze", "touchpad", "thumbstick", "a", "b"] as const;

export type XRButtonName = (typeof XR_BUTTON_NAMES)[number];

export type XRButtonState = {
	pressed: boolean,
	// Analog, in [0, 1]. Only the trigger and squeeze report anything other than 0 or 1.
	value: number,
};

export type WilsonXRController = {
	inputSource: XRInputSource,
	handedness: XRHandedness,

	// Column-major transforms relative to the session's reference space, and null on frames
	// where the device isn't tracked. Buttons keep working when that happens, since a
	// controller that's momentarily out of view is still being pressed. Each is a persistent
	// buffer that's overwritten every frame rather than a fresh array, so that posing
	// controllers doesn't allocate on the hot path; copy one if it needs to outlive the frame.
	targetRay: Float32Array | null,
	grip: Float32Array | null,

	buttons: {[name in XRButtonName]: XRButtonState},

	// Y is negated from the raw axis value, so that +y is forward/up.
	thumbstick: [number, number],

	pulse: (intensity: number, duration: number) => Promise<boolean>,
};

// The full list as it stands after the change is the instance's xrControllers.
export type OnXRControllerChange = (controller: WilsonXRController) => void;

export type OnXRButtonEvent = (data: {
	controller: WilsonXRController,
	name: XRButtonName,
	state: XRButtonState,
}) => void;

// The public controller object, plus the persistent buffers backing it. The matrices are held
// here rather than only on the controller so that losing tracking can null out the controller's
// fields without throwing them away.
type WilsonXRControllerData = {
	controller: WilsonXRController,
	targetRayMatrix: Float32Array,
	gripMatrix: Float32Array,
};

function createXRButtonState(): XRButtonState
{
	return {
		pressed: false,
		value: 0,
	};
}

type XRButtonOptions = {
	useButton?: true,
	buttonIconPath: string,
} | {
	useButton?: false,
};

export type XROptions = {
	renderFrame: RenderXRFrame,

	onEnter?: () => void,
	onExit?: () => void,
	onFrameStart?: OnXRFrameStart,
	onAvailabilityChange?: (isSupported: boolean) => void,
	onVisibilityChange?: (state: XRVisibilityState) => void,

	onControllerConnect?: OnXRControllerChange,
	onControllerDisconnect?: OnXRControllerChange,

	onButtonDown?: OnXRButtonEvent,
	onButtonUp?: OnXRButtonEvent,

	requiredFeatures?: string[],
	optionalFeatures?: string[],

	framebufferScale?: number;
	fixedFoveation?: number;
	targetFrameRate?: number;
} & XRButtonOptions;

export type WilsonGLOptions = WilsonOptions
	& (SingleShader | MultipleShaders)
	& { useWebGL2?: boolean }
	& { xrOptions?: XROptions}
	& {
		// Measures how long the GPU actually spends on drawFrame() calls. Off by default:
		// the queries are cheap but not free, and the underlying extension is unavailable
		// on plenty of configurations.
		useGpuTiming?: boolean,
	}

// Everything needed to finish a shader once the driver reports it's done compiling.
type PendingShader = {
	program: WebGLProgram,
	vertexShader: WebGLShader,
	fragShader: WebGLShader,
	vertexShaderSource: string,
	source: string,
	uniforms: UniformInitializers,
	callbacks: { resolve: () => void, reject: (error: Error) => void }[],

	// Restored as the current shader if this one turns out not to compile, so a failed load
	// leaves the previously working shader selected rather than a dead id.
	previousShaderId: ShaderProgramId,
};

// KHR_parallel_shader_compile only exposes this one constant.
const COMPLETION_STATUS_KHR = 0x91B1;

// What a pending shader's promise rejects with when the load is abandoned rather than failed,
// which lets whenAllShadersReady() tell "superseded by a newer load" apart from a shader that
// couldn't compile.
class ShaderSupersededError extends Error {}

export class WilsonGL extends Wilson
{
	gl: WebGLRenderingContext | WebGL2RenderingContext;

	#useWebGL2: boolean;

	#shaderPrograms: {[id: ShaderProgramId]: WebGLProgram} = {};

	#shaderProgramSources: {[id: ShaderProgramId]: string} = {};

	// The base class's destroyed flag is private to it, and the deferred shader polling needs
	// to know to stop.
	#destroyedGPU: boolean = false;

	#uniforms: {
		[id: ShaderProgramId]: {
			[name: string]: {
				location: WebGLUniformLocation,
				type: UniformType,
				value?: UniformValue
			}
		}
	} = {};

	// The built-in tile window uniforms from the vertex shader. They're kept apart from
	// #uniforms because that map is built by scanning the fragment shader source for
	// declarations, and these are declared in the vertex shader instead. Either location can
	// be null: a fragment shader that ignores uv lets the linker drop the whole chain.
	#tileUniforms: {
		[id: ShaderProgramId]: {
			scale: WebGLUniformLocation | null,
			center: WebGLUniformLocation | null
		}
	} = {};


	
	#useXRButton: boolean = false;
	#xrButtonIconPath?: string;
	#xrButton: HTMLElement | null = null;
	#xrButtonImg: HTMLImageElement | null = null;
	#xrButtonText: HTMLElement | null = null;

	// Null until the first check resolves, and null again for the duration of every recheck.
	#xrIsSupportedNow: boolean | null = null;

	#renderXRFrame: RenderXRFrame = () => {};

	// The single source of truth about the base layer. Its baseLayer is always the one the
	// current frame is rendering into, which is not necessarily the newest one handed to
	// updateRenderState(); #onXRFrame resyncs it from the session at the top of every frame.
	#xrData?: WilsonGLXRData;

	#xrRequiredFeatures: string[] = [];
	#xrOptionalFeatures: string[] = [];

	#xrFramebufferScale: number = 1;

	get xrFramebufferScale() { return this.#xrFramebufferScale; }
	set xrFramebufferScale(value: number)
	{
		if (value <= 0)
		{
			if (this.verbose)
			{
				console.warn("[Wilson] Setting xrFramebufferScale to a nonpositive value has no effect.");
			}

			return;
		}

		// Rebuilding the layer is expensive enough that it's worth not doing it for a write
		// that wouldn't change anything.
		if (value === this.#xrFramebufferScale)
		{
			return;
		}

		this.#xrFramebufferScale = value;

		if (!this.#xrData)
		{
			return;
		}

		// framebufferScaleFactor is fixed once a layer exists, so changing the render resolution
		// means building a replacement and swapping it in. That's allowed mid-session, but it
		// reallocates the swapchain and usually costs a frame or two, so this is a coarse quality
		// step to be debounced rather than a per-frame knob.
		this.#xrData.session.updateRenderState({
			baseLayer: this.#createXRBaseLayer(this.#xrData.session)
		});
	}

	#createXRBaseLayer(session: XRSession)
	{
		const baseLayer = new XRWebGLLayer(session, this.gl, {
			...XR_LAYER_OPTIONS,
			// Headsets can run in a low-res mode by default for headroom, so the native factor
			// ensures we're rendering all the pixels available, and the applet's own factor
			// scales down from there.
			framebufferScaleFactor: XRWebGLLayer.getNativeFramebufferScaleFactor(session)
				* this.#xrFramebufferScale
		});

		// Foveation is a property of the layer, so a replacement starts at the runtime's default
		// instead of inheriting what the layer it's replacing had.
		baseLayer.fixedFoveation = this.#xrFixedFoveation;

		return baseLayer;
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

	get xrSession() { return this.#xrData?.session; }
	get xrRefSpace() { return this.#xrData?.refSpace; }

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
		onAvailabilityChange: (isSupported: boolean) => void,
		onVisibilityChange: (state: XRVisibilityState) => void,
		onControllerConnect: OnXRControllerChange,
		onControllerDisconnect: OnXRControllerChange,
		onButtonDown: OnXRButtonEvent,
		onButtonUp: OnXRButtonEvent,
	} = {
		onEnter: () => {},
		onExit: () => {},
		onFrameStart: () => {},
		onAvailabilityChange: () => {},
		onVisibilityChange: () => {},
		onControllerConnect: () => {},
		onControllerDisconnect: () => {},
		onButtonDown: () => {},
		onButtonUp: () => {}
	};

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

	// The viewport of the eye currently being rendered, and null outside of a renderFrame call.
	get xrViewport() { return this.#xrViewport; }



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

	constructor(canvas: HTMLCanvasElement, options: WilsonGLOptions)
	{
		super(canvas, options);

		this.#useWebGL2 = options.useWebGL2 ?? true;

		this.#initXR(options.xrOptions);

		const getContextOptions: WebGLContextAttributes = {
			xrCompatible: true,
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

		this.#parallelCompileSupported = this.gl.getExtension("KHR_parallel_shader_compile") !== null;

		this.#initGpuTiming(options.useGpuTiming ?? false);

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

	#initXR(options?: XROptions)
	{
		this.#useXRButton = options?.useButton ?? false;
		this.#xrButtonIconPath = options?.useButton ? options.buttonIconPath : undefined;
		this.#initXRButton();

		navigator.xr?.addEventListener("devicechange", this.#onDeviceChange);

		// Chrome on Windows doesn't reliably fire devicechange when an OpenXR runtime starts
		// after the page has already checked, so a headset connected mid-session never shows
		// the button. Re-checking when the tab regains focus covers the usual flow of leaving
		// to connect the headset and coming back.
		window.addEventListener("focus", this.#onPageFocus);
		document.addEventListener("visibilitychange", this.#onPageFocus);

		this.#renderXRFrame = options?.renderFrame ?? (() => {});

		this.#xrCallbacks = {
			onEnter: options?.onEnter ?? (() => {}),
			onExit: options?.onExit ?? (() => {}),
			onFrameStart: options?.onFrameStart ?? (() => {}),
			onAvailabilityChange: options?.onAvailabilityChange ?? (() => {}),
			onVisibilityChange: options?.onVisibilityChange ?? (() => {}),
			onControllerConnect: options?.onControllerConnect ?? (() => {}),
			onControllerDisconnect: options?.onControllerDisconnect ?? (() => {}),
			onButtonDown: options?.onButtonDown ?? (() => {}),
			onButtonUp: options?.onButtonUp ?? (() => {})
		};

		// Deliberately after the callbacks are in place: the first check reports its result, and
		// an applet that passed onAvailabilityChange should hear about it.
		this.#checkXRSupport();

		this.#xrRequiredFeatures = options?.requiredFeatures ?? [];
		this.#xrOptionalFeatures = options?.optionalFeatures ?? [];


		this.#xrFramebufferScale = options?.framebufferScale ?? 1;

		// Foveated rendering defaults to on.
		this.#xrFixedFoveation = options?.fixedFoveation ?? 0.3;

		this.#xrTargetFrameRate = options?.targetFrameRate;
	}

	// Tracked separately from #xrIsSupportedNow, which every check resets to null before it
	// knows the answer, so that a check whose result matches the last one reported can tell.
	#lastReportedXRAvailability: boolean | null = null;

	#checkXRSupport()
	{
		this.#xrIsSupportedNow = null;

		(
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
					this.#xrButton.style.display = supported ? "flex" : "none";
				}

				// Rechecks happen on every devicechange and every time the page regains focus, so
				// most of them find exactly what the last one did; only actual changes are worth
				// reporting. The first check always is one, since availability starts unknown.
				if (supported !== this.#lastReportedXRAvailability)
				{
					this.#lastReportedXRAvailability = supported;

					this.#xrCallbacks.onAvailabilityChange(supported);
				}
			});
	}

	// Needs to be an arrow function to maintain its binding when passed to addEventListener
	#onDeviceChange = () =>
	{
		this.#checkXRSupport();
	};

	#onPageFocus = () =>
	{
		if (!document.hidden && this.#xrIsSupportedNow !== true && !this.inXR)
		{
			this.#checkXRSupport();
		}
	};

	#setXRButtonLoading(loading: boolean)
	{
		if (!this.#xrButton || !this.#xrButtonImg)
		{
			return;
		}

		if (this.#xrButtonText)
		{
			this.#xrButtonText.textContent = loading ? "Loading..." : "Enter VR";
		}

		this.#xrButton.classList.toggle("WILSON_xr-button-loading", loading);
	}

	#initXRButton()
	{
		if (this.#useXRButton)
		{
			this.#xrButton = document.createElement("div");
			this.#xrButton.classList.add("WILSON_xr-button");
			this.#xrButton.classList.add("WILSON_button");

			// If #xrIsSupportedNow is a boolean already, this will correctly set the style.
			// If it's still null, it will keep it hidden until #checkXRSupport finishes.
			this.#xrButton.style.display = this.#xrIsSupportedNow ? "flex" : "none";

			this.buttonContainer.appendChild(this.#xrButton);

			const img = document.createElement("img");
			img.src = this.#xrButtonIconPath as string;
			this.#xrButton.appendChild(img);
			this.#xrButtonImg = img;

			const text = document.createElement("div");
			text.classList.add("WILSON_button-text");
			text.textContent = "Enter VR";
			this.#xrButton.appendChild(text);
			this.#xrButtonText = text;

			this.addFullscreenViewTransitionElement({
				element: this.#xrButton,
				hideInFullscreen: true,
			});

			this.#xrButton.addEventListener("click", async () =>
			{
				this.#setXRButtonLoading(true);

				// Resolves once the session is running, or immediately on any failure, so the
				// icon never stays spinning after a cancelled or rejected launch.
				const result = await this.enterXR();

				if (!result)
				{
					window.alert("Failed to enter VR. Try reconnecting your headset and restarting your browser.");
				}

				this.#setXRButtonLoading(false);
			});
		}
	}



	// Set when drawFrame() had to bail because the shader wasn't linked yet, so that
	// #finalizeShader can honor the request as soon as it can. Without this, a caller that
	// only draws when something changes would drop its one and only draw and stay blank.
	#drawFrameRequestedWhilePending: boolean = false;

	drawFrame()
	{
		// A shader that's still linking has no program to draw with.
		if (this.#pendingShaders[this.#currentShaderId])
		{
			this.#pollPendingShaders();

			if (this.#pendingShaders[this.#currentShaderId])
			{
				this.#drawFrameRequestedWhilePending = true;
				return;
			}
		}

		this.beginGpuTimer();

		this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);

		this.endGpuTimer();
	}

	#numShaders = 0;
	#currentShaderId: ShaderProgramId = "0";
	#currentProgram: WebGLProgram | null = null;

	// KHR_parallel_shader_compile lets the driver compile and link on its own threads, but
	// any question about the result -- COMPILE_STATUS, LINK_STATUS, getAttribLocation,
	// getUniformLocation -- blocks the main thread until it's finished, which is the exact
	// stall the extension exists to remove. So everything after linkProgram is deferred
	// until COMPLETION_STATUS_KHR says the program is done.
	#parallelCompileSupported: boolean = false;
	#pendingShaders: {[id: ShaderProgramId]: PendingShader} = {};
	#pendingUniforms: {[id: ShaderProgramId]: UniformInitializers} = {};
	#pollPendingShadersScheduled: boolean = false;

	static #vertexShaderSource = /* glsl*/`
		attribute vec3 position;
		varying vec2 uv;
		varying vec2 uvTile;

		// The window of the image that this draw covers, which is all of it except when
		// readHighResPixels() is rendering a tile. Keeping it here rather than in the fragment
		// shader is what lets tiled rendering work without any shader knowing about it: uv
		// spans the whole image no matter which tile is being drawn.
		uniform vec2 wilsonUvScale;
		uniform vec2 wilsonUvCenter;

		void main(void)
		{
			gl_Position = vec4(position, 1.0);

			//Interpolate quad coordinates in the fragment shader.
			uv = position.xy * wilsonUvScale + wilsonUvCenter;

			// Always the full -1 to 1 range, so a shader sampling a framebuffer that was drawn
			// by an earlier pass of the same tile has coordinates that line up with it.
			uvTile = position.xy;
		}
	`;

	get numPendingShaders() { return Object.keys(this.#pendingShaders).length; }

	shaderIsReady(id: ShaderProgramId = this.#currentShaderId)
	{
		return this.#shaderPrograms[id] !== undefined && this.#pendingShaders[id] === undefined;
	}

	// Resolves once the shader is drawable, or rejects with the compile/link error. Since
	// compilation is deferred off the main thread, a shader is generally not drawable in the
	// same tick that loadShader() is called, and callers that only draw on demand need to know
	// when to ask for that first frame.
	shaderReady(id: ShaderProgramId = this.#currentShaderId): Promise<void>
	{
		if (this.shaderIsReady(id))
		{
			return Promise.resolve();
		}

		const pending = this.#pendingShaders[id];

		if (!pending)
		{
			return Promise.reject(new Error(`[Wilson] No shader with id ${id}.`));
		}

		return new Promise((resolve, reject) => pending.callbacks.push({ resolve, reject }));
	}

	// Resolves once nothing is left compiling, or rejects with the first compile/link error.
	// Shaders requested while this is being awaited are waited on too, so a load kicked off in
	// response to the first batch finishing doesn't slip past an in-flight await, and calling
	// this again always reflects what's pending at that moment.
	async allShadersReady(): Promise<void>
	{
		while (this.numPendingShaders !== 0)
		{
			const results = await Promise.allSettled(
				Object.keys(this.#pendingShaders).map(id => this.shaderReady(id))
			);

			for (const result of results)
			{
				// A shader that was replaced mid-flight isn't a failure -- the load that
				// replaced it is pending in its place, and the next pass waits on that.
				if (
					result.status === "rejected"
					&& !(result.reason instanceof ShaderSupersededError)
				) {
					throw result.reason;
				}
			}
		}
	}

	loadShader({
		id = this.#numShaders.toString(),
		shader,
		uniforms = {}
	}: {
		id?: ShaderProgramId,
		shader: string,
		uniforms?: UniformInitializers
	}) {
		const vertexShaderSource = WilsonGL.#vertexShaderSource;

		// A second load of the same id while the first is still in flight: the old attempt
		// is never going to be used, so drop it rather than letting it finalize on top of us.
		this.#discardPendingShader(id);

		const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
		const fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);

		if (!vertexShader || !fragShader)
		{
			throw new Error(`[Wilson] Couldn't create shader: ${vertexShader}, ${fragShader}`);
		}

		const shaderProgram = this.gl.createProgram();

		if (!shaderProgram)
		{
			throw new Error(`[Wilson] Couldn't create shader program. Full shader source: ${shader}`);
		}

		this.#shaderProgramSources[id] = shader;
		this.#numShaders++;

		this.gl.attachShader(shaderProgram, vertexShader);
		this.gl.attachShader(shaderProgram, fragShader);

		this.gl.shaderSource(vertexShader, vertexShaderSource);
		this.gl.shaderSource(fragShader, shader);

		this.gl.compileShader(vertexShader);
		this.gl.compileShader(fragShader);

		this.gl.linkProgram(shaderProgram);

		this.#pendingShaders[id] = {
			program: shaderProgram,
			vertexShader,
			fragShader,
			vertexShaderSource,
			source: shader,
			uniforms,
			callbacks: [],
			previousShaderId: this.#currentShaderId,
		};

		// loadShader has always made its shader the current one, and callers rely on that to
		// address it with the default shader argument of setUniforms. That stays true while
		// it's pending; #useProgram just has nothing to bind yet.
		this.#currentShaderId = id;

		if (this.#parallelCompileSupported)
		{
			this.#schedulePollPendingShaders();
		}

		else
		{
			// Without the extension there's nothing to wait for -- the driver has already
			// done the work synchronously inside compileShader/linkProgram.
			this.#finalizeShader(id);
		}
	}

	#schedulePollPendingShaders()
	{
		if (this.#pollPendingShadersScheduled || this.numPendingShaders === 0)
		{
			return;
		}

		this.#pollPendingShadersScheduled = true;

		// requestAnimationFrame keeps the check in step with rendering, but it never fires on
		// a hidden tab, and compilation still has to finish there -- whenShaderReady() is what
		// readHighResPixels() waits on, and that runs happily in the background. So a timer
		// races the frame callback and whichever arrives first does the work.
		let alreadyRan = false;

		const run = () =>
		{
			if (alreadyRan)
			{
				return;
			}

			alreadyRan = true;
			this.#pollPendingShadersScheduled = false;

			if (this.#destroyedGPU)
			{
				return;
			}

			this.#pollPendingShaders();
			this.#schedulePollPendingShaders();
		};

		requestAnimationFrame(run);
		setTimeout(run, 16);
	}

	#pollPendingShaders()
	{
		for (const id of Object.keys(this.#pendingShaders))
		{
			const pending = this.#pendingShaders[id];

			if (
				!this.#parallelCompileSupported
				|| this.gl.getProgramParameter(pending.program, COMPLETION_STATUS_KHR)
			) {
				// One shader failing to compile must not stop the others from finalizing, so
				// the error is rethrown out of band: still an uncaught error in the console,
				// but not one that unwinds the sweep and kills the polling loop with it.
				try
				{
					this.#finalizeShader(id);
				}

				catch(error)
				{
					setTimeout(() => { throw error; });
				}
			}
		}
	}

	#discardPendingShader(id: ShaderProgramId)
	{
		const pending = this.#pendingShaders[id];

		if (!pending)
		{
			return;
		}

		delete this.#pendingShaders[id];

		this.gl.deleteShader(pending.vertexShader);
		this.gl.deleteShader(pending.fragShader);
		this.gl.deleteProgram(pending.program);

		const error = new ShaderSupersededError(`[Wilson] Shader with id ${id} was replaced before it finished loading.`);

		for (const { reject } of pending.callbacks)
		{
			reject(error);
		}
	}

	// Everything that has to wait for the driver: status checks, attribute and uniform
	// locations, and the buffer setup that depends on them.
	#finalizeShader(id: ShaderProgramId)
	{
		const pending = this.#pendingShaders[id];

		if (!pending)
		{
			return;
		}

		const {
			program,
			vertexShader,
			fragShader,
			vertexShaderSource,
			source: shader,
			uniforms,
			callbacks,
			previousShaderId
		} = pending;

		delete this.#pendingShaders[id];

		const fail = (message: string) =>
		{
			this.gl.deleteShader(vertexShader);
			this.gl.deleteShader(fragShader);
			this.gl.deleteProgram(program);

			delete this.#pendingUniforms[id];

			// Don't leave a broken shader selected -- go back to whatever was current before.
			if (this.#currentShaderId === id && previousShaderId !== id)
			{
				this.useShader(previousShaderId);
			}

			const error = new Error(message);

			for (const { reject } of callbacks)
			{
				reject(error);
			}

			// Callers that never asked for the promise still need to hear about this.
			if (callbacks.length === 0)
			{
				throw error;
			}

			return error;
		};

		if (!this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS))
		{
			const infoLog = this.gl.getShaderInfoLog(vertexShader) ?? "";
			this.#logShaderSource(vertexShaderSource, infoLog);

			console.groupCollapsed(`[Wilson] Full non-compiled vertex shader source:`);
			console.log(shader);
			console.groupEnd();

			fail(`[Wilson] Couldn't compile vertex shader with id ${id}. ${infoLog}`);
			return;
		}

		if (!this.gl.getShaderParameter(fragShader, this.gl.COMPILE_STATUS))
		{
			const infoLog = this.gl.getShaderInfoLog(fragShader) ?? "";
			this.#logShaderSource(shader, infoLog);

			console.groupCollapsed(`[Wilson] Full non-compiled fragment shader source:`);
			console.log(shader);
			console.groupEnd();

			fail(`[Wilson] Couldn't compile fragment shader with id ${id}. ${infoLog}`);
			return;
		}

		if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS))
		{
			fail(`[Wilson] Couldn't link shader program with id ${id}: ${this.gl.getProgramInfoLog(program)}`);
			return;
		}

		const positionAttribute = this.gl.getAttribLocation(program, "position");

		if (positionAttribute === -1)
		{
			console.groupCollapsed(`[Wilson] Full non-compiled fragment shader source:`);
			console.log(shader);
			console.groupEnd();

			fail(`[Wilson] Couldn't get position attribute for shader with id ${id}.`);
			return;
		}

		// The program is good, so it can replace whatever was under this id before. Reloading
		// a shader keeps drawing the old one right up to this point.
		const oldProgram = this.#shaderPrograms[id];

		if (oldProgram)
		{
			if (this.#currentProgram === oldProgram)
			{
				this.#currentProgram = null;
			}

			this.gl.deleteProgram(oldProgram);
		}

		this.#shaderPrograms[id] = program;
		this.#shaders.push(vertexShader, fragShader);

		this.#useProgram(program);

		// Uniforms start out as zero, which would collapse uv to a single point, so the
		// identity window has to be uploaded before this program can draw anything at all.
		this.#tileUniforms[id] = {
			scale: this.gl.getUniformLocation(program, "wilsonUvScale"),
			center: this.gl.getUniformLocation(program, "wilsonUvCenter"),
		};

		this.#setTileWindowForProgram(id, 1, 1, 0, 0);

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

		this.gl.enableVertexAttribArray(positionAttribute);
		this.gl.vertexAttribPointer(positionAttribute, 3, this.gl.FLOAT, false, 0, 0);

		// Finalizing can land in the middle of an XR frame, since drawFrame() polls. Resetting
		// to the canvas viewport there would render the eye into the wrong part of the layer.
		if (this.#xrViewport)
		{
			const { x, y, width, height } = this.#xrViewport;
			this.gl.viewport(x, y, width, height);
		}

		else
		{
			this.gl.viewport(0, 0, this.canvasWidth, this.canvasHeight);
		}



		// Initialize the uniforms. Anything set while the shader was pending was buffered
		// rather than uploaded, and those values win over the initializers.
		this.#uniforms[id] = {};

		const bufferedUniforms = this.#pendingUniforms[id] ?? {};
		delete this.#pendingUniforms[id];

		const allUniforms = { ...uniforms, ...bufferedUniforms };

		for (const [name, value] of Object.entries(allUniforms))
		{
			const location = this.gl.getUniformLocation(program, name);

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
			this.setUniforms({ [name]: value }, id);
		}

		// Make sure the program bound at the end is the one the caller expects, which is not
		// necessarily this one if several shaders were in flight at once.
		if (this.#shaderPrograms[this.#currentShaderId])
		{
			this.#useProgram(this.#shaderPrograms[this.#currentShaderId]);
		}

		for (const { resolve } of callbacks)
		{
			resolve();
		}

		// Replay a draw that was dropped while this shader was compiling, so callers that
		// draw on demand rather than every frame don't need to know any of this happened.
		if (this.#drawFrameRequestedWhilePending && !this.#pendingShaders[this.#currentShaderId])
		{
			this.#drawFrameRequestedWhilePending = false;
			this.drawFrame();
		}
	}

	// GPU timing. EXT_disjoint_timer_query measures how long the GPU spent on a range of
	// commands, which is the only honest way to profile a fragment-bound renderer: rAF deltas
	// tell you when frames landed, not how much headroom is left, and they cap out at the
	// display refresh rate no matter how fast the shader is.
	//
	// Results come back asynchronously -- typically one to three frames later -- so queries
	// are pooled and polled rather than waited on. Reading a result before it's available
	// would stall the pipeline and defeat the purpose.

	#gpuTimerExtension: any = null;
	#gpuTimerUsesWebGL2Api: boolean = false;
	#gpuTimerPool: WebGLQuery[] = [];
	#gpuTimerPending: WebGLQuery[] = [];
	#gpuTimerActive: WebGLQuery | null = null;
	#gpuTimerDepth: number = 0;
	#lastGpuFrameTime: number | undefined = undefined;
	#averageGpuFrameTime: number | undefined = undefined;

	// If results stop arriving (a lost or hung context), stop allocating queries forever.
	#maxPendingGpuTimers: number = 8;

	useGpuTiming: boolean = false;

	// Weight of each new sample in the running average. Low enough to ride out a single
	// expensive frame, high enough to follow a real change within a few frames.
	gpuTimingSmoothing: number = 0.15;

	get gpuTimingSupported() { return this.#gpuTimerExtension !== null; }

	// Milliseconds of GPU time for the most recently completed measurement, or undefined if
	// none has finished yet.
	get lastGpuFrameTime() { return this.#lastGpuFrameTime; }

	// Exponential moving average of the above, which is what a resolution controller wants.
	get averageGpuFrameTime() { return this.#averageGpuFrameTime; }

	#initGpuTiming(useGpuTiming: boolean)
	{
		this.useGpuTiming = useGpuTiming;

		// The WebGL2 extension reuses the core query entry points; the WebGL1 one brings its
		// own. Everything else about them is the same.
		if (this.gl instanceof WebGL2RenderingContext)
		{
			this.#gpuTimerExtension = this.gl.getExtension("EXT_disjoint_timer_query_webgl2");
			this.#gpuTimerUsesWebGL2Api = this.#gpuTimerExtension !== null;
		}

		if (!this.#gpuTimerExtension)
		{
			this.#gpuTimerExtension = this.gl.getExtension("EXT_disjoint_timer_query");
			this.#gpuTimerUsesWebGL2Api = false;
		}

		if (!this.#gpuTimerExtension && useGpuTiming && this.verbose)
		{
			console.warn("[Wilson] GPU timing was requested, but no timer query extension is available. Browsers often withhold it for fingerprinting reasons.");
		}
	}

	#createGpuTimerQuery(): WebGLQuery | null
	{
		return this.#gpuTimerUsesWebGL2Api
			? (this.gl as WebGL2RenderingContext).createQuery()
			: this.#gpuTimerExtension.createQueryEXT();
	}

	#deleteGpuTimerQuery(query: WebGLQuery)
	{
		if (this.#gpuTimerUsesWebGL2Api)
		{
			(this.gl as WebGL2RenderingContext).deleteQuery(query);
		}

		else
		{
			this.#gpuTimerExtension.deleteQueryEXT(query);
		}
	}

	// Opens a GPU timing range. Nested calls are folded into the outermost one, since only a
	// single TIME_ELAPSED query may be active at a time -- so wrapping several drawFrame()
	// calls (both eyes of an XR frame, say) measures them together.
	beginGpuTimer()
	{
		if (!this.useGpuTiming || !this.#gpuTimerExtension)
		{
			return;
		}

		if (this.#gpuTimerDepth++ > 0)
		{
			return;
		}

		this.pollGpuTimers();

		const query = this.#gpuTimerPool.pop() ?? this.#createGpuTimerQuery();

		if (!query)
		{
			this.#gpuTimerDepth = 0;
			return;
		}

		this.#gpuTimerActive = query;

		if (this.#gpuTimerUsesWebGL2Api)
		{
			(this.gl as WebGL2RenderingContext).beginQuery(
				this.#gpuTimerExtension.TIME_ELAPSED_EXT,
				query
			);
		}

		else
		{
			this.#gpuTimerExtension.beginQueryEXT(
				this.#gpuTimerExtension.TIME_ELAPSED_EXT,
				query
			);
		}
	}

	endGpuTimer()
	{
		if (!this.#gpuTimerActive || this.#gpuTimerDepth === 0)
		{
			return;
		}

		if (--this.#gpuTimerDepth > 0)
		{
			return;
		}

		if (this.#gpuTimerUsesWebGL2Api)
		{
			(this.gl as WebGL2RenderingContext).endQuery(this.#gpuTimerExtension.TIME_ELAPSED_EXT);
		}

		else
		{
			this.#gpuTimerExtension.endQueryEXT(this.#gpuTimerExtension.TIME_ELAPSED_EXT);
		}

		this.#gpuTimerPending.push(this.#gpuTimerActive);
		this.#gpuTimerActive = null;

		// Drop the oldest measurements rather than growing without bound. These are deleted
		// rather than pooled because their results were never read, and reusing a query whose
		// result is still outstanding is asking for trouble.
		while (this.#gpuTimerPending.length > this.#maxPendingGpuTimers)
		{
			this.#deleteGpuTimerQuery(this.#gpuTimerPending.shift() as WebGLQuery);
		}
	}

	// Collects whatever results the driver has finished. Called automatically by
	// beginGpuTimer, and safe to call directly if timing without drawing.
	pollGpuTimers()
	{
		if (!this.#gpuTimerExtension || this.#gpuTimerPending.length === 0)
		{
			return;
		}

		// A disjoint means the GPU was interrupted (clock change, context switch) and every
		// in-flight timing is untrustworthy. Reading the flag also clears it.
		if (this.gl.getParameter(this.#gpuTimerExtension.GPU_DISJOINT_EXT))
		{
			for (const query of this.#gpuTimerPending)
			{
				this.#deleteGpuTimerQuery(query);
			}

			this.#gpuTimerPending = [];
			return;
		}

		// Results complete in order, so the first one that isn't ready ends the sweep.
		while (this.#gpuTimerPending.length > 0)
		{
			const query = this.#gpuTimerPending[0];

			const available = this.#gpuTimerUsesWebGL2Api
				? (this.gl as WebGL2RenderingContext).getQueryParameter(
					query,
					(this.gl as WebGL2RenderingContext).QUERY_RESULT_AVAILABLE
				)
				: this.#gpuTimerExtension.getQueryObjectEXT(
					query,
					this.#gpuTimerExtension.QUERY_RESULT_AVAILABLE_EXT
				);

			if (!available)
			{
				return;
			}

			this.#gpuTimerPending.shift();

			const nanoseconds = this.#gpuTimerUsesWebGL2Api
				? (this.gl as WebGL2RenderingContext).getQueryParameter(
					query,
					(this.gl as WebGL2RenderingContext).QUERY_RESULT
				)
				: this.#gpuTimerExtension.getQueryObjectEXT(
					query,
					this.#gpuTimerExtension.QUERY_RESULT_EXT
				);

			this.#gpuTimerPool.push(query);

			this.#lastGpuFrameTime = nanoseconds / 1000000;

			this.#averageGpuFrameTime = this.#averageGpuFrameTime === undefined
				? this.#lastGpuFrameTime
				: this.#averageGpuFrameTime
					+ this.gpuTimingSmoothing * (this.#lastGpuFrameTime - this.#averageGpuFrameTime);
		}
	}

	resetGpuTimings()
	{
		this.#lastGpuFrameTime = undefined;
		this.#averageGpuFrameTime = undefined;
	}

	#destroyGpuTiming()
	{
		if (!this.#gpuTimerExtension)
		{
			return;
		}

		// Leaving a query open would keep it alive past the delete.
		if (this.#gpuTimerActive)
		{
			this.#gpuTimerDepth = 1;
			this.endGpuTimer();
		}

		for (const query of [...this.#gpuTimerPool, ...this.#gpuTimerPending])
		{
			this.#deleteGpuTimerQuery(query);
		}

		this.#gpuTimerPool = [];
		this.#gpuTimerPending = [];
		this.#gpuTimerActive = null;
		this.#gpuTimerExtension = null;
	}



	setUniform(name: string, value: UniformValue, shader: ShaderProgramId = this.#currentShaderId)
	{
		if (this.#pendingShaders[shader])
		{
			(this.#pendingUniforms[shader] ??= {})[name] = value;
			return;
		}

		// A shader that failed to compile leaves neither a pending entry nor a uniform map.
		if (!this.#uniforms[shader])
		{
			return;
		}

		this.#useProgram(this.#shaderPrograms[shader]);

		if (this.#uniforms[shader][name] !== undefined)
		{
			const { location, type } = this.#uniforms[shader][name];
			const uniformFunction = uniformFunctions[type];
			this.#uniforms[shader][name].value = value;
			uniformFunction(this.gl, location, value);
		}

		this.#restoreCurrentProgram();
	}

	setUniforms(uniforms: UniformInitializers, shader: ShaderProgramId = this.#currentShaderId)
	{
		if (this.#pendingShaders[shader])
		{
			Object.assign(this.#pendingUniforms[shader] ??= {}, uniforms);
			return;
		}

		// A shader that failed to compile leaves neither a pending entry nor a uniform map.
		if (!this.#uniforms[shader])
		{
			return;
		}

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

		this.#restoreCurrentProgram();
	}

	useShader(id: ShaderProgramId)
	{
		this.#currentShaderId = id;

		if (this.#shaderPrograms[id])
		{
			this.#useProgram(this.#shaderPrograms[id]);
		}
	}

	// The current shader can be pending, in which case there's no program to go back to and
	// whatever is bound stays bound -- nothing will be drawn with it until it finalizes.
	#restoreCurrentProgram()
	{
		const program = this.#shaderPrograms[this.#currentShaderId];

		if (program)
		{
			this.#useProgram(program);
		}
	}

	#useProgram(program: WebGLProgram | undefined)
	{
		if (!program || program === this.#currentProgram)
		{
			return;
		}

		this.#currentProgram = program;
		this.gl.useProgram(program);
	}

	// Assumes the program is already bound, since the only callers are in the middle of
	// walking a set of them and rebinding per uniform would be wasted work.
	#setTileWindowForProgram(
		id: ShaderProgramId,
		scaleX: number,
		scaleY: number,
		centerX: number,
		centerY: number
	) {
		const locations = this.#tileUniforms[id];

		if (!locations)
		{
			return;
		}

		if (locations.scale)
		{
			this.gl.uniform2f(locations.scale, scaleX, scaleY);
		}

		if (locations.center)
		{
			this.gl.uniform2f(locations.center, centerX, centerY);
		}
	}

	// Uniform values live on the program, not the context, so every shader that a tile might
	// be drawn with needs its own copy. Doing all of them means a multi-pass render callback
	// can switch shaders mid-tile without having to say which ones it plans to use.
	#setTileWindow(scaleX: number, scaleY: number, centerX: number, centerY: number)
	{
		for (const id of Object.keys(this.#shaderPrograms))
		{
			this.#useProgram(this.#shaderPrograms[id]);
			this.#setTileWindowForProgram(id, scaleX, scaleY, centerX, centerY);
		}

		this.#restoreCurrentProgram();
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
		if (this.inXR)
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
			this.gl.viewport(0, 0, this.canvasWidth, this.canvasHeight);
			return;
		}

		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.#framebuffers[id]);
		const { width, height } = this.#textures[id];
		this.gl.viewport(0, 0, width, height);
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

	// Omitting data, or passing null, reallocates the texture at its current size with every
	// channel zeroed, which is how you throw away what's in it.
	setTexture({
		id,
		data = null,
	}: {
		id: string,
		data?: Uint8Array | Float32Array | TexImageSource | null
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

		// texImage2D() with null is meant to hand back zeroed storage, but browsers are free
		// to skip the reallocation when the size and format haven't changed, which leaves
		// whatever was in the texture sitting there -- with no GL error to say so. Uploading
		// the zeros is the only way to be sure it's actually been cleared.
		const pixels = data === null
			? (this.#textures[id].type === "float"
				? new Float32Array(this.#textures[id].width * this.#textures[id].height * 4)
				: new Uint8Array(this.#textures[id].width * this.#textures[id].height * 4))
			: data;

		if (pixels instanceof Uint8Array || pixels instanceof Float32Array)
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
				pixels
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
				pixels
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

			this.downloadBlob(blob, filename);
		});
	}

	// Rendering a big image in a single draw stalls the GPU for long enough that the
	// compositor stops answering, and the readPixels that has to follow it blocks the main
	// thread for the entire time. Both problems come from the size of one operation, so both
	// go away if the image is rendered as a grid of ordinary-sized tiles with a yield in
	// between: every tile is about a frame's worth of work, and the page stays responsive the
	// whole way through. It also lifts the resolution ceiling, since no single texture ever
	// has to be as large as the finished image.

	// Two of these at once would interleave their tiles and fight over the same GL state, so
	// a second call waits for the first to finish instead of corrupting both.
	#highResRenderQueue: Promise<unknown> = Promise.resolve();

	#queueHighResRender<T>(render: () => Promise<T>): Promise<T>
	{
		// Runs on rejection too -- one caller's failure shouldn't strand everything behind it.
		const result = this.#highResRenderQueue.then(render, render);

		this.#highResRenderQueue = result.catch(() => {});

		return result;
	}

	#getHighResDimensions(resolution: number)
	{
		return {
			width: Math.round(
				Math.sqrt(resolution * resolution * this.canvasWidth / this.canvasHeight)
			),

			height: Math.round(
				Math.sqrt(resolution * resolution * this.canvasHeight / this.canvasWidth)
			),
		};
	}

	#getHighResTileSize(tileSize?: number)
	{
		const maxTileSize = this.gl.getParameter(this.gl.MAX_TEXTURE_SIZE) as number;

		return Math.max(1, Math.min(tileSize ?? DEFAULT_HIGH_RES_TILE_SIZE, maxTileSize));
	}

	// A tile can only be drawn with a shader that's finished linking, and with a custom
	// render callback there's no telling which ones those are.
	//
	// This runs before every tile, not just once at the start. drawFrame() quietly skips the
	// draw when its shader is pending, which is harmless for a canvas that will redraw next
	// frame but not here: the tile would go into the image undrawn. A reload landing partway
	// through a render is exactly how that happens, and a render now spans many tasks, so
	// there is plenty of room for one to land.
	async #highResShadersReady(render: RenderHighResTile | undefined, shaderId: ShaderProgramId)
	{
		if (render)
		{
			await this.allShadersReady();
			return;
		}

		// Waiting on whatever is pending under this id can itself be superseded by another
		// reload, so this waits the whole sequence out rather than just the first one.
		while (this.#pendingShaders[shaderId])
		{
			try
			{
				await this.shaderReady(shaderId);
			}

			catch(ex)
			{
				if (!(ex instanceof ShaderSupersededError))
				{
					throw ex;
				}
			}
		}
	}

	// Between tiles, so that input handlers, timers, and animation frames get to run instead
	// of sitting behind a render that can take minutes. A message to ourselves is the cheapest
	// way to reach the back of the task queue: setTimeout would be clamped to 4ms once nested,
	// which at a few thousand tiles costs more than the render, and scheduler.yield() resumes
	// at a priority that starves everything else the page had queued -- measurably so, and
	// with no throughput to show for it.
	#yieldToBrowser(): Promise<void>
	{
		return new Promise(resolve =>
		{
			const channel = new MessageChannel();

			channel.port1.addEventListener("message", () =>
			{
				channel.port1.close();
				channel.port2.close();

				resolve();
			});

			channel.port1.start();
			channel.port2.postMessage(null);
		});
	}

	async #renderHighResTiles({
		width,
		height,
		tileSize,
		format,
		uniforms,
		render,
		onTile,
	}: {
		width: number,
		height: number,
		tileSize: number,
		format: "unsignedByte" | "float",
		uniforms: UniformInitializers,
		render: RenderHighResTile,
		onTile: (tile: HighResTile) => void,
	}) {
		const previousFramebufferId = this.#currentFramebufferId;
		const previousTextureId = this.#currentTextureId;
		const previousUseGpuTiming = this.useGpuTiming;

		// The render is spread over many tasks, so the app can call useShader() or reload a
		// shader in the middle of one. Pinning what was current when the render started is
		// what makes "it uses the current shader" mean anything: without it, half an image
		// can come out drawn with one program and half with another.
		const shaderId = this.#currentShaderId;
		const previousShaderId = shaderId;

		// Identity rather than id, since a reload keeps the id and swaps the program.
		const pinnedProgram = this.#shaderPrograms[shaderId];
		let warnedAboutReload = false;

		// Tiles aren't frames, and letting them into the running average would make it
		// meaningless to anything reading it to pick a live resolution.
		this.useGpuTiming = false;

		// Every tile is drawn at this size, including the ones that hang off the right and top
		// edges when the image doesn't divide evenly -- those just have the part past the edge
		// thrown away instead of being drawn smaller. Keeping the size fixed is what lets a
		// multi-pass callback allocate its own framebuffers once and never think about the
		// edges: useFramebuffer() takes the viewport from the texture, so every pass of every
		// tile lines up with every other one for free.
		const tileWidth = Math.min(tileSize, width);
		const tileHeight = Math.min(tileSize, height);

		this.createFramebufferTexturePair({
			id: HIGH_RES_FRAMEBUFFER_ID,
			width: tileWidth,
			height: tileHeight,
			textureType: format,
		});

		try
		{
			tiles: for (let y = 0; y < height; y += tileHeight)
			{
				for (let x = 0; x < width; x += tileWidth)
				{
					// destroy() can land between tiles now that this yields, and every shader
					// and framebuffer the render was using is gone by the time it returns.
					if (this.#destroyedGPU)
					{
						break tiles;
					}

					await this.#highResShadersReady(render, shaderId);

					// Waiting above keeps the image whole, but it can't make the two halves
					// match: everything already rendered used the old program. Worth saying so
					// rather than handing back an image that quietly mixes two shaders.
					if (
						this.verbose
						&& !warnedAboutReload
						&& this.#shaderPrograms[shaderId] !== pinnedProgram
					) {
						warnedAboutReload = true;

						console.warn(`[Wilson] The shader with id ${shaderId} was reloaded while a high-res frame was rendering, so the tiles drawn before the reload used the old shader and the rest used the new one. Await readHighResPixels()/downloadHighResFrame() before reloading.`);
					}

					const readWidth = Math.min(tileWidth, width - x);
					const readHeight = Math.min(tileHeight, height - y);

					const pixels = this.#renderHighResTile({
						shaderId,
						x,
						y,
						tileWidth,
						tileHeight,
						readWidth,
						readHeight,
						width,
						height,
						format,
						uniforms,
						render,
					});

					onTile({
						pixels,
						col: x,

						// x and y count up from the bottom left the way WebGL does, and images
						// count down from the top left.
						row: height - y - readHeight,

						width: readWidth,
						height: readHeight,
					});

					await this.#yieldToBrowser();
				}
			}
		}

		finally
		{
			// If destroy() got here first there's nothing left to put back, and asking for the
			// framebuffer that was current before would just throw.
			if (!this.#destroyedGPU)
			{
				this.deleteFramebufferTexturePair(HIGH_RES_FRAMEBUFFER_ID);

				this.useGpuTiming = previousUseGpuTiming;
				this.useShader(previousShaderId);

				// Deleting the pair reverts the binding to the canvas but leaves the
				// tile-sized viewport in place, and useFramebuffer() is a no-op when handed
				// the id it already has -- which is exactly the case when the render started
				// on the canvas. Pointing the cached id at the framebuffer that no longer
				// exists forces a real rebind.
				this.#currentFramebufferId = HIGH_RES_FRAMEBUFFER_ID;
				this.useFramebuffer(previousFramebufferId);

				this.useTexture(previousTextureId);
			}
		}
	}

	// Everything from binding the tile framebuffer to reading it back stays in one
	// synchronous run. An animation frame that landed in the middle of it would draw the
	// canvas with this tile's uv window and uniform overrides still applied.
	#renderHighResTile({
		shaderId,
		x,
		y,
		tileWidth,
		tileHeight,
		readWidth,
		readHeight,
		width,
		height,
		format,
		uniforms,
		render,
	}: {
		shaderId: ShaderProgramId,
		x: number,
		y: number,
		tileWidth: number,
		tileHeight: number,
		readWidth: number,
		readHeight: number,
		width: number,
		height: number,
		format: "unsignedByte" | "float",
		uniforms: UniformInitializers,
		render: RenderHighResTile,
	}): Uint8Array | Float32Array {
		const previousFramebufferId = this.#currentFramebufferId;
		const previousTextureId = this.#currentTextureId;
		const previousShaderId = this.#currentShaderId;

		// The app may have drawn with something else between tiles; this tile is still the
		// pinned shader's. A render callback is free to switch to whatever it likes from here.
		this.useShader(shaderId);

		const uniformNames = Object.keys(uniforms);
		const previousUniforms: UniformInitializers = {};

		for (const name of uniformNames)
		{
			const uniform = this.#uniforms[shaderId]?.[name];

			if (uniform?.value !== undefined)
			{
				previousUniforms[name] = uniform.value;
			}
		}

		// This also sets the viewport to the tile, since useFramebuffer() takes it from the
		// texture the framebuffer is backed by.
		this.useFramebuffer(HIGH_RES_FRAMEBUFFER_ID);

		// The quad is always the full viewport; the window is what places it in the image.
		// Deriving it from the tile's pixel rectangle rather than its index is what keeps the
		// tiles that hang off the edge lined up with the rest.
		this.#setTileWindow(
			tileWidth / width,
			tileHeight / height,
			-1 + (2 * x + tileWidth) / width,
			-1 + (2 * y + tileHeight) / height
		);

		if (uniformNames.length !== 0)
		{
			this.setUniforms(uniforms, shaderId);
		}

		render({
			framebufferId: HIGH_RES_FRAMEBUFFER_ID,
			width: tileWidth,
			height: tileHeight,
		});

		// A multi-pass callback can finish with any of its own framebuffers bound, and the
		// tile is the one that needs reading.
		this.useFramebuffer(HIGH_RES_FRAMEBUFFER_ID);

		// Only the part of the tile that's actually inside the image.
		const pixels = this.readPixels({
			row: 0,
			col: 0,
			width: readWidth,
			height: readHeight,
			format,
		});

		this.#setTileWindow(1, 1, 0, 0);

		if (uniformNames.length !== 0)
		{
			this.setUniforms(previousUniforms, shaderId);
		}

		// Everything the caller had set has to be back in place before the yield that follows
		// this, not just at the end of the whole render. Otherwise the tile framebuffer stays
		// bound across it, and an animation frame landing between two tiles draws into the
		// tile instead of the canvas -- which freezes the canvas for the length of the export
		// and puts the app's frame where the next tile is about to go.
		this.useShader(previousShaderId);
		this.useFramebuffer(previousFramebufferId);
		this.useTexture(previousTextureId);

		return pixels;
	}

	async readHighResPixels({
		resolution = Math.round(Math.sqrt(this.canvasWidth * this.canvasHeight)),
		uniforms = {},
		format = "unsignedByte",
		tileSize,
		render,
	}: {
		resolution?: number,
		uniforms?: UniformInitializers,
		format?: "unsignedByte" | "float",
		tileSize?: number,
		render?: RenderHighResTile,
	}): Promise<{
		pixels: Uint8Array | Float32Array,
		width: number,
		height: number,
	}> {
		return this.#queueHighResRender(async () =>
		{
			const { width, height } = this.#getHighResDimensions(resolution);

			await this.#highResShadersReady(render, this.#currentShaderId);

			// format picks the element type of both this and every tile at once, which is more
			// than the union can express, so the copy below asserts what it already knows.
			const pixels = format === "float"
				? new Float32Array(width * height * 4)
				: new Uint8Array(width * height * 4);

			const imageRowLength = width * 4;

			await this.#renderHighResTiles({
				width,
				height,
				tileSize: this.#getHighResTileSize(tileSize),
				format,
				uniforms,
				render: render ?? (() => this.drawFrame()),

				onTile: (tile) =>
				{
					const tileRowLength = tile.width * 4;

					// readPixels counts rows up from the bottom of the tile, so the last one
					// it hands back is the one that belongs at the tile's top edge.
					for (let i = 0; i < tile.height; i++)
					{
						(pixels as Uint8Array).set(
							(tile.pixels as Uint8Array).subarray(
								i * tileRowLength,
								(i + 1) * tileRowLength
							),
							(tile.row + tile.height - 1 - i) * imageRowLength + tile.col * 4
						);
					}
				},
			});

			return { pixels, width, height };
		});
	}

	// Stitching tiles together and encoding a png are pure CPU work on buffers the GPU is
	// already finished with, which makes them the one part of this that genuinely belongs on
	// another thread. The worker never touches WebGL, so it stays small enough to read.
	#createHighResEncoder({
		width,
		height,
		colorSpace,
	}: {
		width: number,
		height: number,
		colorSpace: PredefinedColorSpace,
	}): HighResEncoder {
		if (typeof Worker !== "undefined" && typeof OffscreenCanvas !== "undefined")
		{
			try
			{
				return this.#createWorkerHighResEncoder({ width, height, colorSpace });
			}

			catch(ex)
			{
				if (this.verbose)
				{
					console.warn(`[Wilson] Couldn't start the image encoding worker, so the image will be assembled on the main thread instead: ${ex}`);
				}
			}
		}

		return this.#createMainThreadHighResEncoder({ width, height, colorSpace });
	}

	#createWorkerHighResEncoder({
		width,
		height,
		colorSpace,
	}: {
		width: number,
		height: number,
		colorSpace: PredefinedColorSpace,
	}): HighResEncoder {
		const workerCode = `
			let canvas;
			let ctx;
			let colorSpace = "srgb";

			// Deliberately not an async listener: a throw inside one of those becomes an
			// unhandled rejection rather than an error event, so a tile that failed to be
			// written would be dropped silently and the image would come out wrong with
			// nothing to show for it.
			self.addEventListener("message", (event) =>
			{
				const data = event.data;

				try
				{
					if (data.type === "init")
					{
						colorSpace = data.colorSpace;

						canvas = new OffscreenCanvas(data.width, data.height);
						ctx = canvas.getContext("2d", { colorSpace });

						if (!ctx)
						{
							throw new Error("Couldn't get a 2d context to assemble the image in.");
						}

						return;
					}

					if (!ctx)
					{
						throw new Error("A tile arrived before the image was set up.");
					}

					if (data.type === "tile")
					{
						// readPixels counts rows up from the bottom of the tile, and ImageData
						// counts them down from the top.
						const rowLength = data.width * 4;
						const rows = new Uint8ClampedArray(data.pixels.length);

						for (let i = 0; i < data.height; i++)
						{
							rows.set(
								data.pixels.subarray(i * rowLength, (i + 1) * rowLength),
								(data.height - i - 1) * rowLength
							);
						}

						ctx.putImageData(
							new ImageData(rows, data.width, data.height, { colorSpace }),
							data.col,
							data.row
						);

						return;
					}

					if (data.type === "encode")
					{
						canvas.convertToBlob({ type: "image/png" }).then(
							blob => self.postMessage({ type: "blob", blob }),
							error => self.postMessage({ type: "error", message: String(error) })
						);
					}
				}

				catch(error)
				{
					self.postMessage({ type: "error", message: String(error) });
				}
			});
		`;

		const workerUrl = URL.createObjectURL(
			new Blob([workerCode], { type: "application/javascript" })
		);

		const worker = new Worker(workerUrl);

		let resolveBlob: (blob: Blob | null) => void;
		let rejectBlob: (error: Error) => void;

		const blobPromise = new Promise<Blob | null>((resolve, reject) =>
		{
			resolveBlob = resolve;
			rejectBlob = reject;
		});

		worker.addEventListener("message", (event) =>
		{
			if (event.data.type === "blob")
			{
				resolveBlob(event.data.blob);
			}

			else if (event.data.type === "error")
			{
				rejectBlob(new Error(
					`[Wilson] The image encoding worker failed: ${event.data.message}`
				));
			}
		});

		// Attached now rather than in finish(), so that a failure while the tiles are still
		// streaming in surfaces as a rejection instead of an uncaught error in the worker.
		worker.addEventListener("error", (event) =>
		{
			event.preventDefault();

			rejectBlob(new Error(`[Wilson] The image encoding worker failed: ${event.message}`));
		});

		worker.postMessage({ type: "init", width, height, colorSpace });

		return {
			addTile: ({ pixels, col, row, width, height }) =>
			{
				// readPixels allocates the buffer fresh and nothing on this side looks at it
				// again, so it can be handed over instead of copied.
				worker.postMessage(
					{ type: "tile", pixels, col, row, width, height },
					[pixels.buffer]
				);
			},

			finish: () =>
			{
				worker.postMessage({ type: "encode" });

				return blobPromise;
			},

			destroy: () =>
			{
				worker.terminate();

				// Revoked here rather than straight after the constructor: the worker's script
				// is fetched asynchronously, and browsers have not always been reliable about
				// holding onto the blob across a revoke that lands mid-fetch.
				URL.revokeObjectURL(workerUrl);
			},
		};
	}

	#createMainThreadHighResEncoder({
		width,
		height,
		colorSpace,
	}: {
		width: number,
		height: number,
		colorSpace: PredefinedColorSpace,
	}): HighResEncoder {
		const canvas = document.createElement("canvas");

		canvas.width = width;
		canvas.height = height;

		const ctx = canvas.getContext("2d", { colorSpace });

		if (!ctx)
		{
			throw new Error("[Wilson] Couldn't get a 2d context to assemble the image in.");
		}

		return {
			addTile: ({ pixels, col, row, width, height }) =>
			{
				// readPixels counts rows up from the bottom of the tile, and ImageData counts
				// them down from the top.
				const rowLength = width * 4;
				const rows = new Uint8ClampedArray(pixels.length);

				for (let i = 0; i < height; i++)
				{
					rows.set(
						(pixels as Uint8Array).subarray(i * rowLength, (i + 1) * rowLength),
						(height - i - 1) * rowLength
					);
				}

				ctx.putImageData(new ImageData(rows, width, height, { colorSpace }), col, row);
			},

			finish: () => new Promise<Blob | null>(resolve => canvas.toBlob(resolve)),

			destroy: () => {},
		};
	}

	async downloadHighResFrame({
		filename,
		resolution = Math.round(Math.sqrt(this.canvasWidth * this.canvasHeight)),
		uniforms = {},
		tileSize,
		render,
	}: {
		filename: string,
		resolution: number,
		uniforms?: UniformInitializers,
		tileSize?: number,
		render?: RenderHighResTile,
	}) {
		const colorSpace: PredefinedColorSpace =
			(this.useP3ColorSpace && matchMedia("(color-gamut: p3)").matches)
				? "display-p3"
				: "srgb";

		const blob = await this.#queueHighResRender(async () =>
		{
			const { width, height } = this.#getHighResDimensions(resolution);

			await this.#highResShadersReady(render, this.#currentShaderId);

			const encoder = this.#createHighResEncoder({ width, height, colorSpace });

			try
			{
				await this.#renderHighResTiles({
					width,
					height,
					tileSize: this.#getHighResTileSize(tileSize),
					format: "unsignedByte",
					uniforms,
					render: render ?? (() => this.drawFrame()),
					onTile: tile => encoder.addTile(tile),
				});

				return await encoder.finish();
			}

			finally
			{
				encoder.destroy();
			}
		});

		if (!blob)
		{
			if (this.verbose)
			{
				console.error("[Wilson] Could not create a canvas blob.");
			}

			return;
		}

		this.downloadBlob(blob, filename);
	}



	async enterXR(): Promise<boolean>
	{
		if (this.inXR || this.#enteringXR || this.#xrIsSupportedNow === false)
		{
			return false;
		}



		this.#enteringXR = true;

		if (!navigator.xr)
		{
			this.#enteringXR = false;

			return false;
		}

		let session: XRSession;

		try
		{
			// This has to happen before any other await, since requestSession consumes the
			// transient user activation from the click that got us here, and that activation
			// expires on a timer: awaiting a support check first can let it lapse and make this
			// throw a SecurityError even though the headset is perfectly available.
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

			// The request may have failed because support changed since the last check, so this
			// resyncs #xrIsSupportedNow and the button's visibility with reality.
			this.#checkXRSupport();

			this.#enteringXR = false;

			return false;
		}


		
		try
		{
			// Initializes the framebuffer (both eyes, side-by-side).
			const baseLayer = this.#createXRBaseLayer(session);

			// The framebuffer has no depth attachment and the shader reconstructs rays from
			// the projection matrix's FOV terms, so the session's depth planes are left at
			// their defaults; nothing here would read the entries they change.
			session.updateRenderState({ baseLayer });
		
			const refSpace = await session.requestReferenceSpace(REFERENCE_SPACE);

			this.#xrData = { session, refSpace, baseLayer };

			this.#applyXRTargetFrameRate();

			session.addEventListener("visibilitychange", () =>
			{
				this.#xrCallbacks.onVisibilityChange(session.visibilityState);
			});

			session.addEventListener("inputsourceschange", this.#onXRInputSourcesChange);

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

		const { session, refSpace } = this.#xrData;

		// Queue the next frame first so an exception mid-render doesn't stall the loop.
		session.requestAnimationFrame(this.#onXRFrame);

		// updateRenderState() takes effect asynchronously, so a layer swapped in by
		// xrFramebufferScale isn't the one this frame renders into until the runtime says it is.
		// The session's own render state is the only thing that knows which layer that is, so
		// everything else reads #xrData.baseLayer and this keeps it honest.
		const baseLayer = session.renderState.baseLayer;

		if (!baseLayer)
		{
			this.#lastXRTime = undefined;
			return;
		}

		if (baseLayer !== this.#xrData.baseLayer)
		{
			this.#xrData.baseLayer = baseLayer;
		}

		if (session.visibilityState === "hidden")
		{
			// Treat skipped frames as a discontinuity.
			this.#lastXRTime = undefined;

			// The runtime has taken input for a system menu, and it won't report the releases.
			// Without this, a button held when the menu opened would still read as pressed once
			// the applet comes back.
			for (const { controller } of this.#xrControllerData.values())
			{
				this.#releaseXRControllerButtons(controller, true);
			}

			return;
		}

		// Deliberately ahead of the viewer pose check below: a controller's buttons and axes are
		// still perfectly valid on a frame where head tracking dropped out, and skipping the poll
		// would swallow every button event that happened during it.
		this.#updateXRControllers(frame, refSpace);

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



		const { views } = pose;

		// Give the callback a predictable, full-framebuffer viewport; the loop below
		// sets the per-eye viewport before each view renders.
		this.gl.viewport(0, 0, baseLayer.framebufferWidth, baseLayer.framebufferHeight);

		this.#xrCallbacks.onFrameStart({
			time,
			deltaTime,
			frame,
			pose
		});

		try
		{
			// One view per eye (two for stereo VR), sharing the framebuffer via side-by-side viewports.
			for (let viewIndex = 0; viewIndex < views.length; viewIndex++)
			{
				const view = views[viewIndex];

				// Each eye renders into its full share of the framebuffer; requestViewportScale
				// is the other way to trade quality for frame time, but tethered headsets
				// widely ignore it, so xrFramebufferScale is the only one Wilson exposes.
				const viewport = baseLayer.getViewport(view);

				if (!viewport)
				{
					// Skip this eye, not the whole frame
					continue;
				}

				this.#xrViewport = viewport;
				this.gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);
		
				this.#renderXRFrame({
					projectionMatrix: view.projectionMatrix,
					cameraToWorld: view.transform.matrix,
					eye: view.eye,
					viewIndex,
					view,
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

		const inputSources = this.#xrData.session.inputSources;

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
				this.#releaseXRControllerButtons(data.controller, false);

				data.controller.targetRay = null;
				data.controller.grip = null;

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
				this.#xrCallbacks.onControllerDisconnect(controller);
			}
		}

		if (added)
		{
			for (const controller of added)
			{
				this.#xrCallbacks.onControllerConnect(controller);
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

			targetRay: null,
			grip: null,

			buttons,

			thumbstick: [0, 0],

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
			targetRayMatrix: new Float32Array(16),
			gripMatrix: new Float32Array(16),
		};
	}

	// Fills the persistent buffer `target` with the space's transform, so that posing
	// controllers every frame doesn't allocate on the hot path.
	#readXRPoseMatrix(
		frame: XRFrame,
		space: XRSpace,
		refSpace: XRReferenceSpace,
		target: Float32Array
	): Float32Array | null {
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

		target.set(pose.transform.matrix);

		return target;
	}

	#updateXRControllers(frame: XRFrame, refSpace: XRReferenceSpace)
	{
		this.#syncXRControllers();

		// Button transitions are collected and dispatched after every controller has been
		// updated, so that a callback reading a second controller sees this frame's state
		// rather than the last frame's.
		let buttonEvents: {
			controller: WilsonXRController,
			name: XRButtonName,
			state: XRButtonState,
			pressed: boolean,
		}[] | null = null;

		for (const data of this.#xrControllerData.values())
		{
			const { controller } = data;
			const { inputSource } = controller;

			controller.targetRay = this.#readXRPoseMatrix(
				frame,
				inputSource.targetRaySpace,
				refSpace,
				data.targetRayMatrix
			);

			controller.grip = inputSource.gripSpace
				? this.#readXRPoseMatrix(frame, inputSource.gripSpace, refSpace, data.gripMatrix)
				: null;

			const gamepad = inputSource.gamepad;

			// Gaze input has no gamepad at all, and so has nothing to poll.
			if (!gamepad)
			{
				continue;
			}

			const axes = gamepad.axes;

			// Axes 0 and 1 are the touchpad, which Wilson doesn't expose. The raw axes are
			// +y down, which is backwards from how a stick is usually read.
			controller.thumbstick[0] = axes[2] ?? 0;
			controller.thumbstick[1] = -(axes[3] ?? 0);

			// Anything past the xr-standard mapping is device-specific (a Quest's thumbrest, say)
			// and isn't exposed.
			const numButtons = Math.min(gamepad.buttons.length, XR_BUTTON_NAMES.length);

			for (let i = 0; i < numButtons; i++)
			{
				const name = XR_BUTTON_NAMES[i];
				const state = controller.buttons[name];

				const button = gamepad.buttons[i];
				const wasPressed = state.pressed;

				state.pressed = button.pressed;
				state.value = button.value;

				if (state.pressed !== wasPressed)
				{
					(buttonEvents = buttonEvents ?? []).push({
						controller,
						name,
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

		for (const { controller, name, state, pressed } of buttonEvents)
		{
			const callback = pressed
				? this.#xrCallbacks.onButtonDown
				: this.#xrCallbacks.onButtonUp;

			callback({ controller, name, state });
		}
	}

	// Forces every button up, firing onButtonUp for the ones that were down if `dispatch` is set.
	// Idempotent, since a second call finds nothing still pressed.
	#releaseXRControllerButtons(controller: WilsonXRController, dispatch: boolean)
	{
		for (const name of XR_BUTTON_NAMES)
		{
			const state = controller.buttons[name];

			const wasPressed = state.pressed;

			state.pressed = false;
			state.value = 0;

			if (wasPressed && dispatch)
			{
				this.#xrCallbacks.onButtonUp({ controller, name, state });
			}
		}

		controller.thumbstick[0] = 0;
		controller.thumbstick[1] = 0;
	}

	#onXREnd = () =>
	{
		const session = this.#xrData?.session;
		const disconnected = this.#xrControllerList;

		this.#xrData = undefined;
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
				this.#releaseXRControllerButtons(controller, false);

				controller.targetRay = null;
				controller.grip = null;

				this.#xrCallbacks.onControllerDisconnect(controller);
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
			onAvailabilityChange: () => {},
			onVisibilityChange: (state: XRVisibilityState) => {},
			onControllerConnect: () => {},
			onControllerDisconnect: () => {},
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

		this.#destroyedGPU = true;

		this.#destroyGpuTiming();

		for (const id of Object.keys(this.#pendingShaders))
		{
			this.#discardPendingShader(id);
		}

		this.#pendingUniforms = {};

		this.#clearXRFunctions();

		this.exitXR().catch(() => {});

		this.#xrControllerData.clear();
		this.#xrControllerList = [];

		navigator.xr?.removeEventListener("devicechange", this.#onDeviceChange);
		window.removeEventListener("focus", this.#onPageFocus);
		document.removeEventListener("visibilitychange", this.#onPageFocus);



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
		this.#tileUniforms = {};

		// Lose the WebGL context to free up the context slot.
		const loseContext = this.gl.getExtension("WEBGL_lose_context");
		if (loseContext)
		{
			loseContext.loseContext();
		}
	}
}