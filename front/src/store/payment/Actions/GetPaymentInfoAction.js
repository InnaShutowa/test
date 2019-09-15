import * as types from '../../payment/Constants/ActionPaymentTypeConstants';

function GetPaymentInfoAction(data) {
    return {
        type: types.GET_PAYMENT_INFO_CONST,
        PaymentId: data.payment_id,
        Output: data.output,
        ForAccountNumber: data.user_for.account_number,
        ForUserId: data.user_for_id,
        ForUserName: data.user_for.first_name,
        ForUserSecondName: data.user_for.second_name,
        AccountNumber: data.to_account_number,
        PaymentDate: data.payment_date_unix,
        PaymentName: data.payment_name,
        PaymentNote: data.payment_note,
        Sum: data.sum,
        UserId: data.user_id,
        UserName: data.user_first_name,
        UserSecondName: data.user_second_name
    };
}

export default GetPaymentInfoAction;