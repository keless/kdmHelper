class CardAIModel extends CardModel {
  constructor() {
    super("AI")

    this.isMood = false
  }

  loadFromJson(json) {
    super.loadFromJson(json)
    this.isMood = (json.mood == 1)
  }
}