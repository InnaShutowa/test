import * as types from '../Constants/ActionTypes';
function AddPaymentInfoAction(data) {
    return {
        type: types.ADD_PAYMENT_INFO_CONST,
        PaymentId: data.payment_id,
        Output: data.output,
        ForAccountNumber: data.user_for.account_number,
        ToAccountNumber: data.to_account_number,
        PaymentDate: data.payment_date_unix,
        PaymentName: data.payment_name,
        PaymentNote: data.payment_note,
        Sum: data.sum
    };
}

export default AddPaymentInfoAction;