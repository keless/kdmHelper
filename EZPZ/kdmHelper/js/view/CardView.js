
class CardView extends NodeView {
  constructor(model, backImgName) {
    super()

    this.pModel = model
    this.sprBack = null
    this.sprFront = null

    // CardViews always start "face down"
    this.loadBack(backImgName)
    this.size.setVec(this.sprBack.size)
    this.loadFront()

    if (this.pModel.faceUp) {
      this.sprFront.visible = true
      //xxx this.sprBack.visible = false
    }
  }

  loadBack(img) {
    this.sprBack = new NodeView()
    this.sprBack.setImageStretch(img, 112, 177)
    this.addChild(this.sprBack)
  }

  loadFront() {
    var RP = Service.Get("rp")
    this.sprFront = new NodeView()
    this.sprFront.setRect(this.sprBack.size.x, this.sprBack.size.y, "rgba(200,100,200, 0.5)")

    var self = this
    RP.loadImage(this.pModel.imgPath, (e)=> {
//xxx      self.sprFront.setImageStretch(self.pModel.imgPath, 0,0, 112, 177)
    })

    this.sprFront.visible = false
    this.addChild(this.sprFront)
  }
}
