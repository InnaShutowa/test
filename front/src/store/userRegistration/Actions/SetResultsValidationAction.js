import * as types from '../Constants/ActionRegTypes';

function SetResultsValidationAction(email, password, poles) {
    return {
        type: types.SET_RESULTS_VALIDATION_CONST,
        passwordValid: password,
        emailValid: email,
        polesValid: poles
    };
}

export default SetResultsValidationAction;