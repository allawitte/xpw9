'use strict';
class SmsServiceMock {
    constructor() {
        this._lastSentSms = '';
    }

    send(message) {
        this._lastSentSms = message;
    }

    get lastSentSms() {
        return this._lastSentSms;
    }
}

module.exports = SmsServiceMock;
/**
 * Created by HP on 1/31/2017.
 */
