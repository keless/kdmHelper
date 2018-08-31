class CardHLModel extends CardModel {
  constructor() {
    super()

    this.hasFailure = false //monster reaction when wound fails
    this.hasCrit = false    //monster can be crit
    this.hasInjury = false  //permanent injury state if crit
    this.hasWound = false   //monster reaction when wound succeeds
    this.hasReflex = false  //monster reaction if no crit

    this.isImpervious = false
    this.isFirstStrike = false
    this.isDense = false
    this.isTrap = false

    this.monster = ""
  }

  loadFromJson(json) {
    super.loadFromJson(json)

    this.monster = json.monster

    this.hasFailure = (json.failure == 1)
    this.hasCrit = (json.crit == 1)
    this.hasInjury = (json.injury == 1)
    this.hasWound = (json.wound == 1)
    this.hasReflex = (json.reflex == 1)

    this.isImpervious = (json.impervious == 1)
    this.isFirstStrike = (json.first_strike == 1)
    this.isDense = (json.dense == 1)
    this.isTrap = (json.trap == 1)
  }
}