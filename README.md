# Wilson: Applets Made Easy

Wilson is a TypeScript and JavaScript library for creating interactive web applets. It handles boilerplate tasks like panning and zooming, makes parallelized gpu-based applets as easy as writing a shader, and even provides a robust and customizable fullscreen toolkit. All of this streamlines your work and simplifies your applets, letting you focus on the code that matters.

Wilson does (just) four things:
1. It removes unnecessary complexity from writing applets using WebGL. You need only write a fragment shader (i.e. the actual parallelized code), and list any uniforms you use.
2. It comprehensively handles panning and zooming, with support for pinch-to-zoom on touchscreens and inertia for both panning and zooming. Getting this to feel just right on your own is a very tedious process, and it's easy to stop at an 80% solution; Wilson sweats all the details.
3. It adds support for interactive elements (so-called "draggables") that live on the canvas and can be moved independently.
4. It defines a fullscreen mode for applets that preserves aspect ratio and event listeners, and integrates with the Page Transition API.



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

Ints and floats are initialized with numbers, vectors are initialized with 1D arrays, and matrices are initialized with 2D arrays in **row-major** order (i.e. the way you're likely used to representing them in JavaScript, but not in GLSL). Arrays of `int`s or `float`s (e.g. `uniform int foo[3];`) are initialized with 1D arrays, and arrays of vectors (e.g. `uniform vec3 foo[3];`) are initialized with 2D arrays.

To draw a frame, call the `drawFrame` method on the `WilsonGPU` instance. To set one or more uniforms, use the `setUniforms` method:

```js
wilson.setUniforms({ c: [0, 1] });
```

Specifying the `shaders` field of the `options` object instead of the singular `shader` field allows for specifing multiple shaders, which allows for easier switching without having multiple Wilson instances. The `shaders` field is an object whose keys are the IDs of the shader programs, and whose values are strings containing the GLSL code. Similarly, when `shaders` is specified, the `uniforms` field is an object whose keys are the IDs of the shader programs, and whose values are objects with the same structure as the `uniforms` field of a single shader. Regardless of which field is used, the `loadShader` method allows for dynamically loading shaders later.



### Interactivity

Wilson provides callbacks for mouse and touch events on the canvas, specified in the `interactionOptions` field of the `options` object. These are:

```js
mousedown: ({ x, y, event }) => {}
mouseup: ({ x, y, event }) => {}
mouseenter: ({ x, y, event }) => {}
mouseleave: ({ x, y, event }) => {}
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
		draggables: {
			c: [0, 0],
			r: [1, 0],
		},
	},
};
```

Callbacks can be specified for when a draggable is grabbed, dragged, and released, with the following signatures:

```js
draggableOptions: {
	draggables: {
		c: [0, 0],
		r: [1, 0],
	},
	callbacks: {
		grab: ({ id, x, y, event }) => {}
		drag: ({ id, x, y, xDelta, yDelta, event }) => {}
		release: ({ id, x, y, event }) => {}
	}
},
```

The example project uses a draggable to represent the `c` value for the Julia set and updates the corresponding uniform when the draggable is moved.



### Fullscreen

Wilson provides a built-in fullscreen mode, which can be used to render a scene in a window as large as possible. To use it, set the `fullscreenOptions` object in the options:

```js
const options = {
	onResizeCanvas: drawFrame,

	fullscreenOptions: {
		useFullscreenButton: true,
		enterFullscreenButtonIconPath: "/path/to/enter-fullscreen-icon.png",
		exitFullscreenButtonIconPath: "/path/to/exit-fullscreen-icon.png",
	},
};
```

Wilson provides a built-in button to enter and exit fullscreen that works nicely with the [Page Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API). Without it, you can still enter and exit fullscreen manually by calling the `enterFullscreen` and `exitFullscreen` methods. Wilson will call the `onResizeCanvas` callback when entering and exiting fullscreen (if the canvas has been resized), so you can update your applet to fit the new size.

By default, opening a canvas in fullscreen will preserve its aspect ratio, effectively just centering it, making it as large as possible, and providing a black background. However, many applets are independent of aspect ratio, and so Wilson allows for fullscreen applets to truly fill the entire screen. To do this, set the `fillScreen` field to `true` in the `fullscreenOptions` object. In this mode, the canvas will be resized to match the aspect ratio of the window, in a manner so that the total number of pixels rendered is preserved (to avoid narrow aspect ratios producing a very large canvas). The world width and height will also be updated to match the new aspect ratio, but always so that neither is smaller than the non-fullscreen world width and height (so that opening fullscreen never displays less content).



## Full Documentation

The above guide, along with the example project, are a great way to get started with Wilson. For more detailed usage examples, all of the [applets on my personal website](https://github.com/cruzgodar/cruzgodar.github.io/tree/main/applets) are built with Wilson. The full list of options and methods is provided here for completeness; unless otherwise specified, all of the options are optional.

### General Options

- `canvasWidth` or `canvasHeight`: the width or height of the canvas, in pixels. Exactly one of these must be specified.
- `worldWidth`, `worldHeight`: the width and height of the world. If one is unspecified, it will be calculated automatically to match the aspect ratio of the canvas. If both are unspecified, the smaller one defaults to `2`.
- `worldCenterX`, `worldCenterY`: the world coordinates of the center of the canvas. Both default to `0`.
- `minWorldWidth`, `maxWorldWidth`, `minWorldHeight`, `maxWorldHeight`: bounds on the width and height of the world coordinates that are enforced by all methods that change them (panning, zooming, and entering fullscreen). If unspecified, no bounds are enforced.
- `minWorldX`, `maxWorldX`, `minWorldY`, `maxWorldY`: bounds on the world coordinates that are visible on screen. If both a minimum and maximum value are specified for a coordinate, the difference between the two will be used for the maximum width/height of the world, regardless of whether that value was set. If unspecified, no bounds are enforced.
- `clampWorldCoordinatesMode: "one" | "both"`: a string that determines how the world coordinates are clamped when both the `x` and `y` values are constrained. `"both"` clamps the coordinates so that neither `x` nor `y` is ever outside the specified bounds, while `"one"` clamps the coordinates so that at most one of `x` or `y` is outside the specified bounds. The typical interaction with fullscreen is that `"one"` allows the amount of visible world to increase, while `"both"` crops into the world that was visible when not in fullscreen. Can be changed dynamically; defaults to `"one"`.
- `onResizeCanvas: () => void`: a function that is called whenever the canvas is resized.
- `useP3ColorSpace`: a boolean for whether to use the wider P3 color space for the canvas. Even if this is `true`, Wilson will check for hardware P3 support before using it. Note that drawing in a 2D context with P3 colors *also* requires a different color syntax, e.g. `wilson.ctx.fillStyle = "color(display-p3 1 0 0)";`. Defaults to `true`.
- `reduceMotion`: a boolean for whether to use reduced motion animations. If left unspecified, the user's accessibility settings will be used to determine whether reduced motion is enabled.
- `interactionOptions`: an object with some or all of the following fields:
	- `useForPanAndZoom`: a boolean for whether to use pan and zoom interactions. Defaults to `false`.
	- `disallowZooming`: a boolean for whether to disallow zooming. Defaults to `false`; only allowed if `useForPanAndZoom` is `true`.
	- `onPanAndZoom: () => void`: a function called whenever the world coordinates change due to panning or zooming. Only allowed if `useForPanAndZoom` is `true`.
	- `inertia`: a boolean for whether to use inertia for panning and zooming. Defaults to `true`; only allowed if `useForPanAndZoom` is `true`.
	- `panFriction`: a number between `0` and `1` that the panning velocity is multiplied by when panning. Defaults to `0.875`; only allowed if `useForPanAndZoom` is `true`.
	- `zoomFriction`: a number between `0` and `1` that the zoom velocity is multiplied by when zooming. Defaults to `0.85`; only allowed if `useForPanAndZoom` is `true`.
	- `rubberbanding`: a boolean for whether to use an experimental rubberbanding feature for panning and zooming. Defaults to `false`; only allowed if `useForPanAndZoom` is `true`.
	- `rubberbandingPanSoftness`: a number between `0` and `Infinity` that determines how slowly the world center is brought back to the bounds when panning. Defaults to `3.5`; only allowed if `rubberbanding` is `true`.
	- `rubberbandingZoomSoftness`: a number between `0` and `Infinity` that determines how slowly the world size is brought back to the bounds when zooming. Defaults to `2`; only allowed if `rubberbanding` is `true`.
	- `callbacks`: an object with some or all of the following fields:
		- `mousedown: ({ x, y, event }) => void`: a function called when a cursor is pressed down on the canvas.
		- `mouseup: ({ x, y, event }) => void`: a function called when a cursor is released on the canvas.
		- `mouseenter: ({ x, y, event }) => void`: a function called when a cursor enters the canvas.
		- `mouseleave: ({ x, y, event }) => void`: a function called when a cursor leaves the canvas.
		- `mousemove: ({ x, y, xDelta, yDelta, event }) => void`: a function called when a cursor is moved while hovering on the canvas.
		- `mousedrag: ({ x, y, xDelta, yDelta, event }) => void`: a function called when a cursor is moved while dragging on the canvas.
		- `touchstart: ({ x, y, event }) => void`: a function called when a touch is pressed down on the canvas.
		- `touchend: ({ x, y, event }) => void`: a function called when a touch is released on the canvas.
		- `touchmove: ({ x, y, xDelta, yDelta, event }) => void`: a function called when a touch point is moved while dragging on the canvas.
		- `wheel: ({ x, y, scrollDelta, event }) => void`: a function called when a mouse wheel is scrolled on the canvas.
- `draggableOptions`: an object with the following fields:
	- `draggables: {[id: string]: [number, number]}`: an object whose keys are the IDs of draggable elements, and whose values are the initial world coordinates of the draggable.
	- `radius`: the radius of the draggable circles, in pixels (including the border). Defaults to `12`. Change this only if you are also restyling the CSS of the draggables.
	- `static`: a boolean for whether the draggables are unable to be moved. Defaults to `false`.
	- `callbacks`: an object with some or all of the following fields:
		- `grab: ({ id, x, y, event }) => void`: a function called when a draggable is grabbed.
		- `drag: ({ id, x, y, xDelta, yDelta, event }) => void`: a function called when a draggable is moved.
		- `release: ({ id, x, y, event }) => void`: a function called when a draggable is released.
- `fullscreenOptions`: an object with the following fields:
	- `fillScreen`: a boolean for whether to resize the canvas and world to fill the entire screen. Defaults to `false`.
	- `animate`: a boolean for whether to animate the transitions to and from fullscreen. Defaults to `true`.
	- `crossfade`: a boolean for whether to always crossfade the transitions to and from fullscreen. Defaults to `false`.
	- `closeWithEscape`: a boolean for whether to close fullscreen when the escape key is pressed. Defaults to `true`.
	- `onSwitch: (isFullscreen: boolean) => void`: a function that is called after the canvas enters or exits fullscreen mode and is included in the page transition.
	- `beforeSwitch: async (isFullscreen: boolean) => void`: a function that is called before the canvas enters or exits fullscreen mode and is not included in the page transition. It is awaited before the page transition begins. A typical use for this is to briefly pause a canvas animating every frame before entering fullscreen — Safari often produces a glitchy transition if animations are not paused.
	- `useFullscreenButton`: a boolean for whether to use a button to enter and exit fullscreen. Defaults to `false`.
	- `enterFullscreenButtonIconPath`: a string for the path to the enter fullscreen button image. Required (and only allowed) if `useFullscreenButton` is `true`.
	- `exitFullscreenButtonIconPath`: a string for the path to the exit fullscreen button image. Required (and only allowed) if `useFullscreenButton` is `true`.

### WilsonGPU Options
- `shader` or `shaders`: either a string containing the GLSL shader code, or an object whose keys are the IDs of shader programs and whose values are strings containing the GLSL code. Exactly one of these must be specified.
- `uniforms`: if `shader` is specified, this is an object whose keys are the names of the uniforms in the shader, and whose values are the initial values of those uniforms. If `shaders` is specified, this is an object whose keys are the IDs of shader programs, and whose values are objects with the same structure as the `uniforms` field of a single shader.
- `useWebGL2`: a boolean for whether to use WebGL2 instead of WebGL. Defaults to `true`. Even if this is `true`, Wilson will check for hardware WebGL2 support before using it.



### General Fields and Methods

- `canvas`: the canvas element.
- `canvasWidth`, `canvasHeight`: the width and height of the canvas, in pixels. Readonly; to change the canvas size, use `resizeCanvas`.
- `worldWidth`, `worldHeight`, `worldCenterX`, `worldCenterY`: the current world coordinates. Readonly; to change the world size, center, or bounds, use `resizeWorld`.
- `reduceMotion`: a boolean for whether reduced motion animations are enabled. Can be changed dynamically.
- `useInteractionForPanAndZoom`: a boolean for whether to use pan and zoom interactions. Can be changed dynamically.
- `clampWorldCoordinatesMode`: a string that determines how the world coordinates are clamped when both the `x` and `y` values are constrained (see the interaction options). Can be changed dynamically.
- `usePanAndZoomRubberbanding`, `rubberbandingPanSoftness`, `rubberbandingZoomSoftness`: parameters for the experimental rubberbanding feature. Can be changed dynamically.
- `currentlyFullscreen`: a boolean for whether the canvas is currently in fullscreen mode. Readonly; to change the fullscreen mode, use `enterFullscreen` or `exitFullscreen`.
- `animateFullscreen`: a boolean for whether the fullscreen transition is animated. Can be changed dynamically.
- `crossfadeFullscreen`: a boolean for whether the fullscreen transition is crossfaded. Can be changed dynamically.
- `closeFullscreenWithEscape`: a boolean for whether to close fullscreen when the escape key is pressed. Can be changed dynamically.
- `onSwitchFullscreen: (isFullscreen: boolean) => void`: a function that is called whenever the canvas enters or exits fullscreen mode. Can be changed dynamically.
- `draggables`: a readonly object containing the current draggables, of the form
```ts
{
	[id: string]: {
		element: HTMLDivElement,
		location: [number, number],
		currentlyDragging: boolean,
	}
}
```
- `resizeCanvas({ width?: number, height?: number })`: resizes the canvas to the given dimensions. Exactly one of `width` and `height` must be specified.
- `resizeWorld({ width?: number, height?: number, centerX?: number, centerY?: number, minWidth?: number, maxWidth?: number, minHeight?: number, maxHeight?: number, minX?: number, maxX?: number, minY?: number, maxY?: number })`: sets the world size, center, and/or bounds. If one of `width` and `height` is unspecified, the other will be calculated automatically to match the aspect ratio; it is possible, though not recommended, to specify both.
- `setDraggables(draggables: {[id: string]: [number, number]})`: sets the world coordinates of the draggables. If a draggable with the given ID does not exist, it will be created.
- `removeDraggables(id: string | string[])`: removes the draggable with the given ID. If an array of IDs is given, all of them will be removed.
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
- `loadShader({ id?: string, shader: string, uniforms?: {[name: string]: number | number[] | number[][]} })`: loads a new shader program and sets it as the current one. If no ID is specified, it defaults to a serialized number; this is only recommended if you don't plan to reuse prior shaders.
- `setUniforms(uniforms: {[name: string]: number | number[] | number[][]} }, shader?: string)`: sets uniforms for the shader program with the given ID. If no shader ID is specified, it defaults to that of the current shader program. As with the initializers for uniforms, ints and floats are set with numbers, vectors are set with 1D arrays, and matrices are set with 2D arrays in row-major order. Arrays of `int`s or `float`s (e.g. `uniform int foo[3];`) are set with 1D arrays, and arrays of vectors (e.g. `uniform vec3 foo[3];`) are set with 2D arrays.
- `useShader(id: string)`: sets the current shader program.
- `createFramebufferTexturePair({ id: string, width?: number, height?: number, textureType: "unsignedByte" | "float" })`: creates a framebuffer texture pair with a given ID and type. If width or height are unspecified, they default to the canvas width and height.
- `useFramebuffer(id: string | null)`: sets the current framebuffer.
- `useTexture(id: string | null)`: sets the current texture.
- `setTexture({ id: string, data: Float32Array | Uint8Array | TexImageSource | null })`: writes `data` to the texture with the given ID. The type of `data` must match the texture type if it is an array (i.e. if the texture is of type `float`, the data must be a `Float32Array`), and the length of `data` must be equal to the texture's width times its height, times 4.
- `readPixels({ row: number, col: number, height: number, width: number, format: "unsignedByte" | "float", includeAlpha: boolean })`: reads the a rectangle of pixels out of the current frame as either  a `Uint8Array` or `Float32Array`, depending on the format. `row` and `col` default to `0`, and `height` and `width` default to the canvas height and width, respectively. The size of the returned array is `width * height * 4`.