class ModalView extends NodeView {
    constructor(w, h) {
        super()

        // Make modal: size of whole screen, and eats clicks
        var screenSize = Graphics.ScreenSize
        this.size.setVec(screenSize)
        this.pos.setVal(this.size.x/2, this.size.y/2)
        this.setClick(()=>{ self.onBtnClose() }, true, true)

        this.contentView = new NodeView()
        this.contentView.setRect(w, h, "#222222")
        var self = this
        this.contentView.eatClicks()
        super.addChild(this.contentView)
    }

    // because we're modal, we want our views to be added to the contentView only
    addChild(child) {
        this.contentView.addChild(child)
    }

    onBtnClose() {
        EventBus.ui.dispatch("closeSettlementInfoModalView")
    }
}

class SettlementInfoModalView extends ModalView {
    constructor(model) {
        var screenSize = Graphics.ScreenSize
        super(screenSize.x * 0.8, screenSize.y * 0.8)

        this.pModel = model

        this.inputSettlementName = null

        var lblName = new NodeView()
        lblName.setLabel("name: ")
        //lblName.pos.setVal(-150, -50)
        this.addChild(lblName)
        lblName.snapToTopLeftOfParent(5)

        var inputText = new NodeView()
        inputText.setTextInput(150, 20)
        inputText.setTextInputValue(this.pModel.name)
        inputText.pos.setVal(0, -55)
        this.addChild(inputText)
        inputText.snapToRightOfSibling(lblName)
        inputText.snapToSiblingY(lblName)
        this.inputSettlementName = inputText

        var settlementRosterView = new NodeView()
        settlementRosterView.setRect(105,205, "#555555")
        var survivorTable = new TableView(100, 200)
        // Settlement roster
        for (var survivor of this.pModel.survivors) {
            var survivorNameView = new NodeView();
            survivorNameView.setRect(100, 10, "#000000")
            survivorNameView.setLabel(survivor.name, "8px Arial", "#FFFFFF")
            survivorTable.addCell(survivorNameView)
        }
        settlementRosterView.addChild(survivorTable)
        settlementRosterView.pos.setVal(-100, 100)
        this.addChild(settlementRosterView)

        var itemStorageView 
        var itemStorageView = new NodeView()
        itemStorageView.setRect(105,205, "#555555")
        var resourcesTable = new TableView(100, 200)
        // Settlement roster
        for (var resource of this.pModel.resources) {
            var itemNameView = new NodeView();
            itemNameView.setRect(100, 10, "#000000")
            //todo: split this in two (so one cell contains two label nodes and "5x" is left justified)
            var resourceStr = "" + resource.count + "x " + resource.name
            itemNameView.setLabel(resourceStr, "8px Arial", "#FFFFFF")
            resourcesTable.addCell(itemNameView)
        }
        itemStorageView.addChild(resourcesTable)
        itemStorageView.pos.setVal(100, 100)
        this.addChild(itemStorageView)
        
        this.SetListener("textInputSubmitted", this.onTextInputSubmitted)
    }

    onTextInputSubmitted(e) {
        if (e.node == this.inputSettlementName) {
            //settlement name changed
            this.pModel.name = e.value
            console.log("updated settlement name to " + e.value)
        }
    }
}