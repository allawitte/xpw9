'use strict';
class CupboardStub {
    constructor(){
        this._isEmpty = false;
        this._isOpen = true;
    }
    isOpen() {
        return this._isOpen;
    };

    set open(val){
        this._isOpen = val;
    }

    hasDrink(drinkName, volume) {
        return !this._isEmpty;
    };

    getDrink(drinkName, volume) {
        return volume;
    };

    set empty(value){
        this._isEmpty = value;
    };

    get empty(){
        return this._isEmpty;
    }
}
module.exports = CupboardStub;
/**
 * Created by HP on 1/31/2017.
 */
