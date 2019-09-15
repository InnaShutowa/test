import * as types from '../Constants/ActionUserTypes';

function SetUserDataAction(state) {
    return {
        type: types.SET_USER_DATA_CONST,
        email: state.email,
        firstName: state.first_name,
        secondName: state.second_name,
        apikey: state.apikey,
        budget: state.budget,
        accountNumber: state.account_number
    };
}

export default SetUserDataAction;