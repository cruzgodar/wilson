class Wilson
{
	canvas = null;
	
	ctx = null;
	gl = null;
	
	uniforms = {};
	
	canvas_width = null;
	canvas_height = null;
	
	world_width = -1;
	world_height = -1;
	
	world_center_x = -1;
	world_center_y = -1;
	
	
	
	/*
		options:
		{
			canvas_width, canvas_height
			
			world_width, world_height
			world_center_x, world_center_y
			
			renderer: "cpu", "hybrid", "gpu"
			
			shader
			
			
			
			auto_arrange_canvases
			
			
			
			use_draggables
			
			
			
			use_fullscreen
			
			use_true_fullscreen
			
			canvases_to_resize
			
			use_fullscreen_button
			
			enter_fullscreen_button_image_path
			exit_fullscreen_button_image_path
			
			resize_callback
		}
	*/
	
	constructor(canvas, options)
	{
		this.canvas = canvas;
		
		this.canvas_width = parseInt(this.canvas.getAttribute("width"));
		this.canvas_height = parseInt(this.canvas.getAttribute("height"));
		
		
		
		this.utils.interpolate.parent = this;
		this.render.parent = this;
		this.draggables.parent = this;
		this.fullscreen.parent = this;
		
		
		
		console.log(`[Wilson] Registered a ${this.canvas_width}x${this.canvas_height} canvas`);
		
		
		
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
		
		
		
		if (typeof options.use_draggables !== "undefined" && options.use_draggables)
		{
			this.draggables.init();
		}
		
		
		
		if (typeof options.use_fullscreen !== "undefined" && options.use_fullscreen)
		{
			this.fullscreen.use_true_fullscreen = typeof options.use_true_fullscreen === "undefined" ? false : options.use_true_fullscreen;
			
			
			
			this.fullscreen.auto_rearrange_canvases = typeof options.auto_rearrange_canvases === "undefined" ? true : options.auto_rearrange_canvases;
			
			
			
			this.fullscreen.use_fullscreen_button = typeof options.use_fullscreen_button === "undefined" ? true : options.use_fullscreen_button;
			
			
			
			if (this.fullscreen.use_fullscreen_button && typeof options.enter_fullscreen_button_image_path === "undefined")
			{
				console.error("Missing path to Enter Fullscreen button image");
			}
			
			if (this.fullscreen.use_fullscreen_button && typeof options.exit_fullscreen_button_image_path === "undefined")
			{
				console.error("Missing path to Exit Fullscreen button image");
			}
			
			
			
			this.fullscreen.enter_fullscreen_button_image_path = options.enter_fullscreen_button_image_path;
			this.fullscreen.exit_fullscreen_button_image_path = options.exit_fullscreen_button_image_path;
			
			
						
			
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
		let applet_canvas_container = document.createElement("div");
		
		applet_canvas_container.classList.add("applet-canvas-container");
		
		applet_canvas_container.classList.add("center-content");
		
		this.canvas.parentNode.insertBefore(applet_canvas_container, this.canvas);
		
		
		
		let output_canvas_container = document.createElement("div");
		
		output_canvas_container.classList.add("output-canvas-container");
		
		applet_canvas_container.appendChild(output_canvas_container);
		
		
		
		for (let i = 0; i < options.canvases_to_resize.length; i++)
		{
			applet_canvas_container.appendChild(options.canvases_to_resize[i]);
		}
		
		
		
		output_canvas_container.appendChild(this.canvas);
		
		
		
		if (options.use_draggables)
		{
			this.draggables.container = document.createElement("div");
			
			this.draggables.container.classList.add("draggables-container");
			
			applet_canvas_container.appendChild(this.draggables.container);
			
			this.fullscreen.canvases_to_resize.push(this.draggables.container);
			
			
			
			let computed_style = window.getComputedStyle(output_canvas_container);
			
			let width = parseInt(computed_style.getPropertyValue("width"));
			let height = parseInt(computed_style.getPropertyValue("height"));
			
			
			
			this.draggables.container.style.width = computed_style.getPropertyValue("height");
			this.draggables.container.style.height = computed_style.getPropertyValue("height");
			
			//Nightmare fuel.
			this.draggables.container.style.marginLeft = (height - width) + "px";
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
		}
	};
	
	
	
	draggables =
	{
		parent: null,
		
		container: null,
		
		draggables: [],
		
		auto_add_container: true,
		
		num_draggables: 0,
		
		draggable_radius: 17.5,
		
		active_draggable: -1,
		
		last_active_draggable: -1,
		
		mouse_x: 0,
		mouse_y: 0,
		
		
		
		init()
		{
			if (document.querySelectorAll("#wilson-draggables-style").length === 0)
			{
				let element = document.createElement("style");
				
				element.textContent = `
					.output-canvas-container
					{
						position: absolute;
						width: fit-content;
					}

					.output-canvas-container.fullscreen
					{
						width: 100%;
					}
					
					.draggables-container
					{
						position: absolute;
						
						user-select: none;
						-webkit-user-select: none;
					}

					.draggable
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
						user-select: none;
						-webkit-user-select: none;
						
						cursor: pointer;
						
						transition: background-color .15s ease-in-out;
					}

					.draggable:active
					{
						background-color: rgb(127, 127, 127);
					}
				`;
				
				element.id = "wilson-draggables-style";
				
				document.head.appendChild(element);
			}
			
			
			
			let handle_touchstart_event_bound = this.handle_touchstart_event.bind(this);
			let handle_touchend_event_bound = this.handle_touchend_event.bind(this);
			let handle_touchmove_event_bound = this.handle_touchmove_event.bind(this);
			
			let handle_mousedown_event_bound = this.handle_mousedown_event.bind(this);
			let handle_mouseup_event_bound = this.handle_mouseup_event.bind(this);
			let handle_mousemove_event_bound = this.handle_mousemove_event.bind(this);
			
			this.container.addEventListener("touchstart", handle_touchstart_event_bound, false);
			this.container.addEventListener("touchmove", handle_touchmove_event_bound, false);
			this.container.addEventListener("touchend", handle_touchend_event_bound, false);
			
			this.container.addEventListener("mousedown", handle_mousedown_event_bound, false);
			this.container.addEventListener("mousemove", handle_mousemove_event_bound, false);
			this.container.addEventListener("mouseup", handle_mouseup_event_bound, false);
		},
		
		
		
		//Add a new draggable.
		add(row, col)
		{
			let element = document.createElement("div");
			element.classList.add("draggable");
			element.classList.add(`draggable-${this.num_draggables}`);
			element.style.transform = `translate3d(${col - this.draggable_radius}px, ${row - this.draggable_radius}px, 0)`;
			
			this.num_draggables++;
			
			this.draggables.push(element);
			
			this.container.appendChild(element);
		},
		
		
		
		handle_mousedown_event(e)
		{
			this.active_draggable = -1;
			
			//Figure out which marker, if any, this is referencing.
			for (let i = 0; i < this.num_draggables; i++)
			{
				if (e.target.className.includes(`draggable-${i}`))
				{
					e.preventDefault();
					
					this.active_draggable = i;
					
					//Callback
					
					break;
				}
			}
			
			this.currently_dragging = true;
			
			this.mouse_x = e.clientX;
			this.mouse_y = e.clientY;
		},
		
		
		
		handle_mouseup_event(e)
		{
			if (this.active_draggable !== -1)
			{
				document.body.style.WebkitUserSelect = "";
				
				this.last_active_draggable = this.active_draggable;
				
				//Callback
			}
			
			this.active_draggable = -1;
			
			this.currently_dragging = false;
		},
		
		
		
		handle_mousemove_event(e)
		{
			let new_mouse_x = e.clientX;
			let new_mouse_y = e.clientY;
			
			let mouse_x_delta = new_mouse_x - this.mouse_x;
			let mouse_y_delta = new_mouse_y - this.mouse_y;
			
			this.mouse_x = new_mouse_x;
			this.mouse_y = new_mouse_y;
			
			if (this.currently_dragging && this.active_draggable !== -1)
			{
				e.preventDefault();
				
				let rect = this.container.getBoundingClientRect();
				
				let row = e.clientY - rect.top;
				let col = e.clientX - rect.left;
				
				
				
				if (row < this.draggable_radius)
				{
					row = this.draggable_radius;
				}
				
				if (row > this.container.offsetHeight - this.draggable_radius)
				{
					row = this.container.offsetHeight - this.draggable_radius;
				}
				
				if (col < this.draggable_radius)
				{
					col = this.draggable_radius;
				}
				
				if (col > this.container.offsetWidth - this.draggable_radius)
				{
					col = this.container.offsetWidth - this.draggable_radius;
				}
				
				
				
				this.draggables[this.active_draggable].style.transform = `translate3d(${col - this.draggable_radius}px, ${row - this.draggable_radius}px, 0)`;
				
				
				
				//Callback
			}
		},
		
		
		
		handle_touchstart_event(e)
		{
			this.active_draggable = -1;
			
			//Figure out which marker, if any, this is referencing.
			for (let i = 0; i < this.num_draggables; i++)
			{
				if (e.target.className.includes(`draggable-${i}`))
				{
					e.preventDefault();
					
					this.active_draggable = i;
					
					//Callback
					
					break;
				}
			}
			
			this.currently_dragging = true;
			
			this.mouse_x = e.touches[0].clientX;
			this.mouse_y = e.touches[0].clientY;
		},
		
		
		
		handle_touchend_event(e)
		{
			if (this.active_draggable !== -1)
			{
				document.body.style.WebkitUserSelect = "";
				
				this.last_active_draggable = this.active_draggable;
				
				//Callback
			}
			
			this.active_draggable = -1;
			
			this.currently_dragging = false;
		},
		
		
		
		handle_touchmove_event(e)
		{
			if (this.currently_dragging && this.active_draggable !== -1)
			{
				e.preventDefault();
				
				let rect = this.container.getBoundingClientRect();
				
				let row = e.touches[0].clientY - rect.top;
				let col = e.touches[0].clientX - rect.left;
				
				
				
				if (row < this.draggable_radius)
				{
					row = this.draggable_radius;
				}
				
				if (row > this.container.offsetHeight - this.draggable_radius)
				{
					row = this.container.offsetHeight - this.draggable_radius;
				}
				
				if (col < this.draggable_radius)
				{
					col = this.draggable_radius;
				}
				
				if (col > this.container.offsetWidth - this.draggable_radius)
				{
					col = this.container.offsetWidth - this.draggable_radius;
				}
				
				this.draggables[this.active_draggable].style.transform = `translate3d(${col - this.draggable_radius}px, ${row - this.draggable_radius}px, 0)`;
				
				
				
				//Callback
			}
		}
	};
	
	
	
	fullscreen =
	{
		currently_fullscreen: false,

		currently_animating: false,

		//Contains the output canvas, along with anything attached to it (e.g. draggables containers)
		canvases_to_resize: [],
		
		auto_rearrange_canvases: true,

		//True to fill the entire screen (which will strech the aspect ratio unless there's specific code to account for that), and false to letterbox.
		true_fullscreen: false,

		resize_callback: null,

		fullscreen_old_scroll: 0,
		fullscreen_locked_scroll: 0,
		
		enter_fullscreen_button: null,
		exit_fullscreen_button: null,
		
		
		
		use_fullscreen_button: true,
		
		enter_fullscreen_button_image_path: null,
		exit_fullscreen_button_image_path: null,
		
		
		
		init()
		{
			if (this.use_fullscreen_button)
			{
				if (document.querySelectorAll("#wilson-fullscreen-button-style").length === 0)
				{
					let element = document.createElement("style");
					
					element.textContent = `
						.enter-fullscreen-button, .exit-fullscreen-button
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

						.enter-fullscreen-button.hover, .exit-fullscreen-button.hover
						{
							filter: brightness(75%);
						}

						.enter-fullscreen-button:not(:hover):focus, .exit-fullscreen-button:not(:hover):focus
						{
							filter: brightness(75%);
							outline: none;
						}

						.enter-fullscreen-button
						{
							position: absolute;
							right: 10px;
							top: 10px;
							
							z-index: 100;
						}

						.exit-fullscreen-button
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
					.true-fullscreen-canvas
					{
						width: 100vw !important;
						height: calc(100vh + 4px) !important;
						
						border: none !important;
						border-radius: 0 !important;
						padding: 0 !important;
					}

					.letterboxed-fullscreen-canvas
					{
						width: 100vmin !important;
						height: calc(100vmin + 4px) !important;
						
						border: none !important;
						border-radius: 0 !important;
						padding: 0 !important;
					}

					.letterboxed-canvas-background
					{
						width: 100vw;
						height: calc((100vh - 100vmin) / 2 + 4px);
						
						background-color: rgb(0, 0, 0);
					}

					.black-background
					{
						width: 100vw !important;
						height: calc(100vh + 4px) !important;
						
						background-color: rgb(0, 0, 0) !important;
					}
					
					.output-canvas-container
					{
						position: relative;
					}
					
					.center-content
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
				this.enter_fullscreen_button.classList.add("enter-fullscreen-button");
				this.enter_fullscreen_button.src = this.enter_fullscreen_button_image_path;
				this.enter_fullscreen_button.alt = "Enter Fullscreen";
				this.enter_fullscreen_button.setAttribute("tabindex", "-1");
				
				this.parent.canvas.parentNode.appendChild(this.enter_fullscreen_button);
				
				Page.Load.HoverEvents.add(this.enter_fullscreen_button);
				
				this.enter_fullscreen_button.addEventListener("click", () =>
				{
					this.switch_fullscreen();
				});
			}
			
			
			
			window.addEventListener("resize", this.on_resize);
			Page.temporary_handlers["resize"].push(this.on_resize);
			
			window.addEventListener("scroll", this.on_scroll);
			Page.temporary_handlers["scroll"].push(this.on_scroll);
			
			let bound_function = this.handle_keypress_event.bind(this);
			document.documentElement.addEventListener("keydown", bound_function);
			Page.temporary_handlers["keydown"].push(this.on_scroll);
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
					this.parent.canvas.classList.add("fullscreen");
					
					
					
					try {this.enter_fullscreen_button.remove();}
					catch(ex) {}
					
					
					
					this.exit_fullscreen_button = document.createElement("input");
					
					this.exit_fullscreen_button.type = "image";
					this.exit_fullscreen_button.classList.add("exit-fullscreen-button");
					this.exit_fullscreen_button.src = this.exit_fullscreen_button_image_path;
					this.exit_fullscreen_button.alt = "Exit Fullscreen";
					this.exit_fullscreen_button.setAttribute("tabindex", "-1");
					
					document.body.appendChild(this.exit_fullscreen_button);
					
					this.exit_fullscreen_button.addEventListener("click", () =>
					{
						this.switch_fullscreen();
					});
					
					
					
					this.old_footer_button_offset = Page.Footer.Floating.current_offset;
					
					Page.Footer.Floating.current_offset = -43.75;
					
					document.querySelector("#show-footer-menu-button").style.bottom = "-43.75px";
					
					
					
					document.documentElement.style.overflowY = "hidden";
					document.body.style.overflowY = "hidden";
					
					document.addEventListener("gesturestart", this.prevent_gestures);
					document.addEventListener("gesturechange", this.prevent_gestures);
					document.addEventListener("gestureend", this.prevent_gestures);
					
					
					this.fullscreen_old_scroll = window.scrollY;
					
					
					
					if (this.true_fullscreen)
					{
						for (let i = 0; i < this.canvases_to_resize.length; i++)
						{
							this.canvases_to_resize[i].classList.add("true-fullscreen-canvas");
							
							//We do this to accomodate weirdly-set-up applets like the ones with draggable inputs, since they rely on their canvas container to keep the content below flowing properly.
							this.parent.canvas.parentNode.parentNode.classList.add("black-background");
							
							try {this.resize_callback();}
							catch(ex) {}
						}
						
						window.scroll(0, window.scrollY + this.canvases_to_resize[0].getBoundingClientRect().top + 2);
						
						this.fullscreen_locked_scroll = window.scrollY;
					}
					
					
					
					else
					{
						for (let i = 0; i < this.canvases_to_resize.length; i++)
						{
							this.canvases_to_resize[i].classList.add("letterboxed-fullscreen-canvas");
							
							try {this.resize_callback();}
							catch(ex) {}
						}
						
						
						
						//One of these is for vertical aspect ratios and the other is for horizontal ones, but we add both in case the user resizes the window while in applet is fullscreen.
						
						this.parent.canvas.parentNode.parentNode.insertAdjacentHTML("beforebegin", `<div class="letterboxed-canvas-background no-floating-footer"></div>`);
						this.parent.canvas.parentNode.parentNode.insertAdjacentHTML("afterend", `<div class="letterboxed-canvas-background no-floating-footer"></div>`);
						
						this.parent.canvas.parentNode.parentNode.classList.add("black-background");
						this.parent.canvas.parentNode.parentNode.classList.add("no-floating-footer");
						
						
						
						this.on_resize();
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
					this.parent.canvas.parentNode.classList.remove("fullscreen");
					
					
					
					document.documentElement.style.overflowY = "visible";
					document.body.style.overflowY = "visible";
					
					document.removeEventListener("gesturestart", this.prevent_gestures);
					document.removeEventListener("gesturechange", this.prevent_gestures);
					document.removeEventListener("gestureend", this.prevent_gestures);
					
					
					
					window.scroll(0, this.fullscreen_old_scroll);
					
					
					
					try {this.exit_fullscreen_button.remove();}
					catch(ex) {}
					
					
					
					this.enter_fullscreen_button = document.createElement("input");
					
					this.enter_fullscreen_button.type = "image";
					this.enter_fullscreen_button.classList.add("enter-fullscreen-button");
					this.enter_fullscreen_button.src = this.enter_fullscreen_button_image_path;
					this.enter_fullscreen_button.alt = "Enter Fullscreen";
					this.enter_fullscreen_button.setAttribute("tabindex", "-1");
					
					this.parent.canvas.parentNode.appendChild(this.enter_fullscreen_button);
					
					this.enter_fullscreen_button.addEventListener("click", () =>
					{
						this.switch_fullscreen();
					});
					
					
					
					for (let i = 0; i < this.canvases_to_resize.length; i++)
					{
						this.canvases_to_resize[i].classList.remove("true-fullscreen-canvas");
						this.canvases_to_resize[i].classList.remove("letterboxed-fullscreen-canvas");
						
						this.parent.canvas.parentNode.parentNode.classList.remove("black-background");
						
						try
						{
							let elements = document.querySelectorAll(".letterboxed-canvas-background");
							
							for (let i = 0; i < elements.length; i++)
							{
								elements[i].remove();
							}
						}
						
						catch(ex) {}
						
						
						
						try {this.resize_callback();}
						catch(ex) {}
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
			
			
			
			if (window.innerWidth / window.innerHeight < 1 && !this.true_fullscreen)
			{
				window.scroll(0, window.scrollY + this.canvases_to_resize[0].getBoundingClientRect().top - (window.innerHeight - this.canvases_to_resize[0].offsetHeight) / 2 + 2);
			}
			
			else
			{
				window.scroll(0, window.scrollY + this.canvases_to_resize[0].getBoundingClientRect().top + 2);
			}
			
			this.fullscreen_locked_scroll = window.scrollY;
			
			
			
			try {this.resize_callback();}
			catch(ex) {}
			
			
			
			setTimeout(() =>
			{
				if (window.innerWidth / window.innerHeight < 1 && !this.true_fullscreen)
				{
					window.scroll(0, window.scrollY + this.canvases_to_resize[0].getBoundingClientRect().top - (window.innerHeight - this.canvases_to_resize[0].offsetHeight) / 2 + 2);
				}
				
				else
				{
					window.scroll(0, window.scrollY + this.canvases_to_resize[0].getBoundingClientRect().top + 2);
				}
				
				this.fullscreen_locked_scroll = window.scrollY;
				
				
				
				try {this.resize_callback();}
				catch(ex) {}
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
		
		
		
		handle_keypress_event(e)
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
	
	
	
	//Resizes the canvas.
	resize(width, height)
	{
		this.canvas_width = width;
		this.canvas_height = height;
		
		this.canvas.setAttribute("width", width);
		this.canvas.setAttribute("height", height);
		
		if (this.render.render_type !== 0)
		{
			this.gl.viewport(0, 0, width, height);
		}
	}
	
	
	
	//Downloads the current state of the canvas as a png. If using a WebGL canvas, another frame will be drawn before downloading.
	download_frame(filename)
	{
		if (this.render_type === 1)
		{
			this.draw_frame(this.last_image);
		}
		
		else if (this.render_type === 2)
		{
			this.draw_frame();
		}
		
		
		
		let link = document.createElement("a");
		
		link.download = filename;
		
		link.href = this.canvas.toDataURL();
		
		link.click();
		
		link.remove();
	}
};