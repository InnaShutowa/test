import {AUTH_USER_CONSTANT} from "./Constants/ActionAuthTypes";
import axios from 'axios';
import validateEmail from "../../helpers/validateEmail";
import validatePassword from "../../helpers/validatePassword";
import setUserAuthState from "../../helpers/setUserAuthState";


let initialState =  {
    userAuth:{
        email: '',
        password: '',
        emailValid: true,
        passwordValid: true
    }
};

function UserAuthReducer(state = initialState, action) {
    if (handlers[action.type]){
        return handlers[action.type].handler(state, action);
    }
    return state;
}

const handlers  = {
    "AUTH_USER" : {
        handler(state, action){
            if (state.userAuth.email == undefined 
                || state.userAuth.password == undefined
                || state.userAuth.password == "" 
                || state.userAuth.email == ""){
                alert("Необходимо заполнить поля!");

                state = setUserAuthState('',
                    '',
                    false,
                    false,
                    initialState.userRegistration);
                initialState = state;

                return state;
            }
            
            if (!validateEmail(state.userAuth.email)){
                alert("Email введен некорректно!");

                state = setUserAuthState('',
                    initialState.userAuth.password,
                    false,
                    true,
                    initialState.userRegistration);
                
                initialState = state;
                return state;
                
            }
            if (!validatePassword(state.userAuth.password)){
                alert("Пароль должен быть минимум 8 символов!");

                state = setUserAuthState(initialState.userAuth.email,
                    '',
                    true,
                    false,
                    initialState.userRegistration);

                initialState = state;
                return state;
            }
            var body = {
                email: state.userAuth.email,
                password: state.userAuth.password
            }
            
            axios({
                method: 'post',
                headers: {"Access-Control-Allow-Origin": "http://localhost:9000"},
                url: 'http://localhost:57785/Auth',
                data: body
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
    "SET_EMAIL" : {
        handler(state, action){
            state = setUserAuthState(action.data,
                initialState.userAuth.password,
                true,
                true,
                initialState.userRegistration);
            initialState = state;
            
            return state;
        }
    },
    "SET_PASSWORD":{
        handler(state, action){
            state = setUserAuthState(initialState.userAuth.email,
                action.data,
                true,
                true,
                initialState.userRegistration);
            
            initialState = state;
            console.log(state);
            return state;
        }
    }
}

export default UserAuthReducer;