import { WilsonCPU, WilsonGL, WilsonGPU } from "/wilson.js";
function initWilson1() {
    const canvas = document.querySelector("#demo-canvas");
    const resolution = 1000;
    const options = {
        canvasWidth: resolution,
        onResizeCanvas: drawFrame,
        useResetButton: true,
        resetButtonIconPath: "/reset.png",
        draggableOptions: {
            draggables: {
                center: [0, 0],
                radius: [1, 0],
            },
            callbacks: {
                drag: drawFrame
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
    function drawFrame() {
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
        wilson.ctx.arc(centerCol, centerRow, radius, startingAngle, startingAngle + 1.5 * Math.PI);
        wilson.ctx.lineTo(centerCol, centerRow);
        wilson.ctx.lineTo(radiusCol, radiusRow);
        wilson.ctx.fill();
    }
}
function initWilson2() {
    const canvas = document.querySelector("#demo-canvas-2");
    const resolution = 1000;
    const shader = /* glsl */ `
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
    const options = {
        shader,
        uniforms: {
            worldCenter: [0, 0],
            worldSize: [2, 2],
            c: [0, 1],
        },
        canvasWidth: resolution,
        onResizeCanvas: drawFrame,
        worldHeight: 3,
        minWorldWidth: 0.00001,
        minWorldHeight: 0.00001,
        minWorldX: -2.5,
        maxWorldX: 2.5,
        minWorldY: -2.5,
        maxWorldY: 2.5,
        useResetButton: true,
        resetButtonIconPath: "/reset.png",
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
                drag: ({ id, x, y }) => {
                    if (id === "c") {
                        wilson.setUniforms({ c: [x, y] });
                        wilson.drawFrame();
                    }
                }
            }
        }
    };
    const wilson = new WilsonGL(canvas, options);
    drawFrame();
    function drawFrame() {
        wilson.setUniforms({
            worldCenter: [wilson.worldCenterX, wilson.worldCenterY],
            worldSize: [wilson.worldWidth, wilson.worldHeight]
        });
        wilson.drawFrame();
    }
}
function initWilson3() {
    const canvas = document.querySelector("#demo-canvas-3");
    const resolution = 1000;
    const shader = /* wgsl */ `
		struct Uniforms
		{
			c: vec2<f32>,
			worldCenter: vec2<f32>,
			worldSize: vec2<f32>,
		}
		
		@group(0) @binding(0) var<uniform> uniforms: Uniforms;
		@group(0) @binding(1) var outputTex: texture_storage_2d<rgba16float, write>;
		
		@compute @workgroup_size(8, 8)
		fn main(@builtin(global_invocation_id) globalId: vec3<u32>)
		{
			let dimensions = textureDimensions(outputTex);
			let coords = vec2<u32>(globalId.xy);
			
			if (coords.x >= dimensions.x || coords.y >= dimensions.y)
			{
				return;
			}
			
			// Convert pixel coordinates to complex plane [-2, 2]
			let uv = vec2<f32>(coords) / vec2<f32>(dimensions);
			var z = (uv - 0.5) * uniforms.worldSize + uniforms.worldCenter; // Map [0, 1] to [-2, 2]

			let color = normalize(
				vec3<f32>(
					abs(z.x + z.y) / 2.0,
					abs(z.x) / 2.0,
					abs(z.y) / 2.0
				)
				+ .1 / length(z) * vec3<f32>(1.0, 1.0, 1.0)
			);

			var brightness = exp(-length(z));
			
			let c = uniforms.c;
			
			// Julia set iteration: z = z² + c
			for (var i = 0u; i < 200u; i++)
			{
				// Check if escaped
				if (length(z) > 2.0)
				{
					// Color based on iterations
					textureStore(outputTex, coords, vec4<f32>(brightness / 10.0 * color, 1.0));
					return;
				}

				z = vec2<f32>(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;

				brightness += exp(-length(z));
			}
			
			// Color based on iterations
			textureStore(outputTex, coords, vec4<f32>(0.0, 0.0, 0.0, 1.0));
		}
	`;
    const options = {
        shader,
        uniforms: {
            worldCenter: [0, 0],
            worldSize: [2, 2],
            c: [0, 1],
        },
        canvasWidth: resolution,
        onResizeCanvas: drawFrame,
        worldHeight: 3,
        minWorldWidth: 0.00001,
        minWorldHeight: 0.00001,
        minWorldX: -2.5,
        maxWorldX: 2.5,
        minWorldY: -2.5,
        maxWorldY: 2.5,
        useResetButton: true,
        resetButtonIconPath: "/reset.png",
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
                drag: ({ id, x, y }) => {
                    if (id === "c") {
                        wilson.setUniforms({ c: [x, y] });
                        wilson.drawFrame();
                    }
                }
            }
        }
    };
    const wilson = new WilsonGPU(canvas, options);
    drawFrame();
    function drawFrame() {
        wilson.setUniforms({
            worldCenter: [wilson.worldCenterX, wilson.worldCenterY],
            worldSize: [wilson.worldWidth, wilson.worldHeight]
        });
        wilson.drawFrame();
    }
}
initWilson1();
initWilson2();
initWilson3();
