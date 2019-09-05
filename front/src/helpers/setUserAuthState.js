function setUserAuthState(email, 
    pass, 
    emailValid,
    passValid, 
    userReg){

    let state = {
        userAuth:{
            email: email,
            password: pass,
            emailValid: emailValid,
            passwordValid: passValid
        },
        userRegistration:userReg
    };
    return state;
}

export default setUserAuthState;