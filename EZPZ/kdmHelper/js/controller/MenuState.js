"use strict"; //ES6

class MenuState extends AppState {
	constructor() { 
		super();
		this.view = new MenuStateView();
	}
}

class MenuStateView extends BaseStateView {
	constructor() {
		super();

		// loads a specific test settlement
		var btnTest = new ButtonView("btnTest", "gfx/ui/btn_blue.sprite", "Test");
		btnTest.pos.setVal(-150, -150);
		this.rootView.addChild(btnTest);
		//btnTest.snapToBottomOfSibling(btnNew, 10)
		//btnTest.snapToSiblingX(btnNew)

		var saveData = Service.Get("sd")
		
		var above = btnTest
		var maxSaves = 5
		for (var i=0; i<maxSaves; i++) {
			// show continue + delete buttons
			var saveGameID = "save"+i
			var save = saveData.load(saveGameID, null)
			var hasSaveData = (save != null)
			var btnView = null
			if (hasSaveData) {
				btnView = new ButtonView("btnLoad", "gfx/ui/btn_blue.sprite", "Continue", null, null, {"saveGameID":saveGameID});
			} else {
				btnView = new ButtonView("btnNew", "gfx/ui/btn_blue.sprite", "New", null, null, {"saveGameID":saveGameID});
			}
			
			
			this.rootView.addChild(btnView);
			btnView.snapToBottomOfSibling(above, 10)
			btnView.snapToSiblingX(above)

			// delete button
			var btnDelete = new ButtonView("btnDel", "gfx/ui/btn_white_sm.sprite", "X", null, "#000000", {"saveGameID":saveGameID});
			this.rootView.addChild(btnDelete)
			btnDelete.snapToRightOfSibling(btnView, 10)
			btnDelete.snapToSiblingY(btnView)

			if (hasSaveData && save.settlement) {
				// basic save game info (year, population, last time played)
				var timeMS = save.lastPlayed * 1000
				var time = new Date(timeMS)

				var str = "Last Played: " + time.getMonth() + "/" + time.getDate() + "/" + time.getFullYear() + " " + time.getHours() + ":" + time.getMinutes()
				
				var gameYear = save.settlement.year 
				str += "  Year: " + gameYear

				var population = save.settlement.survivors.length
				str += "  Population: " + population
				
				var lastPlayedNode = new NodeView()
				lastPlayedNode.setLabel(str, "12px Arial", "#000000")
				this.rootView.addChild(lastPlayedNode)
				lastPlayedNode.snapToRightOfSibling(btnDelete, 10)
				lastPlayedNode.snapToSiblingY(btnDelete)
			}

			above = btnView
		}


		this.SetListener("btnTest", this.onBtnTest);
		this.SetListener("btnNew", this.onBtnNew);
		this.SetListener("btnLoad", this.onBtnLoad);
		this.SetListener("btnDel", this.onBtnDel);
	}
	
	onBtnTest() {
		Service.Get("state").gotoState("newgame", "test");
	}
	onBtnNew(e) {
		Service.Get("state").gotoState("newgame", e.saveGameID);
	}
	onBtnLoad(e) {
		Service.Get("state").gotoState("gameplay", e.saveGameID);
	}
	onBtnDel(e) {
		if (confirm("Are you sure you want to delete this save?")) {
			var save = Service.Get("sd").clear(e.saveGameID)
			Service.Get("state").gotoState("menu");
		}
	}
	
}