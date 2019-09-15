import axios from 'axios';
import validateEmail from "../../helpers/validateEmail";

import registrateUser from "../../helpers/registrateUser";
import validatePassword from "../../helpers/validatePassword";
import setUserRegistrationState from "../../helpers/setUserRegistrationState";
import storage from 'redux-persist/lib/storage';
import { resolve } from 'path';


let initialState =  {
        apikey: '',
        firstName: '',
        secondName: '',
        email: '',
        passwordFirst: '',
        passwordSecond: '',
        emailValid: true,
        passwordValid: true,
        polesValid: true,
        isReadyToRegistrate: false
};

function UserRegistrationReducer(state = initialState, action) {
    if (handlers[action.type]){
        return handlers[action.type].handler(state, action);
    }
    return state;
}

const handlers  = {
    "SET_APIKEY":{
        handler(state, action){
            state = {...initialState,  apikey: action.apikey};
            return state;
        }
    },
    "RESET_DATA":{
        handler(state, action){
            state = initialState;
            return state;
        }
    },
    "SET_FIRST_NAME":{
        handler(state, action){
            state = {...state, firstName: action.data, polesValid: true, passwordValid: true, emailValid: true};
            return state;
        }
    },
    "SET_SECOND_NAME":{
        handler(state, action){
            state = {...state, secondName: action.data, polesValid: true, passwordValid: true, emailValid: true};
            return state;
        }
    },
    "SET_EMAIL_FOR_REG":{
        handler(state, action){
            state = {...state, email: action.data, polesValid: true, passwordValid: true, emailValid: true};
            return state;
        }
    },
    "SET_PASSWORD_FIRST":{
        handler(state, action){
            state = {...state, passwordFirst: action.data, polesValid: true, passwordValid: true, emailValid: true};
            return state;
        }
    },
    "SET_PASSWORD_SECOND":{
        handler(state, action){
            state = {...state, passwordSecond: action.data, polesValid: true, passwordValid: true, emailValid: true};
            return state;
        }
    }, 
    "SET_RESULTS_VALIDATION":{
        handler(state, action){
            state = {...state, passwordValid: action.passwordValid, emailValid: action.emailValid, polesValid: action.polesValid};
            return state;
        }
    }
        
    }


export default UserRegistrationReducer;

