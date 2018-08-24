class NewGameState extends AppState {
	constructor( saveGameID ) { 
		super();
		this.view = new NewGameStateView(saveGameID);
	}
}

class NewGameStateView extends BaseStateView {
	constructor(saveGameID) {
		super();

        this.saveGameID = saveGameID
        var screenSize = Graphics.ScreenSize

        var bg = new NodeView()
        bg.setRect(screenSize.x, screenSize.y, "#AAAAAA")
        this.rootView.addChild(bg)
        bg.snapToTopLeftOfParent()


        var text = new NodeView()
        text.setLabel("intro story blah blah")
        bg.addChild(text)
        text.pos.y -= 100

		var btnSkip = new ButtonView("btnSkip", "gfx/ui/btn_blue.sprite", "skip");
        bg.addChild(btnSkip);


        this.SetListener("btnSkip", this.onBtnSkip)
    }

    onBtnSkip() {
        Service.Get("state").gotoState("gameplay", this.saveGameID);
    }
}