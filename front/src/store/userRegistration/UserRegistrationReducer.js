import axios from 'axios';
import validateEmail from "../../helpers/validateEmail";
import validatePassword from "../../helpers/validatePassword";
import setUserRegistrationState from "../../helpers/setUserRegistrationState";


let initialState =  {
    userRegistration:{
        firstName: '',
        secondName: '',
        email: '',
        passwordFirst: '',
        passwordSecond: '',
        emailValid: true,
        passwordValid: true,
        polesValid: true
    }
};

function UserRegistrationReducer(state = initialState, action) {
    if (handlers[action.type]){
        return handlers[action.type].handler(state, action);
    }
    return state;
}

const handlers  = {
    "SET_FIRST_NAME":{
        handler(state, action){
            state = setUserRegistrationState(action.data,
                initialState.userRegistration.secondName,
                initialState.userRegistration.email,
                initialState.userRegistration.passwordFirst,
                initialState.userRegistration.passwordSecond,
                true,
                true,
                true,
                initialState.userAuth);
            
            initialState = state;
            return state;
        }
    },
    "SET_SECOND_NAME":{
        handler(state, action){
            state = setUserRegistrationState(initialState.userRegistration.firstName,
                action.data,
                initialState.userRegistration.email,
                initialState.userRegistration.passwordFirst,
                initialState.userRegistration.passwordSecond,
                true,
                true,
                true,
                initialState.userAuth);
            
            initialState = state;
            return state;
        }
    },
    "SET_EMAIL_FOR_REG":{
        handler(state, action){
            state = setUserRegistrationState(initialState.userRegistration.firstName,
                initialState.userRegistration.secondName,
                action.data,
                initialState.userRegistration.passwordFirst,
                initialState.userRegistration.passwordSecond,
                true,
                true,
                true,
                initialState.userAuth);
            
            initialState = state;
            return state;
        }
    },
    "SET_PASSWORD_FIRST":{
        handler(state, action){
            state = setUserRegistrationState(initialState.userRegistration.firstName,
                initialState.userRegistration.secondName,
                initialState.userRegistration.email,
                action.data,
                initialState.userRegistration.passwordSecond,
                true,
                true,
                true,
                initialState.userAuth);
            
            initialState = state;
            return state;
        }
    },
    "SET_PASSWORD_SECOND":{
        handler(state, action){
            state = setUserRegistrationState(initialState.userRegistration.firstName,
                initialState.userRegistration.secondName,
                initialState.userRegistration.email,
                initialState.userRegistration.passwordFirst,
                action.data,
                true,
                true,
                true,
                initialState.userAuth);
            
            initialState = state;
            return state;
        }
    }, 
    "REGISTRATION_USER":{
        handler(state, action){
            if (state.userRegistration.firstName == undefined ||
                state.userRegistration.secondName == undefined ||
                state.userRegistration.email == undefined ||
                state.userRegistration.passwordFirst == undefined ||
                state.userRegistration.passwordSecond == undefined ||
                state.userRegistration.firstName == "" ||
                state.userRegistration.secondName == "" ||
                state.userRegistration.email == "" ||
                state.userRegistration.passwordFirst == "" ||
                state.userRegistration.passwordSecond == ""){
                    alert("Необходимо заполнить поля!");

                    state = setUserRegistrationState('',
                        '', '', '', '',
                        false, false, false,
                        initialState.userAuth);
                    
                    initialState = state;
                    return state;
                }

                if (state.userRegistration.passwordFirst !== state.userRegistration.passwordSecond){
                    alert("Пароли не совпадают!");
    
                    state = setUserRegistrationState(initialState.userRegistration.firstName,
                        initialState.userRegistration.secondName,
                        initialState.userRegistration.email,
                        '',
                        '',
                        true,
                        false,
                        true,
                        initialState.userAuth);
                    
                    initialState = state;
                    return state;
                }


                if (!validateEmail(state.userRegistration.email)){
                    alert("Email введен некорректно!");
    
                    state = setUserRegistrationState(initialState.userRegistration.firstName,
                        initialState.userRegistration.secondName,
                        '',
                        initialState.userRegistration.passwordFirst,
                        initialState.userRegistration.passwordSecond,
                        false,
                        true,
                        true,
                        initialState.userAuth);
                    
                    initialState = state;
                    return state;
                }
                if (!validatePassword(state.userRegistration.passwordFirst)){
                    alert("Пароль должен быть минимум 8 символов!");
    
                    state = setUserRegistrationState(initialState.userRegistration.firstName,
                        initialState.userRegistration.secondName,
                        initialState.userRegistration.email,
                        '',
                        '',
                        true,
                        false,
                        true,
                        initialState.userAuth);
                    
                    initialState = state;
                    return state;
                }

            var body = {
                first_name: state.userRegistration.firstName,
                second_name: state.userRegistration.secondName,
                email: state.userRegistration.email,
                password: state.userRegistration.passwordFirst
            }
            
            axios({
                method: 'post',
                headers: {"Access-Control-Allow-Origin": "http://localhost:9000"},
                url: 'http://localhost:57785/Registration',
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
    }
}

export default UserRegistrationReducer;

