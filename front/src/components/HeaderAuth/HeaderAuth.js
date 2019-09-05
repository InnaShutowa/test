import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import style from "./styles.css";

const mapStateToProps = function (state) {
    console.log(state);
    console.log("ss");
    console.log(state.UserReducer.user);
    return {
        state: state.UserReducer.user
    };
};


class HeaderAuth extends Component {
    render() {
        return <div>
            <div className={style.inline}>
                <p className={style.text}>TestApp</p>
            </div>
            
            <div className={style.links}>
                <div className={style.link}><Link to={"/main"}>На главную</Link></div>
                <div className={style.link}><Link to={"/payments"}>Платежи пользователя</Link></div>
                <div className={style.link}><Link to={"/create"}>Создать платеж</Link></div>
                <div className={style.link}>
                    <div className={style.budgetValue}>
                        Бюджет
                    </div>
                    <div className={style.budgetValue}>
                        {this.props.state.budget}
                    </div>
                    <div>
                        <a href="/">Выйти</a>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default  connect(mapStateToProps)(HeaderAuth);