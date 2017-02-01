'use strict';
class CupboardStub {
    isOpen() {
        return true;
    };

    hasDrink(drinkName, volume) {
        return true;
    };

    getDrink(drinkName, volume) {
        return volume;
    }
}
module.exports = CupboardStub;
/**
 * Created by HP on 1/31/2017.
 */
