import axios from 'axios';
import validateEmail from "../../helpers/validateEmail";
import validatePassword from "../../helpers/validatePassword";


let initialState =  {
    email: '',
    firstName: '',
    secondName: '',
    isAuth: false,
    budget: 1000,
    apikey: "",
    accountNumber: "",
    userId: 1
};

function UserReducer(state = initialState, action) {
    if (handlers[action.type]){
        return handlers[action.type].handler(state, action);
    }
    return state;
}

const handlers  = {
   
   "SET_USER_DATA":{
        handler(state, action){
            state = {...state,
                email:action.email,
                isAuth: true,
                firstName:action.firstName,
                secondName:action.secondName,
                budget:action.budget,
                apikey:action.apikey,
                accountNumber: action.accountNumber,
                userId: action.userId
                };

            return state;
        }
   }
}


export default UserReducer;