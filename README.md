# Applets Made Easy

Wilson is a TypeScript and JavaScript library for creating interactive web applets. It handles boilerplate tasks like panning and zooming, makes parallelized gpu-based applets as easy as writing a shader, and even provides a robust and customizable fullscreen toolkit. All of this streamlines your work and simplifies your applets, letting you focus on the code that matters.

Wilson does four things:
1. It removes unnecessary complexity from writing applets using WebGL. You need only write a fragment shader (i.e. the actual parallelized code), and list any uniforms you use.
2. It comprehensively handles panning and zooming, with support for pinch-to-zoom on touchscreens and inertia for both panning and zooming. Getting this to feel just right on your own is a very tedious process, and it's easy to stop at an 80% solution; Wilson sweats all the details.
3. It adds support for interactive elements (so-called "draggables") that live on the canvas and can be moved independently.
4. It define a fullscreen mode for applets that preserves aspect ratio and event listeners and works with the Page Transition API.



## Getting Started

Add `wilson.ts` or `wilson.js` to your project, load `wilson.css`, then import either `WilsonCPU` or `WilsonGPU`. If your project uses TypeScript, you can also import either `WilsonCPUOptions` or `WilsonGPUOptions`. Add a canvas to your HTML and pass it to the constructor to register it:
```js
import { WilsonCPU } from "/path/to/wilson.js";

const canvas = document.querySelector("#canvas-id");

const options = {
	canvasWidth: 500,
}

const wilson = new WilsonCPU(canvas, options);
```

Wilson does not allow canvases whose pixel aspect ratio does not match their visual aspect ratio as determined by CSS. For that reason, only one of `canvasWidth` or `canvasHeight` can be specified; the other will be calculated automatically. To resize the canvas manually later, use the `resizeCanvas` method.

In addition to canvas width and height, Wilson has a concept of **world coordinates**, which are used to represent the actual scene being rendered. They are used by the built-in interaction, fullscreen, and draggables methods, and much of the utility Wilson provides is only fully leveraged by using them. The `worldWidth` and `worldHeight` fields can technically both be specified, but it is strongly recommended to use only one of them; the other will be calculated automatically to match the aspect ratio of the canvas.

The `WilsonCPU` class is relatively straightforward: it exposes the `ctx` field, which is a 2D drawing context for the canvas, and also a `drawFrame` method that directly sets the image data to a given Uint8ClampedArray.



### WilsonGPU

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

Wilson handles initializing the shader program, uploading the vertex data, and rendering the frame. To initialize uniforms, which are variables indicated in the GLSL that are constant across the entire frame, indicate their initial values in the `uniforms` field of the `options` object (their types are automatically inferred from the GLSL):

```js
const options = {
	shader,

	uniforms: {
		worldCenter: [0, 0],
		worldSize: [2, 2],
		c: [0, 1],
	}
};
```

Ints and floats are initialized with numbers, while vectors and matrices are initialized with 1D arrays of numbers of appropriate lengths.

To draw a frame, call the `drawFrame` method on the `WilsonGPU` instance. To set a uniform, use the `setUniform` method:

```js
wilson.setUniform({ name: "c", value: [0, 1] });
```

Specifying the `shaders` field of the `options` object instead of the singular `shader` field allows for specifing multiple shaders, which allows for easier switching without having multiple Wilson instances. The `shaders` field is an object whose keys are the IDs of the shader programs, and whose values are strings containing the GLSL code. Similarly, when `shaders` is specified, the `uniforms` field is an object whose keys are the IDs of the shader programs, and whose values are objects with the same structure as the `uniforms` field of a single shader. Regardless of which field is used, the `loadShader` method allows for dynamically loading shaders later.



### Interactivity

Wilson provides callbacks for mouse and touch events on the canvas, specified in the `interactionOptions` field of the `options` object. These are:

