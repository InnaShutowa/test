function validatePassword(pass){
    
    if (pass.length < 8) {
        return false;
    }   
    return true;
}

export default validatePassword;