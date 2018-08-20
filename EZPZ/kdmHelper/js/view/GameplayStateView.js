"use strict"; //ES6

class GameplayStateView extends BaseStateView {
	constructor( model ) {
		super();
		this.pModel = model
		
		var screenSize = Graphics.ScreenSize

		
		var monsterView = new NodeView()
		monsterView.pos.setVal(462, 300)
		this.rootView.addChild(monsterView)
		this.monsterView = monsterView
		
		

		var BGNodeM = new NodeView()
		BGNodeM.setImageStretch("gfx/imgs/WLimgBG.png", 0, 0, 874, 553)
		BGNodeM.pos.setVal(-462, -300)
		this.monsterView.addChild(BGNodeM)
		
		var BGNodeP1 = new NodeView()
		BGNodeP1.setImageStretch("gfx/imgs/PLimgOne.png", 0, 0, 220, 150)
		BGNodeP1.pos.setVal(-462, 253)
		this.monsterView.addChild(BGNodeP1)

		var BGNodeP2 = new NodeView()
		BGNodeP2.setImageStretch("gfx/imgs/PLimgTwo.png", 0, 0, 218, 150)
		BGNodeP2.pos.setVal(-242, 253)
		this.monsterView.addChild(BGNodeP2)

		var BGNodeP3 = new NodeView()
		BGNodeP3.setImageStretch("gfx/imgs/PLimgThree.png", 0, 0, 218, 150)
		BGNodeP3.pos.setVal(-24, 253)
		this.monsterView.addChild(BGNodeP3)

		var BGNodeP4 = new NodeView()
		BGNodeP4.setImageStretch("gfx/imgs/PLimgFour.png", 0, 0, 218, 150)
		BGNodeP4.pos.setVal(194, 253)
		this.monsterView.addChild(BGNodeP4)

		var BGNodeRS = new NodeView()
		BGNodeRS.setImageStretch("gfx/imgs/REimgEX.png", 0, 0, 150, 703)
		BGNodeRS.pos.setVal(412, -300)
		this.monsterView.addChild(BGNodeRS)
		
		var deckAINode = new NodeView()
		deckAINode.setImageStretch("gfx/imgs/WLimgAIBack.png", 0,0, 112, 177)
		deckAINode.pos.setVal(-453, 69) 
		this.monsterView.addChild(deckAINode)

		var discardAINode = new NodeView()
		discardAINode.setImageStretch("gfx/imgs/MimgLAAI.png", 0,0, 112, 177)
		discardAINode.pos.setVal(-340, 69) 
		this.monsterView.addChild(discardAINode)

		var deckHitNode = new NodeView()
		deckHitNode.setImageStretch("gfx/imgs/WLimgHLBack.png", 0,0, 112, 177)
		deckHitNode.pos.setVal(-453, -112) 
		this.monsterView.addChild(deckHitNode)

		var discardHitNode = new NodeView()
		discardHitNode.setImageStretch("gfx/imgs/MimgLAHL.png", 0,0, 112, 177)
		discardHitNode.pos.setVal(-340, -112) 
		this.monsterView.addChild(discardHitNode)

		var deckBasicActionNode = new NodeView()
		deckBasicActionNode.setImageStretch("gfx/imgs/WLimgBABasiActi.png", 0,0, 112, 177)
		deckBasicActionNode.pos.setVal(-217, -112)
		this.monsterView.addChild(deckBasicActionNode)
		
		var deckBasicInfoNode = new NodeView()
		deckBasicInfoNode.setImageStretch("gfx/imgs/WLimgBAInfo.png", 0,0, 348, 177)
		deckBasicInfoNode.pos.setVal(-453, -293)
		this.monsterView.addChild(deckBasicInfoNode)

		var deckWoundStackNode = new NodeView()
		deckWoundStackNode.setImageStretch("gfx/imgs/MimgLAWS.png", 0,0, 112, 177)
		deckWoundStackNode.pos.setVal(-217, 69)
		this.monsterView.addChild(deckWoundStackNode)

		var deckTraitMoodInjuryNode3 = new NodeView()
		deckTraitMoodInjuryNode3.setImageStretch("gfx/imgs/MimgTMI.png", 0,0, 112, 177)
		deckTraitMoodInjuryNode3.pos.setVal(132, -293)
		this.monsterView.addChild(deckTraitMoodInjuryNode3)

		var deckTraitMoodInjuryNode9 = new NodeView()
		deckTraitMoodInjuryNode9.setImageStretch("gfx/imgs/MimgTMI.png", 0,0, 112, 177)
		deckTraitMoodInjuryNode9.pos.setVal(132, 69)
		this.monsterView.addChild(deckTraitMoodInjuryNode9)

		var deckTraitMoodInjuryNode6 = new NodeView()
		deckTraitMoodInjuryNode6.setImageStretch("gfx/imgs/MimgTMI.png", 0,0, 112, 177)
		deckTraitMoodInjuryNode6.pos.setVal(132, -112)
		this.monsterView.addChild(deckTraitMoodInjuryNode6)

		var deckTraitMoodInjuryNode2 = new NodeView()
		deckTraitMoodInjuryNode2.setImageStretch("gfx/imgs/MimgTMI.png", 0,0, 112, 177)
		deckTraitMoodInjuryNode2.pos.setVal(19, -293)
		this.monsterView.addChild(deckTraitMoodInjuryNode2)

		var deckTraitMoodInjuryNode8 = new NodeView()
		deckTraitMoodInjuryNode8.setImageStretch("gfx/imgs/MimgTMI.png", 0,0, 112, 177)
		deckTraitMoodInjuryNode8.pos.setVal(19, 69)
		this.monsterView.addChild(deckTraitMoodInjuryNode8)

		var deckTraitMoodInjuryNode5 = new NodeView()
		deckTraitMoodInjuryNode5.setImageStretch("gfx/imgs/MimgTMI.png", 0,0, 112, 177)
		deckTraitMoodInjuryNode5.pos.setVal(19, -112)
		this.monsterView.addChild(deckTraitMoodInjuryNode5)

		var deckTraitMoodInjuryNode1 = new NodeView()
		deckTraitMoodInjuryNode1.setImageStretch("gfx/imgs/MimgTMI.png", 0,0, 112, 177)
		deckTraitMoodInjuryNode1.pos.setVal(-94, -293)
		this.monsterView.addChild(deckTraitMoodInjuryNode1)

		var deckTraitMoodInjuryNode7 = new NodeView()
		deckTraitMoodInjuryNode7.setImageStretch("gfx/imgs/MimgTMI.png", 0,0, 112, 177)
		deckTraitMoodInjuryNode7.pos.setVal(-94, 69)
		this.monsterView.addChild(deckTraitMoodInjuryNode7)

		var deckTraitMoodInjuryNode4 = new NodeView()
		deckTraitMoodInjuryNode4.setImageStretch("gfx/imgs/MimgTMI.png", 0,0, 112, 177)
		deckTraitMoodInjuryNode4.pos.setVal(-94, -112)
		this.monsterView.addChild(deckTraitMoodInjuryNode4)

		//var RP = Service.Get("rp")
		/*
		this.btnNav = new ButtonView("btnNav", "gfx/ui/btn_blue.sprite", "Oh.. HELLO", "14px Arial", "#FFFF00");
		this.btnNav.pos.setVal(500, 50)
		this.rootView.addChild(this.btnNav)
		*/

	}

	
}