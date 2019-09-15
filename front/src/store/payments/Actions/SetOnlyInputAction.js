import * as types from '../Constants/ActionTypes';
function SetOnlyInputAction(status) {
    return {
        type: types.SET_ONLY_INPUT_CONST,
        status: status
    };
}

export default SetOnlyInputAction;