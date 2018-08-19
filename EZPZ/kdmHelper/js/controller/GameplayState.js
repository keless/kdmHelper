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
	}

	Destroy() {
		for( var e of this.entities ) {
			e.Destroy()
		}

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
