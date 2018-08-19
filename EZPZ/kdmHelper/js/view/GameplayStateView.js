"use strict"; //ES6

class GameplayStateView extends BaseStateView {
	constructor( model ) {
		super();
		this.pModel = model
		
		var screenSize = Graphics.ScreenSize


		var monsterView = new NodeView()
		monsterView.setRect(924, 600, "#DDDDDD")
		monsterView.pos.setVal(462, 300)
		this.rootView.addChild(monsterView)
		this.rootView.addChild(monsterView)
		this.monsterView = monsterView



		var deckAINode = new NodeView()
		deckAINode.setImageStretch("gfx/imgs/WLimgAIBack.png", 0,0, 120, 200)
		deckAINode.pos.setVal(-340, -100)
		this.monsterView.addChild(deckAINode)

		var discardAINode = new NodeView()
		discardAINode.setImageStretch("gfx/imgs/WLimgAIBack.png", 0,0, 200, 120)
		discardAINode.pos.setVal(-340, 100)
		this.monsterView.addChild(discardAINode)

		var deckHitNode = new NodeView()
		deckHitNode.setImageStretch("gfx/imgs/WLimgHLBack.png", 0,0, 120, 200)
		deckHitNode.pos.setVal(-140, -100)
		this.monsterView.addChild(deckHitNode)

		var deckBasicActionNode = new NodeView()
		deckBasicActionNode.setImageStretch("gfx/imgs/WLimgBABasiActi.png", 0,0, 120, 200)
		deckBasicActionNode.pos.setVal(-40, -100)
		this.monsterView.addChild(deckBasicActionNode)

		//var RP = Service.Get("rp")
		/*
		this.btnNav = new ButtonView("btnNav", "gfx/ui/btn_blue.sprite", "Oh.. HELLO", "14px Arial", "#FFFF00");
		this.btnNav.pos.setVal(500, 50)
		this.rootView.addChild(this.btnNav)
		*/

	}

	
}