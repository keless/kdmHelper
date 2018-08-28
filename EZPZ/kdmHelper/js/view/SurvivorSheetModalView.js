
class SurvivorSheetModalView extends ModalView {
    constructor(survivorModel, settlementModel) {
        super(750, 600)

        this.lblName = null
        this.valSurvival = null
        this.valLimit = null

        this.pModel = survivorModel
        this.pSettlementModel = settlementModel

        this.font1 = "10px Arial"
        this.font2 = "12px Arial"

        // name 
        this.lblName = new NodeView() 
        this.lblName.setLabel("Long Survivor Name Here", "12px Arial", "#FFFFFF")
        this.addChild(this.lblName)
        this.lblName.snapToTopLeftOfParent(5)

        var male = this._createChoiceBox("male", this.pModel.isMale, this.font1)
        var female = this._createChoiceBox("female", !this.pModel.isMale, this.font1)
        this.addChild(male)
        this.addChild(female)
        male.snapToRightCenterOfSibling(this.lblName, 50)
        female.snapToRightCenterOfSibling(male, 5)

        this.huntXPBar = new NodeView()
        this.huntXPBar.size.setVal(300, 15)
        this.addChild(this.huntXPBar)
        this.huntXPBar.snapToTopOfParent(3)
        this.huntXPBar.snapToRightOfSibling(female, 10)

        var lblHuntXP = new NodeView()
        lblHuntXP.setLabel("Hunt XP:", this.font1, "#FFFFFF")
        this.huntXPBar.addChild(lblHuntXP)
        lblHuntXP.snapToTopLeftOfParent(3)

        var prev = lblHuntXP
        var thickIdx = [2, 6, 10, 15]
        for (var i=1; i<=SurvivorModel.MAX_XP; i++) {
            var filled = i <= this.pModel.huntXP
            var strokeSize = 2
            if (thickIdx.includes(i)) {
                strokeSize = 3
            }
            if (i == SurvivorModel.MAX_XP) strokeSize = 4
            var box = this._createFillBox(10, filled, "#FFFFFF", "#FFFFFF", strokeSize)
            this.huntXPBar.addChild(box)
            box.snapToRightOfSibling(prev, 5)
            prev = box
        }

        var hr = new NodeView()
        hr.setPolygon([ new Vec2D(-350,0), new Vec2D(350,0) ], null, "#FFFFFF", 1)
        hr.size.setVal(700, 1)
        this.addChild(hr)
        hr.snapToBottomOfSibling(this.lblName, 3)
        //hr.pos.x = 0

        var survival = this._createValueBox("Survival", 40, "99")
        this.addChild(survival.root)
        survival.root.snapToBottomOfSibling(hr, 25)
        survival.root.snapToLeftOfParent(20)
        this.valSurvival = survival.val
        //todo: add survival "lock" icon

        var limit = this._createValueBox("Limit", 20, "99")
        this.addChild(limit.root)
        limit.root.snapToRightCenterOfSibling(survival.root, 10)
        this.valLimit = limit.val

        var actions = new NodeView()
        actions.size.setVal(100, 80)
        this.addChild(actions)

        var actionList = [ SettlementModel.ACTIONS.encourage, SettlementModel.ACTIONS.dodge, SettlementModel.ACTIONS.dash, SettlementModel.ACTIONS.surge, SettlementModel.ACTIONS.endure]
        var prev = null
        for(var actionEnum of actionList) {
            var box = this._createChoiceBox(actionEnum, this.pSettlementModel.hasAction(actionEnum), this.font1)
            actions.addChild(box)
            var actionMargin = 3
            if (prev == null) {
                box.snapToTopLeftOfParent(actionMargin)
            } else {
                box.snapToBottomOfSibling(prev, actionMargin)
                box.snapToLeftOfParent(actionMargin)
            }
            prev = box
        }

        actions.snapToRightOfSibling(limit.root, 10)
        actions.snapToBottomOfSibling(this.lblName, 20)

        // Stats
        var movement = this._createAttributeBox("Movement", actions)
        this.valMovement = movement.val

        var accuracy = this._createAttributeBox("Accuracy", movement.root)
        this.valAccuracy = accuracy.val

        var strength = this._createAttributeBox("Strength", accuracy.root)
        this.valStrength = strength.val

        var evasion = this._createAttributeBox("Evasion", strength.root)
        this.valEvasion = evasion.val

        var luck = this._createAttributeBox("Luck", evasion.root)
        this.valLuck = luck.val

        var speed = this._createAttributeBox("Speed", luck.root)
        this.valSpeed = speed.val

        var armorSpacing = 5
        var brain = this._createArmorBox("Brain", true, false)
        this.addChild(brain.root)
        brain.root.snapToBottomOfSibling(hr, 25)
        this.valBrain = brain.val
        this.valBrainL = brain.lval

        var head = this._createArmorBox("Head", false, true)
        this.addChild(head.root)
        head.root.snapToBottomOfSibling(hr, 25)
        head.root.snapToRightOfSibling(brain.root, armorSpacing)
        this.valHead = head.val
        this.valHeadH = head.hval

        var arms = this._createArmorBox("Arms", true, true)
        this.addChild(arms.root)
        arms.root.snapToBottomOfSibling(hr, 25)
        arms.root.snapToRightOfSibling(head.root, armorSpacing)
        this.valArms = arms.val
        this.valArmsL = arms.lval
        this.valArmsH = arms.hval

        var body = this._createArmorBox("Body", true, true)
        this.addChild(body.root)
        body.root.snapToBottomOfSibling(hr, 25)
        body.root.snapToRightOfSibling(arms.root, armorSpacing)
        this.valBody = body.val
        this.valBodyL = body.lval
        this.valBodyH = body.hval

        var waist = this._createArmorBox("Waist", true, true)
        this.addChild(waist.root)
        waist.root.snapToBottomOfSibling(hr, 25)
        waist.root.snapToRightOfSibling(body.root, armorSpacing)
        this.valWaist = waist.val
        this.valWaistL = waist.lval
        this.valWaistH = waist.hval

        var legs = this._createArmorBox("Legs", true, true)
        this.addChild(legs.root)
        legs.root.snapToBottomOfSibling(hr, 25)
        legs.root.snapToRightOfSibling(waist.root, armorSpacing)
        this.valLegs = legs.val
        this.valLegsL = legs.lval
        this.valLegsH = legs.hval

        this.updateFromModel()
    }

