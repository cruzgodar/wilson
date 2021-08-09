# Applets Made Easy

Wilson is a lightweight JavaScript library for creating interactive applets. It handles boilerplate tasks like capturing mouse and touch input, makes parallelized gpu-based applets as easy as writing a shader, and even provides a robust and customizable fullscreen toolkit. All of this streamlines your work and simplifies your applets, letting you focus on the code that matters.



# Installation

Include wilson.min.js anywhere before your applet code. It only defines a single class, so the exact location doesn't matter.



# Getting Started

Create a canvas, then register it with Wilson:

```js
    let options =
    {
        renderer: "hybrid"
    };
    
    let wilson_canvas = new Wilson(document.querySelector("#canvas-id"), options);
```

To render a frame to the canvas, use a 1-dimensional `Uint8ClampedArray` filled with the pixel data. Each pixel takes 4 consecutive values in the array, corresponding to the RGBA components (on a scale from 0 to 255). For example, if the first 4 elements are `127, 0, 255, 127`, then the top-left pixel will be semi-transparent purple.

```js
    let image_data = new Uint8ClampedArray(canvas_width * canvas_height * 4);
    
    ...
    //Fill image_data with the pixel data. 
    ...
    
    wilson_canvas.render.draw_frame(image_data);
```

For a step-by-step guide to handling interactivity, fullscreen, draggables, and everything else Wilson can do, have a look at the [tutorial on the website]().