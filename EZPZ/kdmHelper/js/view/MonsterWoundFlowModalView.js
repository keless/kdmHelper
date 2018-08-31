class MonsterWoundFlowModalView extends ModalView {
  constructor(battleStateModel) {
    super(750, 600, "rgba(0,0,0, 0.0)")

    this.monsterName = battleStateModel.monsterName
    this.monsterLevel = battleStateModel.monsterLevel
    this.pBattleStateModel = battleStateModel

    this.subState = MWF_STATE.INIT
    this.modalView = null

    this.gotoSubstate(MWF_STATE.ASK_NUM_HITS)
  }

  // flow controller code
  gotoSubstate(substate, params) {
    switch(substate) {
      case MWF_STATE.ASK_NUM_HITS: {
        this._setModal( new MWF_AskNumHits( this ) )
      }break;
      case MWF_STATE.TRAP_HAPPENED: {
        this._setModal( new ResolveMonsterTrapModalView(this, params[0] ))
      }break;
      case MWF_STATE.SELECT_ORDER: {
        this._setModal( new MWF_OrderHits(this, params[0], params[1]) )
      }break;
      case MWF_STATE.RESOLVE_HITS: {
        this._setModal( new ResolveMonsterWoundModalView(this, params[0]) )
      }
    }
  }

  onAskNumHitsComplete( drawnCards, cardViews, trapDrawn ) {
    //detatch from root
    for (var cv of cardViews) {
      cv.removeFromParent( trapDrawn ) // send false here if !trap because we want to keep them alive to attach to a new parent
    }

    this._clearModal()

    console.log("onAskNumHitsComplete - got " + drawnCards.length + " cards")

    if (trapDrawn) {
      console.log(" -- TRAP!! --")
      //2) if trap card, goto: TRAP_HAPPENED
      this.gotoSubstate(MWF_STATE.TRAP_HAPPENED, [drawnCards])
    } else {
      console.log("select order screen")
      //3) else, goto: SELECT_ORDER
      this.gotoSubstate(MWF_STATE.SELECT_ORDER, [drawnCards, cardViews])
    }
  }

  onOrderConfirm( sortedCardModels ) {
    this._clearModal()
    this.gotoSubstate(MWF_STATE.RESOLVE_HITS, [sortedCardModels])
  }

  onResolveMonsterWoundsComplete() {
    // all done
    EventBus.ui.dispatch("closeModalView")
  }

  onResolveMonsterTrapComplete() {
    // all done
    EventBus.ui.dispatch("closeModalView")
  }

  _clearModal() {
    this.modalView.removeFromParent(true)
    this.modalView = null
  }

  _setModal(modal) {
    this.modalView = modal
    this.addChild(this.modalView)
  }

}

var MWF_STATE = Object.freeze({
    "INIT": 0,
    "ASK_NUM_HITS": 1,
    "TRAP_HAPPENED": 2,
    "SELECT_ORDER": 3,
    "RESOLVE_HITS": 4,
})

class MWF_OrderHits extends ModalView {
  constructor(MWF, cardModels, cardViews) {
    var screenSize = Graphics.ScreenSize
    super(screenSize.x, screenSize.y, "rgba(0,0,0,0)")

    this.topState = MWF

    this.cardModels = cardModels
    this.cardViews = cardViews

    var label = new NodeView()
    label.setLabel("Order cards left (first) to right (last)", "24px Arial", "#FFFFFF")
    this.addChild(label)
    label.snapToTopOfParent(10)

    this.btnDone = CreateSimpleButton("Done", "btnDone")
    this.addChild(this.btnDone)
    this.btnDone.snapToBottomOfSibling(label)
    this.btnDone.snapToRightOfParent(-50)

    this.btnConfirm = CreateSimpleButton("Confirm", "btnConfirm")
    this.addChild(this.btnConfirm)
    this.btnConfirm.snapToBottomOfSibling(label)
    this.btnConfirm.snapToRightOfParent(-50)
    this.btnConfirm.visible = false

    this.btnCancel = CreateSimpleButton("Cancel", "btnCancel")
    this.addChild(this.btnCancel)
    this.btnCancel.snapToBottomOfSibling(this.btnConfirm, 5)
    this.btnCancel.snapToRightOfParent(-50)
    this.btnCancel.visible = false

    // attach existing cardViews to new root
    var marginX2 = 100*2
    var dragZone = new Rect2D(-(screenSize.x - marginX2)/2, -(screenSize.y - marginX2)/2, (screenSize.x - marginX2), screenSize.y - marginX2)
    for (var cv of cardViews) {
      this.addChild(cv)
      cv.makeDraggable(dragZone, true)
    }

    this.SetListener("btnDone", this.onBtnDone)
    this.SetListener("btnConfirm", this.onBtnConfirm)
    this.SetListener("btnCancel", this.onBtnCancel)
  }

