import React, {Component} from "react";
import {Link} from "react-router-dom";
import { AppBar, Tabs, Tab } from '@material-ui/core';

import style from "./styles.css";

let type = 0;
class Header extends Component {
    handlerChange(event,newValue){
        type = newValue;
    }

    render() {
        return <div className={style.headerr}>
            <AppBar title="TestApp">
                <Tabs value={type} onChange={(a, newValue)=>this.handlerChange(a, newValue)}>
                    <Tab onChange={a=>this.handlerChange(a)} label="На главную" to='/' component={Link} ></Tab>
                    <Tab onChange={a=>this.handlerChange(a)} label="Войти" to='/authorize' component={Link} ></Tab>
                    <Tab onChange={a=>this.handlerChange(a)} label="Регистрация" to='/registration' component={Link}></Tab>
                </Tabs>
            </AppBar>
        </div>
    }
}

export default Header;