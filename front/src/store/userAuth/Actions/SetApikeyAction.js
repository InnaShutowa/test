import * as types from '../Constants/ActionAuthTypes';

function SetApikeyAction(apikey) {
    return {
        type: types.SET_APIKEY_CONSTANT,
        apikey: apikey
    };
}

export default SetApikeyAction;