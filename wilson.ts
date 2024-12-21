
type InteractionCallbacks = {
	mousedown: ({ x, y, event }: { x: number, y: number, event: MouseEvent }) => void,

	mouseup: ({ x, y, event }: { x: number, y: number, event: MouseEvent }) => void,

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
	mouseleave: ({ x, y, event }) => {},
	mousemove: ({ x, y, xDelta, yDelta, event }) => {},
	mousedrag: ({ x, y, xDelta, yDelta, event }) => {},
	touchstart: ({ x, y, event }) => {},
	touchend: ({ x, y, event }) => {},
	touchmove: ({ x, y, xDelta, yDelta, event }) => {},
	wheel: ({ x, y, scrollDelta, event }) => {},
};

type DraggableCallBacks = {
	grab: ({ id, x, y, event }: { id: string, x: number, y: number, event: Event }) => void,

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
		event: Event
	}) => void,

	release: ({ id, x, y, event }: { id: string, x: number, y: number, event: Event }) => void,
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

type DraggableInitializers = {[id: string]: [number, number]};

type DraggableOptions = {
	draggables?: DraggableInitializers,
	radius?: number,
	static?: boolean,
	callbacks?: Partial<DraggableCallBacks>,
};

type FullscreenOptions = {
	fillScreen?: boolean,
	animate?: boolean,
	closeWithEscape?: boolean,
} & (
	{
		useFullscreenButton?: true,
		enterFullscreenButtonIconPath: string,
		exitFullscreenButtonIconPath: string,
	} | {
		useFullscreenButton?: false,
	}
);



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

	onResizeCanvas?: () => void,

	useP3ColorSpace?: boolean,

	reduceMotion?: boolean,

	interactionOptions?: InteractionOptions,
	draggableOptions?: DraggableOptions,
	fullscreenOptions?: FullscreenOptions,
};

class Wilson
{
	#destroyed: boolean = false;

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
	usePanAndZoomRubberbanding: boolean = true;
	rubberbandingPanSoftness: number = 3.5;
	rubberbandingZoomSoftness: number = 2;
	disallowZooming: boolean = false;
	#needPanAndZoomUpdate: boolean = false;
	#interactionOnPanAndZoom: () => void = () => {};

	

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
	closeFullscreenWithEscape: boolean;
	#fullscreenOldScroll: number = 0;
	#fullscreenFillScreen: boolean;
	#fullscreenUseButton: boolean;
	#fullscreenEnterFullscreenButton: HTMLElement | null = null;
	#fullscreenExitFullscreenButton: HTMLElement | null = null;
	#fullscreenEnterFullscreenButtonIconPath?: string;
	#fullscreenExitFullscreenButtonIconPath?: string;

	#appletContainer: HTMLDivElement;
	#canvasContainer: HTMLDivElement;
	#draggablesContainer: HTMLDivElement;
	#fullscreenContainer: HTMLDivElement;
	#fullscreenContainerLocation: HTMLDivElement;

	#metaThemeColorElement: HTMLMetaElement | null = document.querySelector("meta[name='theme-color']");
	#oldMetaThemeColor: string | null = null;



