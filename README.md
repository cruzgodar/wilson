# Applets Made Easy

Wilson is a lightweight TypeScript and JavaScript library for creating interactive web applets. It handles boilerplate tasks like panning and zooming, makes parallelized gpu-based applets as easy as writing a shader, and even provides a robust and customizable fullscreen toolkit. All of this streamlines your work and simplifies your applets, letting you focus on the code that matters.



# Getting Started

Add wilson.ts or wilson.js, then import either `WilsonCPU` or `WilsonGPU` from it. Add a canvas to your HTML and pass it to the constructor to register it:
```ts
    import { WilsonCPU, WilsonCPUOptions } from "/path/to/wilson.ts";

	const canvas = document.querySelector("#canvas-id");

    const options: WilsonCPUOptions = {
		canvasWidth: 500,
	}
    
    const wilson = new WilsonCPU(canvas, options);
```

Wilson does not allow canvases whose pixel aspect ratio does not match their styled aspect ratio. For that reason, only one of `canvasWidth` or `canvasHeight` can be specified; the other will be calculated automatically.

To render a frame to the canvas, use a 1-dimensional `Uint8ClampedArray` filled with the pixel data. Each pixel takes 4 consecutive values in the array, corresponding to the RGBA components (on a scale from 0 to 255). For example, if the first 4 elements are `127, 0, 255, 127`, then the top-left pixel will be semi-transparent purple.

```js
    let image_data = new Uint8ClampedArray(canvas_width * canvas_height * 4);
    
    //Fill image_data with the pixel data. 
    
    wilson_canvas.render.draw_frame(image_data);
```

For a step-by-step guide to handling interactivity, fullscreen, draggables, and everything else Wilson can do, have a look at the [website](https://cruzgodar.com/projects/wilson/).