    _createAttributeBox(lbl, sibling ) {
        var node = this._createValueBox(lbl, 20, "99")
        this.addChild(node.root)
        node.root.snapToBottomOfSibling(sibling, 15)
        node.root.snapToLeftOfParent(30)
        return node
    }

    updateFromModel() {
        this.lblName.updateLabel(this.pModel.name)
        this.valSurvival.updateLabel(this.pModel.survivalPts) //todo; toggle survival "lock"
        this.valMovement.updateLabel(this.pModel.calculateMovement())
        this.valAccuracy.updateLabel(this.pModel.calculateAccuracy())
        this.valStrength.updateLabel(this.pModel.calculateStrength())
        this.valEvasion.updateLabel(this.pModel.calculateEvasion())
        this.valLuck.updateLabel(this.pModel.calculateLuck())
        this.valSpeed.updateLabel(this.pModel.calculateSpeed())

        this.valBrain.updateLabel(this.pModel.calculateArmorLocation(SurvivorModel.LOCATIONS.brain))
        this.valHead.updateLabel(this.pModel.calculateArmorLocation(SurvivorModel.LOCATIONS.head))
        this.valArms.updateLabel(this.pModel.calculateArmorLocation(SurvivorModel.LOCATIONS.arms))
        this.valBody.updateLabel(this.pModel.calculateArmorLocation(SurvivorModel.LOCATIONS.body))
        this.valWaist.updateLabel(this.pModel.calculateArmorLocation(SurvivorModel.LOCATIONS.waist))
        this.valLegs.updateLabel(this.pModel.calculateArmorLocation(SurvivorModel.LOCATIONS.legs))

        this.valBrainL.updatePolygonFill( this.pModel.isWoundedLight(SurvivorModel.LOCATIONS.brain) ? "#FFFFFF" : "rgba(0,0,0,0)" )
        this.valHeadH.updatePolygonFill( this.pModel.isWoundedHeavy(SurvivorModel.LOCATIONS.head) ? "#FFFFFF" : "rgba(0,0,0,0)" )

        this.valArmsL.updatePolygonFill( this.pModel.isWoundedLight(SurvivorModel.LOCATIONS.arms) ? "#FFFFFF" : "rgba(0,0,0,0)" )
        this.valArmsH.updatePolygonFill( this.pModel.isWoundedHeavy(SurvivorModel.LOCATIONS.arms) ? "#FFFFFF" : "rgba(0,0,0,0)" )

        this.valBodyL.updatePolygonFill( this.pModel.isWoundedLight(SurvivorModel.LOCATIONS.body) ? "#FFFFFF" : "rgba(0,0,0,0)" )
        this.valBodyH.updatePolygonFill( this.pModel.isWoundedHeavy(SurvivorModel.LOCATIONS.body) ? "#FFFFFF" : "rgba(0,0,0,0)" )

        this.valWaistL.updatePolygonFill( this.pModel.isWoundedLight(SurvivorModel.LOCATIONS.waist) ? "#FFFFFF" : "rgba(0,0,0,0)" )
        this.valWaistH.updatePolygonFill( this.pModel.isWoundedHeavy(SurvivorModel.LOCATIONS.waist) ? "#FFFFFF" : "rgba(0,0,0,0)" )

        this.valLegsL.updatePolygonFill( this.pModel.isWoundedLight(SurvivorModel.LOCATIONS.legs) ? "#FFFFFF" : "rgba(0,0,0,0)" )
        this.valLegsH.updatePolygonFill( this.pModel.isWoundedHeavy(SurvivorModel.LOCATIONS.legs) ? "#FFFFFF" : "rgba(0,0,0,0)" )
    }

