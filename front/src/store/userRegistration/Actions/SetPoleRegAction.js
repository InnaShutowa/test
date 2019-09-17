import * as typesReg from '../Constants/ActionRegTypes';

function SetPoleRegAction(data, type) {
    switch(type) {
        case 3:{
            return {
                type: typesReg.SET_FIRST_NAME_CONSTANT,
                data
            }
        }
        case 4:{
            return {
                type: typesReg.SET_SECOND_NAME_CONSTANT,
                data
            }
        }
        case 5:{
            return {
                type: typesReg.SET_EMAIL_FOR_REG_CONSTANT,
                data
            }
        }
        case 6:{
            return {
                type: typesReg.SET_PASSWORD_FIRST_CONSTANT,
                data
            }
        }
        case 7:{
            return {
                type: typesReg.SET_PASSWORD_SECOND_CONSTANT,
                data
            }
        } 
    }
}

export default SetPoleRegAction;