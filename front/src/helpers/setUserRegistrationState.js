function setUserRegistrationState(firstName, 
    secondName, 
    email, 
    passFirst, 
    passSecond,
    emailValid,
    passwordValid,
    polesValid,
    apikey){

    let state = {
            firstName: firstName,
            secondName: secondName,
            email: email,
            passwordFirst: passFirst,
            passwordSecond: passSecond,
            emailValid: emailValid,
            passwordValid: passwordValid,
            polesValid: polesValid,
            apikey: apikey
        
    };
    return state;
}

export default setUserRegistrationState;