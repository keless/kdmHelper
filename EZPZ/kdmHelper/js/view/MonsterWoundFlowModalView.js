class MonsterWoundFlowModalView extends ModalView {
  constructor(battleStateModel) {
    super(750, 600)

    this.monsterName = battleStateModel.monsterName
    this.monsterLevel = battleStateModel.monsterLevel
    this.pBattleStateModel = battleStateModel

    this.subState = SUBSTATE.ASK_NUM_HITS
    this.modalView = null

  }

  // flow controller code
  gotoSubstate(substate) {
    switch(substate) {
      case SUBSTATE.ASK_NUM_HITS: {
        this.modalView = new MWF_AskNumHits()
      }break;
      case SUBSTATE.TRAP_HAPPENED: {
        //xxx todo
      }break;
      case SUBSTATE.SELECT_ORDER: {
        //xxx todo
      }break;
    }
  }

  onAskNumHitsComplete( numHits ) {
    this.modalView.removeFromParent(true)
    this.modalView = null

    //1) draw X hits
    var drawnCards = this.pBattleStateModel.drawHitLocations(numHits)

    var hasTrap = drawnCards.find((e)=>{ return e.hasOwnProperty("trap") })
    if (hasTrap) {
      //2) if trap card, goto: TRAP_HAPPENED
      this.gotoSubstate(SUBSTATE.TRAP_HAPPENED)
    } else {
      //3) else, goto: SELECT_ORDER
      this.gotoSubstate(SUBSTATE.SELECT_ORDER)
    }
  }
}

MonsterWoundFlowModalState.SUBSTATE = Object.freeze({
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

    var box = CreateSimpleEditBox("How many hit cards should be drawn?", "1", "Draw", "btnDraw")
    this.addChild(box)
    this.editBox = box.editBox

    this.SetListener("btnDraw", this.onBtnDraw)
  }

  onBtnDraw() {
    var strNumHits = this.editBox.getTextInputValue()
    var intNumHits = parseInt(strNumHits)
    console.info("user selected " + intNumHits + " monster hit locations")
    this.topState.onAskNumHitsComplete( intNumHits )
  }
}