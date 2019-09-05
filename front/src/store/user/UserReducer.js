import {AUTH_USER_CONSTANT} from "./constants/ActionTypes";
import axios from 'axios';
import validateEmail from "../../helpers/validateEmail";
import validatePassword from "../../helpers/validatePassword";


let initialState =  {
    user:{
        email: '',
        firstName: '',
        secondName: '',
        isAuth: true,
        budget: 1000
    }
};

function UserReducer(state = initialState, action) {
    if (handlers[action.type]){
        return handlers[action.type].handler(state, action);
    }
    return state;
}

const handlers  = {
   
    }


export default UserReducer;