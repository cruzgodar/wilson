class Wilson
{
	canvas = null;
	
	ctx = null;
	gl = null;
	
	uniforms = {};
	
	canvas_width = null;
	canvas_height = null;
	
	world_width = 2;
	world_height = 2;
	
	world_center_x = 0;
	world_center_y = 0;
	
	output_canvas_container = null;
	use_draggables = false;
	
	top_padding = 0;
	left_padding = 0;
	
	top_border = 0;
	left_border = 0;
	
	
	
	/*
		options:
		{
			renderer: "cpu", "hybrid", "gpu"
			
			canvas_width, canvas_height
			
			world_width, world_height
			world_center_x, world_center_y
			
			shader
			
			auto_arrange_canvases
			
			
			
			mousedown_callback
			mouseup_callback
			mousemove_callback
			mousedrag_callback
			
			touchstart_callback
			touchend_callback
			touchmove_callback
			
			pinch_callback
			wheel_callback
			
			
			
			use_draggables
			
			draggables_mousedown_callback
			draggables_mouseup_callback
			draggables_mousemove_callback
			
			draggables_touchstart_callback
			draggables_touchend_callback
			draggables_touchmove_callback
			
			
			
			use_fullscreen
			
			true_fullscreen
			
			canvases_to_resize
			
			use_fullscreen_button
			
			enter_fullscreen_button_icon_path
			exit_fullscreen_button_icon_path
			
			switch_fullscreen_callback
		}
	*/
	
	constructor(canvas, options)
	{
		this.canvas = canvas;
		
		this.canvas_width = typeof options.canvas_width === "undefined" ? parseInt(this.canvas.getAttribute("width")) : options.canvas_width;
		this.canvas_height = typeof options.canvas_height === "undefined" ? parseInt(this.canvas.getAttribute("height")) : options.canvas_height;
		
		this.canvas.setAttribute("width", this.canvas_width);
		this.canvas.setAttribute("height", this.canvas_height);
		
		
		
		let computed_style = window.getComputedStyle(this.canvas);
		
		this.top_padding = parseFloat(computed_style.paddingTop);
		this.left_padding = parseFloat(computed_style.paddingLeft);
		
		this.top_border = parseFloat(computed_style.borderTopWidth);
		this.left_border = parseFloat(computed_style.borderLeftWidth);
		
		
		
		this.utils.interpolate.parent = this;
		this.render.parent = this;
		this.draggables.parent = this;
		this.fullscreen.parent = this;
		this.input.parent = this;
		
		
		
		if (this.canvas.id !== "")
		{
			console.log(`[Wilson] Registered a ${this.canvas_width}x${this.canvas_height} canvas with ID ${this.canvas.id}`);
		}
		
		else
		{
			console.log(`[Wilson] Registered a ${this.canvas_width}x${this.canvas_height} canvas`);
		}
		
		
		
		if (typeof options.canvases_to_resize === "undefined")
		{
			options.canvases_to_resize = [this.canvas];
		}
		
		
		
		if (typeof options.world_width !== "undefined")
		{
			this.world_width = options.world_width;
		}
		
		if (typeof options.world_height !== "undefined")
		{
			this.world_height = options.world_height;
		}
		
		
		
		if (typeof options.world_center_x !== "undefined")
		{
			this.world_center_x = options.world_center_x;
		}
		
		if (typeof options.world_center_y !== "undefined")
		{
			this.world_center_y = options.world_center_y;
		}
		
		
		
		if (typeof options.renderer === "undefined" || options.renderer === "hybrid")
		{
			this.render.render_type = 1;
		}
		
		else if (options.renderer === "cpu")
		{
			this.render.render_type = 0;
		}
		
		else
		{
			this.render.render_type = 2;
		}
		
		
		if (this.render.render_type === 0)
		{
			this.ctx = this.canvas.getContext("2d");
			
			this.render.img_data = this.ctx.getImageData(0, 0, this.canvas_width, this.canvas_height);
			
			this.render.draw_frame = this.render.draw_frame_cpu;
		}
		
		else if (this.render.render_type === 1)
		{
			this.render.init_webgl_hybrid();
			
			this.render.draw_frame = this.render.draw_frame_hybrid;
		}
		
		else
		{
			try {this.render.init_webgl_gpu(options.shader);}
			catch(ex) {console.error("[Wilson] Error loading shader")}
			
			this.render.draw_frame = this.render.draw_frame_gpu;
		}
		
		
		
		if (typeof options.auto_arrange_canvases === "undefined" || options.auto_arrange_canvases)
		{
			this.arrange_canvases(options);
		}
		
		
		
		this.input.mousedown_callback = typeof options.mousedown_callback === "undefined" ? null : options.mousedown_callback;
		this.input.mouseup_callback = typeof options.mouseup_callback === "undefined" ? null : options.mouseup_callback;
		this.input.mousemove_callback = typeof options.mousemove_callback === "undefined" ? null : options.mousemove_callback;
		this.input.mousedrag_callback = typeof options.mousedrag_callback === "undefined" ? null : options.mousedrag_callback;
		
		this.input.touchstart_callback = typeof options.touchstart_callback === "undefined" ? null : options.touchstart_callback;
		this.input.touchend_callback = typeof options.touchend_callback === "undefined" ? null : options.touchend_callback;
		this.input.touchmove_callback = typeof options.touchmove_callback === "undefined" ? null : options.touchmove_callback;
		
		this.input.pinch_callback = typeof options.pinch_callback === "undefined" ? null : options.pinch_callback;
		this.input.wheel_callback = typeof options.wheel_callback === "undefined" ? null : options.wheel_callback;
		
		this.input.init();
		
		
		
		this.use_draggables = true;
		
		this.draggables.mousedown_callback = typeof options.draggables_mousedown_callback === "undefined" ? null : options.draggables_mousedown_callback;
		this.draggables.mouseup_callback = typeof options.draggables_mouseup_callback === "undefined" ? null : options.draggables_mouseup_callback;
		this.draggables.mousemove_callback = typeof options.draggables_mousemove_callback === "undefined" ? null : options.draggables_mousemove_callback;
		
		this.draggables.touchstart_callback = typeof options.draggables_touchstart_callback === "undefined" ? null : options.draggables_touchstart_callback;
		this.draggables.touchend_callback = typeof options.draggables_touchend_callback === "undefined" ? null : options.draggables_touchend_callback;
		this.draggables.touchmove_callback = typeof options.draggables_touchmove_callback === "undefined" ? null : options.draggables_touchmove_callback;
		
		this.draggables.init();
		
		
		
		if (typeof options.use_fullscreen !== "undefined" && options.use_fullscreen)
		{
			this.fullscreen.true_fullscreen = typeof options.true_fullscreen === "undefined" ? false : options.true_fullscreen;
			
			
			
			this.fullscreen.use_fullscreen_button = typeof options.use_fullscreen_button === "undefined" ? false : options.use_fullscreen_button;
			
			
			
			if (this.fullscreen.use_fullscreen_button && typeof options.enter_fullscreen_button_icon_path === "undefined")
			{
				console.error("Missing path to Enter Fullscreen button image");
			}
			
			if (this.fullscreen.use_fullscreen_button && typeof options.exit_fullscreen_button_icon_path === "undefined")
			{
				console.error("Missing path to Exit Fullscreen button image");
			}
			
			
			
			this.fullscreen.enter_fullscreen_button_icon_path = options.enter_fullscreen_button_icon_path;
			this.fullscreen.exit_fullscreen_button_icon_path = options.exit_fullscreen_button_icon_path;
			
			
			
			this.fullscreen.switch_fullscreen_callback = typeof options.switch_fullscreen_callback === "undefined" ? false : options.switch_fullscreen_callback;
			
			
						
			
			if (typeof options.canvases_to_resize === "undefined")
			{
				console.error("Missing canvases to resize");
			}
			
			
			
			this.fullscreen.canvases_to_resize = options.canvases_to_resize;
			
			
			
			this.fullscreen.init();
		}
	}
	
	
	
	arrange_canvases(options)
	{
		if (document.querySelectorAll("#wilson-style").length === 0)
		{
			let element = document.createElement("style");
			
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
		
		
		
		let applet_canvas_container = document.createElement("div");
		
		applet_canvas_container.classList.add("wilson-applet-canvas-container");
		
		applet_canvas_container.classList.add("wilson-center-content");
		
		this.canvas.parentNode.insertBefore(applet_canvas_container, this.canvas);
		
		
		
		this.output_canvas_container = document.createElement("div");
		
		this.output_canvas_container.classList.add("wilson-output-canvas-container");
		
		applet_canvas_container.appendChild(this.output_canvas_container);
		
		
		
		for (let i = 0; i < options.canvases_to_resize.length; i++)
		{
			applet_canvas_container.appendChild(options.canvases_to_resize[i]);
		}
		
		
		
		this.output_canvas_container.appendChild(this.canvas);
		
		
		
	
		this.draggables.container = document.createElement("div");
		
		this.draggables.container.classList.add("wilson-draggables-container");
		
		this.draggables.container.setAttribute("data-aos", "fade-up");
		
		this.draggables.container.setAttribute("data-aos-delay-increase", "0");
		
		applet_canvas_container.appendChild(this.draggables.container);
		
		this.fullscreen.canvases_to_resize.push(this.draggables.container);
		
		
		
		let computed_style = window.getComputedStyle(this.canvas);
		
		let width = this.canvas.clientWidth - parseFloat(computed_style.paddingLeft) - parseFloat(computed_style.paddingRight);
		let height = this.canvas.clientHeight - parseFloat(computed_style.paddingTop) - parseFloat(computed_style.paddingBottom);
		
		this.draggables.container.style.width = (width + 2 * this.draggables.draggable_radius) + "px";
		this.draggables.container.style.height = (height + 2 * this.draggables.draggable_radius) + "px";
		
		this.draggables.container_width = width + 2 * this.draggables.draggable_radius;
		this.draggables.container_height = height + 2 * this.draggables.draggable_radius;
		
		this.draggables.restricted_width = width;
		this.draggables.restricted_height = height;
		
		
		
		this.draggables.container.style.marginTop = (parseFloat(computed_style.borderTopWidth) + parseFloat(computed_style.paddingTop) - this.draggables.draggable_radius) + "px";
		
		
		
		this.fullscreen.fullscreen_components_container = document.createElement("div");
		
		this.fullscreen.fullscreen_components_container.classList.add("wilson-fullscreen-components-container");
		
		applet_canvas_container.parentNode.insertBefore(this.fullscreen.fullscreen_components_container, applet_canvas_container);
		
		this.fullscreen.fullscreen_components_container.appendChild(applet_canvas_container);
		
		
		
		this.fullscreen.fullscreen_components_container_location = document.createElement("div");
		
		this.fullscreen.fullscreen_components_container.parentNode.insertBefore(this.fullscreen.fullscreen_components_container_location, this.fullscreen.fullscreen_components_container);
		
		this.fullscreen.fullscreen_components_container_location.appendChild(this.fullscreen.fullscreen_components_container);
		
		
		
		for (let i = 0; i < this.fullscreen.canvases_to_resize.length; i++)
		{
			this.fullscreen.canvases_to_resize[i].addEventListener("gesturestart", e => e.preventDefault());
			this.fullscreen.canvases_to_resize[i].addEventListener("gesturechange", e => e.preventDefault());
			this.fullscreen.canvases_to_resize[i].addEventListener("gestureend", e => e.preventDefault());
			
			this.fullscreen.canvases_to_resize[i].addEventListener("click", e => e.preventDefault());
		}
	}
	
	
	
	//Contains utility functions for switching between canvas and world coordinates.
	utils =
	{
		interpolate:
		{
			canvas_to_world(row, col)
			{
				return [(col / this.parent.canvas_width - .5) * this.parent.world_width + this.parent.world_center_x, (.5 - row / this.parent.canvas_height) * this.parent.world_height + this.parent.world_center_y];
			},
			
			world_to_canvas(x, y)
			{
				return [Math.floor((.5 - (y - this.parent.world_center_y) / this.parent.world_height) * this.parent.canvas_height), Math.floor(((x - this.parent.world_center_x) / this.parent.world_width + .5) * this.parent.canvas_width)];
			}
		},
		
		
		
		//A utility function for converting from HSV to RGB. Accepts hsv in [0, 1] and returns rgb in [0, 255], unrounded.
		hsv_to_rgb(h, s, v)
		{
			function f(n)
			{
				let k = (n + 6*h) % 6;
				return v - v * s * Math.max(0, Math.min(k, Math.min(4 - k, 1)));
			}
			
			return [255 * f(5), 255 * f(3), 255 * f(1)];
		}
	};
	
	
	
	//Draws an entire frame to a cpu canvas by directly modifying the canvas data. Tends to be significantly faster than looping fillRect, **when the whole canvas needs to be updated**. If that's not the case, sticking to fillRect is generally a better idea. Here, image is a width * height * 4 Uint8ClampedArray, with each sequence of 4 elements corresponding to rgba values.
	render =
	{
		draw_frame: null,
		
		render_type: null, //0: cpu, 1: hybrid, 2: gpu
		
		last_image: null,
		
		img_data: null,
		
		shader_program: null,
		texture: null,
		
		
		
		draw_frame_cpu(image)
		{
			this.parent.ctx.putImageData(new ImageData(image, this.parent.canvas_width, this.parent.canvas_height), 0, 0);
		},
		
		
		
		//Draws an entire frame to the canvas by converting the frame to a WebGL texture and displaying that. In some cases, this can slightly increase drawing performance, and some browsers can also handle larger WebGL canvases than cpu ones (e.g. iOS Safari). For these reasons, it's recommended to default to this rendering method unless there is a specific reason to avoid WebGL.
		draw_frame_hybrid(image)
		{
			this.last_image = image;
			
			this.parent.gl.texImage2D(this.parent.gl.TEXTURE_2D, 0, this.parent.gl.RGBA, this.parent.canvas_width, this.parent.canvas_height, 0, this.parent.gl.RGBA, this.parent.gl.UNSIGNED_BYTE, image);
			
			this.parent.gl.drawArrays(this.parent.gl.TRIANGLE_STRIP, 0, 4);
		},
		
		
		
		draw_frame_gpu()
		{
			this.parent.gl.drawArrays(this.parent.gl.TRIANGLE_STRIP, 0, 4);
		},
		
		
		
		//Gets WebGL started for the canvas.
		init_webgl_hybrid()
		{
			this.parent.gl = this.parent.canvas.getContext("webgl");
			
			const vertex_shader_source = `
				attribute vec3 position;
				varying vec2 uv;

				void main(void)
				{
					gl_Position = vec4(position, 1.0);

					//Interpolate quad coordinates in the fragment shader.
					uv = position.xy;
				}
			`;
			
			const frag_shader_source = `
				precision highp float;
				
				varying vec2 uv;
				
				uniform sampler2D u_texture;
				
				
				
				void main(void)
				{
					gl_FragColor = texture2D(u_texture, (uv + vec2(1.0, 1.0)) / 2.0);
				}
			`;
			
			const quad = [-1, -1, 0,   -1, 1, 0,   1, -1, 0,   1, 1, 0];
			
			
			
			let vertex_shader = load_shader(this.parent.gl, this.parent.gl.VERTEX_SHADER, vertex_shader_source);
			
			let frag_shader = load_shader(this.parent.gl, this.parent.gl.FRAGMENT_SHADER, frag_shader_source);
			
			this.shader_program = this.parent.gl.createProgram();
			
			this.parent.gl.attachShader(this.shader_program, vertex_shader);
			this.parent.gl.attachShader(this.shader_program, frag_shader);
			this.parent.gl.linkProgram(this.shader_program);
			
			if (!this.parent.gl.getProgramParameter(this.shader_program, this.parent.gl.LINK_STATUS))
			{
				console.error(`[Wilson] Couldn't link shader program: ${this.parent.gl.getShaderInfoLog(shader)}`);
				this.parent.gl.deleteProgram(this.shader_program);
			}
			
			this.parent.gl.useProgram(this.shader_program);
			
			let position_buffer = this.parent.gl.createBuffer();
			
			this.parent.gl.bindBuffer(this.parent.gl.ARRAY_BUFFER, position_buffer);
			
			this.parent.gl.bufferData(this.parent.gl.ARRAY_BUFFER, new Float32Array(quad), this.parent.gl.STATIC_DRAW);
			
			this.shader_program.position_attribute = this.parent.gl.getAttribLocation(this.shader_program, "position");
			
			this.parent.gl.enableVertexAttribArray(this.shader_program.position_attribute);
			
			this.parent.gl.vertexAttribPointer(this.shader_program.position_attribute, 3, this.parent.gl.FLOAT, false, 0, 0);
			
			this.parent.gl.viewport(0, 0, this.parent.canvas_width, this.parent.canvas_height);
			
			
			
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
			
			
			
			function load_shader(gl, type, source)
			{
				let shader = gl.createShader(type);
				
				gl.shaderSource(shader, source);
				
				gl.compileShader(shader);
				
				if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
				{
					console.error(`[Wilson] Couldn't load shader: ${gl.getProgramInfoLog(shaderProgram)}`);
					gl.deleteShader(shader);
				}
				
				return shader;
			}
		},
		
		
		
		//Gets WebGL started for the canvas.
		init_webgl_gpu(frag_shader_source)
		{
			this.parent.gl = this.parent.canvas.getContext("webgl");
			
			const vertex_shader_source = `
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
			
			
			
			let vertex_shader = load_shader(this.parent.gl, this.parent.gl.VERTEX_SHADER, vertex_shader_source);
			
			let frag_shader = load_shader(this.parent.gl, this.parent.gl.FRAGMENT_SHADER, frag_shader_source);
			
			this.shader_program = this.parent.gl.createProgram();
			
			this.parent.gl.attachShader(this.shader_program, vertex_shader);
			this.parent.gl.attachShader(this.shader_program, frag_shader);
			this.parent.gl.linkProgram(this.shader_program);
			
			if (!this.parent.gl.getProgramParameter(this.shader_program, this.parent.gl.LINK_STATUS))
			{
				console.log(`[Wilson] Couldn't link shader program: ${this.gl.getShaderInfoLog(shader)}`);
				this.parent.gl.deleteProgram(this.shader_program);
			}
			
			this.parent.gl.useProgram(this.shader_program);
			
			let position_buffer = this.parent.gl.createBuffer();
			
			this.parent.gl.bindBuffer(this.parent.gl.ARRAY_BUFFER, position_buffer);
			
			this.parent.gl.bufferData(this.parent.gl.ARRAY_BUFFER, new Float32Array(quad), this.parent.gl.STATIC_DRAW);
			
			this.shader_program.position_attribute = this.parent.gl.getAttribLocation(this.shader_program, "position");
			
			this.parent.gl.enableVertexAttribArray(this.shader_program.position_attribute);
			
			this.parent.gl.vertexAttribPointer(this.shader_program.position_attribute, 3, this.parent.gl.FLOAT, false, 0, 0);
			
			this.parent.gl.viewport(0, 0, this.parent.canvas_width, this.parent.canvas_height);
			
			
			
			function load_shader(gl, type, source)
			{
				let shader = gl.createShader(type);
				
				gl.shaderSource(shader, source);
				
				gl.compileShader(shader);
				
				if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
				{
					console.log(`[Wilson] Couldn't load shader: ${gl.getProgramInfoLog(shaderProgram)}`);
					gl.deleteShader(shader);
				}
				
				return shader;
			}
		},
		
		
		
		//Initializes all of the uniforms for a gpu canvas. Takes in an array of variable names as strings (that match the uniforms in the fragment shader), and stores the locations in Wilson.uniforms.
		init_uniforms(variable_names)
		{
			for (let i = 0; i < variable_names.length; i++)
			{
				this.parent.uniforms[variable_names[i]] = this.parent.gl.getUniformLocation(this.shader_program, variable_names[i]);
			}
		},
		
		
		
		get_pixel_data()
		{
			let pixels = new Uint8Array(this.parent.canvas_width * this.parent.canvas_height * 4);
			
			this.parent.gl.readPixels(0, 0, this.parent.canvas_width, this.parent.canvas_height, this.parent.gl.RGBA, this.parent.gl.UNSIGNED_BYTE, pixels);
			
			return pixels;
		}
	};
	
	
	
	draggables =
	{
		parent: null,
		
		container: null,
		
		container_width: null,
		container_height: null,
		
		//The container is larger than the canvas so that the centers of the draggables can reach the ends exactly. Therefore, when we calculate world coordinates, we need to use smaller widths and heights than the actual container dimensions.
		restricted_width: null,
		restricted_height: null,
		
		draggables: [],
		
		world_coordinates: [],
		
		auto_add_container: true,
		
		num_draggables: 0,
		
		draggable_radius: 14.5,
		
		active_draggable: -1,
		
		last_active_draggable: -1,
		
		mouse_x: 0,
		mouse_y: 0,
		
		mousedown_callback: null,
		mouseup_callback: null,
		mousemove_callback: null,
		
		touchstart_callback: null,
		touchend_callback: null,
		touchmove_callback: null,
		
		
		
		init()
		{
			if (document.querySelectorAll("#wilson-draggables-style").length === 0)
			{
				let element = document.createElement("style");
				
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
						
						width: 25px;
						height: 25px;
						
						left: 0;
						top: 0;
						
						background-color: rgb(255, 255, 255);
						border: 2px solid rgb(0, 0, 0);
						border-radius: 50%;
						
						touch-action: none;
						-webkit-touch-callout: none;
						-webkit-user-select: none;
						user-select: none;
						
						cursor: pointer;
						
						transition: background-color .15s ease-in-out;
					}

					.wilson-draggable:active
					{
						background-color: rgb(127, 127, 127);
					}
				`;
				
				element.id = "wilson-draggables-style";
				
				document.head.appendChild(element);
			}
			
			
			
			this.container_width = this.container.offsetWidth;
			this.container_height = this.container.offsetHeight;
			
			
			
			let handle_touchstart_event_bound = this.handle_touchstart_event.bind(this);
			let handle_touchend_event_bound = this.handle_touchend_event.bind(this);
			let handle_touchmove_event_bound = this.handle_touchmove_event.bind(this);
			
			let handle_mousedown_event_bound = this.handle_mousedown_event.bind(this);
			let handle_mouseup_event_bound = this.handle_mouseup_event.bind(this);
			let handle_mousemove_event_bound = this.handle_mousemove_event.bind(this);
			
			let on_resize_bound = this.on_resize.bind(this);
			
			
			
			document.documentElement.addEventListener("touchstart", handle_touchstart_event_bound, false);
			document.documentElement.addEventListener("touchmove", handle_touchmove_event_bound, false);
			document.documentElement.addEventListener("touchend", handle_touchend_event_bound, false);
			
			document.documentElement.addEventListener("mousedown", handle_mousedown_event_bound, false);
			document.documentElement.addEventListener("mousemove", handle_mousemove_event_bound, false);
			document.documentElement.addEventListener("mouseup", handle_mouseup_event_bound, false);
			
			window.addEventListener("resize", on_resize_bound);
			Page.temporary_handlers["resize"].push(on_resize_bound);
		},
		
		
		
		//Add a new draggable.
		add(x, y)
		{
			//First convert to page coordinates.
			let row = Math.floor(this.restricted_height * (1 - ((y - this.parent.world_center_y) / this.parent.world_height + .5))) + this.draggable_radius;
			let col = Math.floor(this.restricted_width * ((x - this.parent.world_center_x) / this.parent.world_width + .5)) + this.draggable_radius;
			
			
			
			if (row < this.draggable_radius)
			{
				row = this.draggable_radius;
			}
			
			if (row > this.container_height - this.draggable_radius)
			{
				row = this.container_height - this.draggable_radius;
			}
			
			if (col < this.draggable_radius)
			{
				col = this.draggable_radius;
			}
			
			if (col > this.container_width - this.draggable_radius)
			{
				col = this.container_width - this.draggable_radius;
			}
			
			
			
			let element = document.createElement("div");
			element.classList.add("wilson-draggable");
			element.classList.add(`wilson-draggable-${this.num_draggables}`);
			element.style.transform = `translate3d(${col - this.draggable_radius}px, ${row - this.draggable_radius}px, 0)`;
			
			this.num_draggables++;
			
			this.draggables.push(element);
			
			this.world_coordinates.push([x, y]);
			
			this.container.appendChild(element);
			
			
			
			return element;
		},
		
		
		
		handle_mousedown_event(e)
		{
			this.active_draggable = -1;
			
			//Figure out which marker, if any, this is referencing.
			for (let i = 0; i < this.num_draggables; i++)
			{
				if (e.target.className.includes(`wilson-draggable-${i}`) && e.target.parentNode === this.container)
				{
					e.preventDefault();
					
					this.active_draggable = i;
					
					this.currently_dragging = true;
					
					this.mouse_x = e.clientX;
					this.mouse_y = e.clientY;
					
					try {this.mousedown_callback(this.active_draggable, ...(this.world_coordinates[this.active_draggable]), e)}
					catch(ex) {}
					
					break;
				}
			}
		},
		
		
		
		handle_mouseup_event(e)
		{
			if (this.active_draggable !== -1)
			{
				document.body.style.WebkitUserSelect = "";
				
				this.last_active_draggable = this.active_draggable;
				
				try {this.mouseup_callback(this.active_draggable, ...(this.world_coordinates[this.active_draggable]), e)}
				catch(ex) {}
			}
			
			this.active_draggable = -1;
			
			this.currently_dragging = false;
		},
		
		
		
		handle_mousemove_event(e)
		{
			if (this.currently_dragging && this.active_draggable !== -1)
			{
				e.preventDefault();
				
				
				
				let new_mouse_x = e.clientX;
				let new_mouse_y = e.clientY;
				
				let mouse_x_delta = new_mouse_x - this.mouse_x;
				let mouse_y_delta = new_mouse_y - this.mouse_y;
				
				this.mouse_x = new_mouse_x;
				this.mouse_y = new_mouse_y;
				
				
				
				let rect = this.container.getBoundingClientRect();
				
				let row = e.clientY - rect.top;
				let col = e.clientX - rect.left;
				
				
				
				if (row < this.draggable_radius)
				{
					row = this.draggable_radius;
				}
				
				if (row > this.container_height - this.draggable_radius)
				{
					row = this.container_height - this.draggable_radius;
				}
				
				if (col < this.draggable_radius)
				{
					col = this.draggable_radius;
				}
				
				if (col > this.container_width - this.draggable_radius)
				{
					col = this.container_width - this.draggable_radius;
				}
				
				this.draggables[this.active_draggable].style.transform = `translate3d(${col - this.draggable_radius}px, ${row - this.draggable_radius}px, 0)`;
				
				
				
				let x = ((col - this.draggable_radius - this.restricted_width/2) / this.restricted_width) * this.parent.world_width + this.parent.world_center_x;
				let y = (-(row - this.draggable_radius - this.restricted_height/2) / this.restricted_height) * this.parent.world_height + this.parent.world_center_y;
				
				this.world_coordinates[this.active_draggable][0] = x;
				this.world_coordinates[this.active_draggable][1] = y;
				
				
				
				try {this.mousemove_callback(this.active_draggable, x, y, e)}
				catch(ex) {}
			}
		},
		
		
		
		handle_touchstart_event(e)
		{
			this.active_draggable = -1;
			
			//Figure out which marker, if any, this is referencing.
			for (let i = 0; i < this.num_draggables; i++)
			{
				if (e.target.className.includes(`wilson-draggable-${i}`) && e.target.parentNode === this.container)
				{
					e.preventDefault();
					
					this.active_draggable = i;
					
					this.currently_dragging = true;
					
					this.mouse_x = e.touches[0].clientX;
					this.mouse_y = e.touches[0].clientY;
					
					try {this.touchstart_callback(this.active_draggable, ...(this.world_coordinates[this.active_draggable]), e)}
					catch(ex) {}
					
					break;
				}
			}
		},
		
		
		
		handle_touchend_event(e)
		{
			if (this.active_draggable !== -1)
			{
				document.body.style.WebkitUserSelect = "";
				
				this.last_active_draggable = this.active_draggable;
				
				try {this.touchend_callback(this.active_draggable, ...(this.world_coordinates[this.active_draggable]), e)}
				catch(ex) {}
			}
			
			this.active_draggable = -1;
			
			this.currently_dragging = false;
		},
		
		
		
		handle_touchmove_event(e)
		{
			if (this.currently_dragging && this.active_draggable !== -1)
			{
				e.preventDefault();
				
				this.mouse_x = e.touches[0].clientX;
				this.mouse_y = e.touches[0].clientY;
				
				let rect = this.container.getBoundingClientRect();
				
				let row = this.mouse_y - rect.top;
				let col = this.mouse_x - rect.left;
				
				
				
				if (row < this.draggable_radius)
				{
					row = this.draggable_radius;
				}
				
				if (row > this.container_height - this.draggable_radius)
				{
					row = this.container_height - this.draggable_radius;
				}
				
				if (col < this.draggable_radius)
				{
					col = this.draggable_radius;
				}
				
				if (col > this.container_width - this.draggable_radius)
				{
					col = this.container_width - this.draggable_radius;
				}
				
				this.draggables[this.active_draggable].style.transform = `translate3d(${col - this.draggable_radius}px, ${row - this.draggable_radius}px, 0)`;
				
				
				
				let x = ((col - this.draggable_radius - this.restricted_width/2) / this.restricted_width) * this.parent.world_width + this.parent.world_center_x;
				let y = (-(row - this.draggable_radius - this.restricted_height/2) / this.restricted_height) * this.parent.world_height + this.parent.world_center_y;
				
				this.world_coordinates[this.active_draggable][0] = x;
				this.world_coordinates[this.active_draggable][1] = y;
				
				
				
				try {this.touchmove_callback(this.active_draggable, x, y, e)}
				catch(ex) {}
			}
		},
		
		
		
		recalculate_locations()
		{
			for (let i = 0; i < this.num_draggables; i++)
			{
				let row = Math.floor(this.restricted_height * (1 - ((this.world_coordinates[i][1] - this.parent.world_center_y) / this.parent.world_height + .5))) + this.draggable_radius;
				let col = Math.floor(this.restricted_width * ((this.world_coordinates[i][0] - this.parent.world_center_x) / this.parent.world_width + .5)) + this.draggable_radius;
				
				
				
				if (row < this.draggable_radius)
				{
					row = this.draggable_radius;
				}
				
				if (row > this.container_height - this.draggable_radius)
				{
					row = this.container_height - this.draggable_radius;
				}
				
				if (col < this.draggable_radius)
				{
					col = this.draggable_radius;
				}
				
				if (col > this.container_width - this.draggable_radius)
				{
					col = this.container_width - this.draggable_radius;
				}
				
				
				
				this.draggables[i].style.transform = `translate3d(${col - this.draggable_radius}px, ${row - this.draggable_radius}px, 0)`;
			}
		},
		
		
		
		on_resize()
		{
			let computed_style = window.getComputedStyle(this.parent.canvas);
			
			let width = this.parent.canvas.clientWidth - parseFloat(computed_style.paddingLeft) - parseFloat(computed_style.paddingRight);
			let height = this.parent.canvas.clientHeight - parseFloat(computed_style.paddingTop) - parseFloat(computed_style.paddingBottom);
			
			this.container.style.width = (width + 2 * this.draggable_radius) + "px";
			this.container.style.height = (height + 2 * this.draggable_radius) + "px";
			
			this.container_width = width + 2 * this.draggable_radius;
			this.container_height = height + 2 * this.draggable_radius;
			
			this.restricted_width = width;
			this.restricted_height = height;
			
			
			
			this.container.style.marginTop = (parseFloat(computed_style.borderTopWidth) + parseFloat(computed_style.paddingTop) - this.draggable_radius) + "px";
			
			
			
			this.recalculate_locations();
		}
	};
	
	
	
	fullscreen =
	{
		currently_fullscreen: false,

		currently_animating: false,

		//Contains the output canvas, along with anything attached to it (e.g. draggables containers)
		canvases_to_resize: [],

		//True to fill the entire screen (which will strech the aspect ratio unless there's specific code to account for that), and false to letterbox.
		true_fullscreen: false,

		switch_fullscreen_callback: null,

		fullscreen_old_scroll: 0,
		
		old_footer_button_offset: 0,
		
		enter_fullscreen_button: null,
		exit_fullscreen_button: null,
		
		use_fullscreen_button: true,
		
		enter_fullscreen_button_icon_path: null,
		exit_fullscreen_button_icon_path: null,
		
		fullscreen_components_container_location: null,
		fullscreen_components_container: null,
		
		
		
		init()
		{
			if (this.use_fullscreen_button)
			{
				if (document.querySelectorAll("#wilson-fullscreen-button-style").length === 0)
				{
					let element = document.createElement("style");
					
					element.textContent = `
						.wilson-enter-fullscreen-button, .wilson-exit-fullscreen-button
						{
							width: 15px;
							
							background-color: rgb(255, 255, 255);
							
							border: 2px solid rgb(127, 127, 127);
							border-radius: 25%;
							padding: 5px;
							
							z-index: 100;
							
							transition: filter .15s ease-in-out;
							filter: brightness(100%);
							
							cursor: pointer;
							outline: none;
						}

						.wilson-enter-fullscreen-button.hover, .wilson-exit-fullscreen-button.hover
						{
							filter: brightness(75%);
						}

						.wilson-enter-fullscreen-button:not(:hover):focus, .wilson-exit-fullscreen-button:not(:hover):focus
						{
							filter: brightness(75%);
							outline: none;
						}

						.wilson-enter-fullscreen-button
						{
							position: absolute;
							right: 10px;
							top: 10px;
							
							z-index: 100;
						}

						.wilson-exit-fullscreen-button
						{
							position: fixed;
							right: 10px;
							top: 10px;
							
							z-index: 100;
						}
					`;
					
					element.id = "wilson-fullscreen-button-style";
					
					document.head.appendChild(element);
				}
			}
			
			
			
			if (document.querySelectorAll("#wilson-fullscreen-style").length === 0)
			{
				let element = document.createElement("style");
				
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
						height: calc(100vh + 4px) !important;
						
						border: none !important;
						border-radius: 0 !important;
						padding: 0 !important;
					}

					.wilson-letterboxed-fullscreen-canvas
					{
						width: 100vmin !important;
						height: calc(100vmin + 4px) !important;
						
						border: none !important;
						border-radius: 0 !important;
						padding: 0 !important;
					}

					.wilson-letterboxed-canvas-background
					{
						width: 100vw;
						height: calc((100vh - 100vmin) / 2 + 4px);
						
						background-color: rgb(0, 0, 0);
					}

					.wilson-black-background
					{
						width: 100vw !important;
						height: calc(100vh + 4px) !important;
						
						background-color: rgb(0, 0, 0) !important;
					}
					
					.wilson-output-canvas-container
					{
						position: relative;
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
			
			
			
			if (this.use_fullscreen_button)
			{
				this.enter_fullscreen_button = document.createElement("input");
				
				this.enter_fullscreen_button.type = "image";
				this.enter_fullscreen_button.classList.add("wilson-enter-fullscreen-button");
				this.enter_fullscreen_button.src = this.enter_fullscreen_button_icon_path;
				this.enter_fullscreen_button.alt = "Enter Fullscreen";
				this.enter_fullscreen_button.setAttribute("tabindex", "-1");
				
				this.parent.canvas.parentNode.appendChild(this.enter_fullscreen_button);
				
				Page.Load.HoverEvents.add(this.enter_fullscreen_button);
				
				this.enter_fullscreen_button.addEventListener("click", () =>
				{
					this.switch_fullscreen();
				});
			}
			
			
			
			let on_resize_bound = this.on_resize.bind(this);
			window.addEventListener("resize", on_resize_bound);
			Page.temporary_handlers["resize"].push(on_resize_bound);
			
			let on_scroll_bound = this.on_scroll.bind(this);
			window.addEventListener("scroll", on_scroll_bound);
			Page.temporary_handlers["scroll"].push(on_scroll_bound);
			
			let on_keypress_bound = this.on_keypress.bind(this);
			document.documentElement.addEventListener("keydown", on_keypress_bound);
			Page.temporary_handlers["keydown"].push(on_keypress_bound);
		},



		switch_fullscreen()
		{
			if (!this.currently_fullscreen)
			{
				if (this.currently_animating)
				{
					return;
				}
				
				
				
				this.currently_fullscreen = true;
				
				this.currently_animating = true;
				
				
				
				document.body.style.opacity = 0;
				
				setTimeout(() =>
				{
					document.body.appendChild(this.fullscreen_components_container);
					
					
					
					this.parent.canvas.classList.add("wilson-fullscreen");
					this.parent.canvas.parentNode.classList.add("wilson-fullscreen");
					this.fullscreen_components_container.classList.add("wilson-fullscreen");
					
					
					
					try {this.enter_fullscreen_button.remove();}
					catch(ex) {}
					
					
					
					if (this.use_fullscreen_button)
					{
						this.exit_fullscreen_button = document.createElement("input");
						
						this.exit_fullscreen_button.type = "image";
						this.exit_fullscreen_button.classList.add("wilson-exit-fullscreen-button");
						this.exit_fullscreen_button.src = this.exit_fullscreen_button_icon_path;
						this.exit_fullscreen_button.alt = "Exit Fullscreen";
						this.exit_fullscreen_button.setAttribute("tabindex", "-1");
						
						document.body.appendChild(this.exit_fullscreen_button);
						
						Page.Load.HoverEvents.add(this.exit_fullscreen_button);
						
						this.exit_fullscreen_button.addEventListener("click", () =>
						{
							this.switch_fullscreen();
						});
					}
					
					
					
					this.old_footer_button_offset = Page.Footer.Floating.current_offset;
					
					Page.Footer.Floating.current_offset = -43.75;
					
					document.querySelector("#show-footer-menu-button").style.bottom = "-43.75px";
					
					
					
					document.documentElement.style.overflowY = "hidden";
					document.body.style.overflowY = "hidden";
					
					document.documentElement.style.userSelect = "none";
					document.documentElement.style.WebkitUserSelect = "none";
					
					document.addEventListener("gesturestart", this.prevent_gestures);
					document.addEventListener("gesturechange", this.prevent_gestures);
					document.addEventListener("gestureend", this.prevent_gestures);
					
					
					this.fullscreen_old_scroll = window.scrollY;
					
					
					
					if (this.true_fullscreen)
					{
						this.fullscreen_components_container.classList.add("wilson-true-fullscreen-canvas");
						
						for (let i = 0; i < this.canvases_to_resize.length; i++)
						{
							this.canvases_to_resize[i].classList.add("wilson-true-fullscreen-canvas");
							
							//We do this to accomodate weirdly-set-up applets like the ones with draggable inputs, since they rely on their canvas container to keep the content below flowing properly.
							this.parent.canvas.parentNode.parentNode.classList.add("wilson-black-background");
							
							try {this.switch_fullscreen_callback();}
							catch(ex) {}
							
							this.parent.draggables.on_resize();
							
							Page.Load.AOS.on_resize();
						}
						
						window.scroll(0, 0);
					}
					
					
					
					else
					{
						for (let i = 0; i < this.canvases_to_resize.length; i++)
						{
							this.canvases_to_resize[i].classList.add("wilson-letterboxed-fullscreen-canvas");
							
							try {this.switch_fullscreen_callback();}
							catch(ex) {}
							
							this.parent.draggables.on_resize();
							
							Page.Load.AOS.on_resize();
						}
						
						
						
						//One of these is for vertical aspect ratios and the other is for horizontal ones, but we add both in case the user resizes the window while in applet is fullscreen.
						
						this.parent.canvas.parentNode.parentNode.insertAdjacentHTML("beforebegin", `<div class="wilson-letterboxed-canvas-background no-floating-footer"></div>`);
						this.parent.canvas.parentNode.parentNode.insertAdjacentHTML("afterend", `<div class="wilson-letterboxed-canvas-background no-floating-footer"></div>`);
						
						this.parent.canvas.parentNode.parentNode.classList.add("wilson-black-background");
						this.parent.canvas.parentNode.parentNode.classList.add("no-floating-footer");
						
						
						
						this.on_resize();
					}
					
					
					
					if (this.parent.use_draggables)
					{
						this.parent.draggables.on_resize();
					}
					
					
					
					document.body.style.opacity = 1;
					
					setTimeout(() =>
					{
						this.currently_animating = false;
						
						this.on_resize();
					}, 300);
				}, 300);
			}
			
			
			
			else
			{
				if (this.currently_animating)
				{
					return;
				}
				
				
				
				this.currently_fullscreen = false;
				
				this.currently_animating = true;
				
				
				
				document.body.style.opacity = 0;
				
				setTimeout(() =>
				{
					this.fullscreen_components_container_location.appendChild(this.fullscreen_components_container);
					
					
					
					this.parent.canvas.classList.remove("wilson-fullscreen");
					this.parent.canvas.parentNode.classList.remove("wilson-fullscreen");
					this.fullscreen_components_container.classList.remove("wilson-fullscreen");
					
					
					
					document.documentElement.style.overflowY = "visible";
					document.body.style.overflowY = "visible";
					
					document.documentElement.style.userSelect = "auto";
					document.documentElement.style.WebkitUserSelect = "auto";
					
					document.removeEventListener("gesturestart", this.prevent_gestures);
					document.removeEventListener("gesturechange", this.prevent_gestures);
					document.removeEventListener("gestureend", this.prevent_gestures);
					
					
					
					window.scroll(0, this.fullscreen_old_scroll);
					
					
					
					try {this.exit_fullscreen_button.remove();}
					catch(ex) {}
					
					
					
					if (this.use_fullscreen_button)
					{
						this.enter_fullscreen_button = document.createElement("input");
						
						this.enter_fullscreen_button.type = "image";
						this.enter_fullscreen_button.classList.add("wilson-enter-fullscreen-button");
						this.enter_fullscreen_button.src = this.enter_fullscreen_button_icon_path;
						this.enter_fullscreen_button.alt = "Enter Fullscreen";
						this.enter_fullscreen_button.setAttribute("tabindex", "-1");
						
						this.parent.canvas.parentNode.appendChild(this.enter_fullscreen_button);
						
						Page.Load.HoverEvents.add(this.enter_fullscreen_button);
						
						this.enter_fullscreen_button.addEventListener("click", () =>
						{
							this.switch_fullscreen();
						});
					}
					
					
					
					Page.Footer.Floating.current_offset = this.old_footer_button_offset;
					
					document.querySelector("#show-footer-menu-button").style.bottom = this.old_footer_button_offset + "px";
					
					
					
					for (let i = 0; i < this.canvases_to_resize.length; i++)
					{
						this.canvases_to_resize[i].classList.remove("wilson-true-fullscreen-canvas");
						this.canvases_to_resize[i].classList.remove("wilson-letterboxed-fullscreen-canvas");
						
						this.parent.canvas.parentNode.parentNode.classList.remove("wilson-black-background");
						
						try
						{
							let elements = document.querySelectorAll(".wilson-letterboxed-canvas-background");
							
							for (let i = 0; i < elements.length; i++)
							{
								elements[i].remove();
							}
						}
						
						catch(ex) {}
						
						
						
						try {this.switch_fullscreen_callback();}
						catch(ex) {}
						
						this.parent.draggables.on_resize();
						
						
						
						Page.Load.AOS.on_resize();
					}
					
					
					
					if (this.parent.use_draggables)
					{
						this.parent.draggables.on_resize();
					}
					
					
					
					document.body.style.opacity = 1;
					
					setTimeout(() =>
					{
						this.currently_animating = false;
					}, 300);
				}, 300);
			}
		},



		on_resize()
		{
			if (!this.currently_fullscreen)
			{
				return;
			}
			
			
			
			window.scroll(0, 0);
			
			
			
			setTimeout(() =>
			{
				window.scroll(0, 0);
			}, 500);
		},



		on_scroll()
		{
			if (!this.currently_fullscreen)
			{
				return;
			}
			
			window.scroll(0, this.fullscreen_locked_scroll);
		},
		
		
		
		on_keypress(e)
		{
			if (e.keyCode === 27 && this.currently_fullscreen)
			{
				this.switch_fullscreen();
			}
		},
		
		
		
		prevent_gestures(e)
		{
			e.preventDefault();
		}
	};
	
	
	
	//Contains methods for handling input.
	input = 
	{
		mouse_x: null,
		mouse_y: null,
		
		//These are stored before converting to world coordinates. This prevents problems that occur when using callbacks that reference the world coordinates to change those world coordinates.
		last_row_1: -1,
		last_col_1: -1,
		
		last_row_2: -1,
		last_col_2: -1,
		
		currently_dragging: false,
		
		was_pinching: false,
		
		
		
		mousedown_callback: null,
		mouseup_callback: null,
		mousemove_callback: null,
		mousedrag_callback: null,
		
		touchstart_callback: null,
		touchup_callback: null,
		touchmove_callback: null,
		
		pinch_callback: null,
		wheel_callback: null,
		
		
		
		on_mousedown_bound: null,
		on_mouseup_bound: null,
		on_mousemove_bound: null,
		
		on_touchstart_bound: null,
		on_touchup_bound: null,
		on_touchmove_bound: null,
		
		on_wheel_bound: null,
		
		
		
		init()
		{
			for (let i = 0; i < this.parent.fullscreen.canvases_to_resize.length; i++)
			{
				this.on_mousedown_bound = this.on_mousedown.bind(this);
				this.parent.fullscreen.canvases_to_resize[i].addEventListener("mousedown", this.on_mousedown_bound);
				
				this.on_mouseup_bound = this.on_mouseup.bind(this);
				this.parent.fullscreen.canvases_to_resize[i].addEventListener("mouseup", this.on_mouseup_bound);
				
				this.on_mousemove_bound = this.on_mousemove.bind(this);
				this.parent.fullscreen.canvases_to_resize[i].addEventListener("mousemove", this.on_mousemove_bound);
				
				
				
				this.on_touchstart_bound = this.on_touchstart.bind(this);
				this.parent.fullscreen.canvases_to_resize[i].addEventListener("touchstart", this.on_touchstart_bound);
				
				this.on_touchend_bound = this.on_touchend.bind(this);
				this.parent.fullscreen.canvases_to_resize[i].addEventListener("touchend", this.on_touchend_bound);
				
				this.on_touchmove_bound = this.on_touchmove.bind(this);
				this.parent.fullscreen.canvases_to_resize[i].addEventListener("touchmove", this.on_touchmove_bound);
				
				
				
				this.on_wheel_bound = this.on_wheel.bind(this);
				this.parent.fullscreen.canvases_to_resize[i].addEventListener("wheel", this.on_wheel_bound);
			}
		},
		
		
		
		on_mousedown(e)
		{
			if (e.target.classList.contains("wilson-draggable"))
			{
				return;
			}
			
			
			
			this.mouse_x = e.clientX;
			this.mouse_y = e.clientY;
			
			this.currently_dragging = true;
			
			
			
			let rect = this.parent.canvas.getBoundingClientRect();
			
			let row = (this.mouse_y - rect.top - this.parent.top_border - this.parent.top_padding) * this.parent.canvas_height / this.parent.draggables.restricted_height;
			let col = (this.mouse_x - rect.left - this.parent.left_border - this.parent.left_padding) * this.parent.canvas_width / this.parent.draggables.restricted_width;
			
			let world_coordinates = this.parent.utils.interpolate.canvas_to_world(row, col);
			
			this.last_row_1 = row;
			this.last_col_1 = col;
			
			
			
			if (this.mousedown_callback === null)
			{
				return;
			}
			
			e.preventDefault();
			
			this.mousedown_callback(...world_coordinates, e);
		},
		
		
		
		on_mouseup(e)
		{
			if (e.target.classList.contains("wilson-draggable"))
			{
				return;
			}
			
			
			
			e.preventDefault();
			
			this.mouse_x = e.clientX;
			this.mouse_y = e.clientY;
			
			this.currently_dragging = false;
			
			
			
			if (this.mouseup_callback === null)
			{
				return;
			}
			
			
			
			let rect = this.parent.canvas.getBoundingClientRect();
			
			let row = (this.mouse_y - rect.top - this.parent.top_border - this.parent.top_padding) * this.parent.canvas_height / this.parent.draggables.restricted_height;
			let col = (this.mouse_x - rect.left - this.parent.left_border - this.parent.left_padding) * this.parent.canvas_width / this.parent.draggables.restricted_width;
			
			let world_coordinates = this.parent.utils.interpolate.canvas_to_world(row, col);
			
			this.mouseup_callback(...world_coordinates, e);
			
			this.last_row_1 = row;
			this.last_col_1 = col;
		},
		
		
		
		on_mousemove(e)
		{
			if (e.target.classList.contains("wilson-draggable"))
			{
				return;
			}
			
			
			
			e.preventDefault();
			
			this.mouse_x = e.clientX;
			this.mouse_y = e.clientY;
			
			
			
			
			let rect = this.parent.canvas.getBoundingClientRect();
			
			let row = (this.mouse_y - rect.top - this.parent.top_border - this.parent.top_padding) * this.parent.canvas_height / this.parent.draggables.restricted_height;
			let col = (this.mouse_x - rect.left - this.parent.left_border - this.parent.left_padding) * this.parent.canvas_width / this.parent.draggables.restricted_width;
			
			let world_coordinates = this.parent.utils.interpolate.canvas_to_world(row, col);
			
			
			
			let last_world_coordinates = this.parent.utils.interpolate.canvas_to_world(this.last_row_1, this.last_col_1);
			
			
			
			if (this.mousedrag_callback !== null && this.currently_dragging)
			{
				this.mousedrag_callback(...world_coordinates, world_coordinates[0] - last_world_coordinates[0], world_coordinates[1] - last_world_coordinates[1], e);
			}
			
			else if (this.mousemove_callback !== null && !this.currently_dragging)
			{
				this.mousemove_callback(...world_coordinates, world_coordinates[0] - last_world_coordinates[0], world_coordinates[1] - last_world_coordinates[1], e);
			}
			
			
			
			this.last_row_1 = row;
			this.last_col_1 = col;
		},
		
		
		
		on_touchstart(e)
		{
			if (e.target.classList.contains("wilson-draggable"))
			{
				return;
			}
			
			
			
			this.mouse_x = e.touches[0].clientX;
			this.mouse_y = e.touches[0].clientY;
			
			
			
			let rect = this.parent.canvas.getBoundingClientRect();
			
			let row = (this.mouse_y - rect.top - this.parent.top_border - this.parent.top_padding) * this.parent.canvas_height / this.parent.draggables.restricted_height;
			let col = (this.mouse_x - rect.left - this.parent.left_border - this.parent.left_padding) * this.parent.canvas_width / this.parent.draggables.restricted_width;
			
			let world_coordinates = this.parent.utils.interpolate.canvas_to_world(row, col);
			
			this.last_row_1 = row;
			this.last_col_1 = col;
			
			
			
			if (this.touchstart_callback === null)
			{
				return;
			}
			
			
			
			e.preventDefault();
			
			this.touchstart_callback(...world_coordinates, e);
		},
		
		
		
		on_touchend(e)
		{
			if (e.target.classList.contains("wilson-draggable"))
			{
				return;
			}
			
			e.preventDefault();
			
			
			
			this.touch_distance = -1;
			
			this.last_row_2 = -1;
			this.last_col_2 = -1;
			
			if (e.touches.length === 0)
			{
				this.was_pinching = false;
			}
			
			
			
			if (this.touchend_callback === null)
			{
				return;
			}
			
			
			
			if (this.last_row_1 !== -1)
			{
				let last_world_coordinates = this.parent.utils.interpolate.canvas_to_world(this.last_row_1, this.last_col_1);
				
				this.touchend_callback(...last_world_coordinates, e);
			}
		},
		
		
		
		on_touchmove(e)
		{
			if (e.target.classList.contains("wilson-draggable"))
			{
				return;
			}
			
			
			
			e.preventDefault();
			
			
			
			let rect = this.parent.canvas.getBoundingClientRect();
			
			
			
			if (e.touches.length >= 2 && this.pinch_callback !== null)
			{
				this.was_pinching = true;
				
				
				
				let row_1 = (e.touches[0].clientY - rect.top - this.parent.top_border - this.parent.top_padding) * this.parent.canvas_height / this.parent.draggables.restricted_height;
				let col_1 = (e.touches[0].clientX - rect.left - this.parent.left_border - this.parent.left_padding) * this.parent.canvas_width / this.parent.draggables.restricted_width;
				
				let row_2 = (e.touches[1].clientY - rect.top - this.parent.top_border - this.parent.top_padding) * this.parent.canvas_height / this.parent.draggables.restricted_height;
				let col_2 = (e.touches[1].clientX - rect.left - this.parent.left_border - this.parent.left_padding) * this.parent.canvas_width / this.parent.draggables.restricted_width;
				
				let world_coordinates_1 = this.parent.utils.interpolate.canvas_to_world(row_1, col_1);
				let world_coordinates_2 = this.parent.utils.interpolate.canvas_to_world(row_2, col_2);
				
				let x_distance = world_coordinates_1[0] - world_coordinates_2[0];
				let y_distance = world_coordinates_1[1] - world_coordinates_2[1];
				
				let touch_distance = Math.sqrt(x_distance * x_distance + y_distance * y_distance);
				
				
				
				let center_x = (world_coordinates_1[0] + world_coordinates_2[0]) / 2;
				let center_y = (world_coordinates_1[1] + world_coordinates_2[1]) / 2;
				
				
				
				let last_world_coordinates_1 = this.parent.utils.interpolate.canvas_to_world(this.last_row_1, this.last_col_1);
				let last_world_coordinates_2 = this.parent.utils.interpolate.canvas_to_world(this.last_row_2, this.last_col_2);
				
				let last_x_distance = last_world_coordinates_1[0] - last_world_coordinates_2[0];
				let last_y_distance = last_world_coordinates_1[1] - last_world_coordinates_2[1];
				
				let last_touch_distance = Math.sqrt(last_x_distance * last_x_distance + last_y_distance * last_y_distance);
				
				
				if (this.last_row_2 !== -1)
				{
					this.pinch_callback(center_x, center_y, touch_distance - last_touch_distance, e);
				}
				
				
				
				this.last_row_1 = row_1;
				this.last_col_1 = col_1;
				
				this.last_row_2 = row_2;
				this.last_col_2 = col_2;
			}
			
			
			
			else if (this.was_pinching)
			{
				return;
			}
			
			
			
			this.mouse_x = e.touches[0].clientX;
			this.mouse_y = e.touches[0].clientY;
			
			
			
			if (this.touchmove_callback === null)
			{
				return;
			}
			
			
			
			let row = (this.mouse_y - rect.top - this.parent.top_border - this.parent.top_padding) * this.parent.canvas_height / this.parent.draggables.restricted_height;
			let col = (this.mouse_x - rect.left - this.parent.left_border - this.parent.left_padding) * this.parent.canvas_width / this.parent.draggables.restricted_width;
			
			let world_coordinates = this.parent.utils.interpolate.canvas_to_world(row, col);
			
			let last_world_coordinates = this.parent.utils.interpolate.canvas_to_world(this.last_row_1, this.last_col_1);
			
			
			
			this.touchmove_callback(...world_coordinates, world_coordinates[0] - last_world_coordinates[0], world_coordinates[1] - last_world_coordinates[1], e);
			
			
			
			this.last_row_1 = row;
			this.last_col_1 = col;
		},
		
		
		
		on_wheel(e)
		{
			if (this.wheel_callback === null)
			{
				return;
			}
			
			e.preventDefault();
			
			if (this.last_row_1 !== -1)
			{
				let last_world_coordinates = this.parent.utils.interpolate.canvas_to_world(this.last_row_1, this.last_col_1);
				
				this.wheel_callback(...last_world_coordinates, e.deltaY, e);
			}
		},
		
		
		
		//Returns what the world center should be to make zooms look correct.
		get_zoomed_world_center(fixed_point_x, fixed_point_y, new_world_width, new_world_height)
		{
			let mouse_x_proportion = (fixed_point_x - this.parent.world_center_x) / this.parent.world_width;
			let mouse_y_proportion = (fixed_point_y - this.parent.world_center_y) / this.parent.world_height;
			
			let new_fixed_point_x = mouse_x_proportion * new_world_width;
			let new_fixed_point_y = mouse_y_proportion * new_world_height;
			
			let zoomed_center_x = fixed_point_x - new_fixed_point_x;
			let zoomed_center_y = fixed_point_y - new_fixed_point_y;
			
			return [zoomed_center_x, zoomed_center_y];
		}
	}
	
	
	
	//Resizes the canvas.
	change_canvas_size(width, height)
	{
		this.canvas_width = width;
		this.canvas_height = height;
		
		this.canvas.setAttribute("width", width);
		this.canvas.setAttribute("height", height);
		
		if (this.render.render_type !== 0)
		{
			this.gl.viewport(0, 0, width, height);
		}
		
		
		
		let computed_style = window.getComputedStyle(this.canvas);
		
		this.top_padding = parseFloat(computed_style.paddingTop);
		this.left_padding = parseFloat(computed_style.paddingLeft);
		
		this.top_border = parseFloat(computed_style.borderTopWidth);
		this.left_border = parseFloat(computed_style.borderLeftWidth);
	}
	
	
	
	//Downloads the current state of the canvas as a png. If using a WebGL canvas, another frame will be drawn before downloading.
	download_frame(filename)
	{
		if (this.render.render_type === 1)
		{
			this.render.draw_frame(this.render.last_image);
		}
		
		else if (this.render.render_type === 2)
		{
			this.render.draw_frame();
		}
		
		
		
		let link = document.createElement("a");
		
		link.download = filename;
		
		link.href = this.canvas.toDataURL();
		
		link.click();
		
		link.remove();
	}
};