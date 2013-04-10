var Paddle = cc.Sprite.extend({
	width:100,
	height:25,
	speed:0,
	ctor:function()
	{
		this.initWithFile("images/paddle.png");
	},
	update:function(dt)
	{
		this.setPosition(new cc.Point(this.getPositionX() + this.speed, this.getPositionY()));
	},
	onKeyDown:function(e)
	{
		if (e == cc.KEY.left)
			this.speed = -5;
		else if (e == cc.KEY.right)
			this.speed = 5;
	},
	onKeyUp:function(e)
	{
		if ((e == cc.KEY.left && this.speed == -5) || (e == cc.KEY.right && this.speed == 5))
			this.speed = 0;
	}
});