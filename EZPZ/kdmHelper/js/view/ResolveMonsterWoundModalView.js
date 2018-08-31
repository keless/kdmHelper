class ResolveMonsterWoundModalView extends ModalView {
    constructor(MWF, cardModels) {
        var screenSize = Graphics.ScreenSize
        super(screenSize.x, screenSize.y, "rgba(0,0,0,0)")
    
        this.modalView = null

        this.backImgPath = "gfx/imgs/WLimgHLBack.png" //todo: make this programattic

        this.topState = MWF
        this.pBattleStateModel = MWF.pBattleStateModel
        this.cardModels = cardModels

        var label = new NodeView()
        label.setLabel("Resolve Hits", "24px Arial", "#FFFFFF")
        this.addChild(label)
        label.snapToTopOfParent(10)

        this.cardAnchor = new NodeView()
        this.cardAnchor.size.setVal(112, 177)
        this.addChild(this.cardAnchor)
        this.cardAnchor.snapToBottomOfParent()
        this.currentCardView = null

        console.log("create ResolveMonsterWoundModalView")


        //show monster toughness, mvnt, spd, str
        var monsterModel = this.pBattleStateModel.monsterModel
        var lbl_t = new NodeView()
        lbl_t.setLabel("Toughness: " + monsterModel.getToughness(), "12px Arial", "#FFFFFF")
        this.addChild(lbl_t)
        lbl_t.snapToTopLeftOfParent(10)

        var lbl_m = new NodeView()
        lbl_m.setLabel("Movement: " + monsterModel.getMovement(), "12px Arial", "#FFFFFF")
        this.addChild(lbl_m)
        lbl_m.snapToBottomCenterOfSibling(lbl_t, 5)

        var lbl_d = new NodeView()
        lbl_d.setLabel("Damage: " + monsterModel.getDamage(), "12px Arial", "#FFFFFF")
        this.addChild(lbl_d)
        lbl_d.snapToBottomCenterOfSibling(lbl_m, 5)

        var lbl_s = new NodeView()
        lbl_s.setLabel("Speed: " + monsterModel.getSpeed(), "12px Arial", "#FFFFFF")
        this.addChild(lbl_s)
        lbl_s.snapToBottomCenterOfSibling(lbl_d, 5)

        //show monster HP
        var lbl_hp = new NodeView()
        lbl_hp.setLabel("Hit Points: " + this.pBattleStateModel.getMonsterHitPoints(), "12px Arial", "#FFFFFF")
        this.addChild(lbl_hp)
        lbl_hp.snapToBottomCenterOfSibling(lbl_s, 5)


        var lbl_instructions = new NodeView()
        lbl_instructions.setLabel("Roll dice and select result", "20px Arial", "#FFFFFF")
        this.addChild(lbl_instructions)
        lbl_instructions.snapToBottomOfSibling(label, 30)

        var btnWound = CreateSimpleButton("Wound", "btnWound")
        this.addChild(btnWound)
        btnWound.pos.y -= this.size.y/4

        var btnCrit = CreateSimpleButton("Critical", "btnCrit")
        this.addChild(btnCrit)
        btnCrit.snapToLeftCenterOfSibling(btnWound, -20)

        var btnFail = CreateSimpleButton("Failed", "btnFail")
        this.addChild(btnFail)
        btnFail.snapToRightCenterOfSibling(btnWound, 20)

        this.btnDone = CreateSimpleButton("Done", "btnDone")
        this.addChild(this.btnDone)
        this.btnDone.snapToBottomOfSibling(label)
        this.btnDone.snapToRightOfParent(-50)

        this.SetListener("btnDone", this.onBtnDone)
        this.SetListener("btnWound", this.onBtnWound)
        this.SetListener("btnCrit", this.onBtnCrit)
        this.SetListener("btnFail", this.onBtnFail)
        this.SetListener("btnReactionDone", this.onBtnReactionDone)

        this.showNextCard()
    }

    onBtnWound() {
        var cardModel = this.cardModels[0]

        if (!cardModel.isImpervious) {
            //subtract health
            var woundApplied = this.pBattleStateModel.woundTheMonsterAIDeck()

            //check if monster is dead
            if (!woundApplied) {
                //todo: monster died! game over!
                EventBus.game.dispatch("monsterDefeated")
                this.topState.onResolveMonsterWoundsComplete()
                return
            }
        }

        if(cardModel.hasReflex) {
            this.showInstruction("perform Reflex reaction")
        } else if (cardModel.hasWound) {
            this.showInstruction("perform Wound reaction")
        } else {
            this.finishedCurrentCard()
        }
    }

    onBtnCrit() {
        var cardModel = this.cardModels[0]
        if(!cardModel.hasCrit) {
            this.onBtnWound()
            return
        } else {
            //subtract health
            var woundApplied = this.pBattleStateModel.woundTheMonsterAIDeck()

            //handle crit (do this even if monster died, we might get a resource!)
            this.showInstruction("perform Critical reaction")

            //check if monster is dead
            if (!woundApplied) {
                //todo: monster died! game over!
                EventBus.game.dispatch("monsterDefeated")
                this.topState.onResolveMonsterWoundsComplete()
                return
            }

            if (cardModel.hasInjury) {
                //TODO: apply permanent injury status
                console.log("todo: apply permanent Injury status to monster")
            }

            return
        }
    }

    onBtnFail() {
        var cardModel = this.cardModels[0]
        if (cardModel.hasReflex) {
            this.showInstruction("perform Reflex reaction")
        } else if (cardModel.hasFailure) {
            this.showInstruction("perform Failure reaction")
        } else {
            this.finishedCurrentCard()
        }
    }

    showInstruction(msg) {
        console.log("show instruction: " + msg)
        var cardView = this.currentCardView
        cardView.removeFromParent(false)
        this.modalView = new PerformReactionModalView(msg, cardView)
        this.addChild(this.modalView)
    }

    onBtnReactionDone(e) {
        this.modalView.removeFromParent(true)
        this.modalView = null
        this.finishedCurrentCard()
    }

    finishedCurrentCard() {
        var card = this.cardModels.shift()
        //place card on the discard pile
        this.pBattleStateModel.discardHLCards([card])
        this.showNextCard()
    }

    showNextCard() {
        if (this.cardModels.length == 0) {
            //console.log("cant show next card, none left")
            this.topState.onResolveMonsterWoundsComplete()
            return
        }

        this.cardAnchor.removeAllChildren(true)

        var cardView = new CardView(this.cardModels[0], this.backImgPath)
        cardView.scale = 2
        this.cardAnchor.addChild(cardView)
        cardView.snapToBottomOfParent()
        this.currentCardView = cardView

        if (this.cardModels.length > 1) {
            var nextCard1 = new CardView(this.cardModels[1], this.backImgPath)
            this.cardAnchor.addChild(nextCard1)
            nextCard1.snapToRightOfSibling(cardView)
            
            if(this.cardModels.length > 2) {
                var nextCard2 = new CardView(this.cardModels[2], this.backImgPath)
                nextCard2.scale = 0.8
                this.cardAnchor.addChild(nextCard2)
                nextCard2.snapToBottomOfParent()
                nextCard2.snapToRightOfSibling(nextCard1)
            }

            nextCard1.bringToFrontOfSiblings()
        }
        cardView.bringToFrontOfSiblings()
    }

    onBtnDone(e) {
        //discard all the left over cards
        this.pBattleStateModel.discardHLCards(this.cardModels)

        this.topState.onResolveMonsterWoundsComplete()
    }
}

