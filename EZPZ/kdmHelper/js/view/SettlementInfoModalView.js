class ModalView extends NodeView {
    constructor() {
        super()

        // Make modal: size of whole screen, and eats clicks
        var screenSize = Graphics.ScreenSize
        this.size.setVec(screenSize)
        this.pos.setVal(this.size.x/2, this.size.y/2)
        this.setClick(()=>{ self.onBtnClose() }, true, true)

        this.contentView = new NodeView()
        this.contentView.setRect(screenSize.x * 0.8, screenSize.y * 0.8, "#222222")
        var self = this
        this.contentView.eatClicks()
        this.addChild(this.contentView)
    }

    onBtnClose() {
        EventBus.ui.dispatch("closeSettlementInfoModalView")
    }
}

class SettlementInfoModalView extends ModalView {
    constructor(model) {
        super()

        this.pModel = model

        var lblName = new NodeView()
        lblName.setLabel("name: ")
        lblName.pos.setVal(-150, -50)
        this.addChild(lblName)

        var inputText = new NodeView()
        inputText.setTextInput(150, 40)
        inputText.setTextInputValue(this.pModel.name)
        inputText.pos.setVal(0, -55)
        this.addChild(inputText)

        
        var inputText2 = new NodeView()
        inputText2.setTextInput(150, 40)
        inputText2.pos.y += 50
        this.addChild(inputText2)
        
    }
}