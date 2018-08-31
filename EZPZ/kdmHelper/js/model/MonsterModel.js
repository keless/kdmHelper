class MonsterModel {
	constructor(name, level){
		this.name = name
		this.level = level

		var monsterRule = null
		for (var rule of g_decks["Rules"]) {
		  if (rule.monster == name && rule.level == level) {
			monsterRule = rule
		  }
		}

		this.base_toughness = monsterRule.tgh
		this.base_movement = monsterRule.mov
		this.base_speed = monsterRule.spd
		this.base_dmg = monsterRule.dmg

		//todo: should AI/HL + discard decks be stored inside of MonsterModel?
	}

	getToughness() {
		return this.base_toughness //todo: add token/injury modifiers
	}

	getMovement() {
		return this.base_movement //todo: add token/injury modifiers
	}

	getSpeed() {
		return this.base_speed //todo: add token/injury modifiers
	}

	getDamage() {
		return this.base_dmg //todo: add token/injury modifiers
	}

}