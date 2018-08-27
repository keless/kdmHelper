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
  gotoSubstate(substate) {
    switch(substate) {
      case MWF_STATE.ASK_NUM_HITS: {
        this._setModal( new MWF_AskNumHits( this ) )
      }break;
      case MWF_STATE.TRAP_HAPPENED: {
        //xxx todo
      }break;
      case MWF_STATE.SELECT_ORDER: {
        //xxx todo
      }break;
    }
  }


  onAskNumHitsComplete( drawnCards ) {
    this._clearModal()

    console.log("onAskNumHitsComplete - got " + drawnCards.length + " cards")

    var hasTrap = drawnCards.find((e)=>{ return e.hasOwnProperty("trap") })
    if (hasTrap) {
      console.log(" -- TRAP!! --")
      //2) if trap card, goto: TRAP_HAPPENED
      this.gotoSubstate(MWF_STATE.TRAP_HAPPENED)
    } else {
      console.log("todo: select order screen")
      //3) else, goto: SELECT_ORDER
      this.gotoSubstate(MWF_STATE.SELECT_ORDER)
    }
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
    "blah": 4,
})

class MWF_AskNumHits extends ModalView {
  constructor(MWF) {

    var screenSize = Graphics.ScreenSize
    super(screenSize.x, screenSize.y, "rgba(0, 0, 0, 0.001)")

    this.topState = MWF

    this.isAnimating = false
    this.cardModels = []
    this.cardViews = []

    var label = new NodeView()
    label.setLabel("Draw Hit Location cards", "24px Arial", "#FFFFFF")
    this.addChild(label)
    label.snapToTopOfParent(10)

    /*
    this.btnDraw = CreateSimpleButton("Draw", "btnDraw")
    this.addChild(this.btnDraw)
    this.btnDraw.snapToBottomOfSibling(label)
    this.btnDraw.snapToLeftOfParent(50)
    */

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
    var cardArr = this.topState.pBattleStateModel.drawHitLocations(1)
    var cardModel = cardArr[0]

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

  }

  onBtnDone() {
    this.topState.onAskNumHitsComplete(this.cardModels)
  }
}