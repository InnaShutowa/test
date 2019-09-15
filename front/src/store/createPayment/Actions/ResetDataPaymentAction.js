import * as types from '../../createPayment/Constants/ActionTypes';

function ResetDataPaymentAction(apikey) {
    return {
        type: types.RESET_DATA_PAYMENT_CONST
    };
}

export default ResetDataPaymentAction;