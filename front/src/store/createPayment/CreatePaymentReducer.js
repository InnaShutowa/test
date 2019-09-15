
import axios from 'axios';


let initialState =  {
    sum: 0,
    paymentName:'',
    paymentNote:'',
    accountForNumber:'',
    sumValid: true,
    accountForNumberValid: true,
    polesValid: true
};

function CreatePaymentReducer(state = initialState, action) {
    if (handlers[action.type]){
        return handlers[action.type].handler(state, action);
    }
    return state;
}

const handlers  = {
    "SET_PAYMENT_INFO": {
        handler(state, action){
            axios({
                method: 'get',
                headers: {"Access-Control-Allow-Origin": "http://localhost:9000"},
                url: 'http://localhost:57785/Payments',
                params: {'apikey': action.apikey}
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
            return state;
        }
    },
    "SET_PAYMENT_NAME":{
        handler(state, action){
            state = {...state, 
                paymentName: action.data,
                polesValid: true, 
                accountForNumberValid: true, 
                sumValid: true};
            return state;
        }
    },
    "SET_PAYMENT_NOTE":{
        handler(state, action){
            state = {...state, 
                paymentNote: action.data,
                polesValid: true, 
                accountForNumberValid: true, 
                sumValid: true};
            return state;
        }
    },
    "SET_PAYMENT_SUM":{
        handler(state, action){
            state = {...state, 
                sum: action.data,
                polesValid: true, 
                accountForNumberValid: true, 
                sumValid: true};
            return state;
        }
    },
    "SET_PAYMENT_ACCOUNT_NUMBER":{
        handler(state, action){
            state = {...state, 
                accountForNumber: action.data, 
                polesValid: true, 
                accountForNumberValid: true, 
                sumValid: true};
            return state;
        }
    },
    "SET_VALIDATION_RESULT":{
        handler(state, action){
            state = {...state, 
                polesValid: action.polesValid, 
                accountForNumberValid: action.accountForNumberValid, 
                sumValid: action.sumValid};
                console.log(state);
            return state;
        }
    },
    "RESET_DATA_PAYMENT":{
        handler(state, action){
            state = initialState;
            return state;
        }
    }
}


export default CreatePaymentReducer;