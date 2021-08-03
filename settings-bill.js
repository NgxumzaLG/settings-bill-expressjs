
module.exports = function BillWithSettings() {
    let callCost;
    let smsCost;
    let warningLevel;
    let criticalLevel;
    let actionList = [];

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

        if (action === "call") {
            cost = callCost;

        } else if (action === "sms") {
            cost = smsCost;

        }

        actionList.push({
            type: action,
            cost,
            timestamp: new Date()
            
        });
    }

    function actions(){
        return actionList;

    }

    function actionsFor(type){
        return actionList.filter((action) => action.type === type);
        
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
        let callTotal = getTotal('call');
        let smsTotal = getTotal('sms');

        return {
            callTotal,
            smsTotal,
            grandTotal: grandTotal()
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
        hasReachedCriticalLevel

    }
}