
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

    //temporarily add helper info 
    var lbl = new NodeView()
    lbl.setLabelWithOutline(model.name, "12px Arial")
    this.sprFront.addChild(lbl)
    lbl.snapToTopCenterOfParent(5)

    var prev =  lbl

    if (model.hasReflex) {
      var lblNode = this._tempCreateAttributeLabel("reflex")
      this.sprFront.addChild(lblNode)
      lblNode.snapToBottomCenterOfSibling(prev, 5)
      prev = lblNode
    }
    if (model.hasWound) {
      var lblNode = this._tempCreateAttributeLabel("wound")
      this.sprFront.addChild(lblNode)
      lblNode.snapToBottomCenterOfSibling(prev, 5)
      prev = lblNode
    }
    if (model.hasFailure) {
      var lblNode = this._tempCreateAttributeLabel("failure")
      this.sprFront.addChild(lblNode)
      lblNode.snapToBottomCenterOfSibling(prev, 5)
      prev = lblNode
    }
    if (model.hasCrit) {
      var lblNode = this._tempCreateAttributeLabel("crit")
      this.sprFront.addChild(lblNode)
      lblNode.snapToBottomCenterOfSibling(prev, 5)
      prev = lblNode
    }
    if (model.isImpervious) {
      var lblNode = this._tempCreateAttributeLabel("impervious")
      this.sprFront.addChild(lblNode)
      lblNode.snapToBottomCenterOfSibling(prev, 5)
      prev = lblNode
    }
    if (model.hasInjury) {
      var lblNode = this._tempCreateAttributeLabel("injury")
      this.sprFront.addChild(lblNode)
      lblNode.snapToBottomCenterOfSibling(prev, 5)
      prev = lblNode
    }
    if (model.isTrap) {
      var lblNode = this._tempCreateAttributeLabel("trap")
      this.sprFront.addChild(lblNode)
      lblNode.snapToBottomCenterOfSibling(prev, 5)
      prev = lblNode
    }

  }

  _tempCreateAttributeLabel(name) {
    var lblNode = new NodeView()
    lblNode.setLabelWithOutline(name, "10px Arial")
    return lblNode
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
      self.sprFront.setImageStretch(self.pModel.imgPath, 0,0, 112, 177)
    })

    this.sprFront.visible = false
    this.addChild(this.sprFront)
  }
}
