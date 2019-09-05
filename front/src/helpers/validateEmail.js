function validateEmail(email){
    if (email.lenght < 5 || !email.includes("@") || !email.includes(".")) return false;
   
    return true;
}

export default validateEmail;