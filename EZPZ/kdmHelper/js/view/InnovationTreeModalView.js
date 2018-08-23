class InnovationTreeModalView extends ModalView {
  constructor(settlementModel) {
    var screenSize = Graphics.ScreenSize
    super(screenSize.x * 0.8, screenSize.y * 0.8)

    this.pModel = settlementModel
    this.innovationsJson = g_decks["Innovations"]

    var firstInnovation = SettlementModel.INNOVATIONS.language
    var languageNode = this._createLabel(firstInnovation)
    this.addChild(languageNode)
    languageNode.snapToTopOfParent(5)

    this._rCreateChildren(firstInnovation, languageNode, this.contentView.size.x)
  }

  _rCreateChildren(innovation, predecessorNode, branchWidth) {
    var innovationJson = this.innovationsJson.find((e)=> { return e.name == innovation; })
    if (!innovationJson.hasOwnProperty("unlocks")) {
      return
    }

    var unlocks = innovationJson.unlocks

    var segmentWidth = (branchWidth/(unlocks.length+1))
    for(var i=0; i<unlocks.length; i++) {
      var childInnovation = unlocks[i]
      var node = this._createLabel(childInnovation)
      this.addChild(node)

      node.snapToBottomOfSibling(predecessorNode, 50 + i*10)
      node.snapToSiblingX(predecessorNode, -(branchWidth/2) + (i+1)*segmentWidth )

      this._rCreateChildren(childInnovation, node, segmentWidth)
    }
  }

  _createLabel(innovation) {
    var hasInnovation = this.pModel.hasInnovation(innovation)
    var node = new NodeView()
    node.setLabel(innovation, "12px Arial", hasInnovation ? "#FFFFFF" : "#777777")

    return node
  }
}