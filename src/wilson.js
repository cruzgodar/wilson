class Wilson
{
	render_type = null; //0: cpu, 1: hybrid, 2: gpu
	
	canvas = null;
	
	ctx = null;
	gl = null;
	
	last_image = null;
	
	img_data = null;
	
	shader_program = null;
	texture = null;
	uniforms = {};
	
	canvas_width = null;
	canvas_height = null;
	
	world_width = -1;
	world_height = -1;
	
	world_center_x = -1;
	world_center_y = -1;
	
	draw_frame = null;
	
	
	
	//Contains utility functions for switching between canvas and world coordinates.
	interpolate =
	{
		canvas_to_world(row, col)
		{
			return [(col / this.parent.canvas_width - .5) * this.parent.world_width + this.parent.world_center_x, (.5 - row / this.parent.canvas_height) * this.parent.world_height + this.parent.world_center_y];
		},
		
		world_to_canvas(x, y)
		{
			return [Math.floor((.5 - (y - this.parent.world_center_y) / this.parent.world_height) * this.parent.canvas_height), Math.floor(((x - this.parent.world_center_x) / this.parent.world_width + .5) * this.parent.canvas_width)];
		}
	};
	
	
	
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
	
	
	
	/*
		options:
		{
			world_width, world_height: 
			world_center_x, world_center_y:
			
			renderer: "cpu", "gpu", "hybrid"
		}
	*/
	
	constructor(canvas, options)
	{
		this.canvas = canvas;
		
		this.canvas_width = parseInt(this.canvas.getAttribute("width"));
		this.canvas_height = parseInt(this.canvas.getAttribute("height"));
		
		
		
		this.interpolate.parent = this;
		
		
		
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
			this.render_type = 1;
		}
		
		else if (options.renderer === "cpu")
		{
			this.render_type = 0;
		}
		
		else
		{
			this.render_type = 2;
		}
		
		
		if (this.render_type === 0)
		{
			this.ctx = this.canvas.getContext("2d");
			
			this.img_data = this.ctx.getImageData(0, 0, this.canvas_width, this.canvas_height);
			
			this.draw_frame = this.draw_frame_cpu;
		}
		
		else if (this.render_type === 1)
		{
			this.init_webgl_hybrid();
			
			this.draw_frame = this.draw_frame_hybrid;
		}
		
		else
		{
			try {this.init_webgl_gpu(options.shader);}
			catch(ex) {console.error("[Wilson] Error loading shader")}
			
			this.draw_frame = this.draw_frame_gpu;
		}
	}
	
	
	
	//Draws an entire frame to a cpu canvas by directly modifying the canvas data. Tends to be significantly faster than looping fillRect, **when the whole canvas needs to be updated**. If that's not the case, sticking to fillRect is generally a better idea. Here, image is a width * height * 4 Uint8ClampedArray, with each sequence of 4 elements corresponding to rgba values.
	draw_frame_cpu(image)
	{
		const width = this.canvas_width;
		const height = this.canvas_height;
		
		this.ctx.putImageData(new ImageData(image, width, height), 0, 0);
	}
	
	
	
	//Draws an entire frame to the canvas by converting the frame to a WebGL texture and displaying that. In some cases, this can slightly increase drawing performance, and some browsers can also handle larger WebGL canvases than cpu ones (e.g. iOS Safari). For these reasons, it's recommended to default to this rendering method unless there is a specific reason to avoid WebGL.
	draw_frame_hybrid(image)
	{
		this.last_image = image;
		
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.canvas_width, this.canvas_height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
		
		this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
	}
	
	
	
	draw_frame_gpu()
	{
		this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
	}
	
	
	
	//Gets WebGL started for the canvas.
	init_webgl_hybrid()
	{
		this.gl = this.canvas.getContext("webgl");
		
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
		
		
		
		let vertex_shader = load_shader(this.gl, this.gl.VERTEX_SHADER, vertex_shader_source);
		
		let frag_shader = load_shader(this.gl, this.gl.FRAGMENT_SHADER, frag_shader_source);
		
		this.shader_program = this.gl.createProgram();
		
		this.gl.attachShader(this.shader_program, vertex_shader);
		this.gl.attachShader(this.shader_program, frag_shader);
		this.gl.linkProgram(this.shader_program);
		
		if (!this.gl.getProgramParameter(this.shader_program, this.gl.LINK_STATUS))
		{
			console.error(`[Wilson] Couldn't link shader program: ${this.gl.getShaderInfoLog(shader)}`);
			gl.deleteProgram(this.shader_program);
		}
		
		this.gl.useProgram(this.shader_program);
		
		let position_buffer = this.gl.createBuffer();
		
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, position_buffer);
		
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(quad), this.gl.STATIC_DRAW);
		
		this.shader_program.position_attribute = this.gl.getAttribLocation(this.shader_program, "position");
		
		this.gl.enableVertexAttribArray(this.shader_program.position_attribute);
		
		this.gl.vertexAttribPointer(this.shader_program.position_attribute, 3, this.gl.FLOAT, false, 0, 0);
		
		this.gl.viewport(0, 0, this.canvas_width, this.canvas_height);
		
		
		
		this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, 1);
		this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, 1);
		
		this.texture = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
		
		
		
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
		let tex_loc = this.gl.getUniformLocation(this.shader_program, "u_texture");
		
		this.gl.uniform1i(this.tex_loc, 1);
		
		
		
		//Turn off mipmapping, since in general we won't have power of two canvases.
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
		
		this.gl.disable(this.gl.DEPTH_TEST);
		
		
		
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
	}
	
	
	
	//Gets WebGL started for the canvas.
	init_webgl_gpu(frag_shader_source)
	{
		this.gl = this.canvas.getContext("webgl");
		
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
		
		
		
		let vertex_shader = load_shader(this.gl, this.gl.VERTEX_SHADER, vertex_shader_source);
		
		let frag_shader = load_shader(this.gl, this.gl.FRAGMENT_SHADER, frag_shader_source);
		
		this.shader_program = this.gl.createProgram();
		
		this.gl.attachShader(this.shader_program, vertex_shader);
		this.gl.attachShader(this.shader_program, frag_shader);
		this.gl.linkProgram(this.shader_program);
		
		if (!this.gl.getProgramParameter(this.shader_program, this.gl.LINK_STATUS))
		{
			console.log(`[Wilson] Couldn't link shader program: ${this.gl.getShaderInfoLog(shader)}`);
			gl.deleteProgram(this.shader_program);
		}
		
		this.gl.useProgram(this.shader_program);
		
		let position_buffer = this.gl.createBuffer();
		
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, position_buffer);
		
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(quad), this.gl.STATIC_DRAW);
		
		this.shader_program.position_attribute = this.gl.getAttribLocation(this.shader_program, "position");
		
		this.gl.enableVertexAttribArray(this.shader_program.position_attribute);
		
		this.gl.vertexAttribPointer(this.shader_program.position_attribute, 3, this.gl.FLOAT, false, 0, 0);
		
		this.gl.viewport(0, 0, this.canvas_width, this.canvas_height);
		
		
		
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
	}
	
	
	
	//Initializes all of the uniforms for a gpu canvas. Takes in an array of variable names as strings (that match the uniforms in the fragment shader), and stores the locations in Wilson.uniforms.
	init_uniforms(variable_names)
	{
		for (let i = 0; i < variable_names.length; i++)
		{
			this.uniforms[variable_names[i]] = this.gl.getUniformLocation(this.shader_program, variable_names[i]);
		}
	}
	
	
	
	//Resizes the canvas.
	resize(width, height)
	{
		this.canvas_width = width;
		this.canvas_height = height;
		
		this.canvas.setAttribute("width", width);
		this.canvas.setAttribute("height", height);
		
		if (this.render_type !== 0)
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