    _createArmorBox(name, makeLightBox, makeHeavyBox) { //, size, value) {
        var size = 40
        var value = 9

        var box = new NodeView()
        var sizeH = size/2
        var sizeW = sizeH * 0.8
        var sizeM = sizeH * 0.2
        box.setPolygon([ new Vec2D(-sizeW, -sizeH), new Vec2D(sizeW, -sizeH), new Vec2D(sizeW,sizeM), new Vec2D(0, sizeH), new Vec2D(-sizeW, sizeM) ], "#000000", "#FFFFFF" )
        box.size.setVal(size, size + 15) //+15 makes room for light/heavy wounds box
        
        var f1 = "24px Arial", f2 = "12px Arial"
        if (size < 40) {
            f1 = "12px Arial", f2 = "10px Arial"
        }

        var val = new NodeView()
        val.setLabel(value, f1, "#FFFFFF")
        box.addChild(val)
        val.pos.y += size/8

        var lbl = new NodeView()
        lbl.setLabel(name, f2, "#FFFFFF")
        box.addChild(lbl)
        lbl.snapToTopCenterOfParent(0, -(lbl.size.y/2 + 5))

        var light = null
        if (makeLightBox) {
            light = this._createFillBox(10, false, "#FFFFFF", "#FFFFFF", 2)
            box.addChild(light)
            light.snapToBottomLeftOfParent(5, 0)
        }
        var heavy = null
        if (makeHeavyBox) {
            heavy = this._createFillBox(10, false, "#FFFFFF", "#FFFFFF", 3)
            box.addChild(heavy)
            heavy.snapToBottomRightOfParent(-5, 0)
        }
        

        return { "root":box, "val":val, "lval":light, "hval":heavy }
    }

    // return { root:RootNode, val:ValueNode }
    _createValueBox(name, size, value) {
        var boxSurvival = new NodeView()
        var sizeH = size/2
        boxSurvival.setPolygon([ new Vec2D(-sizeH, -sizeH), new Vec2D(sizeH, -sizeH), new Vec2D(sizeH,sizeH), new Vec2D(-sizeH, sizeH) ], "#000000", "#FFFFFF" )
        boxSurvival.size.setVal(size, size)

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

    _createFillBox(size, filled, fillStyle, strokeStyle, strokeSize) {
        var box = new NodeView()
        var fill = fillStyle
        if (!filled) {
            fill = "rgba(0,0,0,0)"
        }
        var sizeH = size/2
        box.setPolygon([ new Vec2D(-sizeH, -sizeH), new Vec2D(sizeH, -sizeH), new Vec2D(sizeH,sizeH), new Vec2D(-sizeH, sizeH) ], fill, strokeStyle, strokeSize)
        box.size.setVal(sizeH * 2, sizeH * 2)
        return box
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