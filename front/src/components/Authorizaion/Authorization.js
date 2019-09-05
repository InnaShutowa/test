import React, {Component} from "react";
import {connect} from "react-redux";
import styles from "./styles.css"
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import AuthUserAction from "../../store/userAuth/Actions/AuthUserAction";
import SetPoleAuthAction from "../../store/userAuth/Actions/SetPoleAuthAction";
import * as types from "../../store/userAuth/Constants/TypeNumbersAuth";
import newTheme from "../../helpers/newTheme";


  

const mapStateToProps = function (state) {
    console.log(state);
    return {
        state: state.UserAuthReducer.userAuth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        authUserAction: (email, password) => {
            dispatch(AuthUserAction(email, password));
        },
        setPoleAction: (data, type)=>{
            dispatch(SetPoleAuthAction(data, type));
        }
    }
};


class Authorization extends Component {
    handleChange (event) {
        this.props.authUserAction();
        event.preventDefault();
    }
    
    handlerEmailChange (email){
        this.props.setPoleAction(email.target.value, types.SET_EMAIL_NUMBER_CONSTANT);
    }

    handlePasswordChange (password){
        this.props.setPoleAction(password.target.value, types.SET_PASSWORD_NUMBER_CONSTANT);
    }

    render() {
        let colorEmail = this.props.state.emailValid ? "gray" : "red";
        let colorPassword = this.props.state.passwordValid ? "gray" : "red";

        return <div className={styles.mainForm}>
            <div className={styles.title}>Авторизация</div>
            <div className={styles.margin}></div>
            <form onSubmit={a=>this.handleChange(a)}>
                
                <input className={styles.input} 
                    type="text" 
                    placeholder="Введите email" 
                    value = {this.props.state.email}
                    style = {{borderColor: colorEmail}}
                    onChange={a=>this.handlerEmailChange(a)}/> <br/>

                <input className={styles.input} 
                    type="password" 
                    placeholder="Введите пароль" 
                    value = {this.props.state.password}
                    style = {{borderColor: colorPassword}}
                    onChange={a=>this.handlePasswordChange(a)}/><br/><br/>
                
                <MuiThemeProvider theme={newTheme}>
                    <Button color="primary">Войти</Button>
                </MuiThemeProvider>
            </form>
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authorization);