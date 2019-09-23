import axios from 'axios';
import validateEmail from "../../helpers/validateEmail";
import validatePassword from "../../helpers/validatePassword";


let initialState =  {
    selected: 1
};

function HeaderReducer(state = initialState, action) {
    if (handlers[action.type]){
        return handlers[action.type].handler(state, action);
    }
    return state;
}

const handlers  = {
   
   "SET_SELECTED_TAB":{
        handler(state, action){
            state = {
                selected: action.selected
            };

            return state;
        }
   }
}


export default HeaderReducer;