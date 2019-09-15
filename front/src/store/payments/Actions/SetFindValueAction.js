import * as types from '../Constants/ActionTypes';
function SetFindValueAction(data) {
    return {
        type: types.SET_FIND_VALUE_CONST,
        data: data
    };
}

export default SetFindValueAction;