  onBtnDone(e) {
    this.btnDone.visible = false
    this.btnConfirm.visible = true
    this.btnCancel.visible = true
  }

  onBtnCancel(e) {
    this.btnDone.visible = true
    this.btnConfirm.visible = false
    this.btnCancel.visible = false
  }

  onBtnConfirm(e) {
    //1) sort cards by x
    var pairs = []
    for (var i=0; i<this.cardModels.length; i++) {
      pairs.push({ "m":this.cardModels[i], "v":this.cardViews[i] })
    }

    pairs.sort((a, b)=>{
      return a.v.pos.x - b.v.pos.x
    })

    var sortedCardModels = []
    for (var pair of pairs) {
      sortedCardModels.push(pair.m)
    }

    this.topState.onOrderConfirm(sortedCardModels)
  }
}

class MWF_AskNumHits extends ModalView {
  constructor(MWF) {

    var screenSize = Graphics.ScreenSize
    super(screenSize.x, screenSize.y, "rgba(0,0,0,0)")

    this.topState = MWF

    this.trapDrawn = false
    this.cardModels = []
    this.cardViews = []

    var label = new NodeView()
    label.setLabel("Draw Hit Location cards", "24px Arial", "#FFFFFF")
    this.addChild(label)
    label.snapToTopOfParent(10)

    //HL deck - place it the same way GameplayStateView places it
    var playerPanelHeight = 150
		var monsterView = new NodeView()
		monsterView.size.setVal(924, screenSize.y - playerPanelHeight)
		this.addChild(monsterView)
		monsterView.snapToTopLeftOfParent()
		this.monsterView = monsterView

		var deckHitNode = new NodeView()
		deckHitNode.size.setVal( 112, 177)
		deckHitNode.pos.setVal(-396, 0) 
		this.monsterView.addChild(deckHitNode)

    this.deckViewHL = new DeckView(this.topState.pBattleStateModel.deckHL, "gfx/imgs/WLimgHLBack.png")
    deckHitNode.addChild(this.deckViewHL)


    this.deckViewHL.setClick(()=>{
			EventBus.ui.dispatch("btnDraw")
		})



    this.btnDone = CreateSimpleButton("Done", "btnDone")
    this.addChild(this.btnDone)
    this.btnDone.snapToBottomOfSibling(label)
    this.btnDone.snapToRightOfParent(-50)

    this.SetListener("btnDraw", this.onBtnDraw)
    this.SetListener("btnDone", this.onBtnDone)

    //initiate first click immediately
    setTimeout(()=>{
      this.onBtnDraw()
    })
    
  }

  onBtnDraw() {
    if (this.trapDrawn) {
      return; //dont allow drawing more cards after a trap is drawn
    }

    var cardArr = this.topState.pBattleStateModel.drawHitLocations(1)
    var cardModel = cardArr[0]

    if (cardModel.isTrap) {
      this.trapDrawn = true
    }

    this.cardModels.push(cardModel)
    

    cardModel.faceUp = true
    var cardView = new CardView(cardModel, "gfx/imgs/WLimgHLBack.png") //todo: determine this algorithmically
    this.addChild(cardView)
    //cardView.pos.setVal(- this.size.x/2, 0) //start off screen (left)

    var screenSize = Graphics.ScreenSize
    var adjustedPos = this.deckViewHL.worldPosition
    adjustedPos.x -= screenSize.x/2
    adjustedPos.y -= screenSize.y/2

    cardView.pos.setVec( adjustedPos )


    //animate card view in
    var end = -(cardView.parent.size.x/2 - 150)
    var offset = this.cardModels.length * 50
    cardView.tweenPos(0.4, new Vec2D(end + offset, getRand(-50, 50))) //todo: offset by num of cards
    this.cardViews.push(cardView)
  }

  onBtnDone() {
    this.topState.onAskNumHitsComplete(this.cardModels, this.cardViews, this.trapDrawn)
  }
}