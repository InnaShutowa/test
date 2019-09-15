import React, {Component} from "react";
import {createStore} from "redux";
import {persistStore, persistReducer, persistCombineReducers} from 'redux-persist'
import Provider from "react-redux/es/components/Provider";
import {BrowserRouter, Route} from "react-router-dom";
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

import CombinePersistReducer from "../../store/CombinePersistReducer";

import NoRules from "../NoRules";
import Header from "../Header";
import HeaderAuth from "../HeaderAuth";
import Main from "../Main";
import Authorization from "../Authorizaion";
import Registration from "../Registration";
import Payments from "../Payments";
import CreatePayment from "../CreatePayment";
import isNullOrUndefined from "../../helpers/isNullOrEmpty";
import Payment from "../Payment/Payment";
import Home from "../Home/Home";

// storage.removeItem('persist:paymentsRoot');
storage.removeItem('persist:authRoot');
storage.removeItem('persist:regRoot');
storage.removeItem('persist:root');
storage.removeItem('persist:createPayment');
storage.removeItem('persist:payment');
storage.removeItem('persist:payments');



const store = createStore(CombinePersistReducer);
export const persistor = persistStore(store);

let head = <Route exact path={""} component={Header}/>;
let payments =  <Route exact path={"/payments"} component={NoRules}/>;
let createPayment = <Route exact path={"/create"} component={NoRules}/>;
let payment = <Route exact path={"/payment"} component={NoRules}/>;
let home = <Route exact path={"/home"} component={NoRules}/>;

let reg = <Route exact path={"/registration"} component={Registration}/>;
let auth = <Route exact path={"/authorize"} component={Authorization}/>;

var stor =  localStorage.getItem('persist:userRoot');
const decoded = JSON.parse(stor);

if (decoded!=undefined && decoded.isAuth != undefined && decoded.isAuth=="true"){
    head = <Route exact path={""} component={HeaderAuth}/>;
    payments =  <Route exact path={"/payments"} component={Payments}/>;
    reg = <Route exact path={"/registration"} component={NoRules}/>;
    auth = <Route exact path={"/authorize"} component={NoRules}/>;
    createPayment = <Route exact path={"/create"} component={CreatePayment}/>;
    payment = <Route exact path={"/payment"} component={Payment}/>;
    home = <Route exact path={"/home"} component={Home}/>;

}

class App extends Component{
    render(){

        return <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
            <div>
                {head}
                {payments}
                {reg}
                {auth}
                {createPayment}
                {payment}
                {home}
                <Route exact path={"/"} component={Main}/>
            </div>
        </BrowserRouter>
        </PersistGate>
    </Provider>;
    }
}


export default App;