import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import storage from 'redux-persist/lib/storage';

import style from "./styles.css";

const mapStateToProps = function (state) {
    return {
        state: state.UserReducer
    };
};


class HeaderAuth extends Component {
    HandlerClick(){
        storage.removeItem('persist:userRoot');
        storage.removeItem('persist:paymentsRoot');
        storage.removeItem('persist:authRoot');
        storage.removeItem('persist:regRoot');
        storage.removeItem('persist:root');
        storage.removeItem('persist:authRoot');
    }

    render() {
        return <div>
            <div className={style.inline}>
                <p className={style.text}>TestApp</p>
            </div>
            
            <div className={style.links}>
                <div className={style.link}><Link to={"/"}>На главную</Link></div>
                <div className={style.link}><Link to={"/payments"}>Платежи пользователя</Link></div>
                <div className={style.link}><Link to={"/create"}>Создать платеж</Link></div>
                <div className={style.link}>
                    <div>
                        <a href="/home">Ваш личный кабинет, {this.props.state.firstName}!</a>
                    </div>
                    <div className={style.budgetValue}>
                        Бюджет
                    </div>
                    <div className={style.budgetValue}>
                        {this.props.state.budget}
                    </div>
                    <div className={style.exit}>
                        <a href="/" onClick={a=>this.HandlerClick()}>Выйти</a>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default  connect(mapStateToProps)(HeaderAuth);