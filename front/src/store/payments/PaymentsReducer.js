
let initialState = {
    payments:[
        
    ],
    isReady: false,
    isOnlyInput: false,
    isOnlyOutput: false,
    selected: 'name',
    findValue: ''
};



function PaymentsReducer(state = initialState, action) {
    if (handlers[action.type]){
        return handlers[action.type].handler(state, action);
    }
    return state;
}

const handlers  = {
    "ADD_PAYMENT_INFO": {
        handler(state, action){
            let payment = {
                PaymentId: action.PaymentId,
                Output: action.Output,
                ForAccountNumber: action.ForAccountNumber,
                ToAccountNumber: action.ToAccountNumber,
                PaymentDate: action.PaymentDate,
                PaymentName: action.PaymentName,
                PaymentNote: action.PaymentNote,
                Sum: action.Sum 
            };

            state.payments.push(payment);
            return state;
        }
    },
    "SET_IS_READY":{
        handler(state, action){
            state = {...state, isReady:true};
            return state;
        }
    },
    "RESET_DATA":{
        handler(state, action){
            state = {
                payments: [],
                isReady: false,
                isOnlyInput: state.isOnlyInput,
                isOnlyOutput: state.isOnlyOutput,
                selected: state.selected,
                findValue: state.findValue
            };
            return state;
        }
    },
    "SET_ONLY_INPUT":{
        handler(state, action){
            state = {...state, isOnlyInput:action.status};
            return state;
        }
    },
    "SET_ONLY_OUTPUT":{
        handler(state, action){
            state = {...state, isOnlyOutput:action.status};
            return state;
        }
    },
    "CHANGE_SELECTED_VALUE":{
        handler(state, action){
            state = {...state, selected: action.value};
            return state;
        }
    },
    "SET_FIND_VALUE":{
        handler(state, action){
            state = {...state, findValue: action.data};
            return state;
        }
    }
}


export default PaymentsReducer;