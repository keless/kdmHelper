
//TODO: differentiate back based on monster (lion/antelope/etc)  
//"gfx/imgs/WLimgAIBack.png"
//"gfx/imgs/WLimgHLBack.png"

class DeckView extends NodeView {
  constructor(model, backImgName) {
    super()

    this.backImgName = backImgName
    this.updateFromModel(model)
  }

  updateFromModel(model) {
    this.pModel = model

    var topCardModel = model.getTopCard()
    this.topCardView = new CardView(topCardModel, this.backImgName)
    this.addChild(this.topCardView)

    //todo: flip card?

    this.badge = new NodeView()
    this.badge.setCircle(20, "#FF0000", "#FF0000")
    this.badge.pos.setVal(100, 20)
    this.addChild(this.badge)

    var numCards = model.getNumCards()

    this.badgeLabel = new NodeView()
    this.badgeLabel.setLabel("" + numCards, "Arial 12pt", "#FFFFFF")
    this.badgeLabel.pos.setVal(0, 10)
    this.badge.addChild(this.badgeLabel)
  }


}