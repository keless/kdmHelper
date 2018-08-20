
//TODO: differentiate back based on monster (lion/antelope/etc)  
//"gfx/imgs/WLimgAIBack.png"
//"gfx/imgs/WLimgHLBack.png"

class DeckView extends NodeView {
  constructor(model, backImgName) {
    super()

    this.size.setVal(112, 177)

    this.backImgName = backImgName
    this.updateFromModel(model)

    this.SetListener("updated", this.onModelUpdated.bind(this), model)
  }

  updateFromModel(model) {
    this.pModel = model

    this.removeAllChildren(true)

    var topCardModel = model.getTopCard()
    if (topCardModel) {
      this.topCardView = new CardView(topCardModel, this.backImgName)
      this.addChild(this.topCardView)

      this.badge = new NodeView()
      this.badge.setCircle(15, "#FF0000", "#FF0000")
      this.badge.pos.setVal(40, -70)
      this.addChild(this.badge)
  
      var numCards = model.getNumCards()
  
      this.badgeLabel = new NodeView()
      this.badgeLabel.setLabel("" + numCards, "20px Arial", "#FFFFFF")
      this.badgeLabel.pos.setVal(0, 6)
      this.badge.addChild(this.badgeLabel)
    }
  }

  onModelUpdated(e) {
    this.updateFromModel(this.pModel)
  }
}