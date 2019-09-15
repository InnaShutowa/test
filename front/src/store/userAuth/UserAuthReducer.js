import {AUTH_USER_CONSTANT} from "./Constants/ActionAuthTypes";
import axios from 'axios';
import validateEmail from "../../helpers/validateEmail";
import validatePassword from "../../helpers/validatePassword";
import setUserAuthState from "../../helpers/setUserAuthState";


let initialState =  {
        email: '',
        password: '',
        emailValid: true,
        passwordValid: true,
        apikey: ''
};

function UserAuthReducer(state = initialState, action) {
    if (handlers[action.type]){
        return handlers[action.type].handler(state, action);
    }
    return state;
}

const handlers  = {
    "SET_RESULTS_VALIDATION_AUTH":{
        handler(state, action){
            state = {...state, passwordValid: action.passwordValid, emailValid: action.emailValid, polesValid: action.polesValid};
            return state;
        }
    },
    "SET_EMAIL" : {
        handler(state, action){
            state = {...state, email: action.data, emailValid: true, passwordValid: true};
            return state;
        }
    },
    "SET_PASSWORD":{
        handler(state, action){
            state = {...state, passwordValid:true, emailValid: true, password: action.data};
            return state;
        }
    },
    "SET_APIKEY":{
        handler(state, action){
            console.log("plf");
            state = {...initialState, apikey: action.apikey};
            return state;
        }
    }
}

export default UserAuthReducer;