```js
mousedown: ({ x, y, event }) => {}
mouseup: ({ x, y, event }) => {}
mousemove: ({ x, y, xDelta, yDelta, event }) => {}
mousedrag: ({ x, y, xDelta, yDelta, event }) => {}

touchstart: ({ x, y, event }) => {}
touchend: ({ x, y, event }) => {}
touchmove: ({ x, y, xDelta, yDelta, event }) => {}

wheel: ({ x, y, scrollDelta, event }) => {}
```

The only nonstandard name is `mousedrag`, which is called only when the mouse is being dragged (`mousemove` is called only when the mouse is not being dragged). However, the most common use case is to use these events to implement panning and zooming. Wilson handles these automatically, including supporting pinch-to-zoom on touchscreens and inertia for both panning and zooming. To take advantage of these features, set `useForPanAndZoom: true` in the `interactionOptions` field of the `options` object, and also prodive a callback for updating the scene when the world coordinates change:

```js
const options = {
	interactionOptions: {
		useForPanAndZoom: true,
		onPanAndZoom: drawFrame // Some function to redraw the scene.
	},
};
```



### Draggables

Draggables are a built-in way to add interactive elements directly to the canvas that can be moved independently — including multiple at once on a touchscreen. They are specified in the `draggableOptions` field of the `options` object:

```js
const options = {
	draggableOptions: {
		draggables: [
			c: [0, 0],
			r: [1, 0],
		],
	},
};
```

Callbacks can be specified for when a draggable is grabbed, dragged, and released, with the following signatures:

```js
ongrab: ({ id, x, y, event }) => {}
ondrag: ({ id, x, y, xDelta, yDelta, event }) => {}
onrelease: ({ id, x, y, event }) => {}
```

The example project uses a draggable to represent the `c` value for the Julia set and updates the corresponding uniform when the draggable is moved.



### Fullscreen

Wilson provides a built-in fullscreen mode, which can be used to render a scene in a window as large as possible. To use it, set the `fullscreenOptions` object in the options:

```js
const options = {
	onResizeCanvas: drawFrame,

	fullscreenOptions: {
		useFullscreenButton: true,
		enterFullscreenButtonIconPath: "/path/to/enter-fullscreen.png",
		exitFullscreenButtonIconPath: "/path/to/exit-fullscreen.png",
	},
};
```

Wilson provides a built-in button to enter and exit fullscreen that works nicely with the [Page Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API). Without it, you can still enter and exit fullscreen manually by calling the `enterFullscreen` and `exitFullscreen` methods. Wilson will call the `onResizeCanvas` callback when entering and exiting fullscreen, so you can update your applet to fit the new size.

By default, opening a canvas in fullscreen will preserve its aspect ratio, effectively just centering it, making it as large as possible, and providing a black background. However, many applets are independent of aspect ratio, and so Wilson allows for fullscreen applets to truly fill the entire screen. To do this, set the `fillScreen` field to `true` in the `fullscreenOptions` object. In this mode, the canvas will be resized to match the aspect ratio of the window, in a manner so that the total number of pixels rendered is preserved (to avoid narrow aspect ratios producing a very large canvas). The world width and height will also be updated to match the new aspect ratio, but always so that neither is smaller than the non-fullscreen world width and height (so that opening fullscreen never displays less content).



## Full Documentation

