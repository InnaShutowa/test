import validateEmail from "./validateEmail";
import validatePassword from "./validatePassword";

function validateAuth(state) {
let result ={
    emailValid: true,
    passwordValid: true
};

    if (state.email == undefined 
        || state.password == undefined
        || state.password == "" 
        || state.email == ""){
        alert("Необходимо заполнить поля!");
            result = {
                emailValid: false,
                passwordValid: false
            };
        return result;
    }
    
    if (!validateEmail(state.email)){
        alert("Email введен некорректно!");

        result = {
            emailValid: false,
            passwordValid: true
        };
        
        return result;
    }
    if (!validatePassword(state.password)){
        alert("Пароль должен быть минимум 8 символов!");
        result = {
            emailValid: true,
            passwordValid: false
        };
        return result;
    }
    return result;
}

export default validateAuth;

