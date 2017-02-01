'use strict';

class Barmen {
    constructor(cupboard) {
        this._cupboard = cupboard;
    }

    pour(drinkName, volume, visitor) {
        console.log('this._cupboard.empty', this._cupboard.empty);

        
        if (!this._cupboard.hasDrink(drinkName, volume)) {
            throw new Error('Sorry. Not enough ' + drinkName);
        }

        return this._cupboard.getDrink(drinkName, volume);
    }
}

module.exports = Barmen;