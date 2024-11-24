type ShaderProgramId = string;

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
	mousedown: ({ id, x, y, event }: { id: string, x: number, y: number, event: MouseEvent }) => void,

	mouseup: ({ id, x, y, event }: { id: string, x: number, y: number, event: MouseEvent }) => void,

	mousedrag: ({
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
		event: MouseEvent
	}) => void,

	touchstart: ({ id, x, y, event }: { id: string, x: number, y: number, event: TouchEvent }) => void,

	touchend: ({ id, x, y, event }: { id: string, x: number, y: number, event: TouchEvent }) => void,

	touchmove: ({
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
		event: TouchEvent
	}) => void,
}

const defaultDraggableCallbacks: DraggableCallBacks = {
	mousedown: ({ id, x, y, event }) => {},
	mouseup: ({ id, x, y, event }) => {},
	mousedrag: ({ id, x, y, xDelta, yDelta, event }) => {},
	touchstart: ({ id, x, y, event }) => {},
	touchend: ({ id, x, y, event }) => {},
	touchmove: ({ id, x, y, xDelta, yDelta, event }) => {},
};

type DraggableOptions = {
	radius?: number,
	static?: boolean,
	callbacks?: DraggableCallBacks,
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

	callbacks?: InteractionCallbacks,
	draggableOptions?: DraggableOptions,
	fullscreenOptions?: FullscreenOptions,
};

/*
	gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;

	#shaderPrograms: Record<ShaderProgramId, WebGLProgram> = {};
	#uniforms: Record<ShaderProgramId, Record<string, WebGLUniformLocation>> = {};



	ctx: CanvasRenderingContext2D;
*/

class Wilson
{
	canvas: HTMLCanvasElement;

	canvasWidth: number;
	canvasHeight: number;
	canvasAspectRatio: number;

	#worldWidth: number;
	#worldHeight: number;
	#worldCenterX: number;
	#worldCenterY: number;

	#onResizeCanvasUser: () => void;

	useP3ColorSpace: boolean;

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
		this.canvasAspectRatio = parseFloat(computedStyle.width) / parseFloat(computedStyle.height);

		if ("canvasWidth" in options)
		{
			this.canvasWidth = Math.round(options.canvasWidth);
			this.canvasHeight = Math.round(options.canvasWidth / this.canvasAspectRatio);
		}

		else
		{
			this.canvasWidth = Math.round(options.canvasHeight * this.canvasAspectRatio);
			this.canvasHeight = Math.round(options.canvasHeight);
		}
		

		this.canvas.setAttribute("width", this.canvasWidth.toString());
		this.canvas.setAttribute("height", this.canvasHeight.toString());

		

		this.#worldWidth = options.worldWidth ?? 2;
		this.#worldHeight = options.worldHeight ?? 2;
		this.#worldCenterX = options.worldCenterX ?? 0;
		this.#worldCenterY = options.worldCenterY ?? 0;

		this.#onResizeCanvasUser = options?.onResizeCanvas ?? (() => {});

		this.useP3ColorSpace = options.useP3ColorSpace ?? true;

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

