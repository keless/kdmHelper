class ModalView extends NodeView {
    constructor(w, h, fillStyle, dontDismissWhenClickingOutside) {
        super()

        fillStyle = fillStyle || "#222222"

        // Make modal: size of whole screen, and eats clicks
        var screenSize = Graphics.ScreenSize
        this.setRect(screenSize.x, screenSize.y, "rgba(0,0,0,0.45)")

        if (dontDismissWhenClickingOutside) {
            //note: make sure there is _some_ way to dismiss the view
            this.eatClicks()
        } else {
            this.setClick(()=>{ self.onBtnClose() }, true, true)
        }
        
        this.contentView = new NodeView()
        this.contentView.setRect(w, h, fillStyle)
        var self = this
        this.contentView.eatClicks()
        super.addChild(this.contentView)
    }

    // because we're modal, we want our views to be added to the contentView only
    addChild(child) {
        this.contentView.addChild(child)
    }

    onBtnClose() {
        this.willCloseModal()

        // signal to whoever is holding the modal that it should be released
        EventBus.ui.dispatch("closeModalView")
    }

    willCloseModal() {
        //subclasses should override this if they need to clean up on closing
    }
}