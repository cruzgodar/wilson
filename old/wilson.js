import { addHoverEventWithScale } from "./src/hoverEvents.js";
import { addTemporaryListener } from "/scripts/src/main.js";
import { metaThemeColorElement } from "/scripts/src/settings.js";

export class Wilson
{
	canvas = null;

	ctx = null;
	gl = null;

	shaderPrograms = [];

	uniforms = {};

	canvasWidth = null;
	canvasHeight = null;

	worldWidth = 2;
	worldHeight = 2;

	worldCenterX = 0;
	worldCenterY = 0;

	outputCanvasContainer = null;
	useDraggables = false;

	topPadding = 0;
	leftPadding = 0;

	topBorder = 0;
	leftBorder = 0;



	/*
		options:
		{
			renderer: "cpu", "hybrid", "gpu"

			canvasWidth, canvasHeight

			worldWidth, worldHeight
			worldCenterX, worldCenterY

			shader

			autoArrangeCanvases



			mousedownCallback
			mouseupCallback
			mousemoveCallback
			mousedragCallback

			touchstartCallback
			touchendCallback
			touchmoveCallback

			pinchCallback
			wheelCallback



			useDraggables

			draggablesStatic

			draggablesMousedownCallback
			draggablesMouseupCallback
			draggablesMousemoveCallback

			draggablesTouchstartCallback
			draggablesTouchendCallback
			draggablesTouchmoveCallback



			useFullscreen

			trueFullscreen

			canvasesToResize

			useFullscreenButton

			enterFullscreenButtonIconPath
			exitFullscreenButtonIconPath

			switchFullscreenCallback
		}
	*/

	constructor(canvas, options)
	{
		this.canvas = canvas;

		this.canvasWidth = typeof options.canvasWidth === "undefined" ? parseInt(this.canvas.getAttribute("width")) : options.canvasWidth;
		this.canvasHeight = typeof options.canvasHeight === "undefined" ? parseInt(this.canvas.getAttribute("height")) : options.canvasHeight;

		this.canvas.setAttribute("width", this.canvasWidth);
		this.canvas.setAttribute("height", this.canvasHeight);



		const computedStyle = window.getComputedStyle(this.canvas);

		this.topPadding = parseFloat(computedStyle.paddingTop);
		this.leftPadding = parseFloat(computedStyle.paddingLeft);

		this.topBorder = parseFloat(computedStyle.borderTopWidth);
		this.leftBorder = parseFloat(computedStyle.borderLeftWidth);



		this.utils.interpolate.parent = this;
		this.render.parent = this;
		this.draggables.parent = this;
		this.fullscreen.parent = this;
		this.input.parent = this;



		if (this.canvas.id !== "")
		{
			console.log(`[Wilson] Registered a ${this.canvasWidth}x${this.canvasHeight} canvas with ID ${this.canvas.id}`);
		}

		else
		{
			console.log(`[Wilson] Registered a ${this.canvasWidth}x${this.canvasHeight} canvas`);
		}



		if (typeof options.canvasesToResize === "undefined")
		{
			options.canvasesToResize = [this.canvas];
		}



		if (typeof options.worldWidth !== "undefined")
		{
			this.worldWidth = options.worldWidth;
		}

		if (typeof options.worldHeight !== "undefined")
		{
			this.worldHeight = options.worldHeight;
		}



		if (typeof options.worldCenterX !== "undefined")
		{
			this.worldCenterX = options.worldCenterX;
		}

		if (typeof options.worldCenterY !== "undefined")
		{
			this.worldCenterY = options.worldCenterY;
		}



		if (typeof options.renderer === "undefined" || options.renderer === "hybrid")
		{
			this.render.renderType = 1;
		}

		else if (options.renderer === "cpu")
		{
			this.render.renderType = 0;
		}

		else
		{
			this.render.renderType = 2;
		}


		if (this.render.renderType === 0)
		{
			this.ctx = this.canvas.getContext("2d", { colorSpace: "display-p3" });

			this.render.imgData = this.ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);

			this.render.drawFrame = this.render.drawFrameCpu;
		}

		else if (this.render.renderType === 1)
		{
			this.render.initWebglHybrid();

			this.render.drawFrame = this.render.drawFrameHybrid;

			try
			{
				this.gl.getExtension("OES_texture_float");
			}

			catch(ex)
			{
				console.log(`[Wilson] Could not load float textures: ${ex}`);
			}
		}

		else
		{
			try
			{
				this.render.loadNewShader(options.shader);
			}

			catch(ex)
			{
				console.error(`[Wilson] Error loading shader: ${ex}`);
			}

			this.render.drawFrame = this.render.drawFrameGpu;

			try
			{
				this.gl.getExtension("OES_texture_float");
			}

			catch(ex)
			{
				console.log(`[Wilson] Could not load float textures: ${ex}`);
			}
		}

		if (typeof options.autoArrangeCanvases === "undefined" || options.autoArrangeCanvases)
		{
			this.arrangeCanvases(options);
		}



		this.input.mousedownCallback = typeof options.mousedownCallback === "undefined" ? null : options.mousedownCallback;
		this.input.mouseupCallback = typeof options.mouseupCallback === "undefined" ? null : options.mouseupCallback;
		this.input.mousemoveCallback = typeof options.mousemoveCallback === "undefined" ? null : options.mousemoveCallback;
		this.input.mousedragCallback = typeof options.mousedragCallback === "undefined" ? null : options.mousedragCallback;

		this.input.touchstartCallback = typeof options.touchstartCallback === "undefined" ? null : options.touchstartCallback;
		this.input.touchendCallback = typeof options.touchendCallback === "undefined" ? null : options.touchendCallback;
		this.input.touchmoveCallback = typeof options.touchmoveCallback === "undefined" ? null : options.touchmoveCallback;

		this.input.pinchCallback = typeof options.pinchCallback === "undefined" ? null : options.pinchCallback;
		this.input.wheelCallback = typeof options.wheelCallback === "undefined" ? null : options.wheelCallback;

		this.input.init();



		this.useDraggables = true;

		this.draggables.static = typeof options.draggablesStatic === "undefined" ? false : options.draggablesStatic;

		this.draggables.mousedownCallback = typeof options.draggablesMousedownCallback === "undefined" ? null : options.draggablesMousedownCallback;
		this.draggables.mouseupCallback = typeof options.draggablesMouseupCallback === "undefined" ? null : options.draggablesMouseupCallback;
		this.draggables.mousemoveCallback = typeof options.draggablesMousemoveCallback === "undefined" ? null : options.draggablesMousemoveCallback;

		this.draggables.touchstartCallback = typeof options.draggablesTouchstartCallback === "undefined" ? null : options.draggablesTouchstartCallback;
		this.draggables.touchendCallback = typeof options.draggablesTouchendCallback === "undefined" ? null : options.draggablesTouchendCallback;
		this.draggables.touchmoveCallback = typeof options.draggablesTouchmoveCallback === "undefined" ? null : options.draggablesTouchmoveCallback;

		this.draggables.init();



