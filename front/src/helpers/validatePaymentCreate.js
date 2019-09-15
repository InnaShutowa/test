function validatePaymentCreate(data, defaultSum){
    let result = {
        sumValid: true,
        polesValid: true,
        accountForNumberValid: true
    };

    if (data.sum == undefined 
        || data.paymentName == undefined
        || data.paymentName == undefined
        || data.sum == "" 
        || data.paymentName == ""
        || data.paymentName == ""){
            result = {
                sumValid: false,
                polesValid: false,
                accountForNumberValid: false
            }
            return result;
        }

        var sum = Number(data.sum);
    
    if (sum > defaultSum){
        result = {
            sumValid: false,
            polesValid: true,
            accountForNumberValid: true
        }
        return result;
    }

    if (data.accountForNumber.length!==15){
        result = {
            sumValid: true,
            polesValid: true,
            accountForNumberValid: false
        }
        return result;
    }



    
    return result;
}

export default validatePaymentCreate;