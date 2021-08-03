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

            settingsBill.recordAction('call');

            assert.equal(1, settingsBill.actionsFor('call').length);
        });

        it('should be able to record smses', function() {
            let settingsBill = BillWithSettings();

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
    });
});

// describe('Use values ', function () {
//     describe('warning & critical level', function(){
//         it("it should return a class of 'warning' if warning level has been reached",function(){
//             let settingsBill = BillWithSethings();
            
//             settingsBill.setCallCost(1.35);
//             settingsBill.setSmsCost(0.85);
//             settingsBill.setWarningLevel(5)
//             settingsBill.setCriticalLevel(10);
//             settingsBill.makeCall(); 
//             settingsBill.makeCall(); 
//             settingsBill.makeCall(); 
//             settingsBill.makeCall(); 
    
//             assert.equal('warning',settingsBill.totalClassName());
//         });
    
//         it("it should return a class of 'critical' if critical level has been reached",function(){
//             let settingsBill = BillWithSethings();
            
//             settingsBill.setCallCost(1.35);
//             settingsBill.setSmsCost(0.85);
//             settingsBill.setWarningLevel(5)
//             settingsBill.setCriticalLevel(10);
//             settingsBill.sendSms();
//             settingsBill.makeCall(); 
//             settingsBill.makeCall(); 
//             settingsBill.makeCall(); 
//             settingsBill.makeCall(); 
//             settingsBill.makeCall(); 
//             settingsBill.makeCall(); 
//             settingsBill.makeCall(); 
//             settingsBill.makeCall(); 
    
//             assert.equal('critical',settingsBill.totalClassName());
//         });

//         it("it should stop when the critical level has been reached",function(){
//             let settingsBill = BillWithSethings();
            
//             settingsBill.setCallCost(2.50);
//             settingsBill.setSmsCost(0.85);
//             settingsBill.setWarningLevel(8)
//             settingsBill.setCriticalLevel(10);
      
//             settingsBill.makeCall(); 
//             settingsBill.makeCall(); 
//             settingsBill.makeCall(); 
//             settingsBill.makeCall(); 
//             settingsBill.makeCall();  
    
//             assert.equal('critical',settingsBill.totalClassName());
//             assert.equal(10,settingsBill.getTotalCallCost());
//         });

//         it("should allow the total to increase after reacing the critical level and upping the critical level",function(){
//             let settingsBill = BillWithSethings();
            
//             settingsBill.setCallCost(2.50);
//             settingsBill.setSmsCost(0.85);
//             settingsBill.setWarningLevel(8)
//             settingsBill.setCriticalLevel(10);
      
//             settingsBill.makeCall(); 
//             settingsBill.makeCall(); 
//             settingsBill.makeCall(); 
//             settingsBill.makeCall(); 
//             settingsBill.makeCall(); 
//             settingsBill.setCriticalLevel(20);
//             assert.equal('warning',settingsBill.totalClassName());
//             settingsBill.makeCall(); 
//             settingsBill.makeCall();

//             assert.equal(17,50,settingsBill.getTotalCallCost());
//         });
//     });
// });