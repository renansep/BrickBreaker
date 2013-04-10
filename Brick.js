var Brick = cc.Sprite.extend({
	width:50,
	height:25,
	ctor:function(color)
	{
		if (color != null)
			this.initWithFile("images/brick_" + color + ".png");
		else
		{
			var random = Math.floor(Math.random()*4);
			if (random == 0)
				this.initWithFile("images/brick_red.png");
			else if (random == 1)
				this.initWithFile("images/brick_yellow.png");
			else if (random == 2)
				this.initWithFile("images/brick_green.png");
			else
				this.initWithFile("images/brick_blue.png");
		}
	}
});