import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import storage from 'redux-persist/lib/storage';
import { AppBar, Tabs, Tab } from '@material-ui/core';

import style from "./styles.css";

const mapStateToProps = function (state) {
    return {
        state: state.UserReducer
    };
};

let type = 0;
class HeaderAuth extends Component {
    handlerChange(event,newValue){
        type = newValue;
    }

    HandlerClick(){
        storage.removeItem('persist:userRoot');
        storage.removeItem('persist:paymentsRoot');
        storage.removeItem('persist:authRoot');
        storage.removeItem('persist:regRoot');
        storage.removeItem('persist:root');
        storage.removeItem('persist:authRoot');
    }

    render() {
        return <div className={style.headerr}>
        <AppBar title="TestApp">
            <Tabs value={type} onChange={(event, newValue)=>this.handlerChange(event, newValue)}>
                <Tab label="На главную" to='/' component={Link} ></Tab>
                <Tab label="Платежи пользователя" to='/payments' component={Link} ></Tab>
                <Tab label="Создать платеж" to='/create' component={Link}></Tab>
                <Tab label="Личный кабинет" to='/home' component={Link}></Tab>
                <Tab label="Выйти" to='/' onChange={a=>this.HandlerClick()} component={Link}></Tab>
            </Tabs>
        </AppBar>
    </div>
    }
}

export default  connect(mapStateToProps)(HeaderAuth);