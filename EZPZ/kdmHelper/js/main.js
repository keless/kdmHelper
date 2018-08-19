"use strict"; //ES6

var bShowDebug = false;

class Config {
	static get areSpritesCentered() {
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
	stateController.addState("gameplay", GameplayState);
	
	var resources = [
			"gfx/ui/btn_blue.sprite",
			"gfx/ui/btn_dark.sprite",
			"gfx/ui/btn_white.sprite",
			"gfx/ui/btn_white_sm.sprite",
			"gfx/imgs/WLimgAIBack.png",
			"gfx/imgs/WLimgBABasiActi.png",
			"gfx/imgs/WLimgHLBack.png"
			];
	stateController.gotoState("loading", [resources, "gameplay"]);
	
	app.Play();
};
