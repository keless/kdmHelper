
class CardView extends NodeView {
  constructor(model, backImgName) {
    super()

    this.pModel = model
    this.sprBack = null
    this.sprFront = null

    // CardViews always start "face down"
    this.loadBack(backImgName)
    this.loadFront()
  }

  flipCard() {
    this.sprBack.visible = !this.sprBack.visible
    this.sprFront.visible = !this.sprFront.visible
  }

  isFacingUp() {
    return this.sprFront.visible
  }

  loadBack(img) {
    this.sprBack = new NodeView()
    this.sprBack.setImageStretch(img, 0,0, 112, 177)
    this.addChild(this.sprBack)
  }

  loadFront() {
    var RP = Service.Get("rp")
    this.sprFront = new NodeView()
    this.sprFront.setRect(112, 177, "#CCAACC")

    var self = this
    RP.loadImage(this.pModel.imgPath, (e)=> {
      self.sprFront.setImageStretch(self.pModel.imgPath, 0,0, 112, 177)
    })

    this.sprFront.visible = false
    this.addChild(this.sprFront)
  }
}
