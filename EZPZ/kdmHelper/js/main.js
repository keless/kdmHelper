"use strict"; //ES6

var bShowDebug = false;

class Config {
	static get areSpritesCentered() {
		return true;
	}
	static get isFullScreenApp() {
		return true;
	}
}

var game_create = function()
{
	var app = new Application("kdmHelper", "content");
	window.app = app;
	
	var RP = Service.Get("rp")
  	RP.baseURL = "kdmHelper/"

	var stateController = Service.Get("state");
	stateController.addState("loading", LoadingState);
	stateController.addState("menu", MenuState);
	stateController.addState("newgame", NewGameState);
	stateController.addState("gameplay", GameplayState);
	
	var resources = [
			"gfx/ui/btn_blue.sprite",
			"gfx/ui/btn_dark.sprite",
			"gfx/ui/btn_white.sprite",
			"gfx/ui/btn_white_sm.sprite",
			"gfx/imgs/WLimgAIBack.png",
			"gfx/imgs/WLimgBABasiActi.png",
			"gfx/imgs/WLimgHLBack.png",
			"gfx/imgs/WLimgBG.png",
			"gfx/imgs/WLimgREBack.png",
			"gfx/imgs/MimgLAAI.png",
			"gfx/imgs/MimgLAHL.png",
			"gfx/imgs/WLimgBAInfo.png",
			"gfx/imgs/PLimgOne.png",
			"gfx/imgs/PLimgTwo.png",
			"gfx/imgs/PLimgThree.png",
			"gfx/imgs/PLimgFour.png",
			"gfx/imgs/MimgTMI.png",
			"gfx/imgs/REimgEX.png",
			"gfx/imgs/MimgLAWS.png"
			];
	stateController.gotoState("loading", [resources, "gameplay", ["test", "lion", 0]]);
	
	app.Play();
};
