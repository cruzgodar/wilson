# Wilson: Applets Made Easy

Wilson is a TypeScript and JavaScript library for creating interactive web applets. It handles boilerplate tasks like panning and zooming, makes parallelized gpu-based applets as easy as writing a shader, and even provides a robust and customizable fullscreen toolkit. All of this streamlines your work and simplifies your applets, letting you focus on the code that matters.

Wilson does four things:
1. It removes unnecessary complexity from writing applets using WebGL, including full WebXR support for 3D applets in VR headsets. You need only write a fragment shader (i.e. the actual parallelized code), and list any uniforms you use.
2. It comprehensively handles panning and zooming, with support for pinch-to-zoom on touchscreens and inertia for both panning and zooming. Getting this to feel just right on your own is a very tedious process, and it's easy to stop at an 80% solution; Wilson sweats all the details.
3. It adds support for interactive elements (so-called "draggables") that live on the canvas and can be moved independently.
4. It defines a fullscreen mode for applets that preserves aspect ratio and event listeners, and integrates with the Page Transition API.



## Getting Started

Add `wilson.ts` or `wilson.js` to your project, load `wilson.css`, then import either `WilsonCPU` or `WilsonGL`. If your project uses TypeScript, you can also import either `WilsonCPUOptions` or `WilsonGLOptions`. Add a canvas to your HTML and pass it to the constructor to register it:
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



### WilsonGL

The `WilsonGL` class is more complex. In the `options` object, set a `shader` field, which is a string containing the GLSL shader code. As an introductory example, the following shader draws a Julia set:

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

To draw a frame, call the `drawFrame` method on the `WilsonGL` instance. To set one or more uniforms, use the `setUniforms` method:

```js
wilson.setUniforms({ c: [0, 1] });
```

Specifying the `shaders` field of the `options` object instead of the singular `shader` field allows for specifying multiple shaders, which allows for easier switching without having multiple Wilson instances. The `shaders` field is an object whose keys are the IDs of the shader programs, and whose values are strings containing the GLSL code. Similarly, when `shaders` is specified, the `uniforms` field is an object whose keys are the IDs of the shader programs, and whose values are objects with the same structure as the `uniforms` field of a single shader. Regardless of which field is used, the `loadShader` method allows for dynamically loading shaders later. Shaders are compiled asynchronously if possible, and so you should always `await wilson.allShadersReady()`. If you only need to await a specific shader, `await wilson.shaderReady(shaderId)`;



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

The only nonstandard name is `mousedrag`, which is called only when the mouse is being dragged (`mousemove` is called only when the mouse is not being dragged). However, using these may be unnecessary: the most common use for these events is panning and zooming, which Wilson handles automatically, including supporting pinch-to-zoom on touchscreens and inertia for both panning and zooming. To take advantage of these features, set `useForPanAndZoom: true` in the `interactionOptions` field of the `options` object, and also provide a callback for updating the scene when the world coordinates change:

```js
const options = {
	interactionOptions: {
		useForPanAndZoom: true,
		onPanAndZoom: drawFrame // Some function to redraw the scene.
	},
};
```

Wilson provides a built-in button to animate the world size and center (and all draggables, mentioned in the next section) back to their default values. Without it, you can still reset manually by calling the `resetWorldCoordinates` and `resetDraggables` methods; with it, you can pass the `onReset` callback as an option, which is called when the button is pressed.



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



### WebXR

`WilsonGL` applets that draw 3D scenes can be rendered in a VR headset using WebXR with minimal code changes: the shader just renders to each eye in a headset instead of a canvas, and so the only difference is the camera position and orientation. To enable WebXR support, pass the `xrOptions` object in the options. Its only required field is a `renderFrame` function that renders the scene from a particular perspective:

```js
const options = {
	shader,

	uniforms: {
		projectionMatrix: new Float32Array(16),
		cameraToWorld: new Float32Array(16),
	},

	xrOptions:
	{
		renderFrame: ({ projectionMatrix, cameraToWorld }) =>
		{
			wilson.setUniforms({ projectionMatrix, cameraToWorld });
			wilson.drawFrame();
		},
	},
};
```

`renderFrame` is called once per **eye** with the headset's framebuffer already bound and the viewport already set for that eye, so it needs to do nothing but update the uniforms that differ between the eyes (typically just `projectionMatrix` and `cameraToWorld`) and draw. Both matrices are `Float32Array`s in column-major order, so `setUniforms` uploads them directly without transposing (see the uniform documentation below).

