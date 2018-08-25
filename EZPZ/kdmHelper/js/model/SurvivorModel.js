class SurvivorModel {
  constructor() {
    this.name = "Survivor"
    this.isMale = false
    this.survivalPts = 0
  }

  loadFromJson(json) {
    this._setSimpleValues(this, json, ["name", "isMale", "survivalPts"])
  }

  saveToJson() {
    var json = {}
    this._setSimpleValues(json, this, ["name", "isMale", "survivalPts"])
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