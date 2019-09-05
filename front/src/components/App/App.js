import React, {Component} from "react";
import {createStore} from "redux";
import { combineReducers } from 'redux'

import Provider from "react-redux/es/components/Provider";
import {BrowserRouter, Route} from "react-router-dom";


import UserReducer from "../../store/user/UserReducer"
import UserAuthReducer from "../../store/userAuth/UserAuthReducer"
import UserRegistrationReducer from "../../store/UserRegistration/UserRegistrationReducer"

import Header from "../Header";
import HeaderAuth from "../HeaderAuth";
import Main from "../Main";
import Authorization from "../Authorizaion";
import Registration from "../Registration";


const commonReducer = combineReducers({
    UserReducer,
    UserAuthReducer,
    UserRegistrationReducer
  });
  

const store = createStore(commonReducer);


console.log(store.getState());

let head = <Route exact path={""} component={Header}/>;

if (store.getState().UserReducer.user.isAuth == true){
    head = <Route exact path={""} component={HeaderAuth}/>;
}



class App extends Component{
    render(){
        return <Provider store={store}>
        <BrowserRouter>
            <div>
                {head}
                <Route exact path={"/registration"} component={Registration}/>
                {/* <Route exact path={"/registrationnext"} component={RegistrationFullInfo}/>
                <Route exact path={"/registrationpass"} component={RegistrationPassword}/> */}
                <Route exact path={"/authorize"} component={Authorization}/>
                <Route exact path={"/main"} component={Main}/>
            </div>
        </BrowserRouter>
    </Provider>;
    }
}


export default App;