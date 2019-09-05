function setUserRegistrationState(firstName, 
    secondName, 
    email, 
    passFirst, 
    passSecond,
    emailValid,
    passwordValid,
    polesValid,
    userAuth,){

    let state = {
        userAuth: userAuth,
        userRegistration: {
            firstName: firstName,
            secondName: secondName,
            email: email,
            passwordFirst: passFirst,
            passwordSecond: passSecond,
            emailValid: emailValid,
            passwordValid: passwordValid,
            polesValid: polesValid
        }
    };
    return state;
}

export default setUserRegistrationState;