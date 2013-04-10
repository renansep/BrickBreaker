var cocos2dApp = cc.Application.extend({
    config:document.ccConfig,
    ctor:function (scene) {
        this._super();
        this.startScene = scene;
        cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
        cc.setup(this.config['tag']);
        cc.Loader.getInstance().onloading = function () {
            cc.LoaderScene.shareLoaderScene().draw();
        };
        cc.Loader.getInstance().onload = function () {
            cc.AppController.shareAppController().didFinishLaunchingWithOptions();
        };
		//cc.AudioEngine.getInstance().init("mp3,ogg,wav");
        cc.Loader.getInstance().preload([]);
    },
    applicationDidFinishLaunching:function () {
        var director = cc.Director.getInstance();
        director.setDisplayStats(this.config['showFPS']);
        director.setAnimationInterval(1.0 / this.config['frameRate']);
        director.runWithScene(new this.startScene());

        return true;
    }
});
var myApp = new cocos2dApp(MenuScene);