import * as types from '../constants/ActionTypes';

function SetPasswordAction(password) {
    return {
        type: types.SET_PASSWORD_CONSTANT,
        password
    };
}

export default SetPasswordAction;