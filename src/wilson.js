let Wilson =
{
	canvas: null,
	
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
		
		this.canvas_width = this.canvas.getAttribute("width");
		this.canvas_height = this.canvas.getAttribute("height");
		
		
		
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
	}
};