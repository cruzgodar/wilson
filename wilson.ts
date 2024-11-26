type InteractionCallbacks = {
	mousedown: ({ x, y, event }: { x: number, y: number, event: MouseEvent }) => void,

	mouseup: ({ x, y, event }: { x: number, y: number, event: MouseEvent }) => void,

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

	pinch: ({
		centerX,
		centerY,
		spreadDelta,
		event
	}: {
		centerX: number,
		centerY: number,
		spreadDelta: number,
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
	mousemove: ({ x, y, xDelta, yDelta, event }) => {},
	mousedrag: ({ x, y, xDelta, yDelta, event }) => {},
	touchstart: ({ x, y, event }) => {},
	touchend: ({ x, y, event }) => {},
	touchmove: ({ x, y, xDelta, yDelta, event }) => {},
	pinch: ({ centerX, centerY, spreadDelta, event }) => {},
	wheel: ({ x, y, scrollDelta, event }) => {},
};

type DraggableCallBacks = {
	ongrab: ({ id, x, y, event }: { id: string, x: number, y: number, event: Event }) => void,

	ondrag: ({
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

	onrelease: ({ id, x, y, event }: { id: string, x: number, y: number, event: Event }) => void,
}

const defaultDraggableCallbacks: DraggableCallBacks = {
	ongrab: () => {},
	ondrag: () => {},
	onrelease: () => {},
};

type DraggableOptions = {
	draggables?: {id: string, x: number, y: number}[],
	radius?: number,
	static?: boolean,
	callbacks?: Partial<DraggableCallBacks>,
};

type FullscreenOptions = {
	fillScreen?: boolean,
	animate?: boolean,
} & (
	{
		useFullscreenButton: true,
		enterFullscreenButtonIconPath: string,
		exitFullscreenButtonIconPath: string,
	} | {
		useFullscreenButton: false,
	}
);



export type WilsonOptions = ({ canvasWidth: number } | { canvasHeight: number })
& {
	worldWidth?: number,
	worldHeight?: number,
	worldCenterX?: number,
	worldCenterY?: number,

	onResizeCanvas?: () => void,

	useP3ColorSpace?: boolean,

	callbacks?: Partial<InteractionCallbacks>,
	draggableOptions?: DraggableOptions,
	fullscreenOptions?: FullscreenOptions,
};

class Wilson
{
	canvas: HTMLCanvasElement;

	#canvasWidth: number;
	get canvasWidth()
	{
		return this.#canvasWidth;
	}
	#canvasHeight: number;
	get canvasHeight()
	{
		return this.#canvasHeight;
	}
	#canvasAspectRatio: number;

	worldWidth: number;
	worldHeight: number;
	worldCenterX: number;
	worldCenterY: number;

	#onResizeCanvasCallback: () => void;

	#useP3ColorSpace: boolean;
	get useP3ColorSpace()
	{
		return this.#useP3ColorSpace;
	}

	#callbacks: InteractionCallbacks;



	#draggablesRadius: number;
	#draggablesStatic: boolean;
	#draggableCallbacks: DraggableCallBacks;

	#draggablesContainerWidth: number = 0;
	#draggablesContainerHeight: number = 0;
	#draggablesContainerRestrictedWidth: number = 0;
	#draggablesContainerRestrictedHeight: number = 0;

	
	currentlyFullscreen: boolean = false;
	animateFullscreen: boolean;
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

		if ("canvasWidth" in options)
		{
			this.#canvasWidth = Math.round(options.canvasWidth);
			this.#canvasHeight = Math.round(options.canvasWidth / this.#canvasAspectRatio);
		}

		else
		{
			this.#canvasWidth = Math.round(options.canvasHeight * this.#canvasAspectRatio);
			this.#canvasHeight = Math.round(options.canvasHeight);
		}
		

		this.canvas.setAttribute("width", this.#canvasWidth.toString());
		this.canvas.setAttribute("height", this.#canvasHeight.toString());

		
		
		if (options.worldWidth !== undefined && options.worldHeight !== undefined)
		{
			this.worldWidth = options.worldWidth;
			this.worldHeight = options.worldHeight;
		}
		
		else if (options.worldHeight !== undefined)
		{
			this.worldHeight = options.worldHeight;
			this.worldWidth = this.worldHeight * this.#canvasAspectRatio;
		}

		else if (options.worldWidth !== undefined)
		{
			this.worldWidth = options.worldWidth;
			this.worldHeight = this.worldWidth / this.#canvasAspectRatio;
		}

		else
		{
			this.worldWidth = Math.max(2, 2 * this.#canvasAspectRatio);
			this.worldHeight = Math.max(2, 2 / this.#canvasAspectRatio);
		}



		this.worldCenterX = options.worldCenterX ?? 0;
		this.worldCenterY = options.worldCenterY ?? 0;

		this.#onResizeCanvasCallback = options?.onResizeCanvas ?? (() => {});

		this.#useP3ColorSpace = options.useP3ColorSpace ?? true;

		this.#callbacks = { ...defaultInteractionCallbacks, ...options.callbacks };
		
		this.#draggablesRadius = options.draggableOptions?.radius ?? 12;
		this.#draggablesStatic = options.draggableOptions?.static ?? false;
		this.#draggableCallbacks = { ...defaultDraggableCallbacks, ...options.draggableOptions?.callbacks };

		this.#fullscreenFillScreen = options.fullscreenOptions?.fillScreen ?? false;
		this.animateFullscreen = options.fullscreenOptions?.animate ?? true;
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




		this.#initInteraction();
		this.#initDraggables();
		this.#initFullscreen();

		window.addEventListener("resize", this.#onResizeWindow);
		document.documentElement.addEventListener("keydown", this.#handleKeydownEvent);

		if (options.draggableOptions?.draggables)
		{
			for (const draggable of options.draggableOptions.draggables)
			{
				this.addDraggable(draggable);
			}
		}



		console.log(
			`[Wilson] Initialized a ${this.#canvasWidth}x${this.#canvasHeight} canvas`
			+ (this.canvas.id ? ` with ID ${this.canvas.id}` : "")
		);
	}

	destroy()
	{
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
		if (this.currentlyFullscreen && this.#fullscreenFillScreen)
		{
			// Resize the canvas to fill the screen but keep the same total number of pixels.
			const windowAspectRatio = window.innerWidth / window.innerHeight;

			const width = Math.round(
				Math.sqrt(this.#canvasWidth * this.#canvasHeight * windowAspectRatio)
			);

			const aspectRatioChange = windowAspectRatio / this.#canvasAspectRatio;

			this.worldWidth = Math.max(this.#oldWorldWidth * aspectRatioChange, this.#oldWorldWidth);
			this.worldHeight = Math.max(this.#oldWorldHeight / aspectRatioChange, this.#oldWorldHeight);

			this.resizeCanvas({ width });
			this.#onResizeCanvas();
		}

		this.#updateDraggablesContainerSize();
	}

	#handleKeydownEvent = (e: KeyboardEvent) =>
	{
		if (e.key === "Escape" && this.currentlyFullscreen)
		{
			this.exitFullscreen();
		}
	}

	#onResizeCanvas()
	{
		requestAnimationFrame(() => this.#onResizeCanvasCallback());
	}

	

	resizeCanvas(dimensions: { width: number } | { height: number })
	{
		const aspectRatio = (this.currentlyFullscreen && this.#fullscreenFillScreen)
			? window.innerWidth / window.innerHeight
			: this.#canvasAspectRatio;
		
		if ("width" in dimensions)
		{
			this.#canvasWidth = Math.round(dimensions.width);
			this.#canvasHeight = Math.round(dimensions.width / aspectRatio);
		}

		else
		{
			this.#canvasWidth = Math.round(dimensions.height * aspectRatio);
			this.#canvasHeight = Math.round(dimensions.height);
		}

		this.canvas.setAttribute("width", this.#canvasWidth.toString());
		this.canvas.setAttribute("height", this.#canvasHeight.toString());
	}


	
	#currentlyDragging: boolean = false;
	#lastWorldX: number = 0;
	#lastWorldY: number = 0;
	#onMousedown(e: MouseEvent) {}
	#onMouseup(e: MouseEvent) {}
	#onMousemove(e: MouseEvent) {}
	#onTouchstart(e: TouchEvent) {}
	#onTouchend(e: TouchEvent) {}
	#onTouchmove(e: TouchEvent) {}
	#onWheel(e: WheelEvent) {}

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

			canvas.addEventListener("mouseleave", (e) =>
			{
				if (this.#currentlyDragging)
				{
					this.#currentlyDragging = false;

					if (this.#callbacks.mouseup)
					{
						this.#callbacks.mouseup({
							x: this.#lastWorldX,
							y: this.#lastWorldY,
							event: e as MouseEvent
						});
					}
				}
			});
		}
	}

	#draggableElements: {
		[id: string]: {
			element: HTMLDivElement,
			x: number,
			y: number,
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

	addDraggable({ x, y, id }: { x: number, y: number, id: string })
	{
		//First convert to page coordinates.
		const uncappedRow = Math.floor(
			this.#draggablesContainerRestrictedHeight * (
				1 - ((y - this.worldCenterY) / this.worldHeight + .5)
			)
		) + this.#draggablesRadius;

		const uncappedCol = Math.floor(
			this.#draggablesContainerRestrictedWidth * (
				(x - this.worldCenterX) / this.worldWidth + .5
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

		const useableId = id ?? `WILSON_draggable-${this.#draggableDefaultId}`;
		this.#draggableDefaultId++;

		const element = document.createElement("div");
		element.classList.add("WILSON_draggable");
		element.id = useableId;
		element.style.transform = `translate(${col - this.#draggablesRadius}px, ${row - this.#draggablesRadius}px)`;
		
		element.addEventListener("mousedown", e => this.#draggableOnMousedown(e as MouseEvent, useableId));
		element.addEventListener("mouseup", e => this.#draggableOnMouseup(e as MouseEvent, useableId));
		element.addEventListener("mousemove", e => this.#draggableOnMousemove(e as MouseEvent, useableId));
		element.addEventListener("touchstart", e => this.#draggableOnTouchstart(e as TouchEvent, useableId));
		element.addEventListener("touchend", e => this.#draggableOnTouchend(e as TouchEvent, useableId));
		element.addEventListener("touchmove", e => this.#draggableOnTouchmove(e as TouchEvent, useableId));

		this.#draggablesContainer.appendChild(element);

		this.#draggableElements[useableId] = {
			element,
			x,
			y,
			currentlyDragging: false,
		};

		return element;
	}

	removeDraggable(id: string)
	{
		this.#draggableElements[id].element.remove();
		delete this.#draggableElements[id];
	}

	setDraggablePosition({ id, x, y }: { id: string, x: number, y: number })
	{
		this.#draggableElements[id].x = x;
		this.#draggableElements[id].y = y;

		const element = this.#draggableElements[id].element;

		const uncappedRow = Math.floor(
			this.#draggablesContainerRestrictedHeight * (
				1 - ((y - this.worldCenterY) / this.worldHeight + .5)
			)
		) + this.#draggablesRadius;

		const uncappedCol = Math.floor(
			this.#draggablesContainerRestrictedWidth * (
				(x - this.worldCenterX) / this.worldWidth + .5
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

	#draggableOnMousedown(e: MouseEvent, id: string)
	{
		if (this.#draggablesStatic)
		{
			return;
		}

		e.preventDefault();
		
		this.#currentMouseDraggableId = id;
		this.#draggableElements[id].currentlyDragging = true;

		requestAnimationFrame(() =>
		{
			this.#draggableCallbacks.ongrab({
				id,
				x: this.#draggableElements[id].x,
				y: this.#draggableElements[id].y,
				event: e,
			});
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
		this.#draggableElements[id].currentlyDragging = false;

		requestAnimationFrame(() =>
		{
			this.#draggableCallbacks.onrelease({
				id,
				x: this.#draggableElements[id].x,
				y: this.#draggableElements[id].y,
				event: e,
			});
		});
	}

	#draggableOnMousemove(e: MouseEvent, id: string)
	{
		if (this.#draggablesStatic)
		{
			return;
		}
		
		e.preventDefault();

		if (!this.#draggableElements[id].currentlyDragging)
		{
			return;
		}

		const rect = this.#draggablesContainer.getBoundingClientRect();
		const row = Math.min(Math.max(this.#draggablesRadius, e.clientY - rect.top), this.#draggablesContainerHeight - this.#draggablesRadius);
		const col = Math.min(Math.max(this.#draggablesRadius, e.clientX - rect.left), this.#draggablesContainerWidth - this.#draggablesRadius);

		this.#draggableElements[id].element.style.transform = `translate(${col - this.#draggablesRadius}px, ${row - this.#draggablesRadius}px)`;

		const x = (
			(col - this.#draggablesRadius - this.#draggablesContainerRestrictedWidth / 2)
				/ this.#draggablesContainerRestrictedWidth
		) * this.worldWidth + this.worldCenterX;
		
		const y = (
			-(row - this.#draggablesRadius - this.#draggablesContainerRestrictedHeight / 2)
				/ this.#draggablesContainerRestrictedHeight
		) * this.worldHeight + this.worldCenterY;
		
		requestAnimationFrame(() =>
		{
			this.#draggableCallbacks.ondrag({
				id,
				x,
				y,
				xDelta: x - this.#draggableElements[id].x,
				yDelta: y - this.#draggableElements[id].y,
				event: e,
			});

			this.#draggableElements[id].x = x;
			this.#draggableElements[id].y = y;
		});
	}

	#draggableOnTouchstart(e: TouchEvent, id: string)
	{
		if (this.#draggablesStatic)
		{
			return;
		}
		
		e.preventDefault();

		this.#draggableElements[id].currentlyDragging = true;
		
		requestAnimationFrame(() =>
		{
			this.#draggableCallbacks.ongrab({
				id,
				x: this.#draggableElements[id].x,
				y: this.#draggableElements[id].y,
				event: e,
			});
		});
	}

	#draggableOnTouchend(e: TouchEvent, id: string)
	{
		if (this.#draggablesStatic)
		{
			return;
		}
		
		e.preventDefault();

		this.#draggableElements[id].currentlyDragging = false;


		requestAnimationFrame(() =>
		{
			this.#draggableCallbacks.onrelease({
				id,
				x: this.#draggableElements[id].x,
				y: this.#draggableElements[id].y,
				event: e,
			});
		});
	}

	#draggableOnTouchmove(e: TouchEvent, id: string)
	{
		if (this.#draggablesStatic)
		{
			return;
		}
		
		e.preventDefault();

		if (!this.#draggableElements[id].currentlyDragging)
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
			) * this.worldWidth + this.worldCenterX;
			
			const y = (
				-(row - this.#draggablesRadius - this.#draggablesContainerRestrictedHeight / 2)
					/ this.#draggablesContainerRestrictedHeight
			) * this.worldHeight + this.worldCenterY;

			return [x, y, row, col] as [number, number, number, number];
		});



		const distancesFromDraggableCenter = worldCoordinates.map(coordinate =>
		{
			return (coordinate[0] - this.#draggableElements[id].x) ** 2
				+ (coordinate[1] - this.#draggableElements[id].y) ** 2;
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

		this.#draggableElements[id].element.style.transform = `translate(${col - this.#draggablesRadius}px, ${row - this.#draggablesRadius}px)`;



		requestAnimationFrame(() =>
		{
			this.#draggableCallbacks.ondrag({
				id,
				x,
				y,
				xDelta: x - this.#draggableElements[id].x,
				yDelta: y - this.#draggableElements[id].y,
				event: e,
			});

			this.#draggableElements[id].x = x;
			this.#draggableElements[id].y = y;
		});
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
		
		const rect = this.#draggablesContainer.getBoundingClientRect();

		for (const id in this.#draggableElements)
		{
			const x = this.#draggableElements[id].x;
			const y = this.#draggableElements[id].y;
			const element = this.#draggableElements[id].element;

			const uncappedRow = Math.floor(
				this.#draggablesContainerRestrictedHeight * (
					1 - ((y - this.worldCenterY) / this.worldHeight + .5)
				)
			) + this.#draggablesRadius;

			const uncappedCol = Math.floor(
				this.#draggablesContainerRestrictedWidth * (
					(x - this.worldCenterX) / this.worldWidth + .5
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

	#oldWorldWidth: number = 0;
	#oldWorldHeight: number = 0;

	#enterFullscreen()
	{
		this.currentlyFullscreen = true;

		this.#fullscreenOldScroll = window.scrollY;

		if (this.#metaThemeColorElement)
		{
			this.#oldMetaThemeColor = this.#metaThemeColorElement.getAttribute("content");
		}

		
		this.#canvasOldWidth = this.#canvasWidth;

		this.#canvasOldWidthStyle = this.canvas.style.width;
		this.#canvasOldHeightStyle = this.canvas.style.height;

		this.#oldWorldWidth = this.worldWidth;
		this.#oldWorldHeight = this.worldHeight;



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
			this.#fullscreenContainer.classList.add("WILSON_true-fullscreen");

			this.canvas.style.width = "100vw";
			this.canvas.style.height = "100%";

			window.scroll(0, 0);
		}

		else
		{
			this.canvas.style.width = `min(100vw, calc(100vh * ${this.#canvasAspectRatio}))`;
			this.canvas.style.height = `min(100vh, calc(100vw / ${this.#canvasAspectRatio}))`;
		}

		this.#onResizeWindow();
		this.#onResizeCanvas();
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



			document.body.querySelectorAll<HTMLElement>(".WILSON_applet-container")
				.forEach(container => container.style.removeProperty("view-transition-name"));

			if (!this.#fullscreenFillScreen)
			{
				this.#appletContainer.style.setProperty("view-transition-name", "WILSON_applet-container")
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
		this.currentlyFullscreen = false;

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


		this.resizeCanvas({ width: this.#canvasOldWidth });

		this.canvas.style.width = this.#canvasOldWidthStyle;
		this.canvas.style.height = this.#canvasOldHeightStyle;

		this.worldWidth = this.#oldWorldWidth;
		this.worldHeight = this.#oldWorldHeight;

		this.#onResizeWindow();
		this.#onResizeCanvas();

		window.scrollTo(0, this.#fullscreenOldScroll);
		setTimeout(() => window.scrollTo(0, this.#fullscreenOldScroll), 10);
	}

	exitFullscreen()
	{
		// @ts-ignore
		if (document.startViewTransition && this.animateFullscreen)
		{
			if (!this.#fullscreenFillScreen)
			{
				this.#appletContainer.style.setProperty("view-transition-name", "WILSON_applet-container")
			}

			// @ts-ignore
			document.startViewTransition(() => this.#exitFullscreen());
		}
		
		else
		{
			this.#exitFullscreen();
		}
	}



	interpolateCanvasToWorld([row, col]: [number, number])
	{
		return [
			(col / this.#canvasWidth - .5) * this.worldWidth
				+ this.worldCenterX,
			(.5 - row / this.#canvasHeight) * this.worldHeight
				+ this.worldCenterY];
	}

	interpolateWorldToCanvas([x, y]: [number, number])
	{
		return [
			Math.floor((.5 - (y - this.worldCenterY) / this.worldHeight)
				* this.#canvasHeight),
			Math.floor(((x - this.worldCenterX) / this.worldWidth + .5)
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
type UniformType = "int" | "float" | "vec2" | "vec3" | "vec4" | "mat2" | "mat3" | "mat4";
type UniformInitializer = ["int", number]
	| ["float", number]
	| ["vec2", [number, number]]
	| ["vec3", [number, number, number]]
	| ["vec4", [number, number, number, number]]
	| ["mat2", [number, number, number, number]]
	| ["mat3", [number, number, number, number, number, number, number, number, number]]
	| ["mat4", [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number]];
type UniformInitializers = {[name: string]: UniformInitializer};

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

	mat2: (
		gl: WebGLRenderingContext | WebGL2RenderingContext,
		location: WebGLUniformLocation,
		value: [number, number, number, number]
	) => gl.uniformMatrix2fv(location, false, value),
	
	mat3: (
		gl: WebGLRenderingContext | WebGL2RenderingContext,
		location: WebGLUniformLocation,
		value: [number, number, number, number, number, number, number, number, number]
	) => gl.uniformMatrix3fv(location, false, value),
	
	mat4: (
		gl: WebGLRenderingContext | WebGL2RenderingContext,
		location: WebGLUniformLocation,
		value: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number]
	) => gl.uniformMatrix4fv(location, false, value),
};

type SingleShader = {
	shader: string,
	uniforms?: UniformInitializers
};

type MultipleShaders = {
	shaders: {[id: ShaderProgramId]: string},
	uniforms?: {[id: ShaderProgramId]: UniformInitializers},
};

export type WilsonGPUOptions = WilsonOptions & (SingleShader | MultipleShaders);

export class WilsonGPU extends Wilson
{
	gl: WebGLRenderingContext | WebGL2RenderingContext;

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

		const gl = canvas.getContext("webgl2");

		if (gl)
		{
			this.gl = gl;
		}

		else
		{
			const gl = canvas.getContext("webgl");

			if (gl)
			{
				this.gl = gl;
			}

			else
			{
				throw new Error("[Wilson] Failed to get WebGL or WebGL2 context.");
			}
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

		this.useProgram(id);
		this.#currentShaderId = id;

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

		for (const [name, data] of Object.entries(uniforms))
		{
			const location = this.gl.getUniformLocation(this.#shaderPrograms[id], name);

			if (location === null)
			{
				throw new Error(`[Wilson] Couldn't get uniform location for ${name}. Full shader source: ${source}`);
			}

			const [type, value] = data;

			this.#uniforms[id][name] = { location, type };
			this.setUniform({ name, value });
		}
	}

	setUniform({
		name,
		value,
		shaderId = this.#currentShaderId
	}: {
		name: string,
		value: number | number[],
		shaderId?: ShaderProgramId
	}) {
		this.useProgram(shaderId);

		const { location, type } = this.#uniforms[shaderId][name];
		const uniformFunction = uniformFunctions[type];
		uniformFunction(this.gl, location, value);

		this.useProgram(this.#currentShaderId);
	}

	useProgram(id: ShaderProgramId)
	{
		this.gl.useProgram(this.#shaderPrograms[id]);
	}

	

	#framebuffers: {[id: ShaderProgramId]: WebGLFramebuffer} = {};
	#textures: {[id: ShaderProgramId]: WebGLTexture} = {};

	createFramebufferTexturePair({
		id,
		textureType
	}: {
		id: ShaderProgramId,
		textureType: "unsignedByte" | "float"
	}) {
		if (this.#framebuffers[id] !== undefined || this.#textures[id] !== undefined)
		{
			throw new Error(`[Wilson] Tried to create a framebuffer texture pair for shader program ${id}, but one already exists.`);
		}

		const framebuffer = this.gl.createFramebuffer();

		if (!framebuffer)
		{
			throw new Error(`[Wilson] Couldn't create a framebuffer for shader program ${id}.`);
		}

		const texture = this.gl.createTexture();

		if (!texture)
		{
			throw new Error(`[Wilson] Couldn't create a texture for shader program ${id}.`);
		}

		this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
		this.gl.texImage2D(
			this.gl.TEXTURE_2D,
			0,
			this.gl.RGBA,
			this.canvasWidth,
			this.canvasHeight,
			0,
			this.gl.RGBA,
			textureType === "unsignedByte" ? this.gl.UNSIGNED_BYTE : this.gl.FLOAT,
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
		this.#textures[id] = texture;
	}

	useFramebuffer(id: ShaderProgramId | null)
	{
		if (id === null)
		{
			this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
			return;
		}

		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.#framebuffers[id]);
	}

	useTexture(id: ShaderProgramId | null)
	{
		if (id === null)
		{
			this.gl.bindTexture(this.gl.TEXTURE_2D, null);
			return;
		}

		this.gl.bindTexture(this.gl.TEXTURE_2D, this.#textures[id]);
	}

	readPixels()
	{
		const pixels = new Uint8Array(this.canvasWidth * this.canvasHeight * 4);

		this.gl.readPixels(
			0,
			0,
			this.canvasWidth,
			this.canvasHeight,
			this.gl.RGBA,
			this.gl.UNSIGNED_BYTE,
			pixels
		);

		return pixels;
	}



	resizeCanvas(dimensions: { width: number } | { height: number })
	{
		super.resizeCanvas(dimensions);

		this.gl.viewport(0, 0, this.canvasWidth, this.canvasHeight);
	}
}