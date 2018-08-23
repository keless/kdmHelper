"use strict"; //ES6

class GameplayStateView extends BaseStateView {
	constructor( model ) {
		super();
		this.pModel = model
		
		var screenSize = Graphics.ScreenSize

		var playerPanelHeight = 150
		
		var monsterView = new NodeView()
		//monsterView.setRect(924, 600, "#00FF00")
		monsterView.size.setVal(924, screenSize.y - playerPanelHeight)
		monsterView.pos.setVal(monsterView.size.x/2, monsterView.size.y/2) //874, 553
		this.rootView.addChild(monsterView)
		this.monsterView = monsterView
		
		this.deckViewAI = null
		this.deckViewHL = null
		this.discardDeckViewAI = null
		this.discardDeckViewHL = null
		
		this.modalView = null

		var BGNodeM = new NodeView()
		BGNodeM.setImageStretch("gfx/imgs/WLimgBG.png", monsterView.size.x, monsterView.size.y)
		//BGNodeM.pos.setVal(-(screenSize.x-874)/2, -(screenSize.y - 553)/2)
		this.monsterView.addChild(BGNodeM)
		

		var playerPanelView = new NodeView()
		//playerPanelView.setRect(monsterView.size.x, playerPanelHeight, "#FF00FF")
		playerPanelView.size.setVal(monsterView.size.x, playerPanelHeight)
		playerPanelView.pos.setVal(monsterView.pos.x, screenSize.y - (playerPanelHeight/2))
		this.rootView.addChild(playerPanelView)

		var BGNodeP1 = new NodeView()
		BGNodeP1.setImageStretch("gfx/imgs/PLimgOne.png", playerPanelView.size.x/4, 150)
		BGNodeP1.pos.setVal(-(playerPanelView.size.x * 3/8),0)
		playerPanelView.addChild(BGNodeP1)

		var BGNodeP2 = new NodeView()
		BGNodeP2.setImageStretch("gfx/imgs/PLimgTwo.png", playerPanelView.size.x/4, 150)
		BGNodeP2.pos.setVal(-(playerPanelView.size.x * 1/8),0)
		playerPanelView.addChild(BGNodeP2)

		var BGNodeP3 = new NodeView()
		BGNodeP3.setImageStretch("gfx/imgs/PLimgThree.png", playerPanelView.size.x/4, 150)
		BGNodeP3.pos.setVal((playerPanelView.size.x * 1/8),0)
		playerPanelView.addChild(BGNodeP3)

		var BGNodeP4 = new NodeView()
		BGNodeP4.setImageStretch("gfx/imgs/PLimgFour.png", playerPanelView.size.x/4, 150)
		BGNodeP4.pos.setVal((playerPanelView.size.x * 3/8),0)
		playerPanelView.addChild(BGNodeP4)


		var rightSidePanelView = new NodeView()
		rightSidePanelView.size.setVal( screenSize.x - monsterView.size.x, screenSize.y )
		rightSidePanelView.pos.setVal(screenSize.x - (rightSidePanelView.size.x/2), screenSize.y/2 )
		this.rootView.addChild(rightSidePanelView)

		var BGNodeRS = new NodeView()
		BGNodeRS.setImageStretch("gfx/imgs/REimgEX.png", rightSidePanelView.size.x, rightSidePanelView.size.y)
		rightSidePanelView.addChild(BGNodeRS)

		var deckAINode = new NodeView()
		deckAINode.setImageStretch("gfx/imgs/WLimgAIBack.png", 112, 177)
		deckAINode.pos.setVal(-396, 180) 
		this.monsterView.addChild(deckAINode)

		var discardAINode = new NodeView()
		discardAINode.setImageStretch("gfx/imgs/MimgLAAI.png", 112, 177)
		discardAINode.pos.setVal(deckAINode.pos.x + 112, 180)  //anchor to the right of deckAINode
		this.monsterView.addChild(discardAINode)

		var deckHitNode = new NodeView()
		deckHitNode.setImageStretch("gfx/imgs/WLimgHLBack.png", 112, 177)
		deckHitNode.pos.setVal(-396, 0) 
		this.monsterView.addChild(deckHitNode)

		var discardHitNode = new NodeView()
		discardHitNode.setImageStretch("gfx/imgs/MimgLAHL.png", 112, 177)
		discardHitNode.pos.setVal(deckHitNode.pos.x + 112, 0) //anchor to the right of deckHitNode
		this.monsterView.addChild(discardHitNode)

		var deckBasicInfoNode = new NodeView()
		deckBasicInfoNode.setImageStretch("gfx/imgs/WLimgBAInfo.png", 344, 177)
		deckBasicInfoNode.pos.setVal(-(this.monsterView.size.x - deckBasicInfoNode.size.x)/2 + 10, 
									 -(this.monsterView.size.y - deckBasicInfoNode.size.y)/2 + 8)
		this.monsterView.addChild(deckBasicInfoNode)

		var deckBasicActionNode = new NodeView()
		deckBasicActionNode.setImageStretch("gfx/imgs/WLimgBABasiActi.png", 112, 177)
		deckBasicActionNode.pos.setVal(-164, 0)
		this.monsterView.addChild(deckBasicActionNode)
		
		var deckWoundStackNode = new NodeView()
		deckWoundStackNode.setImageStretch("gfx/imgs/MimgLAWS.png", 112, 177)
		deckWoundStackNode.pos.setVal(-164, 180)
		this.monsterView.addChild(deckWoundStackNode)

		var col1X = -44, col2X = col1X + 115, col3X = col2X + 115

		var deckTraitMoodInjuryNode3 = new NodeView()
		deckTraitMoodInjuryNode3.setImageStretch("gfx/imgs/MimgTMI.png", 112, 177)
		deckTraitMoodInjuryNode3.pos.setVal(col3X, -180)
		this.monsterView.addChild(deckTraitMoodInjuryNode3)

		var deckTraitMoodInjuryNode9 = new NodeView()
		deckTraitMoodInjuryNode9.setImageStretch("gfx/imgs/MimgTMI.png", 112, 177)
		deckTraitMoodInjuryNode9.pos.setVal(col3X, 180)
		this.monsterView.addChild(deckTraitMoodInjuryNode9)

		var deckTraitMoodInjuryNode6 = new NodeView()
		deckTraitMoodInjuryNode6.setImageStretch("gfx/imgs/MimgTMI.png", 112, 177)
		deckTraitMoodInjuryNode6.pos.setVal(col3X, 0)
		this.monsterView.addChild(deckTraitMoodInjuryNode6)

		var deckTraitMoodInjuryNode2 = new NodeView()
		deckTraitMoodInjuryNode2.setImageStretch("gfx/imgs/MimgTMI.png", 112, 177)
		deckTraitMoodInjuryNode2.pos.setVal(col2X, -180)
		this.monsterView.addChild(deckTraitMoodInjuryNode2)

		var deckTraitMoodInjuryNode8 = new NodeView()
		deckTraitMoodInjuryNode8.setImageStretch("gfx/imgs/MimgTMI.png", 112, 177)
		deckTraitMoodInjuryNode8.pos.setVal(col2X, 180)
		this.monsterView.addChild(deckTraitMoodInjuryNode8)

		var deckTraitMoodInjuryNode5 = new NodeView()
		deckTraitMoodInjuryNode5.setImageStretch("gfx/imgs/MimgTMI.png", 112, 177)
		deckTraitMoodInjuryNode5.pos.setVal(col2X, 0)
		this.monsterView.addChild(deckTraitMoodInjuryNode5)

		var deckTraitMoodInjuryNode1 = new NodeView()
		deckTraitMoodInjuryNode1.setImageStretch("gfx/imgs/MimgTMI.png", 112, 177)
		deckTraitMoodInjuryNode1.pos.setVal(col1X, -180)
		this.monsterView.addChild(deckTraitMoodInjuryNode1)

		var deckTraitMoodInjuryNode7 = new NodeView()
		deckTraitMoodInjuryNode7.setImageStretch("gfx/imgs/MimgTMI.png", 112, 177)
		deckTraitMoodInjuryNode7.pos.setVal(col1X, 180)
		this.monsterView.addChild(deckTraitMoodInjuryNode7)

		var deckTraitMoodInjuryNode4 = new NodeView()
		deckTraitMoodInjuryNode4.setImageStretch("gfx/imgs/MimgTMI.png", 112, 177)
		deckTraitMoodInjuryNode4.pos.setVal(col1X, 0)
		this.monsterView.addChild(deckTraitMoodInjuryNode4)

		//TODO: differentiate back based on monster (lion/antelope/etc)  
		this.deckViewAI = new DeckView(this.pModel.deckAI, "gfx/imgs/WLimgAIBack.png")
		deckAINode.addChild(this.deckViewAI)

		this.discardDeckViewAI = new DeckView(this.pModel.deckAIDiscard, "gfx/imgs/WLimgAIBack.png")
		discardAINode.addChild(this.discardDeckViewAI)

		//TODO: differentiate back based on monster (lion/antelope/etc)  
		this.deckViewHL = new DeckView(this.pModel.deckHL, "gfx/imgs/WLimgHLBack.png")
		deckHitNode.addChild(this.deckViewHL)

		this.discardDeckViewHL = new DeckView(this.pModel.deckHLDiscard, "gfx/imgs/WLimgHLBack.png")
		discardHitNode.addChild(this.discardDeckViewHL)

		var self = this
		this.deckViewHL.setClick(()=>{
			EventBus.ui.dispatch("hlDeckClicked")
		})

		this.deckViewAI.setClick(()=>{
			EventBus.ui.dispatch("aiDeckClicked")
		})

		//draggable tokens
		var tokenY = -100
		for (var i=0; i<10; i++) {
			var tokenNode = this._makeTokenNode("#00CCAA")
			tokenNode.pos.setVal(0 + Math.random() * 20, tokenY + Math.random() * 20 )
			rightSidePanelView.addChild(tokenNode)
		}

		tokenY += 100
		for (var i=0; i<10; i++) {
			var tokenNode = this._makeTokenNode("#AACC00")
			tokenNode.pos.setVal(0 + Math.random() * 20, tokenY + Math.random() * 20 )
			rightSidePanelView.addChild(tokenNode)
		}
		
		tokenY += 100
		for (var i=0; i<10; i++) {
			var tokenNode = this._makeTokenNode("#AA00CC")
			tokenNode.pos.setVal(0 + Math.random() * 20, tokenY + Math.random() * 20 )
			rightSidePanelView.addChild(tokenNode)
		}

		this._addButton("btnInnovationTree", "I", (screenSize.x - 50), (screenSize.y - 150), "gfx/ui/btn_white_sm.sprite" )
		this._addButton("btnSettlementInfo", "S", (screenSize.x - 50), (screenSize.y - 100), "gfx/ui/btn_white_sm.sprite" )
		this._addButton("btnMainMenu", "M", (screenSize.x - 50), (screenSize.y - 50), "gfx/ui/btn_white_sm.sprite" )

		this.SetListener("btnInnovationTree", this.onBtnInnovationTree)
		this.SetListener("btnSettlementInfo", this.onBtnSettlementInfo)
		this.SetListener("btnMainMenu", this.onBtnMainMenu)
		this.SetListener("closeModalView", this.onBtnCloseSettlementInfo)
	}

	_makeTokenNode(color) {
		var tokenNode = new NodeView()
		tokenNode.setCircle(20, color)
		tokenNode.makeDraggable()
		return tokenNode
	}

	onBtnInnovationTree(e) {
		this.modalView = new InnovationTreeModalView( this.pModel.settlement )
		this.rootView.addChild(this.modalView)
	}

	onBtnSettlementInfo(e) {
		this.modalView = new SettlementInfoModalView( this.pModel.settlement )
		this.rootView.addChild(this.modalView)
	}

	onBtnMainMenu(e) {
		Service.Get("state").gotoState("menu");
	}

	onBtnCloseSettlementInfo(e) {
		this.modalView.removeFromParent(true)
		this.modalView = null
	}
	
}