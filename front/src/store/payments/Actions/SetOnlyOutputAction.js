import * as types from '../Constants/ActionTypes';
function SetOnlyOutputAction(status) {
    return {
        type: types.SET_ONLY_OUTPUT_CONST,
        status: status
    };
}

export default SetOnlyOutputAction;