The above guide, along with the example project, are a great way to get started with Wilson. For more detailed usage examples, all of the [applets on my personal website](https://github.com/cruzgodar/cruzgodar.github.io/tree/main/applets) are built with Wilson. The full list of options and methods is provided here for completeness; unless otherwise specified, all of the options are optional.

### Options

- `canvasWidth` or `canvasHeight`: the width or height of the canvas, in pixels. Exactly one of these must be specified.
- `worldWidth`, `worldHeight`: the width and height of the world. If one is unspecified, it will be calculated automatically to match the aspect ratio of the canvas. If both are unspecified, the smaller one defaults to `2`.
- `worldCenterX`, `worldCenterY`: the world coordinates of the center of the canvas. Both default to `0`.
- `minWorldWidth`, `maxWorldWidth`, `minWorldHeight`, `maxWorldHeight`, `minWorldCenterX`, `maxWorldCenterX`, `minWorldCenterY`, `maxWorldCenterY`: bounds on the world coordinates that are enforced by all methods that change them (panning, zooming, and entering fullscreen). If unspecified, no bounds are enforced.
- `onResizeCanvas: () => void`: a function that is called whenever the canvas is resized.
- `useP3ColorSpace`: a boolean for whether to use the wider P3 color space for the canvas. Even if this is `true`, Wilson will check for hardware P3 support before using it. Note that drawing in a 2D context with P3 colors *also* requires a different color syntax, e.g. `wilson.ctx.fillStyle = "color(display-p3 1 0 0)";`. Defaults to `true`.
- `reduceMotion`: a boolean for whether to use reduced motion animations. If left unspecified, the user's accessibility settings will be used to determine whether reduced motion is enabled.
- `interactionOptions`: an object with some or all of the following fields:
	- `useForPanAndZoom`: a boolean for whether to use pan and zoom interactions. Defaults to `false`.
	- `onPanAndZoom: () => void`: a function called whenever the world coordinates change due to panning or zooming. Only allowed if `useForPanAndZoom` is `true`.
	- `inertia`: a boolean for whether to use inertia for panning and zooming. Defaults to `true`; only allowed if `useForPanAndZoom` is `true`.
	- `panFriction`: a number between `0` and `1` that the panning velocity is multiplied by when panning. Defaults to `0.875`; only allowed if `useForPanAndZoom` is `true`.
	- `zoomFriction`: a number between `0` and `1` that the zoom velocity is multiplied by when zooming. Defaults to `0.85`; only allowed if `useForPanAndZoom` is `true`.
	- `callbacks`: an object with some or all of the following fields:
		- `mousedown: ({ x, y, event }) => void`: a function called when a cursor is pressed down on the canvas.
		- `mouseup: ({ x, y, event }) => void`: a function called when a cursor is released on the canvas.
		- `mousemove: ({ x, y, xDelta, yDelta, event }) => void`: a function called when a cursor is moved while hovering on the canvas.
		- `mousedrag: ({ x, y, xDelta, yDelta, event }) => void`: a function called when a cursor is moved while dragging on the canvas.
		- `touchstart: ({ x, y, event }) => void`: a function called when a touch is pressed down on the canvas.
		- `touchend: ({ x, y, event }) => void`: a function called when a touch is released on the canvas.
		- `touchmove: ({ x, y, xDelta, yDelta, event }) => void`: a function called when a touch point is moved while dragging on the canvas.
		- `wheel: ({ x, y, scrollDelta, event }) => void`: a function called when a mouse wheel is scrolled on the canvas.
- `draggableOptions`: an object with the following fields:
	- `draggables`: an object whose keys are the IDs of draggable elements, and whose values are arrays of two numbers representing the initial world coordinates of the draggable.
	- `radius`: the radius of the draggable circles, in pixels (including the border). Defaults to `12`. Change this only if you are also restyling the CSS of the draggables.
	- `static`: a boolean for whether the draggables are unable to be moved. Defaults to `false`.
	- `callbacks`: an object with some or all of the following fields:
		- `ongrab: ({ id, x, y, event }) => void`: a function called when a draggable is grabbed.
		- `ondrag: ({ id, x, y, xDelta, yDelta, event }) => void`: a function called when a draggable is moved.
		- `onrelease: ({ id, x, y, event }) => void`: a function called when a draggable is released.
- `fullscreenOptions`: an object with the following fields:
	- `fillScreen`: a boolean for whether to resize the canvas and world to fill the entire screen. Defaults to `false`.
	- `animate`: a boolean for whether to animate the transition to fullscreen. Defaults to `true`.
	- `useFullscreenButton`: a boolean for whether to use a button to enter and exit fullscreen. Defaults to `false`.
	- `enterFullscreenButtonIconPath`: a string for the path to the enter fullscreen button image. Required (and only allowed) if `useFullscreenButton` is `true`.
	- `exitFullscreenButtonIconPath`: a string for the path to the exit fullscreen button image. Required (and only allowed) if `useFullscreenButton` is `true`.

### General Fields and Methods

- `canvas`: the canvas element.
- `canvasWidth`, `canvasHeight`: the width and height of the canvas, in pixels. Readonly.
- `worldWidth`, `worldHeight`, `worldCenterX`, `worldCenterY`: the current world coordinates. It is recommended not to change these directly, particularly when using the built-in panning and zooming.
- `minWorldWidth`, `maxWorldWidth`, `minWorldHeight`, `maxWorldHeight`, `minWorldCenterX`, `maxWorldCenterX`, `minWorldCenterY`, `maxWorldCenterY`: bounds on the world coordinates. May be changed dynamically, although the possible subsequent clamping of the coordinates may be undesirable.
- `reduceMotion`: a boolean for whether reduced motion animations are enabled. Can be changed dynamically.
- `useInteractionForPanAndZoom`: a boolean for whether to use pan and zoom interactions. Can be changed dynamically.
- `currentlyFullscreen`: a boolean for whether the canvas is currently in fullscreen mode. Readonly.
- `animateFullscreen`: a boolean for whether the fullscreen transition is animated. Can be changed dynamically.
- `draggableElements`: a readonly object containing the current draggables, of the form
```ts
{
	[id: string]: {
		element: HTMLDivElement,
		x: number,
		y: number,
		currentlyDragging: boolean,
	}
}
```
- `resizeCanvas({ width?: number, height?: number })`: resizes the canvas to the given dimensions. Exactly one of `width` and `height` must be specified.
- `addDraggable({ id: string, x: number, y: number })`: adds a draggable at the given world coordinates.
- `removeDraggable(id: string)`: removes the draggable with the given ID.
- `setDraggablePosition({ id: string, x: number, y: number })`: sets the world coordinates of the draggable with the given ID.
- `enterFullscreen()`: enters fullscreen mode.
- `exitFullscreen()`: exits fullscreen mode.
- `interpolateCanvasToWorld([row: number, col: number]): [number, number]`: converts a point in canvas coordinates to world coordinates.
- `interpolateWorldToCanvas([x: number, y: number]): [number, number]`: converts a point in world coordinates to canvas coordinates.
- `destroy()`: destroys the Wilson instace, removes all event listeners, and returns the canvas div structure to its original state.

### WilsonCPU Fields and Methods
- `ctx`: the 2D canvas context; only available on `WilsonCPU` instances.
- `drawFrame(image: Uint8ClampedArray)`: draws the current frame to the canvas.
- `downloadFrame(filename: string)`: downloads the current frame as a png file.

### WilsonGPU Fields and Methods
- `gl`: the WebGL or WebGL2 context.
- `drawFrame()`: draws a frame with the current shader program.instances.
- `downloadFrame(filename: string, drawNewFrame?: boolean)`: downloads the current frame as a png file. For this to work properly, a new frame must be drawn immediately before downloading. Setting drawNewFrame to `false` will skip this step; only use this if you are manually drawing a frame directly before calling this method.
- `loadShader({ id?: string, source: string, uniforms?: {[name: string]: number | number[]} })`: loads a new shader program and sets it as the current one. If no ID is specified, it defaults to a serialized number; this is only recommended if you don't plan to reuse prior shaders.
- `setUniform({ name: string, value: number | number[], shaderId?: string })`: sets a uniform. If no shader ID is specified, it defaults to the current shader program.
- `useShader(id: string)`: sets the current shader program.
- `createFramebufferTexturePair({ id: string, textureType: "unsignedByte" | "float" })`: creates a framebuffer texture pair with a given ID and type. The size of the texture is the same as the canvas.
- `useFramebuffer(id: string | null)`: sets the current framebuffer.
- `useTexture(id: string | null)`: sets the current texture.
- `readPixels()`: reads the current frame as a Uint8ClampedArray.