class GearGridView extends NodeView {
    constructor(model) {
        super()

        this.pModel = model

        var size = 300
        this.setRect(size, size, "#000000")

        //draw grid lines
        var sizeH = size/2
        var sizeP = size/6
        this.addChild( this._createLine( -sizeP, -sizeH, -sizeP,  sizeH ) )
        this.addChild( this._createLine(  sizeP, -sizeH,  sizeP,  sizeH ) )
        this.addChild( this._createLine( -sizeH, -sizeP,  sizeH, -sizeP ) )
        this.addChild( this._createLine( -sizeH,  sizeP,  sizeH,  sizeP ) )
    }

    _createLine( x1,y1, x2, y2) {
        var l1 = new NodeView()
        l1.setPolygon([new Vec2D(x1, y1), new Vec2D(x2, y2)], null, "#CCCCCC", 2)
        return l1
    }
}