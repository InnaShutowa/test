import * as types from '../constants/ActionTypes';

function SetEmailAction(email) {
    return {
        type: types.SET_EMAIL_CONSTANT,
        email
    };
}

export default SetEmailAction;