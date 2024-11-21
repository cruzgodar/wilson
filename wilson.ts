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

type DraggableCallBacks = Pick<InteractionCallbacks,
	"mousedown"
	| "mouseup"
	| "mousemove"
	| "touchstart"
	| "touchend"
	| "touchmove"
>;

const defaultDraggableCallbacks: DraggableCallBacks = {
	mousedown: ({ x, y, event }) => {},
	mouseup: ({ x, y, event }) => {},
	mousemove: ({ x, y, xDelta, yDelta, event }) => {},
	touchstart: ({ x, y, event }) => {},
	touchend: ({ x, y, event }) => {},
	touchmove: ({ x, y, xDelta, yDelta, event }) => {},
};

type DraggableOptions = {
	radius?: number,
	static?: boolean,
	callbacks?: DraggableCallBacks,
};

type FullscreenOptions = {
	letterboxed?: boolean,
	switchFullscreenCallback?: () => void,
} & (
	{
		useFullscreenButton: true,
		enterFullscreenButtonIconPath: string,
		exitFullscreenButtonIconPath: string,
	} | {
		useFullscreenButton: false,
	}
);



export type WilsonCPUOptions = {
	canvasWidth: number,
	canvasHeight: number,

	worldWidth?: number,
	worldHeight?: number,
	worldCenterX?: number,
	worldCenterY?: number,

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

	#canvasWidth: number;
	#canvasHeight: number;

	#worldWidth: number;
	#worldHeight: number;
	#worldCenterX: number;
	#worldCenterY: number;

	#useP3ColorSpace: boolean;

	#callbacks: InteractionCallbacks;



	#draggablesRadius: number;
	#draggablesStatic: boolean;
	#draggableCallbacks: DraggableCallBacks;

	#draggablesContainerWidth: number;
	#draggablesContainerHeight: number;
	#draggablesContainerRestrictedWidth: number;
	#draggablesContainerRestrictedHeight: number;


	#fullscreenLetterboxed: boolean;
	#switchFullscreenCallback: () => void;
	#fullscreenUseButton: boolean;
	#fullscreenEnterFullscreenButtonIconPath?: string;
	#fullscreenExitFullscreenButtonIconPath?: string;

	#appletContainer: HTMLDivElement;
	#canvasContainer: HTMLDivElement;
	#draggablesContainer: HTMLDivElement;
	#fullscreenContainer: HTMLDivElement;
	#fullscreenContainerLocation: HTMLDivElement;

	constructor(canvas: HTMLCanvasElement, options: WilsonCPUOptions)
	{
		this.canvas = canvas;

		this.#canvasWidth = options.canvasWidth;
		this.#canvasHeight = options.canvasHeight;

		this.canvas.setAttribute("width", this.#canvasWidth.toString());
		this.canvas.setAttribute("height", this.#canvasHeight.toString());

		

		this.#worldWidth = options.worldWidth ?? 2;
		this.#worldHeight = options.worldHeight ?? 2;
		this.#worldCenterX = options.worldCenterX ?? 0;
		this.#worldCenterY = options.worldCenterY ?? 0;

		this.#useP3ColorSpace = options.useP3ColorSpace ?? true;

		this.#callbacks = { ...defaultInteractionCallbacks, ...options.callbacks };
		
		this.#draggablesRadius = options.draggableOptions?.radius ?? 10;
		this.#draggablesStatic = options.draggableOptions?.static ?? false;
		this.#draggableCallbacks = { ...defaultDraggableCallbacks, ...options.draggableOptions?.callbacks };

		this.#fullscreenLetterboxed = options.fullscreenOptions?.letterboxed ?? false;
		this.#switchFullscreenCallback = options.fullscreenOptions?.switchFullscreenCallback ?? (() => {});
		this.#fullscreenUseButton = options.fullscreenOptions?.useFullscreenButton ?? false;

		if (options.fullscreenOptions?.useFullscreenButton)
		{
			this.#fullscreenEnterFullscreenButtonIconPath = options.fullscreenOptions?.enterFullscreenButtonIconPath;
			this.#fullscreenExitFullscreenButtonIconPath = options.fullscreenOptions?.exitFullscreenButtonIconPath;
		}
		


		// const colorSpace = (this.#useP3ColorSpace && matchMedia("(color-gamut: p3)").matches)
		// 	? "display-p3"
		// 	: "srgb";

		// const ctx = this.canvas.getContext("2d", { colorSpace });

		// if (!ctx)
		// {
		// 	throw new Error(`[Wilson] Could not get 2d context for canvas: ${ctx}`);
		// }

		// this.ctx = ctx;



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



		for (const canvas of [this.canvas, this.#draggablesContainer])
		{
			canvas.addEventListener("gesturestart", e => e.preventDefault());
			canvas.addEventListener("gesturechange", e => e.preventDefault());
			canvas.addEventListener("gestureend", e => e.preventDefault());

			canvas.addEventListener("click", e => e.preventDefault());
		}




		this.#initInteraction();
		// this.#initFullscreen();



		console.log(
			`[Wilson] Initialized a ${this.#canvasWidth}x${this.#canvasHeight} canvas`
			+ (this.canvas.id ? ` with ID ${this.canvas.id}` : "")
		);
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



	#draggableOnMousedown(e: MouseEvent) {}
	#draggableOnMouseup(e: MouseEvent) {}
	#draggableOnMousemove(e: MouseEvent) {}
	#draggableOnTouchstart(e: TouchEvent) {}
	#draggableOnTouchend(e: TouchEvent) {}
	#draggableOnTouchmove(e: TouchEvent) {}



	#initFullscreen()
	{
		if (this.#fullscreenUseButton && this.#fullscreenEnterFullscreenButtonIconPath)
		{
			const enterFullscreenButton = document.createElement("div");

			enterFullscreenButton.classList.add("WILSON_enter-fullscreen-button");

			this.canvas.parentElement && this.canvas.parentElement.appendChild(enterFullscreenButton);

			const img = document.createElement("img");
			img.src = this.#fullscreenEnterFullscreenButtonIconPath;
			enterFullscreenButton.appendChild(img);

			enterFullscreenButton.addEventListener("click", () =>
			{
				this.enterFullscreen();
			});
		}
	}



	interpolateCanvasToWorld([row, col]: [number, number])
	{
		return [
			(col / this.#canvasWidth - .5) * this.#worldWidth
				+ this.#worldCenterX,
			(.5 - row / this.#canvasHeight) * this.#worldHeight
				+ this.#worldCenterY];
	}

	interpolateWorldToCanvas([x, y]: [number, number])
	{
		return [
			Math.floor((.5 - (y - this.#worldCenterY) / this.#worldHeight)
				* this.#canvasHeight),
			Math.floor(((x - this.#worldCenterX) / this.#worldWidth + .5)
				* this.#canvasWidth)
		];
	}
}