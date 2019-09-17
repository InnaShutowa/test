import * as types from '../Constants/ActionRegTypes';

function SetApikeyAction(apikey) {
    return {
        type: types.SET_APIKEY_CONST,
        apikey: apikey
    };
}

export default SetApikeyAction;