class PerformReactionModalView extends ModalView {
    constructor(title, cardView) {
        var screenSize = Graphics.ScreenSize
        super(screenSize.x * 0.8, screenSize.y * 0.8, "rgb(0,0,0)")

        this.addChild(cardView)
        cardView.pos.setVal(0,0)

        var label = new NodeView()
        label.setLabel(title, "24px Arial", "#FFFFFF")
        this.addChild(label)
        label.snapToTopCenterOfSibling(cardView, 10)

        var btnDone = CreateSimpleButton("Done", "btnReactionDone")
        this.addChild(btnDone)
        btnDone.snapToBottomCenterOfSibling(cardView, 10)
    }
}

class ResolveMonsterTrapModalView extends PerformReactionModalView {
    constructor(MWF, drawnCards) {
        var trapCardModel = drawnCards.find((e)=>{ return e.isTrap })
        var trapCardView = new CardView(trapCardModel, "gfx/imgs/WLimgHLBack.png")
        super("perform Trap reaction", trapCardView)
        this.topState = MWF
        this.pBattleStateModel = MWF.pBattleStateModel
        this.cardsToDiscard = drawnCards

        this.SetListener("btnReactionDone", this.onBtnReactionDone)
    }

    onBtnReactionDone(e) {
        this.pBattleStateModel.discardHLCards( this.cardsToDiscard )
        
        //shuffle HL+discard after trap
        this.pBattleStateModel.shuffleAllHLCardsTogether()

        this.topState.onResolveMonsterTrapComplete()
    }
}