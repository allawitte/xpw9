'use strict';
class CalendarStub {
    constructor() {
        this._today = "Monday";
        this._currentDate = "";


        get
        today()
        {
            return this._today;
        }

        set
        today(value)
        {
            this._today = value;
        }

        get
        currentDate()
        {
            return this._currentDate;
        }

        set
        currentDate(currentDate)
        {
            this._currentDate = currentDate;
        }
    }
}

module.exports = CalendarStub;
/**
 * Created by HP on 1/31/2017.
 */
