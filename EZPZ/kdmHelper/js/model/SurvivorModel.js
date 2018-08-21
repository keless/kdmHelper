class SurvivorModel {
  constructor() {
    this.name = "Survivor"
  }

  loadFromJson(json) {
    this.name = json.name
  }

  saveToJson() {
    var json = {}
    json.name = this.name
    return json
  }
}