		if (typeof options.useFullscreen !== "undefined" && options.useFullscreen)
		{
			this.fullscreen.trueFullscreen = typeof options.trueFullscreen === "undefined" ? false : options.trueFullscreen;



			this.fullscreen.useFullscreenButton = typeof options.useFullscreenButton === "undefined" ? false : options.useFullscreenButton;



			if (this.fullscreen.useFullscreenButton && typeof options.enterFullscreenButtonIconPath === "undefined")
			{
				console.error("Missing path to Enter Fullscreen button image");
			}

			if (this.fullscreen.useFullscreenButton && typeof options.exitFullscreenButtonIconPath === "undefined")
			{
				console.error("Missing path to Exit Fullscreen button image");
			}



			this.fullscreen.enterFullscreenButtonIconPath = options.enterFullscreenButtonIconPath;
			this.fullscreen.exitFullscreenButtonIconPath = options.exitFullscreenButtonIconPath;



			this.fullscreen.switchFullscreenCallback = typeof options.switchFullscreenCallback === "undefined" ? false : options.switchFullscreenCallback;



			if (typeof options.canvasesToResize === "undefined")
			{
				console.error("Missing canvases to resize");
			}



			this.fullscreen.canvasesToResize = options.canvasesToResize;

			this.fullscreen.init();
		}
	}



	arrangeCanvases(options)
	{
		if (document.querySelectorAll("#wilson-style").length === 0)
		{
			const element = document.createElement("style");

			element.textContent = `
				.wilson-output-canvas-container
				{
					position: relative;
					-webkit-user-select: none;
					user-select: none;
				}
				
				.wilson-applet-canvas-container
				{
					-webkit-user-select: none;
					user-select: none;
				}
				
				.wilson-center-content
				{
					display: flex;
					justify-content: center;
					margin: 0 auto;
				}
			`;

			element.id = "wilson-style";

			document.head.appendChild(element);
		}



		const appletCanvasContainer = document.createElement("div");

		appletCanvasContainer.classList.add("wilson-applet-canvas-container");

		appletCanvasContainer.classList.add("wilson-center-content");

		this.canvas.parentNode.insertBefore(appletCanvasContainer, this.canvas);



		this.outputCanvasContainer = document.createElement("div");

		this.outputCanvasContainer.classList.add("wilson-output-canvas-container");

		appletCanvasContainer.appendChild(this.outputCanvasContainer);



		for (let i = 0; i < options.canvasesToResize.length; i++)
		{
			appletCanvasContainer.appendChild(options.canvasesToResize[i]);
		}



		this.outputCanvasContainer.appendChild(this.canvas);



		this.draggables.container = document.createElement("div");

		this.draggables.container.classList.add("wilson-draggables-container");

		appletCanvasContainer.appendChild(this.draggables.container);

		this.fullscreen.canvasesToResize.push(this.draggables.container);



		const computedStyle = window.getComputedStyle(this.canvas);

		const width = this.canvas.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight);
		const height = this.canvas.clientHeight - parseFloat(computedStyle.paddingTop) - parseFloat(computedStyle.paddingBottom);

		this.draggables.container.style.width = (width + 2 * this.draggables.draggableRadius) + "px";
		this.draggables.container.style.height = (height + 2 * this.draggables.draggableRadius) + "px";

		this.draggables.containerWidth = width + 2 * this.draggables.draggableRadius;
		this.draggables.containerHeight = height + 2 * this.draggables.draggableRadius;

		this.draggables.restrictedWidth = width;
		this.draggables.restrictedHeight = height;



		this.draggables.container.style.marginTop = (parseFloat(computedStyle.borderTopWidth) + parseFloat(computedStyle.paddingTop) - this.draggables.draggableRadius) + "px";



		this.fullscreen.fullscreenComponentsContainer = document.createElement("div");

		this.fullscreen.fullscreenComponentsContainer.classList.add("wilson-fullscreen-components-container");

		appletCanvasContainer.parentNode.insertBefore(this.fullscreen.fullscreenComponentsContainer, appletCanvasContainer);

		this.fullscreen.fullscreenComponentsContainer.appendChild(appletCanvasContainer);



		this.fullscreen.fullscreenComponentsContainerLocation = document.createElement("div");

		this.fullscreen.fullscreenComponentsContainer.parentNode.insertBefore(this.fullscreen.fullscreenComponentsContainerLocation, this.fullscreen.fullscreenComponentsContainer);

		this.fullscreen.fullscreenComponentsContainerLocation.appendChild(this.fullscreen.fullscreenComponentsContainer);



		for (let i = 0; i < this.fullscreen.canvasesToResize.length; i++)
		{
			this.fullscreen.canvasesToResize[i].addEventListener("gesturestart", e => e.preventDefault());
			this.fullscreen.canvasesToResize[i].addEventListener("gesturechange", e => e.preventDefault());
			this.fullscreen.canvasesToResize[i].addEventListener("gestureend", e => e.preventDefault());

			this.fullscreen.canvasesToResize[i].addEventListener("click", e => e.preventDefault());
		}
	}



	//Contains utility functions for switching between canvas and world coordinates.
	utils = {
		interpolate:
		{
			canvasToWorld(row, col)
			{
				return [(col / this.parent.canvasWidth - .5) * this.parent.worldWidth + this.parent.worldCenterX, (.5 - row / this.parent.canvasHeight) * this.parent.worldHeight + this.parent.worldCenterY];
			},

			worldToCanvas(x, y)
			{
				return [Math.floor((.5 - (y - this.parent.worldCenterY) / this.parent.worldHeight) * this.parent.canvasHeight), Math.floor(((x - this.parent.worldCenterX) / this.parent.worldWidth + .5) * this.parent.canvasWidth)];
			}
		},



		//A utility function for converting from HSV to RGB. Accepts hsv in [0, 1] and returns rgb in [0, 255], unrounded.
		hsvToRgb(h, s, v)
		{
			function f(n)
			{
				const k = (n + 6 * h) % 6;
				return v - v * s * Math.max(0, Math.min(k, Math.min(4 - k, 1)));
			}

			return [255 * f(5), 255 * f(3), 255 * f(1)];
		}
	};



	//Draws an entire frame to a cpu canvas by directly modifying the canvas data. Tends to be significantly faster than looping fillRect, **when the whole canvas needs to be updated**. If that's not the case, sticking to fillRect is generally a better idea. Here, image is a width * height * 4 Uint8ClampedArray, with each sequence of 4 elements corresponding to rgba values.
	render = {
		drawFrame: null,

		renderType: null, //0: cpu, 1: hybrid, 2: gpu

		lastImage: null,

		imgData: null,

		shaderProgram: null,
		shaderPrograms: [],
		texture: null,

		framebuffers: [],



		drawFrameCpu(image)
		{
			this.parent.ctx.putImageData(new ImageData(image, this.parent.canvasWidth, this.parent.canvasHeight), 0, 0);
		},



		//Draws an entire frame to the canvas by converting the frame to a WebGL texture and displaying that. In some cases, this can slightly increase drawing performance, and some browsers can also handle larger WebGL canvases than cpu ones (e.g. iOS Safari). For these reasons, it's recommended to default to this rendering method unless there is a specific reason to avoid WebGL.
		drawFrameHybrid(image)
		{
			this.lastImage = image;

			this.parent.gl.texImage2D(
				this.parent.gl.TEXTURE_2D,
				0,
				this.parent.gl.RGBA,
				this.parent.canvasWidth,
				this.parent.canvasHeight,
				0,
				this.parent.gl.RGBA,
				this.parent.gl.UNSIGNED_BYTE,
				image
			);

			this.parent.gl.drawArrays(this.parent.gl.TRIANGLE_STRIP, 0, 4);
		},



		drawFrameGpu()
		{
			this.parent.gl.drawArrays(this.parent.gl.TRIANGLE_STRIP, 0, 4);
		},



		//Gets WebGL started for the canvas.
		initWebglHybrid()
		{
			this.parent.gl = this.parent.canvas.getContext("webgl");

			if ("drawingBufferColorSpace" in this.parent.gl)
			{
				this.parent.gl.drawingBufferColorSpace = "display-p3";
			}

			const vertexShaderSource = `
				attribute vec3 position;
				varying vec2 uv;

				void main(void)
				{
					gl_Position = vec4(position, 1.0);

					//Interpolate quad coordinates in the fragment shader.
					uv = position.xy;
				}
			`;

			const fragShaderSource = `
				precision highp float;
				
				varying vec2 uv;
				
				uniform sampler2D uTexture;
				
				
				
				void main(void)
				{
					gl_FragColor = texture2D(uTexture, (uv + vec2(1.0, 1.0)) / 2.0);
				}
			`;

			const quad = [-1, -1, 0,   -1, 1, 0,   1, -1, 0,   1, 1, 0];



			const vertexShader = loadShader(this.parent.gl, this.parent.gl.VERTEX_SHADER, vertexShaderSource);

			const fragShader = loadShader(this.parent.gl, this.parent.gl.FRAGMENT_SHADER, fragShaderSource);

			this.shaderProgram = this.parent.gl.createProgram();

			this.parent.gl.attachShader(this.shaderProgram, vertexShader);
			this.parent.gl.attachShader(this.shaderProgram, fragShader);
			this.parent.gl.linkProgram(this.shaderProgram);

			if (!this.parent.gl.getProgramParameter(this.shaderProgram, this.parent.gl.LINK_STATUS))
			{
				console.error(`[Wilson] Couldn't link shader program: ${this.parent.gl.getShaderInfoLog(fragShader)}`);
				this.parent.gl.deleteProgram(this.shaderProgram);
			}

			this.parent.gl.useProgram(this.shaderProgram);

			const positionBuffer = this.parent.gl.createBuffer();

			this.parent.gl.bindBuffer(this.parent.gl.ARRAY_BUFFER, positionBuffer);

			this.parent.gl.bufferData(this.parent.gl.ARRAY_BUFFER, new Float32Array(quad), this.parent.gl.STATIC_DRAW);

			this.shaderProgram.positionAttribute = this.parent.gl.getAttribLocation(this.shaderProgram, "position");

			this.parent.gl.enableVertexAttribArray(this.shaderProgram.positionAttribute);

			this.parent.gl.vertexAttribPointer(this.shaderProgram.positionAttribute, 3, this.parent.gl.FLOAT, false, 0, 0);

			this.parent.gl.viewport(0, 0, this.parent.canvasWidth, this.parent.canvasHeight);



			this.parent.gl.pixelStorei(this.parent.gl.UNPACK_ALIGNMENT, 1);
			this.parent.gl.pixelStorei(this.parent.gl.UNPACK_FLIP_Y_WEBGL, 1);

			this.texture = this.parent.gl.createTexture();
			this.parent.gl.bindTexture(this.parent.gl.TEXTURE_2D, this.texture);



			//Turn off mipmapping, since in general we won't have power of two canvases.
			this.parent.gl.texParameteri(this.parent.gl.TEXTURE_2D, this.parent.gl.TEXTURE_WRAP_S, this.parent.gl.CLAMP_TO_EDGE);
			this.parent.gl.texParameteri(this.parent.gl.TEXTURE_2D, this.parent.gl.TEXTURE_WRAP_T, this.parent.gl.CLAMP_TO_EDGE);
			this.parent.gl.texParameteri(this.parent.gl.TEXTURE_2D, this.parent.gl.TEXTURE_MAG_FILTER, this.parent.gl.NEAREST);
			this.parent.gl.texParameteri(this.parent.gl.TEXTURE_2D, this.parent.gl.TEXTURE_MIN_FILTER, this.parent.gl.NEAREST);

			this.parent.gl.disable(this.parent.gl.DEPTH_TEST);



			function loadShader(gl, type, source)
			{
				const shader = gl.createShader(type);

				gl.shaderSource(shader, source);

				gl.compileShader(shader);

				if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
				{
					console.error(`[Wilson] Couldn't load shader: ${gl.getShaderInfoLog(shader)}`);
					gl.deleteShader(shader);
				}

				return shader;
			}
		},



		//Gets WebGL started for the canvas.
		loadNewShader(fragShaderSource)
		{
			this.parent.gl = this.parent.canvas.getContext("webgl");

			if ("drawingBufferColorSpace" in this.parent.gl)
			{
				this.parent.gl.drawingBufferColorSpace = "display-p3";
			}

			const vertexShaderSource = `
				attribute vec3 position;
				varying vec2 uv;

				void main(void)
				{
					gl_Position = vec4(position, 1.0);

					//Interpolate quad coordinates in the fragment shader.
					uv = position.xy;
				}
			`;

			const quad = [-1, -1, 0,   -1, 1, 0,   1, -1, 0,   1, 1, 0];



			const vertexShader = loadShader(this.parent.gl, this.parent.gl.VERTEX_SHADER, vertexShaderSource);

			const fragShader = loadShader(this.parent.gl, this.parent.gl.FRAGMENT_SHADER, fragShaderSource);

			this.shaderProgram = this.parent.gl.createProgram();

			this.parent.gl.attachShader(this.shaderProgram, vertexShader);
			this.parent.gl.attachShader(this.shaderProgram, fragShader);
			this.parent.gl.linkProgram(this.shaderProgram);

			if (!this.parent.gl.getProgramParameter(this.shaderProgram, this.parent.gl.LINK_STATUS))
			{
				console.log(`[Wilson] Couldn't link shader program: ${this.gl.getShaderInfoLog(fragShader)}`);
				this.parent.gl.deleteProgram(this.shaderProgram);
			}

			this.parent.gl.useProgram(this.shaderProgram);

			const positionBuffer = this.parent.gl.createBuffer();

			this.parent.gl.bindBuffer(this.parent.gl.ARRAY_BUFFER, positionBuffer);

			this.parent.gl.bufferData(this.parent.gl.ARRAY_BUFFER, new Float32Array(quad), this.parent.gl.STATIC_DRAW);

			this.shaderProgram.positionAttribute = this.parent.gl.getAttribLocation(this.shaderProgram, "position");

			this.parent.gl.enableVertexAttribArray(this.shaderProgram.positionAttribute);

			this.parent.gl.vertexAttribPointer(this.shaderProgram.positionAttribute, 3, this.parent.gl.FLOAT, false, 0, 0);

			this.parent.gl.viewport(0, 0, this.parent.canvasWidth, this.parent.canvasHeight);



			this.shaderPrograms.push(this.shaderProgram);



			function loadShader(gl, type, source)
			{
				const shader = gl.createShader(type);

				gl.shaderSource(shader, source);

				gl.compileShader(shader);

				if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
				{
					console.log(`[Wilson] Couldn't load shader: ${gl.getProgramInfoLog(shader)}`);
					gl.deleteShader(shader);
				}

				return shader;
			}
		},



		createFramebufferTexturePair(type = this.parent.gl.FLOAT)
		{
			const framebuffer = this.parent.gl.createFramebuffer();

			const texture = this.parent.gl.createTexture();

			this.parent.gl.bindTexture(this.parent.gl.TEXTURE_2D, texture);
			this.parent.gl.texImage2D(
				this.parent.gl.TEXTURE_2D,
				0,
				this.parent.gl.RGBA,
				this.parent.canvasWidth,
				this.parent.canvasHeight,
				0,
				this.parent.gl.RGBA,
				type,
				null
			);

			this.parent.gl.texParameteri(this.parent.gl.TEXTURE_2D, this.parent.gl.TEXTURE_MAG_FILTER, this.parent.gl.NEAREST);
			this.parent.gl.texParameteri(this.parent.gl.TEXTURE_2D, this.parent.gl.TEXTURE_MIN_FILTER, this.parent.gl.NEAREST);
			this.parent.gl.texParameteri(this.parent.gl.TEXTURE_2D, this.parent.gl.TEXTURE_WRAP_S, this.parent.gl.CLAMP_TO_EDGE);
			this.parent.gl.texParameteri(this.parent.gl.TEXTURE_2D, this.parent.gl.TEXTURE_WRAP_T, this.parent.gl.CLAMP_TO_EDGE);

			this.parent.gl.disable(this.parent.gl.DEPTH_TEST);

			this.parent.gl.bindFramebuffer(this.parent.gl.FRAMEBUFFER, framebuffer);
			this.parent.gl.framebufferTexture2D(this.parent.gl.FRAMEBUFFER, this.parent.gl.COLOR_ATTACHMENT0, this.parent.gl.TEXTURE_2D, texture, 0);



			this.framebuffers.push({ framebuffer: framebuffer, texture: texture });
		},



		//Initializes all of the uniforms for a gpu canvas. Takes in an array of variable names as strings (that match the uniforms in the fragment shader), and stores the locations in Wilson.uniforms.
		initUniforms(variableNames, shaderProgramIndex = -1)
		{
			if (shaderProgramIndex === -1)
			{
				for (let i = 0; i < variableNames.length; i++)
				{
					this.parent.uniforms[variableNames[i]] = this.parent.gl.getUniformLocation(this.shaderProgram, variableNames[i]);
				}
			}

			else
			{
				for (let i = 0; i < variableNames.length; i++)
				{
					if (typeof this.parent.uniforms[variableNames[i]] === "undefined")
					{
						this.parent.uniforms[variableNames[i]] = {};
					}

					this.parent.uniforms[variableNames[i]][shaderProgramIndex] = this.parent.gl.getUniformLocation(this.shaderPrograms[shaderProgramIndex], variableNames[i]);
				}
			}
		},



		getPixelData()
		{
			const pixels = new Uint8Array(this.parent.canvasWidth * this.parent.canvasHeight * 4);

			this.parent.gl.readPixels(0, 0, this.parent.canvasWidth, this.parent.canvasHeight, this.parent.gl.RGBA, this.parent.gl.UNSIGNED_BYTE, pixels);

			return pixels;
		}
	};



	draggables = {
		parent: null,

		container: null,

		containerWidth: null,
		containerHeight: null,

		//The container is larger than the canvas so that the centers of the draggables can reach the ends exactly. Therefore, when we calculate world coordinates, we need to use smaller widths and heights than the actual container dimensions.
		restrictedWidth: null,
		restrictedHeight: null,

		draggables: [],

		worldCoordinates: [],

		autoAddContainer: true,

		numDraggables: 0,

		static: false,

		draggableRadius: 12,

		activeDraggable: -1,

		lastActiveDraggable: -1,

		mouseX: 0,
		mouseY: 0,

		mousedownCallback: null,
		mouseupCallback: null,
		mousemoveCallback: null,

		touchstartCallback: null,
		touchendCallback: null,
		touchmoveCallback: null,



		init()
		{
			if (document.querySelectorAll("#wilson-draggables-style").length === 0)
			{
				const element = document.createElement("style");

				element.textContent = `
					.wilson-output-canvas-container
					{
						position: relative;
						width: fit-content;
					}

					.wilson-output-canvas-container.wilson-fullscreen
					{
						width: 100%;
					}
					
					.wilson-draggables-container
					{
						position: absolute;
						
						-webkit-user-select: none;
						user-select: none;
					}

					.wilson-draggable
					{
						position: absolute;
						
						width: 20px;
						height: 20px;
						
						left: 0;
						top: 0;
						
						background-color: rgb(255, 255, 255);
						border: 2px solid rgb(64, 64, 64);
						border-radius: 50%;
						
						touch-action: none;
						-webkit-touch-callout: none;
						-webkit-user-select: none;
						user-select: none;
						
						cursor: pointer;
						
						transition: width .125s ease-in-out, height .125s ease-in-out, top .125s ease-in-out, left .125s ease-in-out;
					}

					.wilson-draggable:active
					{
						width: 16px;
						height: 16px;
						
						left: 2px;
						top: 2px;
					}
				`;

				element.id = "wilson-draggables-style";

				document.head.appendChild(element);
			}



			this.containerWidth = this.container.offsetWidth;
			this.containerHeight = this.container.offsetHeight;



			const handleTouchstartEventBound = this.handleTouchstartEvent.bind(this);
			const handleTouchendEventBound = this.handleTouchendEvent.bind(this);
			const handleTouchmoveEventBound = this.handleTouchmoveEvent.bind(this);

			const handleMousedownEventBound = this.handleMousedownEvent.bind(this);
			const handleMouseupEventBound = this.handleMouseupEvent.bind(this);
			const handleMousemoveEventBound = this.handleMousemoveEvent.bind(this);

			const onResizeBound = this.onResize.bind(this);



			if (!this.static)
			{
				addTemporaryListener({
					object: document.documentElement,
					event: "touchstart",
					callback: handleTouchstartEventBound
				});

				addTemporaryListener({
					object: document.documentElement,
					event: "touchmove",
					callback: handleTouchmoveEventBound
				});

				addTemporaryListener({
					object: document.documentElement,
					event: "touchend",
					callback: handleTouchendEventBound
				});

				addTemporaryListener({
					object: document.documentElement,
					event: "mousedown",
					callback: handleMousedownEventBound
				});

				addTemporaryListener({
					object: document.documentElement,
					event: "mousemove",
					callback: handleMousemoveEventBound
				});

				addTemporaryListener({
					object: document.documentElement,
					event: "mouseup",
					callback: handleMouseupEventBound
				});

				addTemporaryListener({
					object: window,
					event: "resize",
					callback: onResizeBound
				});
			}
		},



		//Add a new draggable.
		add(x, y)
		{
			//First convert to page coordinates.
			let row = Math.floor(this.restrictedHeight * (1 - ((y - this.parent.worldCenterY) / this.parent.worldHeight + .5))) + this.draggableRadius;
			let col = Math.floor(this.restrictedWidth * ((x - this.parent.worldCenterX) / this.parent.worldWidth + .5)) + this.draggableRadius;



			if (row < this.draggableRadius)
			{
				row = this.draggableRadius;
			}

			if (row > this.containerHeight - this.draggableRadius)
			{
				row = this.containerHeight - this.draggableRadius;
			}

			if (col < this.draggableRadius)
			{
				col = this.draggableRadius;
			}

			if (col > this.containerWidth - this.draggableRadius)
			{
				col = this.containerWidth - this.draggableRadius;
			}



			const element = document.createElement("div");
			element.classList.add("wilson-draggable");
			element.classList.add(`wilson-draggable-${this.numDraggables}`);
			element.style.transform = `translate3d(${col - this.draggableRadius}px, ${row - this.draggableRadius}px, 0)`;

			this.numDraggables++;

			this.draggables.push(element);

			this.worldCoordinates.push([x, y]);

			this.container.appendChild(element);



			return element;
		},



		handleMousedownEvent(e)
		{
			this.activeDraggable = -1;

			//Figure out which marker, if any, this is referencing.
			for (let i = 0; i < this.numDraggables; i++)
			{
				if (e.target.classList.contains(`wilson-draggable-${i}`) && e.target.parentNode === this.container)
				{
					e.preventDefault();

					this.activeDraggable = i;

					this.currentlyDragging = true;

					this.mouseX = e.clientX;
					this.mouseY = e.clientY;

					try
					{
						this.mousedownCallback(this.activeDraggable, ...(this.worldCoordinates[this.activeDraggable]), e);
					}

					catch(ex)
					{
						//No mousedown callback
					}

					break;
				}
			}
		},



		handleMouseupEvent(e)
		{
			if (this.activeDraggable !== -1)
			{
				document.body.style.WebkitUserSelect = "";

				this.lastActiveDraggable = this.activeDraggable;

				try
				{
					this.mouseupCallback(this.activeDraggable, ...(this.worldCoordinates[this.activeDraggable]), e);
				}

				catch(ex)
				{
					//No mouseup callback
				}
			}

			this.activeDraggable = -1;

			this.currentlyDragging = false;
		},



		handleMousemoveEvent(e)
		{
			if (this.currentlyDragging && this.activeDraggable !== -1)
			{
				e.preventDefault();



				const newMouseX = e.clientX;
				const newMouseY = e.clientY;

				this.mouseX = newMouseX;
				this.mouseY = newMouseY;



				const rect = this.container.getBoundingClientRect();

				let row = e.clientY - rect.top;
				let col = e.clientX - rect.left;



				if (row < this.draggableRadius)
				{
					row = this.draggableRadius;
				}

				if (row > this.containerHeight - this.draggableRadius)
				{
					row = this.containerHeight - this.draggableRadius;
				}

				if (col < this.draggableRadius)
				{
					col = this.draggableRadius;
				}

				if (col > this.containerWidth - this.draggableRadius)
				{
					col = this.containerWidth - this.draggableRadius;
				}

				this.draggables[this.activeDraggable].style.transform = `translate3d(${col - this.draggableRadius}px, ${row - this.draggableRadius}px, 0)`;



				const x = ((col - this.draggableRadius - this.restrictedWidth / 2) / this.restrictedWidth) * this.parent.worldWidth + this.parent.worldCenterX;
				const y = (-(row - this.draggableRadius - this.restrictedHeight / 2) / this.restrictedHeight) * this.parent.worldHeight + this.parent.worldCenterY;

				this.worldCoordinates[this.activeDraggable][0] = x;
				this.worldCoordinates[this.activeDraggable][1] = y;



				try
				{
					this.mousemoveCallback(this.activeDraggable, x, y, e);
				}

				catch(ex)
				{
					//No mousemove callback
				}
			}
		},



		handleTouchstartEvent(e)
		{
			this.activeDraggable = -1;

			//Figure out which marker, if any, this is referencing.
			for (let i = 0; i < this.numDraggables; i++)
			{
				if (e.target.classList.contains(`wilson-draggable-${i}`) && e.target.parentNode === this.container)
				{
					e.preventDefault();

					this.activeDraggable = i;

					this.currentlyDragging = true;

					this.mouseX = e.touches[0].clientX;
					this.mouseY = e.touches[0].clientY;

					try
					{
						this.touchstartCallback(this.activeDraggable, ...(this.worldCoordinates[this.activeDraggable]), e);
					}

					catch(ex)
					{
						//No touchstart callback
					}

					break;
				}
			}
		},



		handleTouchendEvent(e)
		{
			if (this.activeDraggable !== -1)
			{
				document.body.style.WebkitUserSelect = "";

				this.lastActiveDraggable = this.activeDraggable;

				try
				{
					this.touchendCallback(this.activeDraggable, ...(this.worldCoordinates[this.activeDraggable]), e);
				}

				catch(ex)
				{
					//No touchend callback
				}
			}

			this.activeDraggable = -1;

			this.currentlyDragging = false;
		},



		handleTouchmoveEvent(e)
		{
			if (this.currentlyDragging && this.activeDraggable !== -1)
			{
				e.preventDefault();

				this.mouseX = e.touches[0].clientX;
				this.mouseY = e.touches[0].clientY;

				const rect = this.container.getBoundingClientRect();

				let row = this.mouseY - rect.top;
				let col = this.mouseX - rect.left;



				if (row < this.draggableRadius)
				{
					row = this.draggableRadius;
				}

				if (row > this.containerHeight - this.draggableRadius)
				{
					row = this.containerHeight - this.draggableRadius;
				}

				if (col < this.draggableRadius)
				{
					col = this.draggableRadius;
				}

				if (col > this.containerWidth - this.draggableRadius)
				{
					col = this.containerWidth - this.draggableRadius;
				}

				this.draggables[this.activeDraggable].style.transform = `translate3d(${col - this.draggableRadius}px, ${row - this.draggableRadius}px, 0)`;



				const x = ((col - this.draggableRadius - this.restrictedWidth / 2) / this.restrictedWidth) * this.parent.worldWidth + this.parent.worldCenterX;
				const y = (-(row - this.draggableRadius - this.restrictedHeight / 2) / this.restrictedHeight) * this.parent.worldHeight + this.parent.worldCenterY;

				this.worldCoordinates[this.activeDraggable][0] = x;
				this.worldCoordinates[this.activeDraggable][1] = y;



				try
				{
					this.touchmoveCallback(this.activeDraggable, x, y, e);
				}

				catch(ex)
				{
					//No touchmove callback
				}
			}
		},



		recalculateLocations()
		{
			for (let i = 0; i < this.numDraggables; i++)
			{
				let row = Math.floor(this.restrictedHeight * (1 - ((this.worldCoordinates[i][1] - this.parent.worldCenterY) / this.parent.worldHeight + .5))) + this.draggableRadius;
				let col = Math.floor(this.restrictedWidth * ((this.worldCoordinates[i][0] - this.parent.worldCenterX) / this.parent.worldWidth + .5)) + this.draggableRadius;



				if (row < this.draggableRadius)
				{
					row = this.draggableRadius;
				}

				if (row > this.containerHeight - this.draggableRadius)
				{
					row = this.containerHeight - this.draggableRadius;
				}

				if (col < this.draggableRadius)
				{
					col = this.draggableRadius;
				}

				if (col > this.containerWidth - this.draggableRadius)
				{
					col = this.containerWidth - this.draggableRadius;
				}



				this.draggables[i].style.transform = `translate3d(${col - this.draggableRadius}px, ${row - this.draggableRadius}px, 0)`;
			}
		},



		onResize()
		{
			const computedStyle = window.getComputedStyle(this.parent.canvas);

			const width = this.parent.canvas.clientWidth - parseFloat(computedStyle.paddingLeft) - parseFloat(computedStyle.paddingRight);
			const height = this.parent.canvas.clientHeight - parseFloat(computedStyle.paddingTop) - parseFloat(computedStyle.paddingBottom);

			this.container.style.width = (width + 2 * this.draggableRadius) + "px";
			this.container.style.height = (height + 2 * this.draggableRadius) + "px";

			this.containerWidth = width + 2 * this.draggableRadius;
			this.containerHeight = height + 2 * this.draggableRadius;

			this.restrictedWidth = width;
			this.restrictedHeight = height;



			this.container.style.marginTop = (parseFloat(computedStyle.borderTopWidth) + parseFloat(computedStyle.paddingTop) - this.draggableRadius) + "px";



			this.recalculateLocations();
		}
	};



	fullscreen = {
		currentlyFullscreen: false,

		currentlyAnimating: false,

		//Contains the output canvas, along with anything attached to it (e.g. draggables containers)
		canvasesToResize: [],

		//True to fill the entire screen (which will strech the aspect ratio unless there's specific code to account for that), and false to letterbox.
		trueFullscreen: false,

		switchFullscreenCallback: null,

		fullscreenOldScroll: 0,

		oldFooterButtonOffset: 0,

		enterFullscreenButton: null,
		exitFullscreenButton: null,

		useFullscreenButton: false,

		enterFullscreenButtonIconPath: null,
		exitFullscreenButtonIconPath: null,

		fullscreenComponentsContainerLocation: null,
		fullscreenComponentsContainer: null,



		init()
		{
			if (this.useFullscreenButton)
			{
				if (document.querySelectorAll("#wilson-fullscreen-button-style").length === 0)
				{
					const element = document.createElement("style");

					element.textContent = `
						.wilson-enter-fullscreen-button, .wilson-exit-fullscreen-button
						{
							width: 15px;
							height: 15px;
							
							background: var(--background);
							border: 2px solid var(--normal-contrast);
							border-radius: 25%;
							padding: 5px;
							
							cursor: pointer;
							outline: none;
						}

						.wilson-enter-fullscreen-button
						{
							position: absolute;
							
							right: 10px;
							top: 10px;
							
							z-index: 50;
						}

						.wilson-exit-fullscreen-button
						{
							position: fixed;
							
							right: 10px;
							top: 10px;
							
							z-index: 100;
						}

						.wilson-enter-fullscreen-button img, .wilson-exit-fullscreen-button img
						{
							width: 100%;
							height: 100%;
							filter: invert(calc(.25 + var(--theme) * .5657));
						}
					`;

					element.id = "wilson-fullscreen-button-style";

					document.head.appendChild(element);
				}
			}



			if (document.querySelectorAll("#wilson-fullscreen-style").length === 0)
			{
				const element = document.createElement("style");

				element.textContent = `
					.wilson-fullscreen-components-container.wilson-fullscreen
					{
						position: fixed !important;
						top: 0 !important;
						left: 0 !important;
						
						z-index: 100 !important;
					}
					
					.wilson-fullscreen-components-container.wilson-fullscreen .wilson-applet-canvas-container
					{
						margin-top: 0 !important;
						margin-bottom: 0 !important;
					}
					
					.wilson-fullscreen-components-container.wilson-fullscreen:not(.wilson-true-fullscreen-canvas) .wilson-output-canvas-container
					{
						margin-left: calc(50vw - 50vmin) !important;
					}
					
					.wilson-true-fullscreen-canvas
					{
						width: 100vw !important;
						height: 100% !important;
						
						border: none !important;
						border-radius: 0 !important;
						padding: 0 !important;
					}

					.wilson-letterboxed-fullscreen-canvas
					{
						width: 100vmin !important;
						height: 100vmin !important;
						
						border: none !important;
						border-radius: 0 !important;
						padding: 0 !important;
					}

					.wilson-letterboxed-canvas-background
					{
						width: 100vw;
						height: calc((100vh - 100vmin) / 2);
						
						background-color: rgb(0, 0, 0);
					}

					.wilson-black-background
					{
						width: 100vw !important;
						height: 100% !important;
						
						background-color: rgb(0, 0, 0) !important;
					}
					
					.wilson-center-content
					{
						display: flex;
						justify-content: center;
						margin: 0 auto;
					}
				`;

				element.id = "wilson-fullscreen-style";

				document.head.appendChild(element);
			}



			if (this.useFullscreenButton)
			{
				this.enterFullscreenButton = document.createElement("div");

				this.enterFullscreenButton.classList.add("wilson-enter-fullscreen-button");
				this.enterFullscreenButton.setAttribute("tabindex", "-1");

				this.parent.canvas.parentNode.appendChild(this.enterFullscreenButton);

				const img = document.createElement("img");
				img.src = this.enterFullscreenButtonIconPath;
				this.enterFullscreenButton.appendChild(img);

				addHoverEventWithScale({
					element: this.enterFullscreenButton,
					scale: 1.1,
				});

				this.enterFullscreenButton.addEventListener("click", () =>
				{
					this.switchFullscreen();
				});
			}



			const onScrollBound = this.onScroll.bind(this);
			addTemporaryListener({
				object: window,
				event: "scroll",
				callback: onScrollBound
			});

			const onKeypressBound = this.onKeypress.bind(this);
			addTemporaryListener({
				object: document.documentElement,
				event: "keydown",
				callback: onKeypressBound
			});
		},



		enterFullscreen()
		{
			if (this.currentlyAnimating)
			{
				return;
			}



			this.currentlyFullscreen = true;

			this.currentlyAnimating = true;

			this.fullscreenOldScroll = window.scrollY;



			document.body.appendChild(this.fullscreenComponentsContainer);

			const header = document.body.querySelector("#header");
			const headerContainer = document.body.querySelector("#header-container");

			if (header && headerContainer)
			{
				header.style.zIndex = 90;
				headerContainer.style.zIndex = 90;
			}



			this.parent.canvas.classList.add("wilson-fullscreen");
			this.parent.canvas.parentNode.classList.add("wilson-fullscreen");
			this.fullscreenComponentsContainer.classList.add("wilson-fullscreen");



			if (this.enterFullscreenButton)
			{
				this.enterFullscreenButton.remove();
			}



			if (this.useFullscreenButton)
			{
				this.exitFullscreenButton = document.createElement("div");

				this.exitFullscreenButton.classList.add("wilson-exit-fullscreen-button");
				this.exitFullscreenButton.setAttribute("tabindex", "-1");

				document.body.appendChild(this.exitFullscreenButton);

				const img = document.createElement("img");
				img.src = this.exitFullscreenButtonIconPath;
				this.exitFullscreenButton.appendChild(img);

				addHoverEventWithScale({
					element: this.exitFullscreenButton,
					scale: 1.1,
				});

				this.exitFullscreenButton.addEventListener("click", () =>
				{
					this.switchFullscreen();
				});
			}



			this.oldMetaThemeColor = metaThemeColorElement.getAttribute("content");



			document.documentElement.style.overflowY = "hidden";
			document.body.style.overflowY = "hidden";

			document.body.style.width = "100vw";
			document.body.style.height = "100%";

			document.documentElement.style.userSelect = "none";
			document.documentElement.style.WebkitUserSelect = "none";

			document.addEventListener("gesturestart", this.preventGestures);
			document.addEventListener("gesturechange", this.preventGestures);
			document.addEventListener("gestureend", this.preventGestures);

			metaThemeColorElement.setAttribute("content", "#000000");



			if (this.trueFullscreen)
			{
				this.fullscreenComponentsContainer.classList.add("wilson-true-fullscreen-canvas");

				for (let i = 0; i < this.canvasesToResize.length; i++)
				{
					this.canvasesToResize[i].classList.add("wilson-true-fullscreen-canvas");

					//We do this to accomodate weirdly-set-up applets like the ones with draggable inputs, since they rely on their canvas container to keep the content below flowing properly.
					this.parent.canvas.parentNode.parentNode.classList.add("wilson-black-background");

					try
					{
						this.switchFullscreenCallback();
					}

					catch(ex)
					{
						//No switch fullscreen callback
					}

					this.parent.draggables.onResize();
				}

				window.scroll(0, 0);
			}



			else
			{
				for (let i = 0; i < this.canvasesToResize.length; i++)
				{
					this.canvasesToResize[i].classList.add("wilson-letterboxed-fullscreen-canvas");

					try
					{
						this.switchFullscreenCallback();
					}

					catch(ex)
					{
						//No switch fullscreen callback
					}

					this.parent.draggables.onResize();
				}



				//One of these is for vertical aspect ratios and the other is for horizontal ones, but we add both in case the user resizes the window while in applet is fullscreen.

				this.parent.canvas.parentNode.parentNode.insertAdjacentHTML("beforebegin", "<div class='wilson-letterboxed-canvas-background'></div>");
				this.parent.canvas.parentNode.parentNode.insertAdjacentHTML("afterend", "<div class='wilson-letterboxed-canvas-background'></div>");

				this.parent.canvas.parentNode.parentNode.classList.add("wilson-black-background");
			}



			if (this.parent.useDraggables)
			{
				this.parent.draggables.onResize();
			}



			this.currentlyAnimating = false;	
		},



		exitFullscreen()
		{
			if (this.currentlyAnimating)
			{
				return;
			}


			this.currentlyFullscreen = false;

			this.currentlyAnimating = true;

			metaThemeColorElement.setAttribute("content", this.oldMetaThemeColor);

			this.fullscreenComponentsContainerLocation.appendChild(this.fullscreenComponentsContainer);

			const header = document.body.querySelector("#header");
			const headerContainer = document.body.querySelector("#header-container");

			if (header && headerContainer)
			{
				header.style.zIndex = 110;
				headerContainer.style.zIndex = 105;
			}



			this.parent.canvas.classList.remove("wilson-fullscreen");
			this.parent.canvas.parentNode.classList.remove("wilson-fullscreen");
			this.fullscreenComponentsContainer.classList.remove("wilson-fullscreen");



			document.documentElement.style.overflowY = "scroll";
			document.body.style.overflowY = "visible";

			document.body.style.width = "";
			document.body.style.height = "";

			document.documentElement.style.userSelect = "auto";
			document.documentElement.style.WebkitUserSelect = "auto";

			document.removeEventListener("gesturestart", this.preventGestures);
			document.removeEventListener("gesturechange", this.preventGestures);
			document.removeEventListener("gestureend", this.preventGestures);



			if (this.exitFullscreenButton)
			{
				this.exitFullscreenButton.remove();
			}



			if (this.useFullscreenButton)
			{
				this.enterFullscreenButton = document.createElement("div");

				this.enterFullscreenButton.classList.add("wilson-enter-fullscreen-button");
				this.enterFullscreenButton.setAttribute("tabindex", "-1");

				this.parent.canvas.parentNode.appendChild(this.enterFullscreenButton);

				const img = document.createElement("img");
				img.src = this.enterFullscreenButtonIconPath;
				this.enterFullscreenButton.appendChild(img);

				addHoverEventWithScale({
					element: this.enterFullscreenButton,
					scale: 1.1,
				});

				this.enterFullscreenButton.addEventListener("click", () =>
				{
					this.switchFullscreen();
				});
			}



			this.fullscreenComponentsContainer.classList.remove("wilson-true-fullscreen-canvas");

			for (let i = 0; i < this.canvasesToResize.length; i++)
			{
				this.canvasesToResize[i].classList.remove("wilson-true-fullscreen-canvas");
				this.canvasesToResize[i].classList.remove("wilson-letterboxed-fullscreen-canvas");

				this.parent.canvas.parentNode.parentNode.classList.remove("wilson-black-background");



				const elements = document.querySelectorAll(".wilson-letterboxed-canvas-background");

				for (let i = 0; i < elements.length; i++)
				{
					if (elements[i])
					{
						elements[i].remove();
					}
				}



				try
				{
					this.switchFullscreenCallback();
				}

				catch(ex)
				{
					//No switch fullscreen callback
				}

				this.parent.draggables.onResize();
			}



			if (this.parent.useDraggables)
			{
				this.parent.draggables.onResize();
			}
			
			window.scrollTo(0, this.fullscreenOldScroll);
			setTimeout(() => window.scrollTo(0, this.fullscreenOldScroll), 10);

			this.currentlyAnimating = false;
		},



		switchFullscreen()
		{
			if (!this.currentlyFullscreen)
			{
				this.enterFullscreen();
			}

			else
			{
				this.exitFullscreen();
			}
		},



		onScroll()
		{
			if (!this.currentlyFullscreen)
			{
				return;
			}

			window.scroll(0, this.fullscreenLockedScroll);
		},



		onKeypress(e)
		{
			if (e.key === "Escape" && this.currentlyFullscreen)
			{
				this.switchFullscreen();
			}
		},



		preventGestures(e)
		{
			e.preventDefault();
		}
	};



	//Contains methods for handling input.
	input = {
		mouseX: null,
		mouseY: null,

		//These are stored before converting to world coordinates. This prevents problems that occur when using callbacks that reference the world coordinates to change those world coordinates.
		lastRow1: -1,
		lastCol1: -1,

		lastRow2: -1,
		lastCol2: -1,

		currentlyDragging: false,

		wasPinching: false,



		mousedownCallback: null,
		mouseupCallback: null,
		mousemoveCallback: null,
		mousedragCallback: null,

		touchstartCallback: null,
		touchupCallback: null,
		touchmoveCallback: null,

		pinchCallback: null,
		wheelCallback: null,



		onMousedownBound: null,
		onMouseupBound: null,
		onMousemoveBound: null,

		onTouchstartBound: null,
		onTouchupBound: null,
		onTouchmoveBound: null,

		onWheelBound: null,



		init()
		{
			for (let i = 0; i < this.parent.fullscreen.canvasesToResize.length; i++)
			{
				this.onMousedownBound = this.onMousedown.bind(this);
				this.parent.fullscreen.canvasesToResize[i].addEventListener("mousedown", this.onMousedownBound);

				this.onMouseupBound = this.onMouseup.bind(this);
				this.parent.fullscreen.canvasesToResize[i].addEventListener("mouseup", this.onMouseupBound);

				this.onMousemoveBound = this.onMousemove.bind(this);
				this.parent.fullscreen.canvasesToResize[i].addEventListener("mousemove", this.onMousemoveBound);



				this.onTouchstartBound = this.onTouchstart.bind(this);
				this.parent.fullscreen.canvasesToResize[i].addEventListener("touchstart", this.onTouchstartBound);

				this.onTouchendBound = this.onTouchend.bind(this);
				this.parent.fullscreen.canvasesToResize[i].addEventListener("touchend", this.onTouchendBound);

				this.onTouchmoveBound = this.onTouchmove.bind(this);
				this.parent.fullscreen.canvasesToResize[i].addEventListener("touchmove", this.onTouchmoveBound);



				this.onWheelBound = this.onWheel.bind(this);
				this.parent.fullscreen.canvasesToResize[i].addEventListener("wheel", this.onWheelBound);



				this.parent.fullscreen.canvasesToResize[i].addEventListener("mouseleave", (e) =>
				{
					const lastWorldCoordinates = this.parent.utils.interpolate.canvasToWorld(this.lastRow1, this.lastCol1);

					if (this.currentlyDragging)
					{
						this.currentlyDragging = false;

						try
						{
							this.mouseupCallback(...lastWorldCoordinates, e);
						}

						catch(ex)
						{
							//No mouseup callback
						}
					}
				});
			}
		},



		onMousedown(e)
		{
			if (e.target.classList.contains("wilson-draggable"))
			{
				return;
			}



			this.mouseX = e.clientX;
			this.mouseY = e.clientY;

			this.currentlyDragging = true;



			const rect = this.parent.canvas.getBoundingClientRect();

			const row = (this.mouseY - rect.top - this.parent.topBorder - this.parent.topPadding) * this.parent.canvasHeight / this.parent.draggables.restrictedHeight;
			const col = (this.mouseX - rect.left - this.parent.leftBorder - this.parent.leftPadding) * this.parent.canvasWidth / this.parent.draggables.restrictedWidth;

			const worldCoordinates = this.parent.utils.interpolate.canvasToWorld(row, col);

			this.lastRow1 = row;
			this.lastCol1 = col;



			if (this.mousedownCallback === null)
			{
				return;
			}

			e.preventDefault();

			this.mousedownCallback(...worldCoordinates, e);
		},



		onMouseup(e)
		{
			if (e.target.classList.contains("wilson-draggable"))
			{
				return;
			}



			e.preventDefault();

			this.mouseX = e.clientX;
			this.mouseY = e.clientY;

			this.currentlyDragging = false;



			if (this.mouseupCallback === null)
			{
				return;
			}



			const rect = this.parent.canvas.getBoundingClientRect();

			const row = (this.mouseY - rect.top - this.parent.topBorder - this.parent.topPadding) * this.parent.canvasHeight / this.parent.draggables.restrictedHeight;
			const col = (this.mouseX - rect.left - this.parent.leftBorder - this.parent.leftPadding) * this.parent.canvasWidth / this.parent.draggables.restrictedWidth;

			const worldCoordinates = this.parent.utils.interpolate.canvasToWorld(row, col);

			this.mouseupCallback(...worldCoordinates, e);

			this.lastRow1 = row;
			this.lastCol1 = col;
		},



		onMousemove(e)
		{
			if (e.target.classList.contains("wilson-draggable"))
			{
				return;
			}

			e.preventDefault();

			this.mouseX = e.clientX;
			this.mouseY = e.clientY;



			const rect = this.parent.canvas.getBoundingClientRect();

			const row = (this.mouseY - rect.top - this.parent.topBorder - this.parent.topPadding) * this.parent.canvasHeight / this.parent.draggables.restrictedHeight;
			const col = (this.mouseX - rect.left - this.parent.leftBorder - this.parent.leftPadding) * this.parent.canvasWidth / this.parent.draggables.restrictedWidth;

			const worldCoordinates = this.parent.utils.interpolate.canvasToWorld(row, col);



			const lastWorldCoordinates = this.parent.utils.interpolate.canvasToWorld(this.lastRow1, this.lastCol1);



			if (this.mousedragCallback !== null && this.currentlyDragging)
			{
				this.mousedragCallback(...worldCoordinates, worldCoordinates[0] - lastWorldCoordinates[0], worldCoordinates[1] - lastWorldCoordinates[1], e);
			}

			else if (this.mousemoveCallback !== null && !this.currentlyDragging)
			{
				this.mousemoveCallback(...worldCoordinates, worldCoordinates[0] - lastWorldCoordinates[0], worldCoordinates[1] - lastWorldCoordinates[1], e);
			}



			this.lastRow1 = row;
			this.lastCol1 = col;
		},



		onTouchstart(e)
		{
			if (e.target.classList.contains("wilson-draggable"))
			{
				return;
			}

			this.mouseX = e.touches[0].clientX;
			this.mouseY = e.touches[0].clientY;



			const rect = this.parent.canvas.getBoundingClientRect();

			const row = (this.mouseY - rect.top - this.parent.topBorder - this.parent.topPadding) * this.parent.canvasHeight / this.parent.draggables.restrictedHeight;
			const col = (this.mouseX - rect.left - this.parent.leftBorder - this.parent.leftPadding) * this.parent.canvasWidth / this.parent.draggables.restrictedWidth;

			const worldCoordinates = this.parent.utils.interpolate.canvasToWorld(row, col);

			this.lastRow1 = row;
			this.lastCol1 = col;



			if (this.touchstartCallback === null)
			{
				return;
			}



			e.preventDefault();

			this.touchstartCallback(...worldCoordinates, e);
		},



		onTouchend(e)
		{
			if (e.target.classList.contains("wilson-draggable"))
			{
				return;
			}

			e.preventDefault();



			this.touchDistance = -1;

			if (e.touches.length === 0)
			{
				this.wasPinching = false;
			}



			if (this.touchendCallback === null)
			{
				return;
			}



			if (this.lastRow1 !== -1)
			{
				const lastWorldCoordinates = this.parent.utils.interpolate.canvasToWorld(this.lastRow1, this.lastCol1);

				this.touchendCallback(...lastWorldCoordinates, e);
			}

			this.lastRow1 = -1;
			this.lastCol1 = -1;
			this.lastRow2 = -1;
			this.lastCol2 = -1;
		},



		onTouchmove(e)
		{
			if (e.target.classList.contains("wilson-draggable"))
			{
				return;
			}

			e.preventDefault();



			const rect = this.parent.canvas.getBoundingClientRect();



			if (e.touches.length >= 2 && this.pinchCallback !== null)
			{
				this.wasPinching = true;



				const row1 = (e.touches[0].clientY - rect.top - this.parent.topBorder - this.parent.topPadding) * this.parent.canvasHeight / this.parent.draggables.restrictedHeight;
				const col1 = (e.touches[0].clientX - rect.left - this.parent.leftBorder - this.parent.leftPadding) * this.parent.canvasWidth / this.parent.draggables.restrictedWidth;

				const row2 = (e.touches[1].clientY - rect.top - this.parent.topBorder - this.parent.topPadding) * this.parent.canvasHeight / this.parent.draggables.restrictedHeight;
				const col2 = (e.touches[1].clientX - rect.left - this.parent.leftBorder - this.parent.leftPadding) * this.parent.canvasWidth / this.parent.draggables.restrictedWidth;

				const worldCoordinates1 = this.parent.utils.interpolate.canvasToWorld(row1, col1);
				const worldCoordinates2 = this.parent.utils.interpolate.canvasToWorld(row2, col2);

				const xDistance = worldCoordinates1[0] - worldCoordinates2[0];
				const yDistance = worldCoordinates1[1] - worldCoordinates2[1];

				const touchDistance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);



				const centerX = (worldCoordinates1[0] + worldCoordinates2[0]) / 2;
				const centerY = (worldCoordinates1[1] + worldCoordinates2[1]) / 2;



				const lastWorldCoordinates1 = this.parent.utils.interpolate.canvasToWorld(this.lastRow1, this.lastCol1);
				const lastWorldCoordinates2 = this.parent.utils.interpolate.canvasToWorld(this.lastRow2, this.lastCol2);

				const lastXDistance = lastWorldCoordinates1[0] - lastWorldCoordinates2[0];
				const lastYDistance = lastWorldCoordinates1[1] - lastWorldCoordinates2[1];

				const lastTouchDistance = Math.sqrt(lastXDistance * lastXDistance + lastYDistance * lastYDistance);


				if (this.lastRow2 !== -1)
				{
					this.pinchCallback(centerX, centerY, touchDistance - lastTouchDistance, e);
				}
			}



			else if (this.wasPinching)
			{
				return;
			}



			this.mouseX = e.touches[0].clientX;
			this.mouseY = e.touches[0].clientY;



			if (this.touchmoveCallback === null)
			{
				return;
			}



			const row = (this.mouseY - rect.top - this.parent.topBorder - this.parent.topPadding) * this.parent.canvasHeight / this.parent.draggables.restrictedHeight;
			const col = (this.mouseX - rect.left - this.parent.leftBorder - this.parent.leftPadding) * this.parent.canvasWidth / this.parent.draggables.restrictedWidth;

			if (this.lastRow1 === -1 || this.lastCol1 === -1)
			{
				this.lastRow1 = row;
				this.lastCol1 = col;
				return;
			}

			const worldCoordinates = this.parent.utils.interpolate.canvasToWorld(row, col);

			const lastWorldCoordinates = this.parent.utils.interpolate.canvasToWorld(this.lastRow1, this.lastCol1);



			if (e.touches.length === 1)
			{
				this.touchmoveCallback(...worldCoordinates, worldCoordinates[0] - lastWorldCoordinates[0], worldCoordinates[1] - lastWorldCoordinates[1], e);
			}

			else
			{
				//Only fire a touchmove event if both touches are moving in a similar direction.
				const xDelta1 = worldCoordinates[0] - lastWorldCoordinates[0];
				const yDelta1 = worldCoordinates[1] - lastWorldCoordinates[1];



				const mouseX2 = e.touches[1].clientX;
				const mouseY2 = e.touches[1].clientY;

				const row2 = (mouseY2 - rect.top - this.parent.topBorder - this.parent.topPadding) * this.parent.canvasHeight / this.parent.draggables.restrictedHeight;
				const col2 = (mouseX2 - rect.left - this.parent.leftBorder - this.parent.leftPadding) * this.parent.canvasWidth / this.parent.draggables.restrictedWidth;

				const worldCoordinates2 = this.parent.utils.interpolate.canvasToWorld(row2, col2);

				const lastWorldCoordinates2 = this.parent.utils.interpolate.canvasToWorld(this.lastRow2, this.lastCol2);

				const xDelta2 = worldCoordinates2[0] - lastWorldCoordinates2[0];
				const yDelta2 = worldCoordinates2[1] - lastWorldCoordinates2[1];



				if (Math.abs(xDelta1 - xDelta2) / this.parent.worldWidth < .005 && Math.abs(yDelta1 - yDelta2) / this.parent.worldHeight < .005)
				{
					this.touchmoveCallback((worldCoordinates[0] + worldCoordinates2[0]) / 2, (worldCoordinates[1] + worldCoordinates2[1]) / 2, (xDelta1 + xDelta2) / 2, (yDelta1 + yDelta2) / 2, e);
				}



				this.lastRow2 = row2;
				this.lastCol2 = col2;
			}



			this.lastRow1 = row;
			this.lastCol1 = col;
		},



		onWheel(e)
		{
			if (this.wheelCallback === null)
			{
				return;
			}

			e.preventDefault();

			if (this.lastRow1 !== -1)
			{
				const lastWorldCoordinates = this.parent.utils.interpolate.canvasToWorld(this.lastRow1, this.lastCol1);

				this.wheelCallback(...lastWorldCoordinates, e.deltaY, e);
			}
		},



		//Returns what the world center should be to make zooms look correct.
		getZoomedWorldCenter(fixedPointX, fixedPointY, newWorldWidth, newWorldHeight)
		{
			const mouseXProportion = (fixedPointX - this.parent.worldCenterX) / this.parent.worldWidth;
			const mouseYProportion = (fixedPointY - this.parent.worldCenterY) / this.parent.worldHeight;

			const newFixedPointX = mouseXProportion * newWorldWidth;
			const newFixedPointY = mouseYProportion * newWorldHeight;

			const zoomedCenterX = fixedPointX - newFixedPointX;
			const zoomedCenterY = fixedPointY - newFixedPointY;

			return [zoomedCenterX, zoomedCenterY];
		}
	};



	//Resizes the canvas.
	changeCanvasSize(width, height)
	{
		this.canvasWidth = width;
		this.canvasHeight = height;

		this.canvas.setAttribute("width", width);
		this.canvas.setAttribute("height", height);

		if (this.render.renderType !== 0)
		{
			this.gl.viewport(0, 0, width, height);
		}



		const computedStyle = window.getComputedStyle(this.canvas);

		this.topPadding = parseFloat(computedStyle.paddingTop);
		this.leftPadding = parseFloat(computedStyle.paddingLeft);

		this.topBorder = parseFloat(computedStyle.borderTopWidth);
		this.leftBorder = parseFloat(computedStyle.borderLeftWidth);
	}



	//Downloads the current state of the canvas as a png. If using a WebGL canvas, another frame will be drawn before downloading.
	downloadFrame(filename, drawNewFrame = true)
	{
		if (this.render.renderType === 1 && drawNewFrame)
		{
			this.render.drawFrame(this.render.lastImage);
		}

		else if (this.render.renderType === 2 && drawNewFrame)
		{
			this.render.drawFrame();
		}

		this.canvas.toBlob((blob) =>
		{
			const link = document.createElement("a");

			link.download = filename;

			link.href = window.URL.createObjectURL(blob);

			link.click();

			link.remove();
		});
	}
}