
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
  }
}