WebXR sessions must be started from a user gesture, and the page must be served over HTTPS or `localhost`. You can call `wilson.enterXR()` in an event handler that fires on a user gesture, and `wilson.exitXR()` to exit (although this is typically unnecessary, since the user can just take off their headset). To determine if the user is currently in an XR session, use `wilson.inXR`.

As with fullscreen, Wilson provides stock UI for entering XR. Set `useButton: true` in `xrOptions` to automatically add an Enter VR button alongside the fullscreen and reset buttons; it is only shown when a headset is actually available. If you prefer to build that functionality yourself, use the `onAvailabilityChange` callback in `xrOptions`, which is called with a boolean in exactly the cases that would show or hide the built-in button: once when the initial check resolves, and again when availability changes.

When an XR session begins, Wilson pauses its own animation frame loop and drives rendering from the headset's frame loop instead. If an applet runs its own `requestAnimationFrame` loop, **stop it in `onEnter` and restart it in `onExit`**. Anything that happens once per frame rather than once per eye — polling controllers, moving the camera velocity, setting uniforms that are the same for both eyes, etc. — should go in the `onFrameStart` callback, which is called once per frame, before either eye is rendered, with the whole framebuffer bound. The `renderFrame` callback should set the per-eye uniforms and draw the frame (presumably using `wilson.drawFrame()`).

Rendering two eyes at a headset's native resolution is *substantially* more expensive than rendering one canvas. Wilson provides three ways to buy back frame time.
- `targetFrameRate` in `xrOptions` lowers the display's refresh rate, which lengthens the budget for every frame without reducing image quality.
- `fixedFoveation` reduces resolution toward the edges of the view, where the headset's lenses blur it anyway. It defaults to `0.3`, but it is typically unavailable when a headset is tethered to a computer, so it should not be relied upon.
- `framebufferScale` is a positive number and scales the framebuffer the session renders into. It is widely available, and setting `wilson.xrFramebufferScale` allows changing it during a session. However, changing it requires rebuilding the framebuffer, which can cost a few frames. Appropriate UI for changing it is a slider with a small number of steps.

WebXR allows scaling the viewport within the framebuffer instead of rebuilding the framebuffer itself, but many headsets ignore it, particularly when tethered, so Wilson always renders each eye into its full viewport.

A headset's framebuffer is typically not the same size or aspect ratio as the canvas. During a session, `createFramebufferTexturePair` defaults to the *headset's* dimensions rather than the canvas's, and `useFramebuffer(null)` returns to the headset's framebuffer and restores the current eye's viewport. If you use framebuffers sized relative to the canvas, recreate them in `onEnter` and `onExit`, as well as whenever you change `xrFramebufferScale` mid-session.

### XR Controllers

Input sources during an XR session are exposed in `wilson.xrControllers`, updated once per frame before `onFrameStart` runs. Each entry stays the same object for as long as its device is connected, so an applet can hold onto one and read it every frame. Controllers are identified by `handedness` rather than by index, since the order they're reported in is not stable; use `wilson.getXRController("left" | "right" | "none")`. Controllers may connect or disconnect during a session; use `onControllerConnect` and `onControllerDisconnect` in `xrOptions` if you need to change behavior when either happens.

Each controller carries two transform matrices, both given relative to the session's reference space. `grip` is where the device is actually held, which is what to use for drawing something in the user's hand. `targetRay` is the ray it points along, whose -Z axis is the pointing direction. Both are `null` on frames where that device isn't tracked, which can happen routinely when a controller leaves the headset cameras' view. Each is a `Float32Array` in column-major order and so can be passed verbatim to `wilson.setUniform`.

Buttons are exposed in the `buttons` field of a controller and follow the `xr-standard` mapping: they are named `trigger`, `squeeze`, `touchpad`, `thumbstick`, `a`, and `b`. On a left controller the last two are the ones physically labeled X and Y. Every button reports `pressed` and an analog `value`, which is only ever 0 or 1 on anything but the trigger and the squeeze. Set the `onButtonDown` and `onButtonUp` callbacks in `xrOptions` if you need to listen for button changes.

An analog stick is reported as the `thumbstick` field of a controller. It is an `[x, y]` pair with positive values for pushing the stick right and up (note that the $y$-values are negated relative to the raw WebXR API).

