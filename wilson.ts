type ShaderProgramId = string;

type InteractionCallbacks = {
	mousedown?: ({ x, y, event }: { x: number, y: number, event: MouseEvent }) => void,

	mouseup?: ({ x, y, event }: { x: number, y: number, event: MouseEvent }) => void,

	mousemove?: ({
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

	mousedrag?: ({
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

	touchstart?: ({ x, y, event }: { x: number, y: number, event: TouchEvent }) => void,

	touchend?: ({ x, y, event }: { x: number, y: number, event: TouchEvent }) => void,

	touchmove?: ({
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

	pinch?: ({
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

	wheel?: ({
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

const defaultDraggableOptions: DraggableOptions = {
	radius: 10,
	static: false,
	callbacks: {},
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

const defaultFullscreenOptions: FullscreenOptions = {
	letterboxed: false,
	switchFullscreenCallback: () => {},
	useFullscreenButton: false,
};



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
*/

export default class WilsonCPU
{
	canvas: HTMLCanvasElement;

	ctx: CanvasRenderingContext2D;
	
	#canvasWidth: number;
	#canvasHeight: number;

	#worldWidth: number;
	#worldHeight: number;
	#worldCenterX: number;
	#worldCenterY: number;

	#useP3ColorSpace: boolean;

	#callbacks: InteractionCallbacks;
	#draggableOptions: DraggableOptions;
	#fullscreenOptions: FullscreenOptions;

	constructor(canvas: HTMLCanvasElement, options: WilsonCPUOptions)
	{
		this.canvas = canvas;

		this.#canvasWidth = options.canvasWidth;
		this.#canvasHeight = options.canvasHeight;

		this.canvas.setAttribute("width", this.#canvasWidth.toString());
		this.canvas.setAttribute("height", this.#canvasHeight.toString());

		const computedStyle = window.getComputedStyle(this.canvas);

		

		this.#worldWidth = options.worldWidth ?? 2;
		this.#worldHeight = options.worldHeight ?? 2;
		this.#worldCenterX = options.worldCenterX ?? 0;
		this.#worldCenterY = options.worldCenterY ?? 0;

		this.#useP3ColorSpace = options.useP3ColorSpace ?? true;

		this.#callbacks = { ...defaultInteractionCallbacks, ...options.callbacks };
		this.#draggableOptions = { ...defaultDraggableOptions, ...options.draggableOptions };
		this.#fullscreenOptions = { ...defaultFullscreenOptions, ...options.fullscreenOptions };
		


		const colorSpace = (this.#useP3ColorSpace && matchMedia("(color-gamut: p3)").matches)
			? "display-p3"
			: "srgb";

		const ctx = this.canvas.getContext("2d", { colorSpace });

		if (!ctx)
		{
			throw new Error(`[Wilson] Could not get 2d context for canvas: ${ctx}`);
		}

		this.ctx = ctx;



		this.#initCanvases(options);
		this.#initInteraction();
		this.#initDraggables();
		this.#initFullscreen();



		console.log(
			`[Wilson] Registered a ${this.#canvasWidth}x${this.#canvasHeight} canvas`
			+ (this.canvas.id ? ` with ID ${this.canvas.id}` : "")
		);
	}



	#initCanvases(options: WilsonCPUOptions)
	{
		
	}
}