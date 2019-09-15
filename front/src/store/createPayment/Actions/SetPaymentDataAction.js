import * as types from '../Constants/ActionTypes';
// 1 - сумма платежа
// 2 - название платежа
// 3 - комментарий к платежу
// 4 - номер счета

function SetPaymentDataAction(data, type) {
    switch(type) {
        case 1:{
            return {
                type: types.SET_PAYMENT_SUM_CONST,
                data
            }
        }
        case 2:{
            return {
                type: types.SET_PAYMENT_NAME_CONST,
                data
            }
        }
        case 3:{
            return {
                type: types.SET_PAYMENT_NOTE_CONST,
                data
            }
        }
        case 4:{
            return {
                type: types.SET_PAYMENT_ACCOUNT_NUMBER_CONST,
                data
            }
        }
    }
}

export default SetPaymentDataAction;