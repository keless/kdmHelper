
class SurvivorSheetModalView extends ModalView {
    constructor(survivorModel) {
        super(750, 600)

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

        var boxSurvival = new NodeView()
        var sizeH = 20
        boxSurvival.setPolygon([ new Vec2D(-sizeH, -sizeH), new Vec2D(sizeH, -sizeH), new Vec2D(sizeH,sizeH), new Vec2D(-sizeH, sizeH) ], "#000000", "#FFFFFF" )
        boxSurvival.size.setVal(sizeH * 2, sizeH * 2)
        this.addChild(boxSurvival)
        boxSurvival.snapToBottomOfSibling(this.lblName, 35)
        boxSurvival.snapToLeftOfParent(20)


        this.valSurvival = new NodeView()
        this.valSurvival.setLabel("99", "24px Arial", "#FFFFFF")
        boxSurvival.addChild(this.valSurvival)
        this.valSurvival.pos.y += 10

        var lblSurvival = new NodeView() 
        lblSurvival.setLabel("Survival", "12px Arial", "#FFFFFF")
        this.addChild(lblSurvival)
        lblSurvival.snapToTopCenterOfSibling(boxSurvival, 5)
        

        this.updateFromModel()
    }

    updateFromModel() {
        this.lblName.updateLabel(this.pModel.name)
        this.valSurvival.updateLabel(this.pModel.survivalPts)

        //todo; toggle survival "lock"
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