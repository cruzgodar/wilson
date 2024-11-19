import Wilson from "/wilson.js";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const wilson = new Wilson(canvas, {
	renderer: "cpu",
	canvasWidth: 500,
	canvasHeight: 500,
});