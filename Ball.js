var Ball = cc.Sprite.extend({
	width:20,
	height:20,
	speed:null,
	ctor:function()
	{
		this.initWithFile("images/ball.png");
		var random = Math.floor(Math.random()*2);
		if (random == 0)
			this.speed = new cc.Point(3,-3);
		else
			this.speed = new cc.Point(-3,-3);
	},
	update:function(dt)
	{
		this.setPosition(new cc.Point(this.getPositionX() + this.speed.x, 
									  this.getPositionY() + this.speed.y));
	},
	lateralCollision:function()
	{
		this.speed.x *= -1;
	},
	topBottomCollision:function()
	{
		this.speed.y *= -1;
	},
	changeSpeed:function(ammount)
	{
		if (this.speed.x < 5)
			this.speed.x += ammount.x;
		if (this.speed.y < 3)
			this.speed.y += ammount.y;
	}	
});