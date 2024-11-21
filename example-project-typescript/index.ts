import { WilsonCPU } from "/wilson.js";

const canvas = document.querySelector("#demo-canvas") as HTMLCanvasElement;
const resolution = 500;

const wilson = new WilsonCPU(canvas, {
	canvasWidth: resolution,
	canvasHeight: resolution * 9 / 16,

	fullscreenOptions: {
		useFullscreenButton: true,
		enterFullscreenButtonIconPath: "/enter-fullscreen.png",
		exitFullscreenButtonIconPath: "/exit-fullscreen.png",
	},
});

wilson.ctx.fillStyle = "#ff0000";
wilson.ctx.fillRect(0, 0, resolution, resolution);

setInterval(() =>
{
	const [x, y] = wilson.interpolateWorldToCanvas([Math.random(), Math.random()]);

	wilson.ctx.fillStyle = "#00ff00";
	wilson.ctx.fillRect(x, y, 10, 10);
}, 1000 / 60);