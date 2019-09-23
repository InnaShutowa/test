import * as types from '../Constants/ActionHeaderTypes';

function SetSelectedTabAction(data) {
    return {
        type: types.SET_SELECTED_TAB_CONST,
        selected: data
    };
}

export default SetSelectedTabAction;