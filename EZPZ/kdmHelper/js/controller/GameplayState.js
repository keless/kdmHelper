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

		this._testInit()
	}

	_testInit() {
		this.loadForMonster("lion", 1)

	}

	loadForMonster(monsterName, level) {
		this.deckAI = new DeckAIModel()
		this.deckAI.createDeckForMonster(monsterName, level)
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
