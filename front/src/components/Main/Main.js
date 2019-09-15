import React, {Component} from "react";
import {connect} from "react-redux";

import style from "./styles.css"


class Main extends Component {
    render() {
        return <div className={style.main_part}>
            <div className={style.header}>Основные запросы к API:</div>
            <div className={style.text}>Post запрос на авторизацию: http://localhost:57785/Auth</div>
            <div className={style.text}>Post запрос на регистрацию: http://localhost:57785/Registration</div>
            <div className={style.text}>Post запрос на создание платежа: http://localhost:57785/Payments</div>
        </div>
    }
};


export default Main;