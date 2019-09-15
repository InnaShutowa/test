import * as types from '../Constants/ActionTypes';
function ChangeSelectedValueAction(data) {
    return {
        type: types.CHANGE_SELECTED_VALUE_CONST,
        value: data
    };
}

export default ChangeSelectedValueAction;