import React from "react";
import {createStore} from "redux";
import { combineReducers } from 'redux'

import Provider from "react-redux/es/components/Provider";
import {BrowserRouter, Route} from "react-router-dom";


import PhotosReducer from "../../store/photos/PhotosReducer";
import UserReducer from "../../store/user/UserReducer"

import Header from "../Header";
import RegistrationFullInfo from "../RegistrationFullInfo";
import RegistrationCreateNickname from "../RegistrationCreateNickname";
import RegistrationPassword from "../RegistrationPassword";
import Main from "../Main";
import Authorization from "../Authorizaion";


const commonReducer = combineReducers({
    UserReducer,
    PhotosReducer
  });
  

const store = createStore(commonReducer);

console.log(store.getState());
const App = () => {
    return <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route exact path={""} component={Authorization}/>
                <Route exact path={"/registration"} component={RegistrationCreateNickname}/>
                {/* <Route exact path={"/registrationnext"} component={RegistrationFullInfo}/>
                <Route exact path={"/registrationpass"} component={RegistrationPassword}/>
                <Route exact path={"/authorize"} component={Authorization}/>
                <Route exact path={"/main"} component={Main}/> */}
            </div>
        </BrowserRouter>
    </Provider>;
};

export default App;