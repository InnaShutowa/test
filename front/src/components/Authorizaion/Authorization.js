import React, {Component} from "react";
import {connect} from "react-redux";
import styles from "./styles.css"
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios';

import SetApikeyAction from "../../store/userAuth/Actions/SetApikeyAction";
import SetPoleAuthAction from "../../store/userAuth/Actions/SetPoleAuthAction";
import SetResultsValidationAuthAction from "../../store/userAuth/Actions/SetResultsValidationAuthAction";
import * as types from "../../store/userAuth/Constants/TypeNumbersAuth";
import newTheme from "../../helpers/newTheme";
import validateAuth from "../../helpers/validateAuth";
import ResetDataAction from "../../store/userAuth/Actions/ResetDataAction";
import SetUserDataAction from "../../store/user/Actions/SetUserDataAction";


  

const mapStateToProps = function (state) {
    return {
        state: {
            userAuth: state.UserAuthReducer,
            user: state.UserReducer
        }
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setApikey: (apikey) => {
            dispatch(SetApikeyAction(apikey));
        },
        setPoleAction: (data, type)=>{
            dispatch(SetPoleAuthAction(data, type));
        },
        resetData: ()=>{
            dispatch(ResetDataAction());
        },
        setResultsValidationAuth:(email, password)=>{
            dispatch(SetResultsValidationAuthAction(email, password));
        },
        setUserData: (data) =>{
            dispatch(SetUserDataAction(data));
        }
    }
};


class Authorization extends Component {

    handlerChange (event) {
        let obj = validateAuth(this.props.state.userAuth);
        if (obj.emailValid && obj.passwordValid){
            var body = {
                email: this.props.state.userAuth.email,
                password: this.props.state.userAuth.password
            }
            
            axios({
                method: 'post',
                headers: {"Access-Control-Allow-Origin": "http://localhost:9000"},
                url: 'http://localhost:57785/Auth',
                data: body
            })
            .then(response=>{
                if (response.data.status){
                    this.props.setApikey(response.data.apikey);


                        axios({
                            method: 'get',
                            headers: {"Access-Control-Allow-Origin": "http://localhost:9000"},
                            url: 'http://localhost:57785/User?apikey='+response.data.apikey
                        }).then(response=>{
                            if (response.data.status){
                                this.props.setUserData(response.data.data);
                                window.location.pathname = "/payments";
                            } else{
                                this.props.resetData();
                                alert("Непредвиденная ошибка!");
                            }
                        }).catch(error=>{
                            this.props.resetData();
                            alert("Непредвиденная ошибка!");
                        });

                    
                } else{
                    this.props.resetData();
                    alert("Непредвиденная ошибка!");
                }
            });

          } else{
           this.props.setResultsValidationAuth(obj.emailValid, obj.passwordValid);
        }
        event.preventDefault();
    }
    
    handlerEmailChange (email){
        this.props.setPoleAction(email.target.value, types.SET_EMAIL_NUMBER_CONSTANT);
    }

    handlePasswordChange (password){
        this.props.setPoleAction(password.target.value, types.SET_PASSWORD_NUMBER_CONSTANT);
    }

    render() {


        let colorEmail = this.props.state.userAuth.emailValid ? "gray" : "red";
        let colorPassword = this.props.state.userAuth.passwordValid ? "gray" : "red";

        return <div className={styles.mainForm}>
            <div className={styles.title}>Авторизация</div>
            <form onSubmit={a=>this.handleChange(a)}>
                
                <input className={styles.input} 
                    type="text" 
                    placeholder="Введите email" 
                    value = {this.props.state.userAuth.email}
                    style = {{borderColor: colorEmail}}
                    onChange={a=>this.handlerEmailChange(a)}/> <br/>

                <input className={styles.input} 
                    type="password" 
                    placeholder="Введите пароль" 
                    value = {this.props.state.userAuth.password}
                                style = {{borderColor: colorPassword}}
                    onChange={a=>this.handlePasswordChange(a)}/><br/><br/>
                
                <MuiThemeProvider theme={newTheme}>
                    <Button  onClick={a=>this.handlerChange(a)} color="primary">Войти</Button>
                </MuiThemeProvider>
            </form>
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authorization);