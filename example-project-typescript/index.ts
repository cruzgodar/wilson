import { WilsonCPU } from "/wilson.js";

const canvas = document.querySelector("#demo-canvas") as HTMLCanvasElement;
const resolution = 500;

const wilson = new WilsonCPU(canvas, {
	canvasWidth: resolution,
	onResizeCanvas: drawFrame,

	fullscreenOptions: {
		fillScreen: false,
		useFullscreenButton: true,
		enterFullscreenButtonIconPath: "/enter-fullscreen.png",
		exitFullscreenButtonIconPath: "/exit-fullscreen.png",
	},
});

wilson.addDraggable({ x: 0, y: 0 });

drawFrame();

function drawFrame()
{
	wilson.ctx.fillStyle = "color(display-p3 1 0 0)";
	wilson.ctx.fillRect(0, 0, wilson.canvasWidth, wilson.canvasHeight);

	wilson.ctx.fillStyle = "color(display-p3 0 0 0)";
	wilson.ctx.fillRect(1, 1, wilson.canvasWidth - 2, wilson.canvasHeight - 2);

	// Draw a circle in the middle of the screen.
	wilson.ctx.fillStyle = "color(display-p3 1 0 0)";
	const centerX = wilson.canvasWidth / 2;
	const centerY = wilson.canvasHeight / 2;

	const radius = Math.min(wilson.canvasWidth / 3, wilson.canvasHeight / 3);

	wilson.ctx.beginPath();
	wilson.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
	wilson.ctx.fill();
}