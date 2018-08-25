
class SurvivorSheetModalView extends ModalView {
    constructor(survivorModel) {
        super(750, 600)

        this.lblName = null
        this.valSurvival = null
        this.valLimit = null

        this.pModel = survivorModel
        // name 
        this.lblName = new NodeView() 
        this.lblName.setLabel("Long Survivor Name Here", "12px Arial", "#FFFFFF")
        this.addChild(this.lblName)
        this.lblName.snapToTopLeftOfParent(5)

        var male = this._createChoiceBox("male", this.pModel.isMale, "10px Arial")
        var female = this._createChoiceBox("female", !this.pModel.isMale, "10px Arial")
        this.addChild(male)
        this.addChild(female)
        male.snapToRightCenterOfSibling(this.lblName, 50)
        female.snapToRightCenterOfSibling(male, 5)

        var survival = this._createValueBox("Survival", 40, "99")
        this.addChild(survival.root)
        survival.root.snapToBottomOfSibling(this.lblName, 35)
        survival.root.snapToLeftOfParent(20)
        this.valSurvival = survival.val
        //todo: add survival "lock" icon

        var limit = this._createValueBox("Limit", 20, "99")
        this.addChild(limit.root)
        limit.root.snapToRightCenterOfSibling(survival.root, 10)
        this.valLimit = limit.val

        var actions = new NodeView()
        actions.setRect(100, 100, "#FFFFFF")

        this.addChild(actions)
        


        this.updateFromModel()
    }

    updateFromModel() {
        this.lblName.updateLabel(this.pModel.name)
        this.valSurvival.updateLabel(this.pModel.survivalPts)

        //todo; toggle survival "lock"
    }

    // return { root:RootNode, val:ValueNode }
    _createValueBox(name, size, value) {
        var boxSurvival = new NodeView()
        var sizeH = size/2
        boxSurvival.setPolygon([ new Vec2D(-sizeH, -sizeH), new Vec2D(sizeH, -sizeH), new Vec2D(sizeH,sizeH), new Vec2D(-sizeH, sizeH) ], "#000000", "#FFFFFF" )
        boxSurvival.size.setVal(sizeH * 2, sizeH * 2)
        //this.addChild(boxSurvival)

        var f1 = "24px Arial", f2 = "12px Arial"
        if (size < 40) {
            f1 = "12px Arial", f2 = "10px Arial"
        }

        var valSurvival = new NodeView()
        valSurvival.setLabel(value, f1, "#FFFFFF")
        boxSurvival.addChild(valSurvival)
        valSurvival.pos.y += size/4

        var lblSurvival = new NodeView() 
        lblSurvival.setLabel(name, f2, "#FFFFFF")
        boxSurvival.addChild(lblSurvival)
        lblSurvival.snapToTopCenterOfParent(0, -(lblSurvival.size.y/2 + 5))

        return { "root":boxSurvival, "val":valSurvival }
    }

    _createChoiceBox(label, selected, font) {
        var choiceBox = new NodeView()
        var c2 = " " + label
        if (selected) {
            c2 = "[x]" + c2
        } else {
            c2 = "[ ]" + c2
        }
        choiceBox.setLabel(c2, font, "#FFFFFF")

        return choiceBox
    }
}