"use strict";

var assert = require('chai').assert;
var Barmen = require('../src/barmen');
var Visitor = require('../src/visitor');
var CupboardStub = require('./fake/cupboardStub');
var CalendarStub = require('./fake/calendarStub');
var SmsServiceMock = require('./fake/sms-service-mock');
var CassaMock = require('./fake/cassa-mock');

suite('When barmen pours drinks', function () {
    let visitor = {};
    let barmen = {};
    let alwaysFullCupboard = new CupboardStub();
    let calendar = new CalendarStub();
    let smsService = {};
    let cassa = {};

    setup(function () {
        visitor = new Visitor();
        visitor.sober();
        calendar.today = "Monday";
        smsService = new SmsServiceMock();
        cassa = new CassaMock();
    });

    suite('cupboard is full', function () {
        test('barmen pours 200 milliliters of whisky in my glass', function () {
            barmen = new Barmen(alwaysFullCupboard);
            var volumeInGlass = barmen.pour("whisky", 200, visitor, calendar, cassa);
            assert.equal(200, volumeInGlass);

        });

        test('barmen pours x2 volume on a Thursday', function () {
            barmen = new Barmen(alwaysFullCupboard);
            calendar.today = "Thursday";
            var volumeInGlass = barmen.pour("whisky", 200, visitor, calendar, cassa);
            assert.equal(400, volumeInGlass);
        });

        test('barmen pours x3 volume on a visitor\'s birthday', function () {
            barmen = new Barmen(alwaysFullCupboard);
            calendar.currentDate = "01.03";
            visitor.birthday = "01.03";
            var volumeInGlass = barmen.pour("whisky", 200, visitor, calendar, cassa);
            assert.equal(600, volumeInGlass);
        });

    });

    suite('cupboard is empty', function () {
        let emptyCupboard = {};
        emptyCupboard = new CupboardStub();
        emptyCupboard.empty = true;

        test('barmen rejects for a drink', function () {
            barmen = new Barmen(emptyCupboard, smsService);
            var action = () => {
                barmen.pour("whisky", 200, visitor, calendar, cassa)
            };

            assert.throws(action, /Sorry. Not enough whisky/);
        });

        test('sms to buy drink is sent to boss', function () {
            barmen = new Barmen(emptyCupboard, smsService);
            runWithTryCatch(() => {
                barmen.pour("vodka", 100, visitor, calendar, cassa)
            });

            assert.equal(smsService.lastSentSms, "Hello. We have run out of vodka. Please buy several bottles.");
        });

        function runWithTryCatch(action) {
            try {
                action();
            } catch (exception) {

            }
        }
    });

    suite('cupboard is locked and key is lost', function () {
        let lockedCupboard = {};
        lockedCupboard = new CupboardStub();
        lockedCupboard.open = false;
        
        test('barmen rejects for a drink', function () {
            barmen = new Barmen(lockedCupboard, smsService);
            var action = () => {
                barmen.pour("whisky", 200, visitor, calendar, cassa)
            };

            assert.throws(action, /Sorry. We have some temporary troubles to serve cold drink. You can order a coffee./);
        });

        test('sms to bring key is sent to boss', function () {
            barmen = new Barmen(lockedCupboard, smsService);
            runWithTryCatch(() => {
                barmen.pour("vodka", 100, visitor, calendar, cassa)
            });

            assert.equal(smsService.lastSentSms, "Hello. The cupboard is locked and we miss a key. Please bring one copy of key here.");
        });

        function runWithTryCatch(action) {
            try {
                action();
            } catch (exception) {

            }
        }
    });


    suite('Client wants to get invoice', function(){
        test('barmen prints invoice with drink name and total amount', function(){

            barmen = new Barmen(alwaysFullCupboard);

            calendar.today = "Monday";
            calendar.currentDate = "12.12";

            barmen.pour("vodka", 150, visitor, calendar, cassa);

            assert.equal(cassa.invoice, "vodka 15");
        })
    });

});