If the user opens a system menu during a WebXR session, the session's visibility state is `hidden` and the headset runtime takes input without reporting button releases. Wilson forces every button up and fires `onButtonUp` for them in this case, so nothing stays stuck down when the applet comes back.



### High-Res Rendering

A WilsonGL instance can render an image as a collection of small tiles and stitch them together into a single large image. This increases the maximum possible image size above the browser's canvas limit and keeps the main thread relatively calm. To download an image, await `wilson.downloadHighResFrame`:

```js
await wilson.downloadHighResFrame({
	filename: "image.png",
	resolution; 10000,
	render: ({ framebufferId, width, height }) => {
		wilson.useShader("first");
		wilson.useFramebuffer("pass1");
		wilson.drawFrame();

		wilson.useShader("second");
		wilson.useFramebuffer(framebufferId);
		wilson.useTexture("pass1");
		wilson.drawFrame();
	}
});
```

Your shader likely needs no changes: `uv` is translated and scaled accordingly for each tile. If your applet uses only a single shader to draw, the `render` argument is unnecessary. However, if you use multiple, particularly with framebuffers, then it may be needed. To use it, draw the finished tile in `framebufferId`, as in the above example. Some notes:
- Every tile is the same size, so intermediate framebuffers only need creating once, at `tileSize` (the tiles along the edges of the image are drawn in full and cropped afterwards). Their size is also passed to `render` as `width` and `height`.
- When drawing these tiles, `uv` no longer spans $[-1, 1]$. If you need to sample a texture that a previous pass of the same tile wrote to, use the `uvTile` varying rather than `uv`: it is always set to span $[-1, 1]$, regardless of tile size.
- Await `downloadHighResFrame` before changing the shader. The render is spread over many tasks, so a call to `loadShader` or `useShader` that lands partway through it applies to the tiles that haven't been drawn yet, and the image comes out half drawn with one shader and half with another. Wilson warns when this happens if `verbose` is `true`.



## Full Documentation

