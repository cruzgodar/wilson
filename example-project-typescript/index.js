import { WilsonCPU } from "/wilson.js";
const canvas = document.querySelector("#demo-canvas");
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
wilson.ctx.fillStyle = "#000000";
wilson.ctx.fillRect(0, 0, wilson.canvasWidth, wilson.canvasHeight);
setInterval(() => {
    const [row, col] = wilson.interpolateWorldToCanvas([Math.random() * 2 - 1, Math.random() * 2 - 1]);
    wilson.ctx.fillStyle = "#00ff00";
    wilson.ctx.fillRect(col, row, 1, 1);
}, 1000 / 60);
