import React, {Component} from "react";
import {connect} from "react-redux";
import styles from "./styles.css"
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


import AuthUserAction from "../../store/userAuth/Actions/AuthUserAction";
import RegistrationAction from "../../store/userRegistration/Actions/RegistrationAction";
import SetPoleRegAction from "../../store/userRegistration/Actions/SetPoleRegAction";
import * as types from "../../store/userRegistration/Constants/TypeNumbersReg";
import newTheme from "../../helpers/newTheme";

const mapStateToProps = function (state) {
    console.log(state.UserRegistrationReducer);
    return {
        state: state.UserRegistrationReducer.userRegistration
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        regUserAction: () => {
            dispatch(RegistrationAction());
        },
        setPoleAction: (data, type)=>{
            dispatch(SetPoleRegAction(data, type));
        }
    }
};


class Registration extends Component {
    handleChange (event) {
        this.props.regUserAction();
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
        let colorEmail = this.props.state.emailValid ? "gray" : "red";
        let colorPassword = this.props.state.passwordValid ? "gray" : "red";
        let colorPoles = this.props.state.polesValid ? "gray" : "red";


        return <div className={styles.mainForm}>
            <div className={styles.title}>Регистрация</div>
            <div className={styles.margin}></div>
            <form onSubmit={a=>this.handleChange(a)}>

                <input className={styles.input} 
                        type="text" 
                        placeholder="Имя" 
                        value = {this.props.state.firstName}
                        style = {{borderColor: colorPoles}}
                        onChange={a=>this.handlerFirstNameChange(a)}/> <br/>

                <input className={styles.input} 
                        type = "text" 
                        placeholder = "Фамилия" 
                        style = {{borderColor: colorPoles}}
                        value = {this.props.state.secondName}
                        onChange = {a=>this.handlerSecondNameChange(a)}/> <br/>
                    
                <input className={styles.input} 
                        type="text" 
                        placeholder="Еmail" 
                        value = {this.props.state.email}
                        style = {{borderColor: colorEmail}}
                        onChange={a=>this.handlerEmailChange(a)}/> <br/><br/>

                <input className = {styles.input} 
                        type = "password" 
                        placeholder = "Введите пароль" 
                        value = {this.props.state.passwordFirst}
                        style = {{borderColor: colorPassword}}
                        onChange = {a=>this.handlerPasswordFirstChange(a)}/><br/>

                <input className = {styles.input} 
                        type = "password" 
                        placeholder = "Повторите пароль" 
                        value = {this.props.state.passwordSecond}
                        style = {{borderColor: colorPassword}}
                        onChange = {a=>this.handlerPasswordSecondChange(a)}/><br/> <br/>

                <MuiThemeProvider theme={newTheme}>
                    <Button color="primary">Зарегистрироваться</Button>
                </MuiThemeProvider>
            </form>
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);