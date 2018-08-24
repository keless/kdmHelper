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
		btnTest.pos.setVal(150, 150);
		this.rootView.addChild(btnTest);
		//btnTest.snapToBottomOfSibling(btnNew, 10)
		//btnTest.snapToSiblingX(btnNew)

		var saveData = Service.Get("sd")
		
		var above = btnTest
		var maxSaves = 5
		for (var i=0; i<maxSaves; i++) {
			// show continue + delete buttons
			var save = saveData.load("save"+i, null)
			var hasSaveData = (save != null)
			var btnView = null
			btnView = new ButtonView("btnNew"+i, "gfx/ui/btn_blue.sprite", hasSaveData ? "Continue" : "New");
			
			this.rootView.addChild(btnView);
			btnView.snapToBottomOfSibling(above, 10)
			btnView.snapToSiblingX(above)

			// delete button
			var btnDelete = new ButtonView("btnDel"+i, "gfx/ui/btn_white_sm.sprite", "X", null, "#000000");
			this.rootView.addChild(btnDelete)
			btnDelete.snapToRightOfSibling(btnView, 10)
			btnDelete.snapToSiblingY(btnView)

			if (hasSaveData) {
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
		this.SetListener("btnNew0", this.onBtnNew0);
		this.SetListener("btnNew1", this.onBtnNew1);
		this.SetListener("btnNew2", this.onBtnNew2);
		this.SetListener("btnNew3", this.onBtnNew3);
		this.SetListener("btnNew4", this.onBtnNew4);

		this.SetListener("btnDel0", this.onBtnDel0);
		this.SetListener("btnDel1", this.onBtnDel1);
		this.SetListener("btnDel2", this.onBtnDel2);
		this.SetListener("btnDel3", this.onBtnDel3);
		this.SetListener("btnDel4", this.onBtnDel4);
	}
	
	onBtnTest() {
		Service.Get("state").gotoState("newgame", "test");
	}
	onBtnNew0() {
		Service.Get("state").gotoState("newgame", "save0");
	}
	onBtnNew1() {
		Service.Get("state").gotoState("newgame", "save1");
	}
	onBtnNew2() {
		Service.Get("state").gotoState("newgame", "save2");
	}
	onBtnNew3() {
		Service.Get("state").gotoState("newgame", "save3");
	}
	onBtnNew4() {
		Service.Get("state").gotoState("newgame", "save4");
	}

	onBtnDel0() {
		var save = Service.Get("sd").clear("save0")
		Service.Get("state").gotoState("menu");
	}
	onBtnDel1() {
		var save = Service.Get("sd").clear("save1")
		Service.Get("state").gotoState("menu");
	}
	onBtnDel2() {
		var save = Service.Get("sd").clear("save2")
		Service.Get("state").gotoState("menu");
	}
	onBtnDel3() {
		var save = Service.Get("sd").clear("save3")
		Service.Get("state").gotoState("menu");
	}
	onBtnDel4() {
		var save = Service.Get("sd").clear("save4")
		Service.Get("state").gotoState("menu");
	}
}