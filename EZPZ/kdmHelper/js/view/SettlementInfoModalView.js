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

        this.fontType1 = "24px Arial"
        this.fontType2 = "8px Arial"
        this.fontType3 = "12px Arial"

        this.pModel = model

        this.inputSettlementName = null

        var bgImg = new NodeView()
        bgImg.setImageStretch("gfx/imgs/REimgEX.png", this.contentView.size.x, this.contentView.size.y, true)
        this.addChild(bgImg)

        var lblName = new NodeView()
        lblName.setLabel("Settlement: ", this.fontType1, "#FFFFFF")
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

        var locationsView = this._createListView(this.pModel.locations, 105, 205, (item)=>{ return item; })
        locationsView.pos.setVal(-100, -100)
        this.addChild(locationsView)
        this._setLabelForListView("Locations", locationsView)

        var innovationsView = this._createListView(this.pModel.innovations, 105, 205, (item)=>{ return item; })
        this.addChild(innovationsView)
        innovationsView.snapToRightOfSibling(locationsView, 5)
        innovationsView.snapToSiblingY(locationsView)
        this._setLabelForListView("Innovations", innovationsView)

        var settlementRosterView = this._createListView(this.pModel.survivors, 105, 205, (item)=>{ return item.name; })
        this.addChild(settlementRosterView)
        settlementRosterView.snapToRightOfSibling(innovationsView, 5)
        settlementRosterView.snapToSiblingY(innovationsView)
        this._setLabelForListView("Roster", settlementRosterView)

        var itemStorageView = this._createListView(this.pModel.resources, 105, 405, (item)=>{ return ("" + item.count + "x " + item.name); })
        this.addChild(itemStorageView)
        itemStorageView.snapToRightOfSibling(settlementRosterView, 5)
        itemStorageView.snapToSiblingY(settlementRosterView, 100)
        this._setLabelForListView("Storage", itemStorageView)

        var gearView = this._createListView(this.pModel.gear, 105, 405, (item)=>{ return item; })
        this.addChild(gearView)
        gearView.snapToRightOfSibling(itemStorageView, 5)
        gearView.snapToSiblingY(itemStorageView)
        this._setLabelForListView("Gear", gearView)
        
        var principalsView = this._createPrincipalsView()
        this.addChild(principalsView)
        principalsView.snapToBottomOfSibling(locationsView, 25)
        principalsView.alignToLeftOfSibling(locationsView)
        this._setLabelForListView("Principals", principalsView)

        this.SetListener("textInputSubmitted", this.onTextInputSubmitted)
    }

    _setLabelForListView(label, listView) {
        var labelView = new NodeView()
        labelView.setLabel(label, this.fontType3, "#FFFFFF")
        this.addChild(labelView)
        labelView.snapToTopOfSibling(listView)
        labelView.snapToSiblingX(listView)
    }

    _createListView(items, w, h, fnGetItemName) {
        var margin = 5
        var listBackground = new NodeView()
        listBackground.setRect(w,h, "rgba(128,128,128,0.7)")
        var tableView = new TableView(w-margin, h-margin)
        // Settlement roster
        for (var item of items) {
            var itemView = new NodeView();
            itemView.setRect(100, 10, "#000000")
            var labelText = fnGetItemName(item)
            if (!labelText) continue;
            itemView.setLabel(labelText, this.fontType2, "#FFFFFF")
            tableView.addCell(itemView)
        }
        listBackground.addChild(tableView)
        return listBackground
    }

    _createPrincipalsView() {
        var node = new NodeView()
        node.setRect(215, 175, "rgba(128,128,128,0.7)")

        var m1 = this._createPrincipalBox(node, "New Life", SettlementModel.INNOVATIONS.protectTheYoung, SettlementModel.INNOVATIONS.survivalOfTheFittest)
        node.addChild(m1)
        m1.snapToTopCenterOfParent(0, 5)

        var m2 = this._createPrincipalBox(node, "Death", SettlementModel.INNOVATIONS.cannibalize, SettlementModel.INNOVATIONS.graves)
        node.addChild(m2)
        m2.snapToBottomOfSibling(m1, 10)

        var m3 = this._createPrincipalBox(node, "Society", SettlementModel.INNOVATIONS.collectiveToll, SettlementModel.INNOVATIONS.acceptTheDarkness)
        node.addChild(m3)
        m3.snapToBottomOfSibling(m2, 10)

        var m4 = this._createPrincipalBox(node, "Conviction", SettlementModel.INNOVATIONS.barbaric, SettlementModel.INNOVATIONS.romantic)
        node.addChild(m4)
        m4.snapToBottomOfSibling(m3, 10)

        return node
    }
    _createPrincipalBox(parent, label, p1, p2) {
        var node = new NodeView()
        node.size.setVal(parent.size.x, parent.size.y / 5)

        var labelView = new NodeView()
        labelView.setLabel(label, this.fontType3, "#FFFFFF")
        node.addChild(labelView)
        labelView.snapToTopLeftOfParent(5)

        var choice2view = this._createChoiceBox(p2)
        node.addChild(choice2view)
        choice2view.snapToRightOfParent(-5)
        choice2view.snapToSiblingY(labelView)

        var choice1view = this._createChoiceBox(p1)
        node.addChild(choice1view)
        choice1view.snapToBottomOfSibling(choice2view, 5)
        choice1view.snapToRightOfParent(-5)

        return node
    }
    _createChoiceBox(principal) {
        var choiceBox = new NodeView()
        var c2 = "" + principal
        if (this.pModel.hasInnovation(principal)) {
            c2 = "[x] " + c2
        } else {
            c2 = "[ ] " + c2
        }
        choiceBox.setLabel(c2, this.fontType3, "#FFFFFF")

        return choiceBox
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