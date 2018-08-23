
class SettlementModel {
    constructor() {
        this.name = "settlement name"
        this.survivors = []

        this.resources = [] // { name:"Monster Bone", count:1 }
        this.gear = [] // { name:"Bone Blade", count:1 }

        this.year = 0
        this.graveyard = []

        this.survivalLimit = 1
        this.departingSurvival = 0

        this.locations = []
        this.improvements = []
        this.innovations = [ "language" ]
    }

    _testCreateSurvivors() {
        for (var i=0; i<4; i++) {
            var s1 = new SurvivorModel()
            s1.name = "Player " + (1 + i)
            this.survivors.push(s1)
        }
    }

    _testCreateResources() {
        this.resources.push( { name:"Monster Bone", count:5 })
        this.resources.push( { name:"Organ", count:1 })
        this.resources.push( { name:"???", count:1 })
    }

    _testSetPrincipals() {
        this.innovations.push(SettlementModel.INNOVATIONS.protectTheYoung)
    }

    hasInnovation( innovation ) {
        return this.innovations.includes(innovation)
    }

    addInnovation( innovation ) {
        if (this.innovations.includes(innovation)) {
            console.warn("settlement already has innovation " + innovation)
            return
        }
        this.innovations.push(innovation)
    }

    hasImprovement( improvement ) {
        return this.improvements.includes(improvement)
    }

    buildImprovement( improvement ) {
        //todo; extract cost of improvement (usually materials + innovation token)
    }

    hasMilestoneFirstBirth() {
        return this.hasInnovation(INNOVATIONS.protectTheYoung) || this.hasInnovation(INNOVATIONS.survivalOfTheFittest)
    }

    hasMilestoneFirstDeath() {
        return this.hasInnovation(INNOVATIONS.cannibalize) || this.hasInnovation(INNOVATIONS.graves)
    }

    hasMilestoneSociety() {
        return this.hasInnovation(INNOVATIONS.collectiveToll) || this.hasInnovation(INNOVATIONS.acceptTheDarkness)
    }

    hasMilestoneConviction() {
        return this.hasInnovation(INNOVATIONS.barbaric) || this.hasInnovation(INNOVATIONS.romantic)
    }

    get population() {
        return this.survivors.length
    }

    get deathCount() {
        return this.graveyard.length
    }

    loadFromJson(json) {
        this.name = json.name
        this.year = json.year
        this.survivalLimit = json.survivalLimit
        this.departingSurvival = json.departingSurvival

        for (var survivorJson of json.survivors) {
            var survivor = new SurvivorModel()
            survivor.loadFromJson(survivorJson)
            this.survivors.push(survivor)
        }

        for (var graveyardJson of json.graveyard) {
            var grave = new SurvivorModel()
            grave.loadFromJson(graveyardJson)
            this.graveyard.push(grave)
        }

        this.resources = json.resources
        this.gear = json.gear
        this.locations = json.locations
        this.improvements = json.improvements
        this.innovations = json.innovations
    }

    saveToJson() {
        var json = {}
        json.name = this.name
        json.year = this.year
        json.survivalLimit = this.survivalLimit
        json.departingSurvival = this.departingSurvival

        var survivorsJson = []
        for (var survivor of this.survivors) {
            var survivorJson = survivor.saveToJson()
            survivorsJson.push(survivorJson)
        }
        json.survivors = survivorsJson

        var graveyardJson = []
        for (var grave of this.graveyard) {
            var graveJson = grave.saveToJson()
            graveyardJson.push(graveJson)
        }
        json.graveyard = graveyardJson

        json.resources = this.resources
        json.gear = this.gear
        json.locations = this.locations
        json.improvements = this.improvements
        json.innovations = this.innovations

        return json
    }
}

SettlementModel.INNOVATIONS = Object.freeze({

    "ammonia": "Ammonia",
    "bed": "Bed",
    "bloodletting": "Bloodletting",
    "drums": "Drums",
    "facePainting": "Face Painting",
    "family": "Family",
    "forbiddenDance": "Forbidden Dance",
    "heartFlute": "Heart Flute",
    "hovel": "Hovel",
    "innerLantern": "Inner Lantern",
    "language": "Language",
    "lanternOven": "Lantern Oven",
    "nightmareTraining": "Nightmare Training",
    "partnership": "Partnership",
    "pictograph": "Pictograph",
    "pottery": "Pottery",
    "paint": "Paint",
    "scrapSmelting": "Scrap Smelting",
    "records": "Records",
    "saga": "Saga",
    "scarification": "Scarification",
    "sculpture": "Sculpture",
    "songOfTheBrave": "Song of the Brave",
    "symposium": "Symposum",

    /// Principals
    "protectTheYoung": "Protect the Young",
    "survivalOfTheFittest": "Survival of the Fittest",
    "cannibalize": "Cannibalize",
    "graves": "Graves",
    "collectiveToll": "Collective Toll",
    "acceptTheDarkness": "Accept the Darkness",
    "barbaric": "Barbaric",
    "romantic": "Romantic"
})

SettlementModel.UNLOCK_TREE = Object.freeze({
    "language":[ SettlementModel.INNOVATIONS.ammonia, SettlementModel.INNOVATIONS.drums, SettlementModel.INNOVATIONS.hovel, SettlementModel.INNOVATIONS.innerLantern, SettlementModel.INNOVATIONS.paint, SettlementModel.INNOVATIONS.symposium ],
    "ammonia":[ SettlementModel.INNOVATIONS.bloodletting, SettlementModel.INNOVATIONS.lanternOven ],
    "drums": [ SettlementModel.INNOVATIONS.forbiddenDance, SettlementModel.INNOVATIONS.songOfTheBrave ],
    "forbiddenDance" : [ SettlementModel.INNOVATIONS.heartFlute ],
})