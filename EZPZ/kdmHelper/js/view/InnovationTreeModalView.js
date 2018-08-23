class InnovationTreeModalView extends ModalView {
  constructor(settlementModel) {
    var screenSize = Graphics.ScreenSize
    super(screenSize.x * 0.8, screenSize.y * 0.8)

    this.pModel = settlementModel

    this.radius = 90
    this.innovationsJson = g_decks["Innovations"]
    var firstInnovation = SettlementModel.INNOVATIONS.language

    var colors = [  "#444444", "#333333", "#222222"  ]
    for(var i=0; i<3; i++ ) {
      var c = new NodeView();
      c.setCircle(this.radius * (3-i), colors[i])
      this.addChild(c)
    }
    this._rCreateTreeLines(firstInnovation, new Vec2D(0,0), 0, 2 * Math.PI)

    
    var languageNode = this._createLabel(firstInnovation)
    this.addChild(languageNode)

    this._rCreateChildren(firstInnovation, languageNode, 0, 2 * Math.PI)
  }

  _rCreateTreeLines(innovation, predecessorPos, startThetaRad, arcWidthRad) {
    var innovationJson = this.innovationsJson.find((e)=> { return e.name == innovation; })
    if (!innovationJson.hasOwnProperty("unlocks")) {
      return
    }

    var radius = this.radius
    var unlocks = innovationJson.unlocks
    var numUnlocks = unlocks.length

    var radiansPer = arcWidthRad / numUnlocks

    //draw lines
    for(var i=0; i<numUnlocks; i++) {
      var theta = startThetaRad + (i*radiansPer)
      var x = Math.cos(theta) * radius;
      var y = Math.sin(theta) * radius;
      var childPos = new Vec2D(predecessorPos.x + x, predecessorPos.y + y)

      var connection = new NodeView()
      var arrVerts = [childPos, predecessorPos]
      var hasInnovation = this.pModel.hasInnovation(innovation)
      connection.setPolygon(arrVerts, null, hasInnovation ? "#AAAAAA" : "#666666", 5)
      this.addChild(connection)

      var childInnovation = unlocks[i]
      this._rCreateTreeLines(childInnovation, childPos, startThetaRad + (i*radiansPer), radiansPer*1.5)
    }
  }

  _rCreateChildren(innovation, predecessorNode, startThetaRad, arcWidthRad) {
    var innovationJson = this.innovationsJson.find((e)=> { return e.name == innovation; })
    if (!innovationJson.hasOwnProperty("unlocks")) {
      return
    }

    var radius = this.radius
    var unlocks = innovationJson.unlocks
    var numUnlocks = unlocks.length

    var radiansPer = arcWidthRad / numUnlocks

    //draw nodes
    for(var i=0; i<numUnlocks; i++) {
      var theta = startThetaRad + (i*radiansPer)
      var x = Math.cos(theta) * radius;
      var y = Math.sin(theta) * radius;
      var childPos = new Vec2D(predecessorNode.pos.x + x, predecessorNode.pos.y + y)

      var childInnovation = unlocks[i]
      var node = this._createLabel(childInnovation)
      this.addChild(node)

      node.pos.setVec( childPos )

      this._rCreateChildren(childInnovation, node, startThetaRad + (i*radiansPer), radiansPer*1.5)
    }
  }

  _createLabel(innovation) {
    var hasInnovation = this.pModel.hasInnovation(innovation)
    var node = new NodeView()
    node.setLabelWithOutline(innovation, "12px Arial", hasInnovation ? "#FFFFFF" : "#777777", "#000000", 3)

    return node
  }
}