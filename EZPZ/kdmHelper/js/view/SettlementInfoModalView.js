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
        lblName.setLabel("name: " + this.pModel.name)
        lblName.pos.setVal(-50, -50)
        this.addChild(lblName)

        var inputText = new NodeView()
        inputText.setTextInput(150, 40)
        this.addChild(inputText)

        var inputText2 = new NodeView()
        inputText2.setTextInput(150, 40)
        inputText.pos.y += 50
        this.addChild(inputText2)
    }
}