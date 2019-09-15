

let initialState = {
        PaymentId: -1,
        Output: false,
        ForAccountNumber: '',
        ForUserId: 1,
        ForUserName: '',
        ForUserSecondName: '',
        AccountNumber: '',
        PaymentDate: '',
        PaymentName: '',
        PaymentNote: '',
        Sum: 0,
        UserId: 1,
        UserName: '',
        UserSecondName: ''
};

function PaymentReducer(state = initialState, action) {
    if (handlers[action.type]){
        return handlers[action.type].handler(state, action);
    }
    return state;
}

const handlers  = {
    "GET_PAYMENT_INFO":{
        handler(state, action){
            state = {...state, 
                PaymentId:action.PaymentId,
                Output:action.Output,
                ForAccountNumber:action.ForAccountNumber,
                ForUserId:action.ForUserId,
                ForUserName:action.ForUserName,
                ForUserSecondName:action.ForUserSecondName,
                AccountNumber:action.AccountNumber,
                PaymentDate:action.PaymentDate,
                PaymentName:action.PaymentName,
                PaymentNote:action.PaymentNote,
                Sum:action.Sum,
                UserId:action.UserId,
                UserName: action.UserName,
                UserSecondName: action.UserSecondName
            };
            return state;
        }
    }
}


export default PaymentReducer;
        