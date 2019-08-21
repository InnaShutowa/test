import * as types from '../constants/ActionTypes';

function AuthUserAction(email, password) {
    return {
        type: types.AUTH_USER_CONSTANT,
        email,
        password
    };
}

export default AuthUserAction;