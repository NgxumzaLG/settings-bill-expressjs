
module.exports = function BillWithSettings() {
    const moment = require('moment');

    let callCost;
    let smsCost;
    let warningLevel;
    let criticalLevel;
    let actionList = [];
    let momentList = [];

    function setSettings(settings) {
        callCost = Number(settings.callCost);
        smsCost = Number(settings.smsCost);
        warningLevel = settings.warningLevel;
        criticalLevel = settings.criticalLevel;

    }

    function getSettings() {
        return {
            callCost,
            smsCost,
            warningLevel,
            criticalLevel

        }
    }

    function recordAction(action) {
        let cost = 0;

        if (grandTotal() < criticalLevel) {
            if (action === "call") {
                cost = callCost;
    
            } else if (action === "sms") {
                cost = smsCost;
    
            }
    
            if (cost != 0) {
                actionList.push({
                    type: action,
                    cost,
                    timestamp: new Date()
                    
                });
    
                momentList.push({
                    type: action,
                    cost,
                    timestamp : new Date()

                });
            }
    
            for (let i = 0; i < momentList.length; i++) {
                let timestamp = moment(actionList[i].timestamp).format('YYYY-MM-DD hh:mm:ss a');
                momentList[i].timestamp = (moment(timestamp, 'YYYY-MM-DD hh:mm:ss a').fromNow());
                
            }
        }
    }

    function actions(){
        return momentList;

    }

    function actionsFor(type){
        const filteredActions = [];

        // loop through all the entries in the action list 
        for (let index = 0; index < momentList.length; index++) {
            const action = momentList[index];
            // check this is the type we are doing the total for 
            if (action.type === type) {
                // add the action to the list
                filteredActions.push(action);
            }
        }

        return filteredActions;  
    }

    function getTotal(type){
        return actionList.reduce((total, action) => {
            let val = action.type === type ? action.cost : 0;

            return total + val
        }, 0);
        
    }

    function grandTotal(){  
        return getTotal('call') + getTotal('sms');

    }

    function totals(){
        let callTotal = getTotal('call').toFixed(2);
        let smsTotal = getTotal('sms').toFixed(2);

        return {
            callTotal,
            smsTotal,
            grandTotal: grandTotal().toFixed(2)

        }
    }

    function hasReachedWarningLevel() {
        const total = grandTotal();
        const reachedWarningLevel = total >= warningLevel && total < criticalLevel

        return reachedWarningLevel;
    }

    function hasReachedCriticalLevel() {
        const total = grandTotal();

        return total >= criticalLevel;
    }

    function totalClassName(){
        if (hasReachedWarningLevel()){
            return 'warning';

        }
        else if (hasReachedCriticalLevel()){
            return 'danger';

        }
    }
   
    return {
        setSettings,
        getSettings,
        recordAction,
        actions,
        actionsFor,
        getTotal,
        grandTotal,
        totals,
        hasReachedWarningLevel,
        hasReachedCriticalLevel,
        totalClassName

    }
}