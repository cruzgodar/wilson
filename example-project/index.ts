import { WilsonCPU, WilsonCPUOptions, WilsonGPU, WilsonGPUOptions } from "/wilson.js";

function initWilson1()
{
	const canvas = document.querySelector("#demo-canvas") as HTMLCanvasElement;
	const resolution = 1000;

	const options: WilsonCPUOptions = {
		canvasWidth: resolution,
		onResizeCanvas: drawFrame,

		draggableOptions: {
			draggables: {
				center: [0, 0],
				radius: [1, 0],
			},
			callbacks: {
				ondrag: drawFrame
			}
		},

		fullscreenOptions: {
			fillScreen: false,
			useFullscreenButton: true,
			enterFullscreenButtonIconPath: "/enter-fullscreen.png",
			exitFullscreenButtonIconPath: "/exit-fullscreen.png",
		},
	};

	const wilson = new WilsonCPU(canvas, options);

	drawFrame();

	function drawFrame()
	{
		wilson.ctx.fillStyle = "color(display-p3 0 0 0)";
		wilson.ctx.fillRect(0, 0, wilson.canvasWidth, wilson.canvasHeight);

		// Draw 3/4 of a circle.
		wilson.ctx.fillStyle = "color(display-p3 1 0 0)";
		const [centerRow, centerCol] = wilson.interpolateWorldToCanvas(wilson.draggables.center.location);

		const [radiusRow, radiusCol] = wilson.interpolateWorldToCanvas(wilson.draggables.radius.location);

		const startingAngle = Math.atan2(radiusRow - centerRow, radiusCol - centerCol);

		const radius = Math.sqrt((radiusCol - centerCol) ** 2 + (radiusRow - centerRow) ** 2);

		wilson.ctx.beginPath();
		wilson.ctx.moveTo(centerCol, centerRow);
		wilson.ctx.arc(
			centerCol,
			centerRow,
			radius,
			startingAngle,
			startingAngle + 1.5 * Math.PI
		);
		wilson.ctx.lineTo(centerCol, centerRow);
		wilson.ctx.lineTo(radiusCol, radiusRow);
		wilson.ctx.fill();
	}
}



function initWilson2()
{
	const canvas = document.querySelector("#demo-canvas-2") as HTMLCanvasElement;
	const resolution = 1000;

	const shader = /* glsl */`
		precision highp float;
		
		varying vec2 uv;
		
		uniform vec2 worldCenter;
		uniform vec2 worldSize;
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

	const options: WilsonGPUOptions = {
		shader,

		uniforms: {
			worldCenter: [0, 0],
			worldSize: [2, 2],
			c: [0, 1],
		},

		canvasWidth: resolution,
		onResizeCanvas: drawFrame,

		worldHeight: 3,

		minWorldWidth: 0.000003,
		maxWorldWidth: 6,
		minWorldHeight: 0.000003,
		maxWorldHeight: 6,

		minWorldCenterX: -1.5,
		maxWorldCenterX: 1.5,
		minWorldCenterY: -1.5,
		maxWorldCenterY: 1.5,


		interactionOptions: {
			useForPanAndZoom: true,
			onPanAndZoom: drawFrame
		},

		fullscreenOptions: {
			fillScreen: true,
			useFullscreenButton: true,
			enterFullscreenButtonIconPath: "/enter-fullscreen.png",
			exitFullscreenButtonIconPath: "/exit-fullscreen.png",
		},

		draggableOptions: {
			draggables: {
				c: [0, 1]
			},

			callbacks: {
				ondrag: ({ id, x, y }) => {
					if (id === "c")
					{
						wilson.setUniforms({ c: [x, y] });
						wilson.drawFrame();
					}
				}
			}
		}
	};

	const wilson = new WilsonGPU(canvas, options);

	drawFrame();

	function drawFrame()
	{
		wilson.setUniforms({
			worldCenter: [wilson.worldCenterX, wilson.worldCenterY],
			worldSize: [wilson.worldWidth, wilson.worldHeight]
		});
		
		wilson.drawFrame();
	}
}



initWilson1();
initWilson2();