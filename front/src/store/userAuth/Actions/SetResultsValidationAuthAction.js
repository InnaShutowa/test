import * as types from '../Constants/ActionAuthTypes';

function SetResultsValidationAuthAction(email, password) {
    return {
        type: types.SET_RESULTS_VALIDATION_AUTH_CONST,
        passwordValid: password,
        emailValid: email
    };
}

export default SetResultsValidationAuthAction;