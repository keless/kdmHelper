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
		var RP = Service.Get("rp");
		var sprBtnBlue = RP.getSprite("gfx/ui/btn_blue.sprite");
		


		// loads a specific test settlement
		var btnTest = new ButtonView("btnTest", sprBtnBlue, "Test");
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
			btnView = new ButtonView("btnNew"+i, sprBtnBlue, hasSaveData ? "Continue" : "New");
			//TODO; add delete button to the right of this
			this.rootView.addChild(btnView);
			btnView.snapToBottomOfSibling(above, 10)
			btnView.snapToSiblingX(above)
			above = btnView
		}


		this.SetListener("btnTest", this.onBtnTest);
		this.SetListener("btnNew0", this.onBtnNew0);
		this.SetListener("btnNew1", this.onBtnNew1);
		this.SetListener("btnNew2", this.onBtnNew2);
		this.SetListener("btnNew3", this.onBtnNew3);
		this.SetListener("btnNew4", this.onBtnNew4);
	}
	
	onBtnTest() {
		Service.Get("state").gotoState("gameplay", "test");
	}
	onBtnNew0() {
		Service.Get("state").gotoState("gameplay", "save0");
	}
	onBtnNew1() {
		Service.Get("state").gotoState("gameplay", "save1");
	}
	onBtnNew2() {
		Service.Get("state").gotoState("gameplay", "save2");
	}
	onBtnNew3() {
		Service.Get("state").gotoState("gameplay", "save3");
	}
	onBtnNew4() {
		Service.Get("state").gotoState("gameplay", "save4");
	}
}