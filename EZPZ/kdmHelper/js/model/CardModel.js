class CardModel {
  constructor() {
    this.name = "Card"
    this.imgPath = ""
  }

  loadFromJson(json) {
    this.name = json.name
    this.imgPath = json.img
  }
}