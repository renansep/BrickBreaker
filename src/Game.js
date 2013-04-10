var GameLayer = cc.Layer.extend({
	width:null,
	height:null,
	bricks:[],
	paddle:null,
	ball:null,
	layer1:null,
	currentLevel:null,
	init:function()
	{
		this._super();
		this.width = cc.Director.getInstance().getWinSize().width;
		this.height = cc.Director.getInstance().getWinSize().height;
		this.layer1 = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 255), this.width, this.height);
		this.setKeyboardEnabled(true);
		this.schedule(this.update);
		
		this.currentLevel = 1;
		this.loadLevel();
		
		//Menu
		var menuItem1 = new cc.MenuItemFont.create("Menu", this.back, this);
		menuItem1.setPosition(new cc.Point(this.width - menuItem1.getContentSize().width / 2,
										   menuItem1.getContentSize().height / 2));
		var menu = cc.Menu.create(menuItem1);
		menu.setPosition(new cc.Point(0,0));
		this.layer1.addChild(menu);
		
		//Bricks
		
		
		//Paddle
		this.paddle = new Paddle();
		this.paddle.setPosition(new cc.Point(this.width / 2, 100));
		this.paddle.scheduleUpdate();
		this.layer1.addChild(this.paddle);
		
		//Ball
		this.ball = new Ball();
		var random = Math.floor(Math.random()*(this.width - this.ball.width));
		this.ball.setPosition(new cc.Point(random + this.ball.width/2, this.height/2 + this.height / 12));
		this.ball.scheduleUpdate();
		this.layer1.addChild(this.ball);
		
		this.addChild(this.layer1);
		
		return this;
	},
	back:function()
	{
		cc.Director.getInstance().replaceScene(new MenuScene());
	},
	update:function(dt)
	{
		var collisionBallPaddle = checkCollisionSprite(this.ball, this.paddle);
		if (collisionBallPaddle == "right" || collisionBallPaddle == "left")
			this.ball.lateralCollision();
		else if (collisionBallPaddle == "top" || collisionBallPaddle == "bottom")
		{
			this.ball.topBottomCollision();
			if (this.ball.getPositionX() <= this.paddle.getPositionX() - this.paddle.width/4)
				this.ball.changeSpeed(new cc.Point(-1, 0));
			else if (this.ball.getPositionX() >= this.paddle.getPositionX() + this.paddle.width/4)
				this.ball.changeSpeed(new cc.Point(1, 0));
		}
			
		for(var i=0; i<this.bricks.length; i++)
		{
			var collisionBallBrick = checkCollisionSprite(this.ball, this.bricks[i]);
			if (collisionBallBrick == "right" || collisionBallBrick == "left")
				this.ball.lateralCollision();
			else if (collisionBallBrick == "top" || collisionBallBrick == "bottom")
				this.ball.topBottomCollision();
			if (collisionBallBrick != null) 
			{
				this.layer1.removeChild(this.bricks[i]);
				this.bricks[i] = null;
			}
		}
		
		//colisão paddle layer
		var collisionPaddleLayer = checkCollisionLayer(this.paddle, this);
		
		//colisão ball layer	
		var collisionBallLayer = checkCollisionLayer(this.ball, this);
		if (collisionBallLayer == "right" || collisionBallLayer == "left")
			this.ball.lateralCollision();
		else if (collisionBallLayer == "top")
			this.ball.topBottomCollision();
		
		//verifica fim de jogo
		if (collisionBallLayer == "bottom")
			cc.Director.getInstance().replaceScene(new MenuScene());		
		var cont = 0;
		for (var i=0; i<this.bricks.length; i++)
			if (this.bricks[i] == null)
				cont++;
		if (cont == this.bricks.length || this.ball.getPositionY() < 0)
			cc.Director.getInstance().replaceScene(new MenuScene());
			
	},
	onKeyDown:function(e)
	{
		this.paddle.onKeyDown(e);
	},
	onKeyUp:function(e)
	{
		this.paddle.onKeyUp(e);
	},
	loadLevel:function()
	{
		var matrix = Level(this.currentLevel);
		var index = 0;
		//Load and show the bricks
		for (var i=0; i<matrix.length; i++)
		{
			for (var j=0; j<matrix[i].length; j++)
			{
				if (matrix[i][j] == 1)
				{
					this.bricks[index] = new Brick(null);
					this.bricks[index].setPosition(new cc.Point
					(
						j*this.bricks[index].width + this.bricks[index].width/2, 
						this.height - i*this.bricks[index].height - this.bricks[index].height/2)
					);
					this.layer1.addChild(this.bricks[index]);
					index++;
				}
			}
		}
	}
});

var GameScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild(layer);
    }
});