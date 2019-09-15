function setUserAuthState(email, 
    pass, 
    emailValid,
    passValid, 
    apikey){

    let state = {
        userAuth:{
            email: email,
            password: pass,
            emailValid: emailValid,
            passwordValid: passValid,
            apikey: apikey
        }
    };
    return state;
}

export default setUserAuthState;