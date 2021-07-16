let Wilson =
{
	canvas: null,
	
	ctx: null,
	
	img_data: null,
	
	canvas_width: null,
	canvas_height: null,
	
	world_width: -1,
	world_height: -1,
	
	world_center_x: -1,
	world_center_y: -1,
	
	
	
	//Sets up a canvas to work with Wilson.
	/*
		options:
		{
			world_width, world_height: 
			world_center_x, world_center_y:
		}
	*/
	
	init: function(canvas, options)
	{
		this.canvas = canvas;
		
		this.ctx = this.canvas.getContext("2d");
		
		this.canvas_width = parseInt(this.canvas.getAttribute("width"));
		this.canvas_height = parseInt(this.canvas.getAttribute("height"));
		
		this.img_data = this.ctx.getImageData(0, 0, this.canvas_width, this.canvas_height);
		
		
		
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
	},
	
	
	
	//Contains utility functions for switching between canvas and world coordinates.
	Interpolate:
	{
		canvas_to_world: function(row, col)
		{
			return [(col / Wilson.canvas_width - .5) * Wilson.world_width + Wilson.world_center_x, (.5 - row / Wilson.canvas_height) * Wilson.world_height + Wilson.world_center_y];
		},
		
		world_to_canvas: function(x, y)
		{
			return [Math.floor((.5 - (y - Wilson.world_center_y) / Wilson.world_height) * Wilson.canvas_height), Math.floor(((x - Wilson.world_center_x) / Wilson.world_width + .5) * Wilson.canvas_width)];
		}
	},
	
	
	
	//A utility function for converting from HSV to RGB. Accepts hsv in [0, 1] and returns rgb in [0, 255], unrounded.
	hsv_to_rgb: function(h, s, v)
	{
		function f(n)
		{
			let k = (n + 6*h) % 6;
			return v - v * s * Math.max(0, Math.min(k, Math.min(4 - k, 1)));
		}
		
		return [255 * f(5), 255 * f(3), 255 * f(1)];
	},
	
	
	
	draw_frame: null,
	
	//Draws an entire frame to a cpu canvas by directly modifying the canvas data. Tends to be significantly faster than looping fillRect, **when the whole canvas needs to be updated**. If that's not the case, sticking to fillRect is generally a better idea. Here, image is a width*height array, where each element is a length-3 array of the form [r, g, b].
	draw_frame_cpu: function(image)
	{
		const width = this.canvas_width;
		const height = this.canvas_height;
		
		let img_data = this.ctx.getImageData(0, 0, width, height);
		let data = img_data.data;
		
		for (let i = 0; i < height; i++)
		{
			for (let j = 0; j < width; j++)
			{
				//The index in the array of rgba values
				let index = (4 * i * width) + (4 * j);
				
				data[index] = image[i][j][0];
				data[index + 1] = image[i][j][1];
				data[index + 2] = image[i][j][2];
			}
		}
		
		this.ctx.putImageData(img_data, 0, 0);
	}
};