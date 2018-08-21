"use strict"; //ES6

class GameplayState extends AppState {
	constructor() { 
		super();
		this.model = new GameplayStateModel(this);
		this.view = new GameplayStateView(this.model);
	}
	
}

// conforms to ICastPhysics 
class GameplayStateModel extends BaseStateModel {
	constructor( state ) {
		super()
		
		this.pState = state
		this.deckAI = null
		this.deckAIDiscard = new DeckModel()
		this.deckHL = null
		this.deckHLDiscard = new DeckModel()

		this.settlement = new SettlementModel()

		this._testInit()

		this.SetListener("hlDeckClicked", this.onHLDeckClicked)
		this.SetListener("aiDeckClicked", this.onAIDeckClicked)
	}

	_testInit() {
		this.loadForMonster("lion", 1)
	}

	loadForMonster(monsterName, level) {
		this.deckAI = new DeckAIModel()
		this.deckAI.createDeckForMonster(monsterName, level)

		this.deckHL = new DeckHLModel()
		this.deckHL.createDeckForMonster(monsterName)
	}

	onHLDeckClicked(e) {
		console.log("hit location deck clicked")
		//pull a cardout of HL and discard it
		if (this.deckHL.getNumCards() > 0) {
			var card = this.deckHL.drawXCards(1)[0]
			card.faceUp = true
			this.deckHLDiscard.placeOnTop(card)
		} else {
			console.log("deck empty, aborting")
		}
	}

	onAIDeckClicked(e) {
		console.log("AI deck clicked")
		//pull a cardout of HL and discard it
		if (this.deckAI.getNumCards() > 0) {
			var card = this.deckAI.drawXCards(1)[0]
			card.faceUp = true
			this.deckAIDiscard.placeOnTop(card)
		} else {
			console.log("deck empty, aborting")
		}
	}

	Destroy() {
		super.Destroy()
	}
	
	Update(ct, dt) {
		super.Update(ct, dt);
		
		/*
		for( var e of this.entities ) {
			e.Update(ct, dt);
		}
		*/
	}
}
