'use strict';

class Barmen {
    constructor(cupboard) {
        this._cupboard = cupboard;
    }

    pour(drinkName, volume, visitor, today) {

        if (!this._cupboard.hasDrink(drinkName, volume)) {
            throw new Error('Sorry. Not enough ' + drinkName);
        }

        if (today === "Thursday") {
            return 2 * this._cupboard.getDrink(drinkName, volume);
        }

        return this._cupboard.getDrink(drinkName, volume);
    }
}

module.exports = Barmen;