The above guide, along with the example project, are a great way to get started with Wilson. For more detailed usage examples, all of the [applets on my personal website](https://github.com/cruzgodar/cruzgodar.github.io/tree/main/applets) are built with Wilson. The full list of options and methods is provided here for completeness; unless otherwise specified, all of the options are optional.

### General Options

- `canvasWidth` or `canvasHeight`: the width or height of the canvas, in pixels. Exactly one of these must be specified.
- `worldWidth`, `worldHeight`: the width and height of the world. If one is unspecified, it will be calculated automatically to match the aspect ratio of the canvas. If both are unspecified, the smaller one defaults to `2`.
- `worldCenterX`, `worldCenterY`: the world coordinates of the center of the canvas. Both default to `0`.
- `minWorldWidth`, `maxWorldWidth`, `minWorldHeight`, `maxWorldHeight`: bounds on the width and height of the world coordinates that are enforced by all methods that change them (panning, zooming, and entering fullscreen). If unspecified, no bounds are enforced.
- `minWorldX`, `maxWorldX`, `minWorldY`, `maxWorldY`: bounds on the world coordinates that are visible on screen. If both a minimum and maximum value are specified for a coordinate, the difference between the two will be used for the maximum width/height of the world, regardless of whether that value was set. If unspecified, no bounds are enforced.
- `verbose`: a boolean for whether to print verbose messages. Defaults to `false`.
- `clampWorldCoordinatesMode: "one" | "both"`: a string that determines how the world coordinates are clamped when both the `x` and `y` values are constrained. `"both"` clamps the coordinates so that neither `x` nor `y` is ever outside the specified bounds, while `"one"` clamps the coordinates so that at most one of `x` or `y` is outside the specified bounds. The typical interaction with fullscreen is that `"one"` allows the amount of visible world to increase, while `"both"` crops into the world that was visible when not in fullscreen. Can be changed dynamically; defaults to `"one"`.
- `onResizeCanvas: () => void`: a function that is called whenever the canvas is resized.
- `useResetButton: boolean`: a boolean for whether to use a reset button. Defaults to `false`.
- `resetButtonIconPath: string`: a string for the path to the reset button image. Required (and only allowed) if `useResetButton` is `true`.
- `animateReset: boolean`: a boolean for whether to animate by default when resetting. Defaults to `true`.
- `onReset: () => void`: a function that is called when the reset button is pressed.
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
	- `restoreScroll`: a boolean for whether to restore the scroll position when exiting fullscreen. If there are multiple Wilson instanced exiting fullscreen at once, only one should have this property set to `true`. Defaults to `true`.
	- `onSwitch: (isFullscreen: boolean) => void`: a function that is called after the canvas enters or exits fullscreen mode and is included in the page transition.
	- `beforeSwitch: async (isFullscreen: boolean) => void`: a function that is called before the canvas enters or exits fullscreen mode and is not included in the page transition. It is awaited before the page transition begins. A typical use for this is to briefly pause a canvas animating every frame before entering fullscreen — Safari often produces a glitchy transition if animations are not paused.
	- `useFullscreenButton`: a boolean for whether to use a button to enter and exit fullscreen. Defaults to `false`.
	- `enterFullscreenButtonIconPath`: a string for the path to the enter fullscreen button image. Required (and only allowed) if `useFullscreenButton` is `true`.
	- `exitFullscreenButtonIconPath`: a string for the path to the exit fullscreen button image. Required (and only allowed) if `useFullscreenButton` is `true`.

### Additional WilsonCPU Options
- `willReadFrequently`: a boolean for whether the image data of the canvas will be read frequently (via `ctx.getImageData` or `wilson.downloadFrame`). Defaults to `false`.

### WilsonGL Options
- `shader` or `shaders`: either a string containing the GLSL shader code, or an object whose keys are the IDs of shader programs and whose values are strings containing the GLSL code. Exactly one of these must be specified.
- `uniforms`: if `shader` is specified, this is an object whose keys are the names of the uniforms in the shader, and whose values are the initial values of those uniforms. If `shaders` is specified, this is an object whose keys are the IDs of shader programs, and whose values are objects with the same structure as the `uniforms` field of a single shader.
- `useWebGL2`: a boolean for whether to use WebGL2 instead of WebGL. Defaults to `true`. Even if this is `true`, Wilson will check for hardware WebGL2 support before using it.
- `useGpuTiming`: a boolean for whether to try to enable accurate timing of frames; useful for getting feedback when optimizing shaders. Defaults to `false`; setting it to `true` may have a small performance cost, and some browsers require enabling GPU timing in feature flags for privacy reasons.
- `xrOptions`: an object holding everything WebXR-related, described below. Wilson will initialize XR support if and only if this object is present.

### XR Options

All of these live inside `xrOptions` in a WilsonGL instance's options object. Only `renderFrame` is required.

- `renderFrame: ({ projectionMatrix, cameraToWorld, eye, viewIndex, view }) => void`: a function called once per eye, per frame, with the headset's framebuffer bound and the viewport set for that eye. Its argument holds only what differs between the eyes. Use this callback only to set the per-eye uniforms and draw the scene, since it will typically be called multiple times per frame. Use `onFrameStart` for everything that needs to update once per frame. The arguments are:
	- `projectionMatrix`: a `Float32Array` containing that eye's projection matrix, in column-major order. WebXR's per-eye frusta are off-axis, so the entries determining the center of the frustum (`[2][0]` and `[2][1]` in GLSL) are not zero, and recovering a ray direction from a point `(u, v)` in normalized device coordinates means computing `((u + p[2][0]) / p[0][0], (v + p[2][1]) / p[1][1], -1.0)`.
	- `cameraToWorld`: a `Float32Array` containing the transform from that eye's space to the reference space, in column-major order. Its translation column is the eye's position, and its rotation applied to an eye-space ray gives that ray in the reference space.
	- `eye`: a string, either `"left"`, `"right"`, or `"none"`.
	- `viewIndex`: the index of the current view. For a stereo headset, there are two.
	- `view`: the underlying `XRView`. The eye's viewport is accessible through `wilson.xrViewport`.
- `onFrameStart: ({ time, deltaTime, frame, pose }) => void`: a function called once per frame, before either eye is rendered, with the headset's framebuffer bound and the viewport set to all of it. Its arguments are:
	- `time`: the timestamp of the current frame in milliseconds. On the same clock as `performance.now()`.
	- `deltaTime`: the number of milliseconds since the previous rendered frame. It is zeroed on the first frame of a session and when a session is resumed after a pause.
	- `frame`: the underlying `XRFrame`.
	- `pose`: the underlying `XRViewerPose`.
- `onEnter: () => void`: a function called after a session has started and the headset's framebuffer is ready to render into.
- `onExit: () => void`: a function called after a session has ended and the canvas is ready to render into again.
- `onAvailabilityChange: (isSupported: boolean) => void`: a function called when the availability of a headset changes. If you don't use the built-in XR button, you'll need to use this to know whether to display a control for entering XR.
- `onVisibilityChange: (state: "visible" | "visible-blurred" | "hidden") => void`: a function called when the XR session's visibility changes; for example, when a system menu is opened over the scene, or the headset is taken off. Wilson skips rendering while the state is `"hidden"`.
- `onControllerConnect: (controller) => void`: a function called when an input source appears. Useful if you require a controller with a specific handedness and need to check when one becomes available.
- `onControllerDisconnect: (controller) => void`: a function called when an input source disappears.
- `onButtonDown: ({ controller, name, state }) => void`: a function called when a controller button is pressed. If you only need to know *whether* a button is pressed each frame and not when it is pressed, this is unnecessary; read `controller.buttons` for a given controller in `onFrameStart` instead.
- `onButtonUp: ({ controller, name, state }) => void`: a function called when a controller button is released.
- `requiredFeatures` and `optionalFeatures`: arrays of strings naming [WebXR features](https://developer.mozilla.org/en-US/docs/Web/API/XRSystem/requestSession#optionalfeatures) to request with the session. A session will fail to start if a required feature is unavailable, so prefer optional ones. Both default to `[]`.
- `targetFrameRate`: a number for the display refresh rate to request, in Hz. Wilson picks the closest rate the headset actually supports. If unspecified, the headset's default is used. Can be changed during a session by setting `wilson.xrTargetFrameRate`.
- `fixedFoveation`: a number in `[0, 1]` for how aggressively to reduce resolution toward the edges of the view. Defaults to `0.3`. Headsets that don't support foveation ignore it. Can be changed during a session by setting `wilson.xrFixedFoveation`.
- `framebufferScale`: a positive number that scales the framebuffer allocated for the session, relative to the headset's native resolution. Defaults to `1`, which renders every pixel the display has. Can be changed during a session by setting `wilson.xrFramebufferScale`.
- `useButton: boolean`: a boolean for whether to show a button that enters XR when clicked. Defaults to `false`. The button is shown only when a headset is available.
- `buttonIconPath: string`: a string for the path to the XR button image. Required (and only allowed) if `useButton` is `true`.



### General Fields and Methods

- `canvas`: the canvas element.
- `canvasWidth`, `canvasHeight`: the width and height of the canvas, in pixels. Readonly; to change the canvas size, use `resizeCanvas`.
- `worldWidth`, `worldHeight`, `worldCenterX`, `worldCenterY`: the current world coordinates. Readonly; to change the world size, center, or bounds, use `resizeWorld`.
- `verbose`: a boolean for whether to print verbose messages. Can be changed dynamically.
- `reduceMotion`: a boolean for whether reduced motion animations are enabled. Can be changed dynamically.
- `useInteractionForPanAndZoom`: a boolean for whether to use pan and zoom interactions. Can be changed dynamically.
- `clampWorldCoordinatesMode`: a string that determines how the world coordinates are clamped when both the `x` and `y` values are constrained (see the interaction options). Can be changed dynamically.
- `usePanAndZoomRubberbanding`, `rubberbandingPanSoftness`, `rubberbandingZoomSoftness`: parameters for the experimental rubberbanding feature. Can be changed dynamically.
- `currentlyFullscreen`: a boolean for whether the canvas is currently in fullscreen mode. Readonly; to change the fullscreen mode, use `enterFullscreen` or `exitFullscreen`.
- `animateFullscreen`: a boolean for whether the fullscreen transition is animated. Can be changed dynamically.
- `crossfadeFullscreen`: a boolean for whether the fullscreen transition is crossfaded. Can be changed dynamically.
- `closeFullscreenWithEscape`: a boolean for whether to close fullscreen when the escape key is pressed. Can be changed dynamically.
- `fullscreenRestoreScroll`: a boolean for whether to restore the scroll position when exiting fullscreen. Can be changed dynamically.
- `onSwitchFullscreen: (isFullscreen: boolean) => void`: a function that is called whenever the canvas enters or exits fullscreen mode. Can be changed dynamically.
- `beforeSwitchFullscreen: (isFullscreen: boolean) => void`: a function that is called immediately before the canvas enters or exits fullscreen mode. Can be changed dynamically.
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
- `resizeWorld({ width?: number, height?: number, centerX?: number, centerY?: number, minWidth?: number, maxWidth?: number, minHeight?: number, maxHeight?: number, minX?: number, maxX?: number, minY?: number, maxY?: number, showResetButton?: boolean })`: sets the world size, center, and/or bounds. If one of `width` and `height` is unspecified, the other will be calculated automatically to match the aspect ratio; it is possible, though not recommended, to specify both. If the reset button is used, at least one value has changed, and `showResetButton` is `true`, the reset button will be shown.
- `resetWorldCoordinates(animate?: boolean)`: resets the world coordinates to their default values.
- `resetDraggables(animate?: boolean)`: resets the draggable locations to their default values.
- `reset()`: resets the world coordinates and draggable locations to their default values, calls the `onReset` callback, and hides the reset button.
- `showResetButton()`: shows the reset button if it exists. Can be called frequently.
- `setCurrentStateAsDefault()`: sets the current world coordinates and draggable locations as the default state.
- `setDraggables(draggables: {[id: string]: [number, number]})`: sets the world coordinates of the draggables. If a draggable with the given ID does not exist, it will be created.
- `removeDraggables(id: string | string[])`: removes the draggable with the given ID. If an array of IDs is given, all of them will be removed.
- `enterFullscreen()`: enters fullscreen mode.
- `exitFullscreen()`: exits fullscreen mode.
- `enterManagedFullscreen()`: resizes the canvas and updates world coordinates, but does not manage the fullscreen container structure or start a view transition. Useful when an external system handles the fullscreen container.
- `exitManagedFullscreen()`: analogous to `enterManagedFullscreen`.
- `interpolateCanvasToWorld([row: number, col: number]): [number, number]`: converts a point in canvas coordinates to world coordinates.
- `interpolateWorldToCanvas([x: number, y: number]): [number, number]`: converts a point in world coordinates to canvas coordinates.
- `destroy()`: destroys the Wilson instace, removes all event listeners, and returns the canvas div structure to its original state.
- `replaceCanvas(): HTMLCanvasElement`: replaces the canvas element in the DOM with an exact copy (old references will be stale). Use this when destroying and later recreating a WilsonGL instance (A canvas cannot have a new WebGL contexts after an old one is lost).

### WilsonCPU Fields and Methods

- `ctx`: the 2D canvas context; only available on `WilsonCPU` instances.
- `drawFrame(image: Uint8ClampedArray)`: draws the current frame to the canvas.
- `downloadFrame(filename: string)`: downloads the current frame as a png file.

### WilsonGL Fields and Methods

- `gl`: the WebGL or WebGL2 context.
- `drawFrame()`: draws a frame with the current shader program.
- `loadShader({ id?: string, shader: string, uniforms?: UniformInitializers })`: loads a new shader program **and sets it as the current one**. If no ID is specified, it defaults to a serialized number; this is only recommended if you don't plan to reuse prior shaders. See `setUniforms` for more information on `UniformInitializers`.
- `shaderReady(id?: string)`: returns a promise that resolves when the given shader has finished compiling.
- `allShaderReady()`: returns a promise that resolves when all loaded shaders have finished compiling.
- `useShader(id: string)`: sets the current shader program.
- `setUniforms(uniforms: UniformInitializers, shader?: string)`: sets uniforms for the shader program with the given ID. If no shader ID is specified, it defaults to that of the current shader program. `UniformInitializers` is the type `{ [name: string]: number | number[] | number[][] | Float32Array }`; ints and floats are set with numbers, and vectors are set with 1D arrays. Matrices can be set in two ways: passing a 2D array sets the uniform assuming the matrix is in **row-major** order (i.e. the way matrices are set in JS, but not WebGL). Passing a `Float32Array` bypasses that transposing, setting the uniform as an array in **column-major** order. This functionality exists to support passing in column-major outputs of other WebGL functions without needing to arbitrarily transpose them. Arrays of `int`s or `float`s (e.g. `uniform int foo[3];`) are set with 1D arrays, and arrays of vectors (e.g. `uniform vec3 foo[3];`) are set with 2D arrays.
- `setUniform(name: string, value: number | number[] | number[][] | Float32Array, shader?: string)`: sets a single uniform for the shader program with the given ID, with the same conventions as `setUniforms`. For use instead of `setUniforms` on hot paths, since it avoids constructing an object per call.
- `downloadFrame(filename: string, drawNewFrame?: boolean)`: downloads the current frame as a png file. For this to work properly, a new frame must be drawn immediately before downloading. Setting drawNewFrame to `false` will skip this step; only use this if you are manually drawing a frame directly before calling this method.
- `async downloadHighResFrame({ filename: string, resolution?: number, uniforms?: UniformInitializers, tileSize?: number, render?: RenderHighResTile })`: renders a frame at the given resolution (defaulting to the current canvas resolution) by stitching together small tiles, then downloads it as a PNG with the given filename. Individual uniform values can be overridden for the render by passing the `uniforms` object; they are restored afterwards, so the live canvas is unaffected. See the section on rendering high-resolution frames for more information on `render`.
- `async readHighResPixels({ resolution?: number, uniforms?: UniformInitializers, format?: "unsignedByte" | "float", tileSize?: number, render?: RenderHighResTile })`: renders a frame at the given resolution by stitching together small tiles, then returns the pixels in the given format. Behaves like `downloadHighResFrame` otherwise.
- `createFramebufferTexturePair({ id: string, width?: number, height?: number, textureType: "unsignedByte" | "float" })`: creates a framebuffer texture pair with a given ID and type. If width or height are unspecified, they default to the canvas width and height (or to the headset's framebuffer width and height during a WebXR session). If a pair with the given ID already exists, it is deleted first.
- `deleteFramebufferTexturePair(id: string)`: deletes the framebuffer texture pair with the given ID, freeing both. Does nothing if no such pair exists.
- `useFramebuffer(id: string | null)`: sets the current framebuffer. Passing `null` sets the canvas (or the headset's framebuffer during a WebXR session) and restores the viewport.
- `useTexture(id: string | null)`: sets the current texture.
- `setTexture({ id: string, data?: Float32Array | Uint8Array | TexImageSource | null })`: writes `data` to the texture with the given ID. The type of `data` must match the texture type if it is an array (i.e. if the texture is of type `float`, the data must be a `Float32Array`), and the length of `data` must be equal to the texture's width times its height times 4. Passing `null`, or leaving `data` out entirely, zeroes the texture instead.
- `readPixels({ row: number, col: number, height: number, width: number, format: "unsignedByte" | "float", includeAlpha: boolean })`: reads a rectangle of pixels out of the current frame as either a `Uint8Array` or `Float32Array`, depending on the format. `row` and `col` default to `0`, and `height` and `width` default to the canvas height and width, respectively. The size of the returned array is `width * height * 4`.
- `useGpuTiming`: a boolean for whether to measure how long the GPU spends on `drawFrame` calls, initialized from the option of the same name. Can be changed dynamically; when it is `false`, no queries are issued and the readings below stop updating.
- `gpuTimingSupported`: a boolean for whether a timer query extension is available. Readonly. Browsers often withhold it as an anti-fingerprinting measure, so check this before relying on any of the readings.
- `lastGpuFrameTime`: the number of milliseconds of GPU time the most recently completed measurement took, or `undefined` if none has finished yet. Readonly. Results arrive asynchronously, typically one to three frames after the draw they measured.
- `averageGpuFrameTime`: an exponential moving average of `lastGpuFrameTime`, or `undefined` if no measurement has finished. Readonly. This is an appropriate measurement to check shader performance with.
- `gpuTimingSmoothing`: a number between `0` and `1` for the weight of each new sample in that average. Defaults to `0.15`.
- `beginGpuTimer()`, `endGpuTimer()`: opens and closes a timing range manually. `drawFrame` already wraps itself in one, so these are only needed to measure several draws together — both eyes of an XR frame, say. Only one query can be active at a time, so nested calls are folded into the outermost range rather than timed separately.
- `pollGpuTimers()`: collects any finished measurements and updates the readings above. `beginGpuTimer` calls this itself, so an applet that draws every frame never needs to; one that draws on demand can call it to pick up a result without drawing.
- `resetGpuTimings()`: sets both `lastGpuFrameTime` and `averageGpuFrameTime` back to `undefined`, discarding the running average.

### WebXR Fields and Methods

All of these are fields and methods available on WilsonGL when `xrOptions` has been passed in the constructor options. The fields that describe an active session are `undefined` when there isn't one.

- `async enterXR(): Promise<boolean>`: starts a WebXR session, resolving to `true` if one started and `false` if no headset was available or the user declined. Must be called from a user gesture.
- `async exitXR()`: ends the current session, resolving once it has ended. Does nothing if there isn't one. Because the session ends asynchronously, await this before calling `enterXR` again.
- `inXR`: a boolean for whether a session is currently active. Readonly; use `enterXR` and `exitXR` to change it.
- `xrFramebufferWidth`, `xrFramebufferHeight`: the dimensions of the headset's framebuffer, which holds both eyes side by side. Readonly, and constant for a session unless `xrFramebufferScale` is changed.
- `xrViewport`: the `XRViewport` the eye currently being rendered draws into, containing `x`, `y`, `width`, and `height` in pixels within the headset's framebuffer. Readonly, and `null` outside of a `renderFrame` call.
- `xrSession`, `xrRefSpace`: the underlying `XRSession` and `XRReferenceSpace`, or `undefined` outside a session. Readonly.
- `xrFramebufferScale`: a positive number scaling the framebuffer the session renders into, relative to the headset's native resolution. Can be changed dynamically, but each change rebuilds the framebuffer and typically drops a frame or two, so it's meant for a handful of coarse quality steps rather than per-frame adaptation. The new size doesn't take effect immediately: the change lands at the start of a later frame, and `xrFramebufferWidth` and `xrFramebufferHeight` keep reporting the old size until it does, so applets with their own framebuffers should recreate them when those dimensions change rather than when the scale is set. Setting it to a value it already has does nothing, as does setting it to a nonpositive one.
- `xrFixedFoveation`: a number in `[0, 1]` for how aggressively resolution is reduced toward the edges of the view. Can be changed dynamically. Reading it during a session returns the value the headset actually applied, which is `undefined` if it doesn't support foveation; outside a session, it returns the value that was set.
- `xrTargetFrameRate`: the display refresh rate requested, in Hz. Can be changed dynamically. Wilson picks the closest rate the headset supports, so this may not match `xrFrameRate`.
- `xrFrameRate`: the display refresh rate currently in use, in Hz. Readonly; use `xrTargetFrameRate` to change it.
- `xrSupportedFrameRates`: a `Float32Array` of the refresh rates the headset supports, or `undefined` if it doesn't allow changing them. Readonly.
- `getXRController(handedness: "left" | "right" | "none")`: the connected controller with the given handedness, or `undefined` if there isn't one. This is the correct way to find a particular controller, since the order they appear in `xrControllers` is not stable.
- `xrControllers`: an array of the input sources currently connected, updated once per frame before `onFrameStart` runs, and empty outside a session. Readonly. The array itself is only rebuilt when the set of controllers changes, and each controller is the same object for as long as its device stays connected.

Each controller has the following fields:

- `handedness`: `"left"`, `"right"`, or `"none"`.
- `grip`: the transform matrix for where the controller is held, relative to the session's reference space, in the form of a column-major `Float32Array`. Wilson overwrites it every frame, so copy it if it needs to outlive a frame. `null` on a frame where the controller isn't tracked, and always `null` for input sources with no grip space, such as gaze.
- `targetRay`: the same, but for the ray the controller points along, whose -Z axis is the pointing direction. Unlike `grip`, every input source has one.
- `buttons`: an object with a state for each button in the `xr-standard` mapping — `trigger`, `squeeze`, `touchpad`, `thumbstick`, `a`, and `b`, the last two being the ones labeled X and Y on a left controller. Each has `pressed` and an analog `value` in `[0, 1]`, which is only ever 0 or 1 on anything but the trigger and the squeeze. Use `onButtonDown` and `onButtonUp` if you need to detect changes.
- `thumbstick`: an `[x, y]` pair, with forward being positive `y`.
- `inputSource`: the underlying `XRInputSource`, for anything Wilson doesn't wrap.
- `pulse(intensity: number, duration: number)`: fires the device's haptics at an intensity in `[0, 1]` for a duration in milliseconds, resolving to whether it actually happened. Resolves to `false` on devices without haptics.
- `inputSource`: the underlying `XRInputSource`.