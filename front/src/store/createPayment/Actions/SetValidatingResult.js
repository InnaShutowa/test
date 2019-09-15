import * as types from '../../createPayment/Constants/ActionTypes';

function SetValidatingResultAction(polesValid, accountForNumberValid, sumValid) {
    return {
        type: types.SET_VALIDATION_RESULT_CONST,
        polesValid: polesValid,
        accountForNumberValid: accountForNumberValid,
        sumValid: sumValid
    };
}

export default SetValidatingResultAction;