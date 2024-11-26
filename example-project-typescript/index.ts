import { WilsonCPU, WilsonGPU } from "/wilson.js";

function initWilson1()
{
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

	wilson.addDraggable({ id: "center", x: 0, y: 0 });
	wilson.addDraggable({ id: "right", x: 1, y: 0 });
	wilson.addDraggable({ id: "left", x: -1, y: 0 });
	wilson.addDraggable({ id: "top", x: 0, y: 1 });
	wilson.addDraggable({ id: "bottom", x: 0, y: -1 });

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
}



function initWilson2()
{
	const canvas = document.querySelector("#demo-canvas-2") as HTMLCanvasElement;
	const resolution = 500;

	const shader = /* glsl */`
		precision highp float;
		
		varying vec2 uv;
		
		uniform vec2 worldCenter;
		uniform vec2 worldSize;

		// uniform float brightnessScale;
		uniform vec2 c;
		
		
		
		void main(void)
		{
			vec2 z = uv * worldSize * 0.5 + worldCenter;
			
			vec3 color = normalize(
				vec3(
					abs(z.x + z.y) / 2.0,
					abs(z.x) / 2.0,
					abs(z.y) / 2.0
				)
				+ .1 / length(z) * vec3(1.0)
			);
			
			float brightness = exp(-length(z));
			
			
			
			for (int iteration = 0; iteration < 200; iteration++)
			{	
				if (length(z) >= 4.0)
				{
					break;
				}
				
				z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
				
				brightness += exp(-length(z));
			}
			
			gl_FragColor = vec4(brightness / 10.0 * color, 1.0);
		}
	`;

	const wilson = new WilsonGPU(canvas, {
		shader,

		uniforms: {
			worldCenter: ["vec2", [0, 0]],
			worldSize: ["vec2", [2, 2]],
			c: ["vec2",[0, 0]],
		},

		canvasWidth: resolution,
		onResizeCanvas,

		fullscreenOptions: {
			fillScreen: true,
			useFullscreenButton: true,
			enterFullscreenButtonIconPath: "/enter-fullscreen.png",
			exitFullscreenButtonIconPath: "/exit-fullscreen.png",
		},

		draggableOptions: {
			draggables: [
				{ id: "c", x: 0, y: 0 }
			],

			callbacks: {
				ondrag: ({ id, x, y }) => {
					if (id === "c")
					{
						wilson.setUniform({ name: "c", value: [x, y] });
						wilson.drawFrame();
					}
				}
			}
		}
	});

	onResizeCanvas();

	function onResizeCanvas()
	{
		wilson.setUniform({
			name: "worldCenter",
			value: [
				wilson.worldCenterX,
				wilson.worldCenterY
			]
		});

		wilson.setUniform({
			name: "worldSize",
			value: [
				wilson.worldWidth,
				wilson.worldHeight
			]
		});
		
		wilson.drawFrame();
	}
}



initWilson1();
initWilson2();