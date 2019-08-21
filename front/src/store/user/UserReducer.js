import {AUTH_USER_CONSTANT} from "./constants/ActionTypes";
import axios from 'axios';



let initialState = {
    sort: 0,
    user: 
        {
            userId: 1,
            firstName: '',
            secondName: '',
            email: '',
            budget: 0,
            password: ''
        }
    
};

function Reducer(state = initialState, action) {
    console.log(action.type);
    console.log(handlers[action.type]);
    if (handlers[action.type]){
        return handlers[action.type].handler(state, action);
    }
    return state;
}

const handlers  = {
    "AUTH_USER" : {
        handler(state, action){
           
            var body = {
                email: action.email,
                password: action.password
            }
            
            axios({
                method: 'post',
                headers: {"Access-Control-Allow-Origin": "http://localhost:9000"},
                url: 'http://localhost:57785/Auth',
                data: body
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

            
            return state;
        }
    },
    "SET_EMAIL" : {
        handler(state, action){
            state = {
                sort: 0,
                user:{
                    userId: state.userId,
                    firstName: state.firstName,
                    secondName: state.secondName,
                    email: action.email,
                    budget: state.budget,
                    password: state.password
                }
            }
            console.log(state);
            return state;
        }
    },
    "SET_PASSWORD":{
        handler(state, action){
            state = {
                sort: 0,
                user:{
                    userId: state.userId,
                    firstName: state.firstName,
                    secondName: state.secondName,
                    email: state.email,
                    budget: state.budget,
                    password: action.password
                }
            }
            console.log(state);
            return state;
        }
    }
}

export default Reducer;