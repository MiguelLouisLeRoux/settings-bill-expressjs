module.exports = function SettingsBill() {

    let smsCost;
    let callCost;
    let warningLevel;
    let criticalLevel;
    let grandTot = 0;

    let actionList = [];

    function setSettings (settings) {
        smsCost = Number(settings.smsCost);
        callCost = Number(settings.callCost);
        warningLevel = Number(settings.warningLevel);
        criticalLevel = Number(settings.criticalLevel);
    }

    function getSettings
    () {
        return {
            smsCost,
            callCost,
            warningLevel,
            criticalLevel
        }
    }

    function recordAction(action) {

        let cost = 0;

        if (grandTotal() < criticalLevel) {
        
            if (action === 'sms'){
                cost = smsCost;
            }
            else if (action === 'call'){
                cost = callCost;
            }
    
            actionList.push({
                type: action,
                cost,
                timestamp: new Date()
            });
        }
        
    }

    function actions(){
        return actionList;
    }

    function actionsFor(type){
        const filteredActions = [];

        // loop through all the entries in the action list 
        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];
            // check this is the type we are doing the total for 
            if (action.type === type) {
                // add the action to the list
                filteredActions.push(action);
            }
        }

        return filteredActions;

        // return actionList.filter((action) => action.type === type);
    }

    function getTotal(type) {
        let total = 0;
        // loop through all the entries in the action list 
        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];
            // check this is the type we are doing the total for 
            if (action.type === type) {
                // if it is add the total to the list
                total += action.cost;
            }
        }
        return total;

        // the short way using reduce and arrow functions

        // return actionList.reduce((total, action) => { 
        //     let val = action.type === type ? action.cost : 0;
        //     return total + val;
        // }, 0);
    }

    function grandTotal() {
        let gTot = getTotal('sms') + getTotal('call')
        grandTot = Number(gTot).toFixed(2);
        return Number(gTot).toFixed(2);
    }

    function totals() {
        let smsTotal = getTotal('sms').toFixed(2);
        let callTotal = getTotal('call').toFixed(2);

        return {
            smsTotal,
            callTotal,
            grandTotal : grandTotal() 
        }
    }

    function hasReachedWarningLevel(){
        const total = grandTotal();
        const reachedWarningLevel = total >= warningLevel 
            && total < criticalLevel;

        return reachedWarningLevel;
    }

    

    function hasReachedCriticalLevel(){
        const total = grandTotal();
        return total >= criticalLevel || total + callCost >= criticalLevel || total + Cost >= criticalLevel;
    }

    function values(){
        return {
            warn: warningLevel,
            crit: criticalLevel,
            grand: grandTot,
        }
    }

    return {
        setSettings,
        getSettings,
        recordAction,
        actions,
        actionsFor,
        totals,
        hasReachedWarningLevel,
        hasReachedCriticalLevel,
        values,
        grandTotal
    }
}