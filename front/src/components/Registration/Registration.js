import React, {Component} from "react";
import {connect} from "react-redux";
import styles from "./styles.css"
import Button from '@material-ui/core/Button';
import { MuiThemeProvider} from '@material-ui/core/styles';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';

import RegistrationAction from "../../store/userRegistration/Actions/RegistrationAction";
import SetPoleRegAction from "../../store/userRegistration/Actions/SetPoleRegAction";

import SetApikeyAction from "../../store/userRegistration/Actions/SetApikeyAction";
import * as types from "../../store/userRegistration/Constants/TypeNumbersReg";
import newTheme from "../../helpers/newTheme";
import validateRegistration from "../../helpers/validateRegistration";
import SetResultsValidationAction from "../../store/userRegistration/Actions/SetResultsValidationAction";
import ResetDataAction from "../../store/userRegistration/Actions/ResetDataAction";
import SetUserDataAction from "../../store/user/Actions/SetUserDataAction";
import useStyles from "../../helpers/useStyles";

const mapStateToProps = function (state) {
    return {
        state: {
            userRegistration: state.UserRegistrationReducer,
            user: state.UserReducer
        }
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        regUserAction: () => {
            dispatch(RegistrationAction());
        },
        setPoleAction: (data, type)=>{
            dispatch(SetPoleRegAction(data, type));
        },
        setApikey: (apikey)=>{
            dispatch(SetApikeyAction(apikey));
        },
        setResultsValidation: (email, password, poles)=>{
            dispatch(SetResultsValidationAction(email, password, poles));
        },
        resetData: ()=>{
            dispatch(ResetDataAction());
        },
        setUserData: (data) =>{
            dispatch(SetUserDataAction(data));
        }
    }
};



class Registration extends Component {
    
    
    handlerChange (event) {   

        let obj = validateRegistration(this.props.state.userRegistration);
        if (obj.polesValid && obj.passwordValid && obj.emailValid){
            var body = {
                first_name: this.props.state.userRegistration.firstName,
                second_name: this.props.state.userRegistration.secondName,
                email: this.props.state.userRegistration.email,
                password: this.props.state.userRegistration.passwordFirst
            }
            axios({
                method: 'post',
                headers: {"Access-Control-Allow-Origin": "http://localhost:9000"},
                url: 'http://localhost:57785/Registration',
                data: body
            }).then(response=>{
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
            }).catch(error=>{
                this.props.resetData();
                alert("Непредвиденная ошибка!");
            });

        
        } else{
            this.props.setResultsValidation(obj.emailValid, obj.passwordValid, obj.polesValid);
        }
        event.preventDefault();        
    }
    
    handlerFirstNameChange (firstName){
        this.props.setPoleAction(firstName.target.value, types.SET_FIRST_NAME_NUMBER_CONSTANT);
    }
    
    handlerSecondNameChange (secondName){
        this.props.setPoleAction(secondName.target.value, types.SET_SECOND_NAME_NUMBER_CONSTANT);
    }

    handlerEmailChange (email){
        this.props.setPoleAction(email.target.value, types.SET_EMAIL_FOR_REG_NUMBER_CONSTANT);
    }

    handlerPasswordFirstChange(password){
        this.props.setPoleAction(password.target.value, types.SET_PASSWORD_FIRST_NUMBER_CONSTANT);
    }

    handlerPasswordSecondChange(password){
        this.props.setPoleAction(password.target.value, types.SET_PASSWORD_SECOND_NUMBER_CONSTANT);
    }

    render() {

        
        let colorEmail = this.props.state.userRegistration.emailValid ? "gainsboro" : "#F78181";
        let colorPassword = this.props.state.userRegistration.passwordValid ? "gainsboro" : "#F78181";
        let colorPoles = this.props.state.userRegistration.polesValid ? "gainsboro" : "#F78181";

        return <div className={styles.mainForm}>
            <div className={styles.title}>Регистрация</div>
            <form onSubmit={a=>this.handleChange(a)}>

                <TextField className={useStyles.textField}
                        margin="normal"
                        variant="outlined"  
                        type="text" 
                        placeholder="Имя" 
                        value = {this.props.state.userRegistration.firstName}
                        style = {{backgroundColor: colorPoles}}
                        onChange={a=>this.handlerFirstNameChange(a)}/><br/>

                <TextField className={useStyles.textField}
                        margin="normal"
                        variant="outlined"  
                        type = "text" 
                        placeholder = "Фамилия" 
                        style = {{borderColor: colorPoles}}
                        value = {this.props.state.userRegistration.secondName}
                        onChange = {a=>this.handlerSecondNameChange(a)}/><br/>
                    
                <TextField className={useStyles.textField}
                        margin="normal"
                        variant="outlined"  
                        type="text" 
                        placeholder="Еmail" 
                        value = {this.props.state.userRegistration.email}
                        style = {{backgroundColor: colorEmail}}
                        onChange={a=>this.handlerEmailChange(a)}/> <br/><br/>

                <TextField className={useStyles.textField}
                        margin="normal"
                        variant="outlined"  
                        type = "password" 
                        placeholder = "Введите пароль" 
                        value = {this.props.state.userRegistration.passwordFirst}
                        style = {{backgroundColor: colorPassword}}
                        onChange = {a=>this.handlerPasswordFirstChange(a)}/><br/>

                <TextField required className={useStyles.textField}
                        margin="normal"
                        variant="outlined"  
                        type = "password" 
                        placeholder = "Повторите пароль" 
                        value = {this.props.state.userRegistration.passwordSecond}
                        style = {{backgroundColor: colorPassword}}
                        onChange = {a=>this.handlerPasswordSecondChange(a)}/><br/> <br/>

                <MuiThemeProvider theme={newTheme}>
                    <Button onClick={a=>this.handlerChange(a)} color="primary">Зарегистрироваться</Button>
                </MuiThemeProvider>
            </form>
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);