import React, {Component} from "react";
import {Link} from "react-router-dom";

import style from "./styles.css";

const mapStateToProps = function (state) {
    console.log(state);
    return {
        state: state.UserReducer.user
    };
};


class Header extends Component {
    render() {
        return <div>
            <div className={style.inline}>
                <p className={style.text}>TestApp</p>
            </div>
            
            <div className={style.links}>
                <div className={style.link}><Link to={"/main"}>На главную</Link></div>
                <div className={style.link}>
                    <a className={style.internalLink} href={"/authorize"}>Войти</a> <br/>
                    <div className={style.internalLink}><Link to={"/registration"}>Регистрация</Link></div>
                </div>
            </div>
        </div>
    }
}

export default Header;