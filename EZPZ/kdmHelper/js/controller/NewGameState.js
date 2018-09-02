class NewGameState extends AppState {
	constructor( saveGameID ) { 
        super()
        this.saveGameID = saveGameID
        this.view = new NewGameStateView(this)
        
        this.settlementModel = new SettlementModel()
    }
    
    beginCreateFirstSurvivors() {
        this.view.Destroy()

        this.view = new CreateFirstSurvivorsStateView(this.saveGameID, this.settlementModel)
    }
}

class NewGameStateView extends BaseStateView {
	constructor(gameState) {
		super()

        this.gameState = gameState

        var screenSize = Graphics.ScreenSize

        var bg = new NodeView()
        bg.setRect(screenSize.x, screenSize.y, "#AAAAAA")
        this.rootView.addChild(bg)
        bg.snapToTopLeftOfParent()

        var text = new NodeView()
        text.setLabel("intro story blah blah")
        bg.addChild(text)
        text.pos.y -= 100

		var btnSkip = new ButtonView("btnSkip", "gfx/ui/btn_blue.sprite", "It Begins");
        bg.addChild(btnSkip);


        this.SetListener("btnSkip", this.onBtnSkip)
    }

    onBtnSkip() {
        this.gameState.beginCreateFirstSurvivors()
    }
}

class CreateFirstSurvivorsStateView extends BaseStateView {
    constructor(saveGameID, settlementModel) {
        super()

        this.saveGameID = saveGameID

        this.settlementModel = settlementModel
        this.survivorModels = []

        this.modalView = new CreateSurvivorModalView(this.settlementModel, this.survivorModels.length)
        this.rootView.addChild(this.modalView)

        this.SetListener("createSurvivorCompleted", this.onBtnDone)
    }

    onBtnDone() {

        //1) push new survivor onto survivor models
        var survivorModel = this.modalView.survivorModel
        this.survivorModels.push(survivorModel)

        //2) if > 4, finish, else create next
        if (this.survivorModels.length < 4)  {
            this.modalView.removeFromParent(true)
            this.modalView = new CreateSurvivorModalView(this.settlementModel, this.survivorModels.length)
            this.rootView.addChild(this.modalView)
        } else {
            //apply to settlement
            this.settlementModel.survivors = this.survivorModels

            var saveData = Service.Get("sd")
            var settlementJson = this.settlementModel.saveToJson()
    
            var timeSeconds =  Math.round(new Date().getTime()/1000)
            var saveGame = { "lastPlayed":timeSeconds, "settlement":settlementJson }
    
            saveData.save(this.saveGameID, saveGame)

            Service.Get("state").gotoState("gameplay", this.saveGameID);
        }
    }
}