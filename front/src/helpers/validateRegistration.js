import validateEmail from "./validateEmail";
import validatePassword from "./validatePassword";

function validateRegistration(state){
    let result = {
        polesValid: true,
        emailValid: true,
        passwordValid: true
    };

    if (state.firstName == undefined ||
        state.secondName == undefined ||
        state.email == undefined ||
        state.passwordFirst == undefined ||
        state.passwordSecond == undefined ||
        state.firstName == "" ||
        state.secondName == "" ||
        state.email == "" ||
        state.passwordFirst == "" ||
        state.passwordSecond == ""){
            alert("Необходимо заполнить поля!");
            result = {
                polesValid: false,
                emailValid: false,
                passwordValid: false
            };
            
            return result;
        }

        if (state.passwordFirst !== state.passwordSecond){
            alert("Пароли не совпадают!");
            result = {
                polesValid: true,
                emailValid: true,
                passwordValid: false
            };
            
            return result;
        }


        if (!validateEmail(state.email)){
            alert("Email введен некорректно!");
            result = {
                polesValid: true,
                emailValid: false,
                passwordValid: true
            };
            
            return result;
        }

        if (!validatePassword(state.passwordFirst)){
            alert("Пароль должен быть минимум 8 символов!");
            result = {
                polesValid: true,
                emailValid: true,
                passwordValid: false
            };
            
            return result;
        }

        return result;
}


export default validateRegistration;