let assert = require("assert");
let BillWithSettings = require("../settings-bill");

describe('Settings Bill', function () {
    describe('Set the cost and alert level', function() {
        it('It should be able to set call cost', function () {
            let settingsBill = BillWithSettings();
    
            settingsBill.setSettings({
                callCost: 2,

            });

            assert.equal(2, settingsBill.getSettings().callCost);
        });

        it('It should be able to set sms cost', function () {
            let settingsBill = BillWithSettings();
    
            settingsBill.setSettings({
                smsCost: 1

            });

            assert.equal(1, settingsBill.getSettings().smsCost);
        });

        it('It should be able to set warning level', function () {
            let settingsBill = BillWithSettings();
    
            settingsBill.setSettings({
                warningLevel: 10

            });

            assert.equal("10", settingsBill.getSettings().warningLevel);
        });

        it('It should be able to set critical level', function () {
            let settingsBill = BillWithSettings();
    
            settingsBill.setSettings({
                criticalLevel: 20

            });

            assert.equal("20", settingsBill.getSettings().criticalLevel);
        });
    });

    describe('Record the actions', function() {
        it('should be able to record calls', function() {
            let settingsBill = BillWithSettings();

            settingsBill.setSettings({
                callCost: 2,
                smsCost: 1,
                warningLevel: 10,
                criticalLevel: 20

            });

            settingsBill.recordAction('call');

            assert.equal(1, settingsBill.actionsFor('call').length);
        });

        it('should be able to record smses', function() {
            let settingsBill = BillWithSettings();

            settingsBill.setSettings({
                callCost: 2,
                smsCost: 1,
                warningLevel: 10,
                criticalLevel: 20

            });

            settingsBill.recordAction('sms');

            assert.equal(1, settingsBill.actionsFor('sms').length);
        });
    });

    describe('Uses values', function() {
        it('should be able to use the call cost set', function (){
            let settingsBill = BillWithSettings();
    
            settingsBill.setSettings({
                callCost: 2,
                smsCost: 1,
                warningLevel: 10,
                criticalLevel: 20

            });

            settingsBill.recordAction('call');

            assert.equal(2, settingsBill.totals().callTotal);
        });

        it('should be able to use the sms cost set', function (){
            let settingsBill = BillWithSettings();
    
            settingsBill.setSettings({
                callCost: 3,
                smsCost: 1.5,
                warningLevel: 15,
                criticalLevel: 25

            });

            settingsBill.recordAction('sms');

            assert.equal(1.5, settingsBill.totals().smsTotal);
        });

        it('should be able to update the grand total once call and sms have been sent', function (){
            let settingsBill = BillWithSettings();
    
            settingsBill.setSettings({
                callCost: 3,
                smsCost: 1.5,
                warningLevel: 15,
                criticalLevel: 25

            });

            settingsBill.recordAction('call');
            settingsBill.recordAction('sms');
            settingsBill.recordAction('call');
            settingsBill.recordAction('sms');

            assert.equal(9, settingsBill.totals().grandTotal);
        });
    });

    describe('warning & critical level', function(){
        it('should know when warning level reached', function(){
            let settingsBill = BillWithSettings();

           settingsBill.setSettings({
                callCost: 3,
                smsCost: 1.5,
                warningLevel: 5,
                criticalLevel: 10

            });
    
            settingsBill.recordAction('call');
            settingsBill.recordAction('sms');
            settingsBill.recordAction('sms');
    
            assert.equal(true, settingsBill.hasReachedWarningLevel());
        });
    
        it('should know when critical level reached', function(){
            let settingsBill = BillWithSettings();

           settingsBill.setSettings({
                callCost: 3,
                smsCost: 1.5,
                warningLevel: 5,
                criticalLevel: 10

            });
    
            settingsBill.recordAction('call');
            settingsBill.recordAction('call');
            settingsBill.recordAction('sms');
            settingsBill.recordAction('sms');
            settingsBill.recordAction('sms');
    
            assert.equal(true, settingsBill.hasReachedCriticalLevel());
        });
    });
});