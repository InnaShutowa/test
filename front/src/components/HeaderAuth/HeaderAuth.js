import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import storage from 'redux-persist/lib/storage';
import { AppBar, Tabs, Tab, TextField } from '@material-ui/core';

import style from "./styles.css";
import SetSelectedTabAction from "../../store/header/Actions/SetSelectedTabAction";

const mapStateToProps = function (state) {
    return {
        state: {
            userReducer: state.UserReducer,
            headerReducer: state.HeaderReducer
        }
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSeletedTab: (selected) => {
            dispatch(SetSelectedTabAction(selected));
        }
    }
};

class HeaderAuth extends Component {
    handlerChange(event,newValue){
        this.props.setSeletedTab(newValue);
    }

    HandlerClick(event){
        
        this.props.setSeletedTab(0);

        storage.removeItem('persist:userRoot');
        storage.removeItem('persist:paymentsRoot');
        storage.removeItem('persist:authRoot');
        storage.removeItem('persist:regRoot');
        storage.removeItem('persist:root');
        storage.removeItem('persist:authRoot');
        window.location.pathname = "/";
    }

    render() {
        const budget = "Бюджет " + this.props.state.userReducer.budget;

        return <div className={style.headerr}>
        <AppBar title="TestApp">
            <Tabs value={this.props.state.headerReducer.selected} onChange={(event, newValue)=>this.handlerChange(event, newValue)}>
                <Tab label="На главную" to='/' component={Link} ></Tab>
                <Tab label="Платежи пользователя" to='/payments' component={Link} ></Tab>
                <Tab label="Создать платеж" to='/create' component={Link}></Tab>
                <Tab label="Личный кабинет" to='/home' component={Link}></Tab>
                <Tab label="Выйти" to='/' onClick={a=>this.HandlerClick(a)} component={Link}></Tab>
                <Tab label={budget}></Tab>
            </Tabs>
        </AppBar>
    </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAuth);