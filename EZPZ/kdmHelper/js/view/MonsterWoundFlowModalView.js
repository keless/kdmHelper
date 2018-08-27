class MonsterWoundFlowModalView extends ModalView {
  constructor(battleStateModel) {
    super(750, 600)

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
    super(400, 400)

    this.topState = MWF

    this.isAnimating = false
    this.cardModels = []
    this.cardViews = []

    var label = new NodeView()
    label.setLabel("Draw Hit Location cards", "24px Arial", "#FFFFFF")
    this.addChild(label)
    label.snapToTopOfParent(10)

    this.btnDraw = CreateSimpleButton("Draw", "btnDraw")
    this.addChild(this.btnDraw)
    this.btnDraw.snapToBottomOfSibling(label)
    this.btnDraw.snapToLeftOfParent(50)

    this.btnDone = CreateSimpleButton("Done", "btnDone")
    this.addChild(this.btnDone)
    this.btnDone.snapToBottomOfSibling(label)
    this.btnDone.snapToRightOfParent(50)

    this.SetListener("btnDraw", this.onBtnDraw)
    this.SetListener("btnDone", this.onBtnDone)
  }

  onBtnDraw() {
    var cardArr = this.topState.pBattleStateModel.drawHitLocations(1)
    var cardModel = cardArr[0]

    this.cardModels.push(cardModel)
    

    cardModel.faceUp = true
    var cardView = new CardView(cardModel, "gfx/imgs/WLimgHLBack.png") //todo: determine this algorithmically
    this.addChild(cardView)
    cardView.snapToRightOfParent( cardView.size.x ) //start off screen
    //cardView.snapToBottomOfSibling(this.btnDraw, 50)

    //animate card view in
    var end = -(cardView.parent.size.x/2 - 50)
    var offset = this.cardModels.length * 20
    cardView.tweenPos(1, new Vec2D(end + offset, 0)) //todo: offset by num of cards

  }

  onBtnDone() {
    this.topState.onAskNumHitsComplete(this.cardModels)
  }
}