		window.addEventListener("resize", () => this.#onResizeWindow());
		document.documentElement.addEventListener("keydown", e => this.#handleKeydownEvent(e));



		console.log(
			`[Wilson] Initialized a ${this.canvasWidth}x${this.canvasHeight} canvas`
			+ (this.canvas.id ? ` with ID ${this.canvas.id}` : "")
		);
	}



	#onResizeWindow()
	{
		if (this.currentlyFullscreen && this.#fullscreenFillScreen)
		{
			// Resize the canvas to fill the screen but keep the same total number of pixels.
			const windowAspectRatio = window.innerWidth / window.innerHeight;

			const width = Math.round(
				Math.sqrt(this.canvasWidth * this.canvasHeight * windowAspectRatio)
			);

			this.resizeCanvas({ width });
			this.#onResizeCanvas();
		}

		this.#updateDraggablesContainerSize();
	}

	#handleKeydownEvent(e: KeyboardEvent)
	{
		if (e.key === "Escape" && this.currentlyFullscreen)
		{
			this.exitFullscreen();
		}
	}

	#onResizeCanvas()
	{
		requestAnimationFrame(() => this.#onResizeCanvasUser());
	}



	resizeCanvas(dimensions: { width: number } | { height: number })
	{
		const aspectRatio = (this.currentlyFullscreen && this.#fullscreenFillScreen)
			? window.innerWidth / window.innerHeight
			: this.canvasAspectRatio;
		
		if ("width" in dimensions)
		{
			this.canvasWidth = Math.round(dimensions.width);
			this.canvasHeight = Math.round(dimensions.width / aspectRatio);
		}

		else
		{
			this.canvasWidth = Math.round(dimensions.height * aspectRatio);
			this.canvasHeight = Math.round(dimensions.height);
		}

		this.canvas.setAttribute("width", this.canvasWidth.toString());
		this.canvas.setAttribute("height", this.canvasHeight.toString());
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

	addDraggable({ x, y, id }: { x: number, y: number, id?: string })
	{
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
			element: element,
			x: x,
			y: y,
			currentlyDragging: false,
		};

		return element;
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
			this.#draggableCallbacks.mousedown({
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
			this.#draggableCallbacks.mouseup({
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
		) * this.#worldWidth + this.#worldCenterX;
		
		const y = (
			-(row - this.#draggablesRadius - this.#draggablesContainerRestrictedHeight / 2)
				/ this.#draggablesContainerRestrictedHeight
		) * this.#worldHeight + this.#worldCenterY;
		
		requestAnimationFrame(() =>
		{
			this.#draggableCallbacks.mousedrag({
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
			this.#draggableCallbacks.touchstart({
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
			this.#draggableCallbacks.touchend({
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
			) * this.#worldWidth + this.#worldCenterX;
			
			const y = (
				-(row - this.#draggablesRadius - this.#draggablesContainerRestrictedHeight / 2)
					/ this.#draggablesContainerRestrictedHeight
			) * this.#worldHeight + this.#worldCenterY;

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
			this.#draggableCallbacks.touchmove({
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
			const enterFullscreenButton = document.createElement("div");

			enterFullscreenButton.classList.add("WILSON_enter-fullscreen-button");

			this.#canvasContainer.appendChild(enterFullscreenButton);

			const img = document.createElement("img");
			img.src = this.#fullscreenEnterFullscreenButtonIconPath as string;
			enterFullscreenButton.appendChild(img);

			enterFullscreenButton.addEventListener("click", () =>
			{
				this.enterFullscreen();
			});



			const exitFullscreenButton = document.createElement("div");

			exitFullscreenButton.classList.add("WILSON_exit-fullscreen-button");

			this.#canvasContainer.appendChild(exitFullscreenButton);

			const img2 = document.createElement("img");
			img2.src = this.#fullscreenExitFullscreenButtonIconPath as string;
			exitFullscreenButton.appendChild(img2);

			exitFullscreenButton.addEventListener("click", () =>
			{
				this.exitFullscreen();
			});
		}
	}



	#preventGestures(e: Event)
	{
		e.preventDefault();
	}


	
	#canvasOldWidth: number = 0;
	#canvasOldWidthStyle: string = "";
	#canvasOldHeightStyle: string = "";

	#enterFullscreen()
	{
		this.currentlyFullscreen = true;

		this.#fullscreenOldScroll = window.scrollY;

		if (this.#metaThemeColorElement)
		{
			this.#oldMetaThemeColor = this.#metaThemeColorElement.getAttribute("content");
		}

		
		this.#canvasOldWidth = this.canvasWidth;

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
			this.#fullscreenContainer.classList.add("WILSON_true-fullscreen");

			this.canvas.style.width = "100vw";
			this.canvas.style.height = "100%";

			window.scroll(0, 0);
		}

		else
		{
			this.canvas.style.width = `min(100vw, calc(100vh * ${this.canvasAspectRatio}))`;
			this.canvas.style.height = `min(100vh, calc(100vw / ${this.canvasAspectRatio}))`;
		}

		this.#onResizeWindow();
		this.#onResizeCanvas();
	}

	enterFullscreen()
	{
		// @ts-ignore
		if (document.startViewTransition && this.animateFullscreen)
		{
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
			(col / this.canvasWidth - .5) * this.#worldWidth
				+ this.#worldCenterX,
			(.5 - row / this.canvasHeight) * this.#worldHeight
				+ this.#worldCenterY];
	}

	interpolateWorldToCanvas([x, y]: [number, number])
	{
		return [
			Math.floor((.5 - (y - this.#worldCenterY) / this.#worldHeight)
				* this.canvasHeight),
			Math.floor(((x - this.#worldCenterX) / this.#worldWidth + .5)
				* this.canvasWidth)
		];
	}
}



export class WilsonCPU extends Wilson
{
	ctx: CanvasRenderingContext2D;

	constructor(canvas: HTMLCanvasElement, options: WilsonOptions)
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