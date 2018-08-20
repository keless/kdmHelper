class CardModel {
  constructor() {
    this.name = "Card"
    this.imgPath = ""
    this.faceUp = false
  }

  loadFromJson(json) {
    this.name = json.name
    this.imgPath = json.img
  }
}