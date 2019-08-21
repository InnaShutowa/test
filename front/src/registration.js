import React, { Component } from "react";
import ReactDOM from "react-dom";

import RegistrationComponent from "../component/RegistrationComponent/RegistrationComponent";
import {BrowserRouter, Route} from "react-router-dom";
import {createStore} from "redux";
import Reducer from "../reducers/Reducer";
import AddPhotoAction from "../actions/AddPhotoAction";


const store = createStore(Reducer);

store.dispatch(AddPhotoAction("ебушки воробушки, работает", "http://localhost:9000/materials/fon1.jpg","55"));
console.log(store.getState());
ReactDOM.render(
    <BrowserRouter>
<div>
        <Route exac path={"/registration"} component={RegistrationComponent}/>
</div>
    </BrowserRouter>,
    document.getElementById("registration")
);