var MenuLayer = cc.LayerColor.extend({
	init:function()
	{
		this._super(new cc.Color4B(0, 0, 0, 255));
		//var layer1 = cc.LayerColor.create(new cc.Color4B(0, 0, 0, 255), 600, 600);
		//this.initWithColor(new cc.Color4B(0, 0, 0, 255));
		var size = cc.Director.getInstance().getWinSize();
		
		var menuItem1 = new cc.MenuItemFont.create("Jogar", this.play, this);
		var menuItem2 = new cc.MenuItemFont.create("Sair", this.quit, this);
		
		menuItem1.setPosition(new cc.Point(size.width/2, size.height/2 + 50));
		menuItem2.setPosition(new cc.Point(size.width/2, size.height/2));
		
		var menu = cc.Menu.create(menuItem1, menuItem2);
		menu.setPosition(new cc.Point(0,0));
		
		this.addChild(menu);
		
		return this;
	},
	play:function()
	{
        cc.Director.getInstance().replaceScene(new GameScene());
	},
	quit:function()
	{
		document.location.href = "http://google.com.br";
	}
});

var MenuScene = cc.Scene.extend({
    onEnter:function(){
        this._super();
        var layer = new MenuLayer();
        layer.init();
        this.addChild(layer);
    }
});