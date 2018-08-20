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
		deckAINode.pos.setVal(-453, -112)
		this.monsterView.addChild(deckAINode)

		var discardAINode = new NodeView()
		discardAINode.setImageStretch("gfx/imgs/MimgLAAI.png", 0,0, 112, 177)
		discardAINode.pos.setVal(-340, -112)
		this.monsterView.addChild(discardAINode)

		var deckHitNode = new NodeView()
		deckHitNode.setImageStretch("gfx/imgs/WLimgHLBack.png", 0,0, 112, 177)
		deckHitNode.pos.setVal(-453, 69)
		this.monsterView.addChild(deckHitNode)

		var discardHitNode = new NodeView()
		discardHitNode.setImageStretch("gfx/imgs/MingLAHL.png", 0,0, 112, 177)
		discardHitNode.pos.setVal(-340, 69)
		this.monsterView.addChild(discardHitNode)

		var deckBasicActionNode = new NodeView()
		deckBasicActionNode.setImageStretch("gfx/imgs/WLimgBABasiActi.png", 0,0, 112, 177)
		deckBasicActionNode.pos.setVal(292, 69)
		this.monsterView.addChild(deckBasicActionNode)
		
		var deckBasicInfoNode = new NodeView()
		deckBasicInfoNode.setImageStretch("gfx/imgs/WLimgBAInfo.png", 0,0, 112, 177)
		deckBasicInfoNode.pos.setVal(292, -293)
		this.monsterView.addChild(deckBasicInfoNode)

		var cardTraitMoodInjuryNode3 = new NodeView()
		cardTraitMoodInjuryNode3.setImageStretch("gfx/imgs/MimgTMI.png", 0,0, 112, 177)
		cardTraitMoodInjuryNode3.pos.setVal(140, -293)
		this.monsterView.addChild(cardTraitMoodInjuryNode3)

		var cardTraitMoodInjuryNode9 = new NodeView()
		cardTraitMoodInjuryNode9.setImageStretch("gfx/imgs/MimgTMI.png", 0,0, 112, 177)
		cardTraitMoodInjuryNode9.pos.setVal(140, 69)
		this.monsterView.addChild(cardTraitMoodInjuryNode9)

		var cardTraitMoodInjuryNode6 = new NodeView()
		cardTraitMoodInjuryNode6.setImageStretch("gfx/imgs/MimgTMI.png", 0,0, 112, 177)
		cardTraitMoodInjuryNode6.pos.setVal(140, -112)
		this.monsterView.addChild(cardTraitMoodInjuryNode6)

		var cardTraitMoodInjuryNode2 = new NodeView()
		cardTraitMoodInjuryNode2.setImageStretch("gfx/imgs/MimgTMI.png", 0,0, 112, 177)
		cardTraitMoodInjuryNode2.pos.setVal(27, -293)
		this.monsterView.addChild(cardTraitMoodInjuryNode2)

		var cardTraitMoodInjuryNode8 = new NodeView()
		cardTraitMoodInjuryNode8.setImageStretch("gfx/imgs/MimgTMI.png", 0,0, 112, 177)
		cardTraitMoodInjuryNode8.pos.setVal(27, 69)
		this.monsterView.addChild(cardTraitMoodInjuryNode8)

		var cardTraitMoodInjuryNode5 = new NodeView()
		cardTraitMoodInjuryNode5.setImageStretch("gfx/imgs/MimgTMI.png", 0,0, 112, 177)
		cardTraitMoodInjuryNode5.pos.setVal(27, -112)
		this.monsterView.addChild(cardTraitMoodInjuryNode5)

		var cardTraitMoodInjuryNode1 = new NodeView()
		cardTraitMoodInjuryNode1.setImageStretch("gfx/imgs/MimgTMI.png", 0,0, 112, 177)
		cardTraitMoodInjuryNode1.pos.setVal(-86, -293)
		this.monsterView.addChild(cardTraitMoodInjuryNode1)

		var cardTraitMoodInjuryNode7 = new NodeView()
		cardTraitMoodInjuryNode7.setImageStretch("gfx/imgs/MimgTMI.png", 0,0, 112, 177)
		cardTraitMoodInjuryNode7.pos.setVal(-86, 69)
		this.monsterView.addChild(cardTraitMoodInjuryNode7)

		var cardTraitMoodInjuryNode4 = new NodeView()
		cardTraitMoodInjuryNode4.setImageStretch("gfx/imgs/MimgTMI.png", 0,0, 112, 177)
		cardTraitMoodInjuryNode4.pos.setVal(-86, -112)
		this.monsterView.addChild(cardTraitMoodInjuryNode4)

		//var RP = Service.Get("rp")
		/*
		this.btnNav = new ButtonView("btnNav", "gfx/ui/btn_blue.sprite", "Oh.. HELLO", "14px Arial", "#FFFF00");
		this.btnNav.pos.setVal(500, 50)
		this.rootView.addChild(this.btnNav)
		*/

	}

	
}