	constructor(canvas: HTMLCanvasElement, options: WilsonOptions)
	{
		this.canvas = canvas;
		const computedStyle = getComputedStyle(canvas);
		this.#canvasAspectRatio = parseFloat(computedStyle.width) / parseFloat(computedStyle.height);

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
		this.closeFullscreenWithEscape = options.fullscreenOptions?.closeWithEscape ?? true;
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
		this.#initFullscreen();

		requestAnimationFrame(this.#animationFrameLoop);

		window.addEventListener("resize", this.#onResizeWindow);
		document.documentElement.addEventListener("keydown", this.#handleKeydownEvent);

		if (options.draggableOptions?.draggables)
		{
			this.setDraggables(options.draggableOptions.draggables);
		}



		console.log(
			`[Wilson] Initialized a ${this.#canvasWidth}x${this.#canvasHeight} canvas`
			+ (this.canvas.id ? ` with ID ${this.canvas.id}` : "")
		);
	}

	destroy()
	{
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

		this.#fullscreenContainerLocation.parentElement
			&& this.#fullscreenContainerLocation.parentElement.insertBefore(this.canvas, this.#fullscreenContainerLocation);
		this.#fullscreenContainerLocation.remove();
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

				window.scroll(0, 0);

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
		if (e.key === "Escape" && this.#currentlyFullscreen && this.closeFullscreenWithEscape)
		{
			e.preventDefault();
			e.stopPropagation();
			this.exitFullscreen();
		}
	}
	
	

	resizeCanvasGPU = () => {}

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
	}) {
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

		if (this.useInteractionForPanAndZoom)
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

	#clampWorldCoordinates(hardnessFactor: number = 1)
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

				factor = Math.pow(
					factor,
					(hardnessFactor / this.rubberbandingZoomSoftness)
						/ (this.#currentlyWheeling ? 1.5 : 1)
				);

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
				xAdjust /= this.rubberbandingPanSoftness * hardnessFactor;
				yAdjust /= this.rubberbandingPanSoftness * hardnessFactor;
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
		
		this.#interactionCallbacks.mouseup({ x, y, event: e });
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
			this.#worldCenterX -= x - lastX;
			this.worldCenterX = this.#worldCenterX;

			this.#worldCenterY -= y - lastY;
			this.worldCenterY = this.#worldCenterY;

			this.#setLastPanVelocity(lastX - x, lastY - y);
			
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

		const scale = lastDistance / distance;

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
				this.#worldCenterX -= x - lastX;
				this.worldCenterX = this.#worldCenterX;

				this.#worldCenterY -= y - lastY;
				this.worldCenterY = this.#worldCenterY;

				this.#setLastPanVelocity(lastX - x, lastY - y);
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
		}, 100) as unknown as number;

		const [x, y] = this.#interpolatePageToWorld([e.clientY, e.clientX]);

		if (this.useInteractionForPanAndZoom)
		{
			this.#zoomFixedPoint = [x, y];

			if (Math.abs(e.deltaY) < 50 || this.#currentlyWheeling)
			{
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

		this.#interactionCallbacks.wheel({
			x,
			y,
			scrollDelta: e.deltaY,
			event: e
		});

		this.#lastInteractionRow = e.clientY;
		this.#lastInteractionCol = e.clientX;
	}
	
	#lastPanAndZoomTimestamp = -1;
	#animationFrameLoop = (timestamp: number) =>
	{
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
			// isn't halted so quickly
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

			this.#clampWorldCoordinates(Math.min(timeElapsed / (1000 / 60), 1));
			this.#updateDraggablesLocation();
			this.#interactionOnPanAndZoom();
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

			canvas.addEventListener("mouseleave", (e) => this.#onMouseleave(e as MouseEvent));
		}
	}



	#draggables: {
		[id: string]: {
			element: HTMLDivElement,
			location: [number, number],
			currentlyDragging: boolean,
		}
	} = {};
	draggables: {
		[id: string]: {
			element: HTMLDivElement,
			location: [number, number],
			currentlyDragging: boolean,
		}
	} = {};

	#draggableDefaultId: number = 0;
	#currentMouseDraggableId?: string;

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

	setDraggables(draggables: DraggableInitializers)
	{
		for (const [id, location] of Object.entries(draggables))
		{
			const [x, y] = location;

			//First convert to page coordinates.
			const uncappedRow = Math.floor(
				this.#draggablesContainerRestrictedHeight * (
					1 - ((y - this.#worldCenterY) / this.#worldHeight + .5)
				)
			) + this.#draggablesRadius;

			const uncappedCol = Math.floor(
				this.#draggablesContainerRestrictedWidth * (
					(x - this.#worldCenterX) / this.#worldWidth + .5
				)
			) + this.#draggablesRadius;

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
			}

			else
			{
				this.#draggables[id].location = [x, y];
				this.draggables[id].location = [x, y];

				const element = this.#draggables[id].element;
				element.style.transform = `translate(${col - this.#draggablesRadius}px, ${row - this.#draggablesRadius}px)`;
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

			const uncappedRow = Math.floor(
				this.#draggablesContainerRestrictedHeight * (
					1 - ((y - this.#worldCenterY) / this.#worldHeight + .5)
				)
			) + this.#draggablesRadius;

			const uncappedCol = Math.floor(
				this.#draggablesContainerRestrictedWidth * (
					(x - this.#worldCenterX) / this.#worldWidth + .5
				)
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

			this.#canvasContainer.appendChild(this.#fullscreenEnterFullscreenButton);

			const img = document.createElement("img");
			img.src = this.#fullscreenEnterFullscreenButtonIconPath as string;
			this.#fullscreenEnterFullscreenButton.appendChild(img);

			this.#fullscreenEnterFullscreenButton.addEventListener("click", () =>
			{
				this.enterFullscreen();
			});



			this.#fullscreenExitFullscreenButton = document.createElement("div");

			this.#fullscreenExitFullscreenButton.classList.add("WILSON_exit-fullscreen-button");

			this.#canvasContainer.appendChild(this.#fullscreenExitFullscreenButton);

			const img2 = document.createElement("img");
			img2.src = this.#fullscreenExitFullscreenButtonIconPath as string;
			this.#fullscreenExitFullscreenButton.appendChild(img2);

			this.#fullscreenExitFullscreenButton.addEventListener("click", () =>
			{
				this.exitFullscreen();
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



		document.documentElement.style.overflowY = "hidden";
		document.body.style.overflowY = "hidden";

		document.body.style.width = "100vw";
		document.body.style.height = "100%";

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

			window.scroll(0, 0);

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
	}

	enterFullscreen()
	{
		// @ts-ignore
		if (document.startViewTransition && this.animateFullscreen)
		{
			document.body.querySelectorAll<HTMLElement>(
				".WILSON_enter-fullscreen-button, .WILSON_exit-fullscreen-button"
			)
				.forEach(button => button.style.removeProperty("view-transition-name"));

			document.body.querySelectorAll<HTMLElement>(".WILSON_canvas-container > canvas")
				.forEach(container => container.style.removeProperty("view-transition-name"));

			document.body.querySelectorAll<HTMLElement>(".WILSON_draggable")
				.forEach(container => container.style.removeProperty("view-transition-name"));

			if (!this.#fullscreenFillScreen && !this.reduceMotion)
			{
				if (this.#fullscreenEnterFullscreenButton)
				{
					this.#fullscreenEnterFullscreenButton.style.setProperty(
						"view-transition-name",
						"WILSON_fullscreen-button"
					)
				}

				if (this.#fullscreenExitFullscreenButton)
				{
					this.#fullscreenExitFullscreenButton.style.setProperty(
						"view-transition-name",
						"WILSON_fullscreen-button"
					)
				}
				
				this.canvas.style.setProperty("view-transition-name", "WILSON_canvas");

				for (const [id, data] of Object.entries(this.#draggables))
				{
					data.element.style.setProperty("view-transition-name", `WILSON_draggable-${id}`);
				}
			}



			// @ts-ignore
			document.startViewTransition(() => this.#enterFullscreen());
		}

		else
		{
			this.#enterFullscreen();
		}
	}



	#exitFullscreen()
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


		if (this.#metaThemeColorElement)
		{
			this.#metaThemeColorElement.setAttribute("content", this.#oldMetaThemeColor ?? "");
		}

		this.#fullscreenContainerLocation.appendChild(this.#fullscreenContainer);

		this.canvas.classList.remove("WILSON_fullscreen");
		this.#canvasContainer.classList.remove("WILSON_fullscreen");
		this.#fullscreenContainer.classList.remove("WILSON_fullscreen");



		document.documentElement.style.overflowY = "scroll";
		document.body.style.overflowY = "visible";

		document.body.style.width = "";
		document.body.style.height = "";

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

		window.scrollTo(0, this.#fullscreenOldScroll);
		setTimeout(() => window.scrollTo(0, this.#fullscreenOldScroll), 10);
	}

	exitFullscreen()
	{
		// @ts-ignore
		if (document.startViewTransition && this.animateFullscreen)
		{
			if (!this.#fullscreenFillScreen && !this.reduceMotion)
			{
				this.canvas.style.setProperty("view-transition-name", "WILSON_canvas");
			}

			// @ts-ignore
			document.startViewTransition(() => this.#exitFullscreen());
		}
		
		else
		{
			this.#exitFullscreen();
		}
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



export type WilsonCPUOptions = WilsonOptions;

export class WilsonCPU extends Wilson
{
	ctx: CanvasRenderingContext2D;

	constructor(canvas: HTMLCanvasElement, options: WilsonCPUOptions)
	{
		super(canvas, options);

		const colorSpace = (this.useP3ColorSpace && matchMedia("(color-gamut: p3)").matches)
			? "display-p3"
			: "srgb";

		const ctx = this.canvas.getContext("2d", { colorSpace });

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
				console.error(`[Wilson] Could not create a blob from a canvas with ID ${this.canvas.id}`);
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
type UniformInitializers = {[name: string]: number | number[] | number[][]};

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
		value: [number, number][]
	) => gl.uniform2fv(location, value.flat()),

	vec3Array: (
		gl: WebGLRenderingContext | WebGL2RenderingContext,
		location: WebGLUniformLocation,
		value: [number, number, number][]
	) => gl.uniform3fv(location, value.flat()),
	
	vec4Array: (
		gl: WebGLRenderingContext | WebGL2RenderingContext,
		location: WebGLUniformLocation,
		value: [number, number, number, number][]
	) => gl.uniform4fv(location, value.flat()),

	mat2: (
		gl: WebGLRenderingContext | WebGL2RenderingContext,
		location: WebGLUniformLocation,
		value: [[number, number], [number, number]]
	) => gl.uniformMatrix2fv(location, false, [value[0][0], value[1][0], value[0][1], value[1][1]]),
	
	mat3: (
		gl: WebGLRenderingContext | WebGL2RenderingContext,
		location: WebGLUniformLocation,
		value: [[number, number, number], [number, number, number], [number, number, number]]
	) => gl.uniformMatrix3fv(location, false, [value[0][0], value[1][0], value[2][0], value[0][1], value[1][1], value[2][1], value[0][2], value[1][2], value[2][2]]),
	
	mat4: (
		gl: WebGLRenderingContext | WebGL2RenderingContext,
		location: WebGLUniformLocation,
		value: [[number, number, number, number], [number, number, number, number], [number, number, number, number], [number, number, number, number]]
	) => gl.uniformMatrix4fv(location, false, [value[0][0], value[1][0], value[2][0], value[3][0], value[0][1], value[1][1], value[2][1], value[3][1], value[0][2], value[1][2], value[2][2], value[3][2], value[0][3], value[1][3], value[2][3], value[3][3]]),
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

export type WilsonGPUOptions = WilsonOptions
	& (SingleShader | MultipleShaders)
	& {
		useWebGL2?: boolean,
	}

export class WilsonGPU extends Wilson
{
	gl: WebGLRenderingContext | WebGL2RenderingContext;

	#useWebGL2: boolean;

	#shaderPrograms: {[id: ShaderProgramId]: WebGLProgram} = {};

	#uniforms: {
		[id: ShaderProgramId]: {
			[name: string]: {
				location: WebGLUniformLocation,
				type: UniformType,
			}
		}
	} = {};

	constructor(canvas: HTMLCanvasElement, options: WilsonGPUOptions)
	{
		super(canvas, options);

		this.#useWebGL2 = options.useWebGL2 ?? true;

		const gl = this.#useWebGL2
			? canvas.getContext("webgl2") ?? canvas.getContext("webgl")
			: canvas.getContext("webgl");

		if (!gl)
		{
			throw new Error("[Wilson] Failed to get WebGL or WebGL2 context.");
		}

		this.gl = gl;

		if (
			this.gl instanceof WebGL2RenderingContext
			&& !this.gl.getExtension("EXT_color_buffer_float")
		) {
			console.warn("[Wilson] No support for float textures.");
		}

		else if (this.gl instanceof WebGLRenderingContext
			&& !this.gl.getExtension("OES_texture_float")
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
				source: options.shader,
				uniforms: options.uniforms,
			});
		}

		else if ("shaders" in options)
		{
			for (const [id, source] of Object.entries(options.shaders))
			{
				this.loadShader({
					id,
					source,
					uniforms: options.uniforms?.[id],
				});
			}
		}

		else
		{
			throw new Error("[Wilson] Must provide either a single shader or multiple shaders.");
		}
	}

	drawFrame()
	{
		this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
	}

	#loadShaderInternal(
		type: number,
		source: string
	) {
		const shader = this.gl.createShader(type);

		if (!shader)
		{
			throw new Error(`[Wilson] Couldn't create shader: ${shader}`);
		}

		this.gl.shaderSource(shader, source);
		this.gl.compileShader(shader);

		if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS))
		{
			throw new Error(`[Wilson] Couldn't load shader: ${this.gl.getShaderInfoLog(shader)}. Full shader source: ${source}`);
		}

		return shader;
	}

	#numShaders = 0;
	#currentShaderId = "0";

	loadShader({
		id = this.#numShaders.toString(),
		source,
		uniforms = {}
	}: {
		id?: ShaderProgramId,
		source: string,
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

		const vertexShader = this.#loadShaderInternal(this.gl.VERTEX_SHADER, vertexShaderSource);
		const fragShader = this.#loadShaderInternal(this.gl.FRAGMENT_SHADER, source);
		const shaderProgram = this.gl.createProgram();

		if (!shaderProgram)
		{
			throw new Error(`[Wilson] Couldn't create shader program. Full shader source: ${source}`);
		}

		this.#shaderPrograms[id] = shaderProgram;

		this.gl.attachShader(this.#shaderPrograms[id], vertexShader);
		this.gl.attachShader(this.#shaderPrograms[id], fragShader);
		this.gl.linkProgram(this.#shaderPrograms[id]);

		if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS))
		{
			throw new Error(`[Wilson] Couldn't link shader program: ${this.gl.getProgramInfoLog(shaderProgram)}. Full shader source: ${source}`);
		}

		this.useShader(id);

		const positionBuffer = this.gl.createBuffer();

		if (!positionBuffer)
		{
			throw new Error(`[Wilson] Couldn't create position buffer. Full shader source: ${source}`);
		}

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
			throw new Error(`[Wilson] Couldn't get position attribute. Full shader source: ${source}`);
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
				throw new Error(`[Wilson] Couldn't get uniform location for ${name}. Check that it is used in the shader (so that it is not compiled away). Full shader source: ${source}`);
			}

			// Match strings like "uniform int foo;" to "int".
			const match = source.match(
				new RegExp(`uniform\\s+(\\S+?)\\s+${name}(\\[\\d+\\])?\\s*;`)
			);
			if (!match)
			{
				throw new Error(`[Wilson] Couldn't find uniform ${name} in shader source: ${source}`);
			}
			
			const type = match[1].trim() + (match[2] ? "Array" : "");

			if (!(type in uniformFunctions))
			{
				throw new Error(`[Wilson] Invalid uniform type ${type} for uniform ${name} in shader source: ${source}`);
			}

			this.#uniforms[id][name] = { location, type: type as UniformType };
			this.setUniforms({ [name]: value });
		}
	}

	setUniforms(uniforms: UniformInitializers, shader: ShaderProgramId = this.#currentShaderId)
	{
		this.gl.useProgram(this.#shaderPrograms[shader]);
		
		for (const [name, value] of Object.entries(uniforms))
		{
			const { location, type } = this.#uniforms[shader][name];
			const uniformFunction = uniformFunctions[type];
			uniformFunction(this.gl, location, value);
		}

		this.gl.useProgram(this.#shaderPrograms[this.#currentShaderId]);
	}

	useShader(id: ShaderProgramId)
	{
		this.#currentShaderId = id;
		this.gl.useProgram(this.#shaderPrograms[id]);
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

	createFramebufferTexturePair({
		id,
		width = this.canvasWidth,
		height = this.canvasHeight,
		textureType
	}: {
		id: string,
		width?: number,
		height?: number,
		textureType: "unsignedByte" | "float"
	}) {
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

		this.gl.disable(this.gl.DEPTH_TEST);

		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, framebuffer);
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
	}

	useFramebuffer(id: string | null)
	{
		if (id === null)
		{
			this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
			return;
		}

		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.#framebuffers[id]);
	}

	useTexture(id: string | null)
	{
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
		data: Uint8Array | Float32Array | null
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

		this.gl.bindTexture(this.gl.TEXTURE_2D, this.#textures[id].texture);

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



	resizeCanvasGPU = () =>
	{
		this.gl.viewport(0, 0, this.canvasWidth, this.canvasHeight);
	};

	downloadFrame(
		filename: string,
		drawNewFrame: boolean = true
	) {
		if (drawNewFrame)
		{
			this.drawFrame();
		}

		this.canvas.toBlob((blob) =>
		{
			if (!blob)
			{
				console.error(`[Wilson] Could not create a blob from a canvas with ID ${this.canvas.id}`);
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