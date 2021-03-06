'use strict';

class Barmen {
    constructor(cupboard, smsService) {
        this._cupboard = cupboard;
        this._smsService = smsService;
    }

    pour(drinkName, volume, visitor, calendar, cassa) {

        cassa.drinkName = drinkName;
        cassa.volume = volume;


        if (!this._cupboard.isOpen()) {

            this._smsService.send("Hello. The cupboard is locked and we miss a key. Please bring one copy of key here.");
            console.log('this._smsService', this._smsService);
            throw new Error('Sorry. We have some temporary troubles to serve cold drink. You can order a coffee.');
        }

        if (!this._cupboard.hasDrink(drinkName, volume)) {

            this._smsService.send("Hello. We have run out of " + drinkName + ". Please buy several bottles.");
            throw new Error('Sorry. Not enough ' + drinkName);
        }

        if(calendar.currentDate == visitor.birthday){
            return 3 * this._cupboard.getDrink(drinkName, volume);
        }

        if (calendar.today === "Thursday") {
            return 2 * this._cupboard.getDrink(drinkName, volume);
        }

        return this._cupboard.getDrink(drinkName, volume);
    }
}

module.exports = Barmen;