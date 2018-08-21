

class SettlementModel {
    constructor() {
        this.name = "settlement name"
        this.survivors = []

        this.year = 0
        this.graveyard = []

        this.survivalLimit = 1
        this.departingSurvival = 0

        this.improvements = []
        this.innovations = [ "language" ]
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
        return this.hasPrincipal(INNOVATIONS.protectTheYoung) || this.hasPrincipal(INNOVATIONS.survivalOfTheFittest)
    }

    hasMilestoneFirstDeath() {
        return this.hasPrincipal(INNOVATIONS.cannibalize) || this.hasPrincipal(INNOVATIONS.graves)
    }

    hasMilestoneSociety() {
        return this.hasPrincipal(INNOVATIONS.collectiveToll) || this.hasPrincipal(INNOVATIONS.acceptTheDarkness)
    }

    hasMilestoneConviction() {
        return this.hasPrincipal(INNOVATIONS.barbaric) || this.hasPrincipal(INNOVATIONS.romantic)
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

        for (var survivorJson of json.surivors) {
            var survivor = new SurvivorModel()
            survivor.loadFromJson(survivorJson)
            this.survivors.push(survivor)
        }

        for (var graveyardJson of json.graveyard) {
            var grave = new SurvivorModel()
            grave.loadFromJson(graveyardJson)
            this.graveyard.push(grave)
        }

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
    "language":[ INNOVATIONS.ammonia, INNOVATIONS.drums, INNOVATIONS.hovel, INNOVATIONS.innerLantern, INNOVATIONS.paint, INNOVATIONS.symposium ],
    "ammonia":[ INNOVATIONS.bloodletting, INNOVATIONS.lanternOven ],
    "drums": [ INNOVATIONS.forbiddenDance, INNOVATIONS.songOfTheBrave ],
    "forbiddenDance" : [ INNOVATIONS.heartFlute ],
})