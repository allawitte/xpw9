class Visitor {
    constructor() {
        this.totalDrinkVolume = 0;
        this._birthday = {};
    }

    drink(volume) {
        this.totalDrinkVolume += volume;
        return volume;
    }

    sober() {
        this.totalDrinkVolume = 0;
    }

    isTotallyDrunk() {
        return this.totalDrinkVolume > 150;
    }

    getTotallyDrunk() {
        return this.totalDrinkVolume;
    }
    get birthday(){
        return this._birthday;
    }

    set birthday(birthday){

    }
}

module.exports = Visitor;