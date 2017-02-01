'use strict';
class CalendarStub {
    constructor() {
        this._today = "Monday";
    }

    get today() {
        return this._today;
    }

    set today(value) {
        this._today = value;
    }
}

module.exports = CalendarStub;
/**
 * Created by HP on 1/31/2017.
 */
