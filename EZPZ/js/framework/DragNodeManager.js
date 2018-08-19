"use strict"; //ES6

/**
 * DragNodeManager is used to perform drag-and-drop of NodeView objects within EZPZ engine
 *  (note: it has nothing to do with Browser drag-and-drop functionality)
 * 
 * When a drag action begins, a node is given as the drag target - it is removed from its parent (if any), and its position is set to (0,0)
 *  if you wish the original node to remain where it is, you should create a visual copy of the node to give to the DragNodeManager
 * 
 * If a drag action is cancelled, the drag target will be re-attached to the drag parent and its position will be reset
 *  a drag cancelled function will be called if provided
 * 
 * If a drag action is completed, a drag completed function will be called, and the drag target sent to the function as a parameter
 * 
 * If fnStatusUpdate(bool) is set, on mouseMove the DragNodeManager will run testDragDrop and send in the result so that the dragging node
 *  can update its graphics to indicate potential drop success/failure to the user
 * 
 */

class DragTransaction {
    constructor(reason, data, node, parent, toRoot, startPos, fnComplete, fnCancel, fnStatusUpdate) {
        this.receivingRootNode = toRoot

        this.dragReason = reason
        this.dragData = data
        this.dragNode = node
        this.originalDragParent = parent
        this.originalDragPos = startPos ? startPos.clone() : new Vec2D()

        this.fnOnDragComplete = fnComplete || null
        this.fnOnDragCancelled = fnCancel || null
        this.fnOnStatusUpdate = fnStatusUpdate || null
    }

    complete() {
        if (this.fnOnDragComplete) {
            this.fnOnDragComplete(this.dragNode)
        }
    }

    cancel() {
        if (this.originalDragParent) {
            // restore node to original parent
            this.dragNode.pos.setVec(this.originalDragPos)
            this.originalDragParent.addChild(this.dragNode)
        }

        if (this.fnOnDragCancelled) {
            this.fnOnDragCancelled(this.dragNode)
        }
    }
}

class DragNodeManager {
    constructor() {
        this.currentDragTransaction = null

        EventBus.ui.addListener("onMouseUp", this.onMouseUp.bind(this) )
        EventBus.ui.addListener("onMouseMove", this.onMouseMove.bind(this) )

        Service.Add("drag", this)
    }
    
    StartDrag( reason, data, node, toRootNode, fnComplete, fnCancel, fnUpdate ) {
        if (this.currentDragTransaction != null) {
            console.warn("starting drag while another drag action is already running -- ignoring request")
            return
        }

        if (!toRootNode) {
            console.error("cannot start a drag without a valid toRootNode")
            return
        }

        var parent = node.parent
        var pos = node.pos

        if (parent) {
            node.removeFromParent(parent, false)
        }

        this.currentDragTransaction = new DragTransaction( reason, data, node, parent, toRootNode, pos, fnComplete, fnCancel, fnUpdate )
    }

    onMouseMove(e) {
        if (this.currentDragTransaction && this.currentDragTransaction.fnOnStatusUpdate != null) {
            var transaction = this.currentDragTransaction

            // update to latest mouse position for accuracy
            var node = transaction.dragNode
            var lastMousePos = Application.getLastMousePosition()
            node.pos.setVec(lastMousePos)

            var root = transaction.receivingRootNode
            var canDrop = root.testDragDrop(transaction.dragReason, transaction.dragData, node, node.pos.x, node.pos.y)
            //console.log("dragdrop update - " + (canDrop ? "success" : "cant" ))
            transaction.fnOnStatusUpdate(canDrop)
        }
    }

    onMouseUp(e) {
        if (this.currentDragTransaction) {
            var transaction = this.currentDragTransaction

            // update to latest mouse position for accuracy
            var node = transaction.dragNode
            var lastMousePos = Application.getLastMousePosition()
            node.pos.setVec(lastMousePos)
            
            //attempt to drop onto root UI view
            var root = transaction.receivingRootNode
            if (root.testDragDrop(transaction.dragReason, transaction.dragData, node, node.pos.x, node.pos.y)) {
                var receivingNode = root.handleDragDrop(transaction.dragReason, transaction.dragData, node, node.pos.x, node.pos.y)
                if (receivingNode) {
                    this.CompleteDrag()
                } else {
                    this.CancelDrag()
                }
            } else {
                this.CancelDrag()
            }

        }
    }

    CompleteDrag() {
        if (!this.currentDragTransaction) {
            console.warn("CompleteDrag() called, but no drag transaction exists")
            return
        }

        this.currentDragTransaction.complete()
        this.currentDragTransaction = null
    }

    CancelDrag() {
        if (!this.currentDragTransaction) {
            console.warn("CancelDrag() called, but no drag transaction exists")
            return
        }

        console.log("cancel ")

        this.currentDragTransaction.cancel()
        this.currentDragTransaction = null
    }

    Draw( gfx, x, y, ct ) {
        if (this.currentDragTransaction) {
            var node = this.currentDragTransaction.dragNode
            var lastMousePos = Application.getLastMousePosition()
            node.pos.setVec(lastMousePos)
            node.Draw(gfx, x, y, ct)
        }
    }
}