import React, {Component} from "react";
import {Link} from "react-router-dom";
import { AppBar, Tabs, Tab } from '@material-ui/core';
import {connect} from "react-redux";

import style from "./styles.css";
import SetSelectedTabAction from "../../store/header/Actions/SetSelectedTabAction";

let type = 0;

const mapStateToProps = function (state) {
    return {
        state: {
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

class Header extends Component {
    handlerChange(event,newValue){
        this.props.setSeletedTab(newValue);
    }

    render() {
        return <div className={style.headerr}>
            <AppBar title="TestApp">
                <Tabs value={this.props.state.headerReducer.selected} onChange={(a, newValue)=>this.handlerChange(a, newValue)}>
                    <Tab label="На главную" to='/' component={Link} ></Tab>
                    <Tab label="Войти" to='/authorize' component={Link} ></Tab>
                    <Tab label="Регистрация" to='/registration' component={Link}></Tab>
                </Tabs>
            </AppBar>
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);