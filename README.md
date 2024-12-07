# Applets Made Easy

Wilson is a lightweight TypeScript and JavaScript library for creating interactive web applets. It comprehensively handles boilerplate tasks like panning and zooming, makes parallelized gpu-based applets as easy as writing a shader, and even provides a robust and customizable fullscreen toolkit. All of this streamlines your work and simplifies your applets, letting you focus on the code that matters.



# Getting Started

Add wilson.ts or wilson.js to your project, then import either `WilsonCPU` or `WilsonGPU` from it. Add a canvas to your HTML and pass it to the constructor to register it:
```js
    import { WilsonCPU } from "/path/to/wilson.js";

	const canvas = document.querySelector("#canvas-id");

    const options = {
		canvasWidth: 500,
	}
    
    const wilson = new WilsonCPU(canvas, options);
```

Wilson does not allow canvases whose pixel aspect ratio does not match their visual aspect ratio as determined by CSS. For that reason, only one of `canvasWidth` or `canvasHeight` can be specified; the other will be calculated automatically. To resize the canvas manually later, use the `resizeCanvas` method.

The `WilsonCPU` class is relatively straightforward: it exposes the `ctx` field, which is a 2D drawing context for the canvas, and also a `drawFrame` method that directly sets the image data to a given Uint8ClampedArray.



## WilsonGPU

The `WilsonGPU` class is more complex. In the `options` object, set a `shader` field, which is a string containing the GLSL shader code. As an introductory example, the following shader draws a Julia set:

```glsl
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
		
		gl_FragColor = vec4(brightness / 12.0 * color, 1.0);
	}
```

Wilson handles initializing the shader program, uploading the vertex data, and rendering the frame. To initialize uniforms, which are variables indicated in the GLSL that are constant across the entire frame, indicate their types and initial values in the `uniforms` field of the `options` object:

```js
	const options = {
		shader,

		uniforms: {
			worldCenter: ["vec2", [0, 0]],
			worldSize: ["vec2", [2, 2]],
			c: ["vec2",[0, 1]],
		},

		...
	};
```

Valid types are `int`, `float`, `vec2`, `vec3`, `vec4`, `mat2`, `mat3`, and `mat4`. Ints and floats are initialized with numbers, while vectors and matrices are initialized with 1D arrays of numbers of appropriate lengths.

To draw a frame, call the `drawFrame` method on the `WilsonGPU` instance. To set a uniform, use the `setUniform` method:

```js
	wilson.setUniform({ name: "c", value: [0, 1] });
```

Specifying the `shaders` field of the `options` object instead of the singular `shader` field allows for specifing multiple shaders, which allows for easier switching without having multiple Wilson instances. The `shaders` field is an object whose keys are the IDs of the shader programs, and whose values are strings containing the GLSL code. Similarly, when `shaders` is specified, the `uniforms` field is an object whose keys are the IDs of the shader programs, and whose values are objects with the same structure as the `uniforms` field of a single shader. Regardless of which field is used, the `loadShader` method allows for dynamically loading shaders later.