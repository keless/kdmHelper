class CreateSurvivorModalView extends ModalView {
  constructor(settlementModel, survivorIdx) {
    super(750, 530, "#000000")

    this.survivorModel = new SurvivorModel()
    this.survivorModel.name = ""

    this.inputName = new NodeView()
    this.inputName.setTextInput(150, 30, "Name Me") //textInputSubmitted
    this.addChild(this.inputName)

    this.instructName = new NodeView()
    this.instructName.setLabel("Name a new survivor ("+survivorIdx+")")
    this.addChild(this.instructName)
    this.instructName.snapToTopCenterOfSibling(this.inputName, 10)

    this.btnNameComplete = new ButtonView("textInputSubmitted", "gfx/ui/btn_blue.sprite", "Done")
    this.addChild(this.btnNameComplete)
    this.btnNameComplete.snapToRightCenterOfSibling(this.inputName, 30)

    //add sex toggle buttons
    this.highlightMale = new NodeView()
    this.highlightMale.setRect(50,50, "#00FFFF")
    this.addChild(this.highlightMale)
    this.highlightMale.snapToBottomCenterOfSibling(this.inputName, 15)
    

    this.highlightFemale = new NodeView()
    this.highlightFemale.setRect(50,50, "#FF9999")
    this.addChild(this.highlightFemale)
    this.highlightFemale.snapToRightCenterOfSibling(this.highlightMale, 5)

    this.updateGenderUI()

    var btnMale = new ButtonView("btnMale", "gfx/ui/btn_white_sm.sprite", "M", "12px Arial", "#000000")
    this.addChild(btnMale)
    btnMale.pos.setVec( this.highlightMale.pos )

    var btnFemale = new ButtonView("btnFemale", "gfx/ui/btn_white_sm.sprite", "F", "12px Arial", "#000000")
    this.addChild(btnFemale)
    btnFemale.pos.setVec( this.highlightFemale.pos )

    this.SetListener("textInputSubmitted", this.onNameComplete)
    this.SetListener("btnMale", this.onBtnMale)
    this.SetListener("btnFemale", this.onBtnFemale)
  }

  onBtnMale() {
    this.survivorModel.isMale = true
    this.updateGenderUI()
  }

  onBtnFemale() {
    this.survivorModel.isMale = false
    this.updateGenderUI()
  }

  updateGenderUI() {
    this.highlightMale.visible = this.survivorModel.isMale
    this.highlightFemale.visible = !this.survivorModel.isMale
  }

  onNameComplete(e) {
    var name = this.inputName.getTextInputValue()
    this.survivorModel.name = name

    this.survivorModel.giveStartingEquipment()
    //change UI to select

    EventBus.ui.dispatch("createSurvivorCompleted")
  }

} 