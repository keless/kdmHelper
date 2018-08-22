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
        this.willCloseModal()
        EventBus.ui.dispatch("closeSettlementInfoModalView")
    }

    willCloseModal() {
        //subclass this if you need to clean up
    }
}

class SettlementInfoModalView extends ModalView {
    constructor(model) {
        var screenSize = Graphics.ScreenSize
        super(screenSize.x * 0.8, screenSize.y * 0.8)

        this.pModel = model

        this.inputSettlementName = null

        var lblName = new NodeView()
        lblName.setLabel("Settlement: ", "24px Arial", "#FFFFFF")
        //lblName.pos.setVal(-150, -50)
        this.addChild(lblName)
        lblName.snapToTopLeftOfParent(10)

        var inputText = new NodeView()
        inputText.setTextInput(150, 20)
        inputText.setTextInputValue(this.pModel.name)
        inputText.pos.setVal(0, -55)
        this.addChild(inputText)
        inputText.snapToRightOfSibling(lblName)
        inputText.snapToSiblingY(lblName, -7)
        this.inputSettlementName = inputText

        var settlementRosterView = this._createListView(this.pModel.survivors, 105, 205, (item)=>{ return item.name; })
        settlementRosterView.pos.setVal(-100, 100)
        this.addChild(settlementRosterView)
        this._setLabelForListView("Roster", settlementRosterView)

        var itemStorageView = this._createListView(this.pModel.resources, 105, 205, (item)=>{ return ("" + item.count + "x " + item.name); })
        this.addChild(itemStorageView)
        itemStorageView.snapToRightOfSibling(settlementRosterView, 5)
        itemStorageView.snapToSiblingY(settlementRosterView)
        this._setLabelForListView("Storage", itemStorageView)
        
        var innovationsView = this._createListView(this.pModel.innovations, 105, 205, (item)=>{ return item; })
        this.addChild(innovationsView)
        innovationsView.snapToRightOfSibling(itemStorageView, 5)
        innovationsView.snapToSiblingY(itemStorageView)
        this._setLabelForListView("Innovations", innovationsView)
        
        this.SetListener("textInputSubmitted", this.onTextInputSubmitted)
    }

    _setLabelForListView(label, listView) {
        var labelView = new NodeView()
        labelView.setLabel(label, "12px Arial", "#FFFFFF")
        this.addChild(labelView)
        labelView.snapToTopOfSibling(listView)
        labelView.snapToSiblingX(listView)
    }

    _createListView(items, w, h, fnGetItemName) {
        var listBackground = new NodeView()
        listBackground.setRect(105,205, "#555555")
        var tableView = new TableView(100, 200)
        // Settlement roster
        for (var item of items) {
            var itemView = new NodeView();
            itemView.setRect(100, 10, "#000000")
            var labelText = fnGetItemName(item)
            if (!labelText) continue;
            itemView.setLabel(labelText, "8px Arial", "#FFFFFF")
            tableView.addCell(itemView)
        }
        listBackground.addChild(tableView)
        listBackground.pos.setVal(-100, 100)
        return listBackground
    }

    onTextInputSubmitted(e) {
        if (e.node == this.inputSettlementName) {
            //settlement name changed
            this.pModel.name = e.value
            console.log("updated settlement name to " + e.value)
        }
    }

    willCloseModal() {
        //store settlement name if it changed
        this.pModel.name = this.inputSettlementName.getTextInputValue()
    }
}