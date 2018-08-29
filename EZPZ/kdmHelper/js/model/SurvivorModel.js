class SurvivorModel {
  constructor() {
    this.name = "Survivor"
    this.isMale = false
    this.survivalPts = 0
    this.huntXP = 0

    this.weaponProficiency = null
    this.weaponXP = 0

    this.courage = 0
    this.courageSpecialty = null
    this.understanding = 0
    this.understandingSpecialty = null

    this.fightingArts = [] //string array
    this.disorders = [] //string array
    this.permanentInjuries = []
    this.abilities = []

    this.serializeSimpleValues = ["name", "isMale", "survivalPts", "huntXP", "fightingArts", "disorders", "permanentInjuries", "abilities", "weaponProficiency", "weaponXP", "courage", "courageSpecialty", "understanding", "understandingSpecialty"]

    //unserialized variables
    this.tokens = []
    this.temporaryInjuries = []
  }

  calculateMovement() {
    //todo: sum all modifiers (injuries, gear, tokens, etc)
    return 5;
  }

  calculateAccuracy() {
    //todo: sum all modifiers (injuries, gear, tokens, etc)
    return 0;
  }

  calculateStrength() {
    //todo: sum all modifiers (injuries, gear, tokens, etc)
    return 0;
  }

  calculateEvasion() {
    //todo: sum all modifiers (injuries, gear, tokens, etc)
    return 0;
  }
  
  calculateLuck() {
    //todo: sum all modifiers (injuries, gear, tokens, etc)
    return 0;
  }

  calculateSpeed() {
    //todo: sum all modifiers (injuries, gear, tokens, etc)
    return 0;
  }

  calculateArmorLocation( location ) {
    switch(location) {
      //todo: sum all modifiers for location (armor, setbonus, damage)
      default:
        return 0
    }
  }

  isWoundedHeavy( location ) {
    switch(location) {
      case SurvivorModel.LOCATIONS.brain:
        return false //brain cant have a 'heavy' wound
      break;
      //todo: set for each location
      default:
        return false
    }
  }

  isWoundedLight( location ) {
    switch(location) {
      case SurvivorModel.LOCATIONS.head:
        return false //head cant have a 'light' wound
      break;
      //todo: set for each location
      default:
        return false
    }
  }

  loadFromJson(json) {
    this._setSimpleValues(this, json, this.serializeSimpleValues)
  }

  saveToJson() {
    var json = {}
    this._setSimpleValues(json, this, this.serializeSimpleValues)
    return json
  }

  _setSimpleValues(obj1, obj2, arrValues) {
    for(var value of arrValues) {
      if (!obj2.hasOwnProperty(value)) {
        console.error("cannot _setSimpleValues for missing property " + value)
        continue
      }

      obj1[value] = obj2[value]
    }
  }
}

SurvivorModel.MAX_XP = 16

SurvivorModel.MAX_WEAPON_XP = 8

SurvivorModel.MAX_COURAGE = 9

SurvivorModel.MAX_UNDERSTANDING = 9

SurvivorModel.LOCATIONS = Object.freeze({
  "head":"Head",
  "body":"Body",
  "arms":"Arms",
  "waist":"Waist",
  "legs":"Legs",
  "brain":"Brain"
})