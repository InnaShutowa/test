import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios';

import * as types from "../../store/createPayment/Constants/ActionNumberTypes";
import styles from "./styles.css";
import newTheme from "../../helpers/newTheme";
import SetPaymentDataAction from "../../store/createPayment/Actions/SetPaymentDataAction";
import SetValidatingResult from "../../store/createPayment/Actions/SetValidatingResult";
import ResetDataPaymentAction from "../../store/createPayment/Actions/ResetDataPaymentAction";
import SetUserDataAction from "../../store/user/Actions/SetUserDataAction";
import validatePaymentCreate from "../../helpers/validatePaymentCreate";


const mapStateToProps = function (state) {
    return {
        state: {
            createPayment:state.CreatePaymentReducer,
            user: state.UserReducer
        }
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setPaymentDataAction: (data, type) => {
            dispatch(SetPaymentDataAction(data, type));
        },
        setValidatingResult: (polesValid, numberValid, sumValid) =>{
            dispatch(SetValidatingResult(polesValid, numberValid, sumValid));
        },
        setUserData: (data) =>{
            dispatch(SetUserDataAction(data));
        },
        resetData: ()=>{
            dispatch(ResetDataPaymentAction());
        }
    }
};

class CreatePayment extends Component {
    

    handlerMakePaymentChange(event){
        let obj = validatePaymentCreate(this.props.state.createPayment, this.props.state.user.budget);
        if (obj.sumValid && obj.polesValid && obj.accountForNumberValid){
            let body = {
                apikey:this.props.state.user.apikey,
                sum: this.props.state.createPayment.sum,
                payment_name:this.props.state.createPayment.paymentName,
                payment_note:this.props.state.createPayment.paymentNote,
                status:1,
                account_for_number:this.props.state.createPayment.accountForNumber
            };
    
            axios({
                method: 'post',
                headers: {"Access-Control-Allow-Origin": "http://localhost:9000"},
                url: 'http://localhost:57785/Payments',
                data: body
            })
            .then(response=>{
                if (response.data.status){
                        axios({
                            method: 'get',
                            headers: {"Access-Control-Allow-Origin": "http://localhost:9000"},
                            url: 'http://localhost:57785/User?apikey='+this.props.state.user.apikey
                        }).then(response2=>{
    
                            if (response2.data.status){
                                this.props.setUserData(response2.data.data);
                                window.location.pathname = "/payments";
                            } else{
                                this.props.resetData();
                                alert("Непредвиденная ошибка!");
                            }
                        })
                } else{
                    this.props.resetData();
                    alert("Непредвиденная ошибка!");
                }
            });
        } else{
            this.props.setValidatingResult(obj.polesValid, obj.accountForNumberValid, obj.sumValid);
        }
        
        event.preventDefault();
    }

    handlerPaymentNameChange (name){
        this.props.setPaymentDataAction(name.target.value, types.SET_PAYMENT_NAME_NUMBER_CONST);
    }
    
    handlerPaymentNoteChange (note){
        this.props.setPaymentDataAction(note.target.value, types.SET_PAYMENT_NOTE_NUMBER_CONST);
    }

    handlerSumChange (sum){
        this.props.setPaymentDataAction(sum.target.value, types.SET_PAYMENT_SUM_NUMBER_CONST);
    }

    handlerAccountNumberChange(accountNumber){
        this.props.setPaymentDataAction(accountNumber.target.value, types.SET_PAYMENT_ACCOUNT_NUMBER_NUMBER_CONST);
    }

    render(){

        let colorPoles = this.props.state.createPayment.polesValid ? "gray" : "red";
        let colorSum = this.props.state.createPayment.sumValid ? "gray" : "red";
        let colorNumber = this.props.state.createPayment.accountForNumberValid ? "gray" : "red";

        return <div>
            <div className={styles.title}>Выполнить перевод</div>
            <div className={styles.form}>
                <form onSubmit={a=>this.handleChange(a)}>
                    
                    <input className={styles.input} 
                        type="number" 
                        placeholder="Введите номер счета" 
                        value = {this.props.state.createPayment.accountNumber}
                        style = {{borderColor: colorNumber}}
                        onChange={a=>this.handlerAccountNumberChange(a)}/> <br/>

                    <input className={styles.input} 
                        type="number" 
                        placeholder="Введите сумму" 
                        value = {this.props.state.createPayment.sum}
                        style = {{borderColor: colorSum}}
                        onChange={a=>this.handlerSumChange(a)}/><br/><br/>

                    <input className={styles.input} 
                        type="text" 
                        placeholder="Введите название платежа" 
                        value = {this.props.state.createPayment.paymentName}
                        style = {{borderColor: colorPoles}}
                        onChange={a=>this.handlerPaymentNameChange(a)}/><br/><br/>

                    <input className={styles.input} 
                        type="text" 
                        placeholder="Введите коментарий к платежу" 
                        value = {this.props.state.createPayment.paymentNote}
                        style = {{borderColor: "gray"}}
                        onChange={a=>this.handlerPaymentNoteChange(a)}/><br/><br/>

                    
                    <MuiThemeProvider theme={newTheme}>
                        <Button color="primary" onClick={a=>this.handlerMakePaymentChange(a)}>Выполнить</Button>
                    </MuiThemeProvider>
                </form>
            </div>
            
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePayment);