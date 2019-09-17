import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import axios from 'axios';

import styles from "./styles.css";
import AddPaymentInfoAction from "../../store/payments/Actions/AddPaymentInfoAction";
import SetIsReadyAction from "../../store/payments/Actions/SetIsReadyAction";
import ResetDataAction from "../../store/payments/Actions/ResetDataAction";
import SetOnlyInputAction from "../../store/payments/Actions/SetOnlyInputAction";
import SetOnlyOutputAction from "../../store/payments/Actions/SetOnlyOutputAction";
import ChangeSelectedValueAction from "../../store/payments/Actions/ChangeSelectedValueAction";
import SetFindValueAction from "../../store/payments/Actions/SetFindValueAction";

const mapStateToProps = function (state) {
    return {
        state: {
            payments: state.PaymentsReducer,
            user: state.UserReducer
        }
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addPaymentInfo: (data) => {
            dispatch(AddPaymentInfoAction(data));
        },
        setIsReady: () =>{
            dispatch(SetIsReadyAction());
        },
        resetData: () =>{
            dispatch(ResetDataAction());
        },
        setIsOnlyInput: (status)=>{
            dispatch(SetOnlyInputAction(status));
        },
        setIsOnlyOutput: (status)=>{
            dispatch(SetOnlyOutputAction(status));
        },
        changeSelectedValue:(data) =>{
            dispatch(ChangeSelectedValueAction(data));
        },
        setFindValue: (data)=>{
            dispatch(SetFindValueAction(data));
        }
    }
};


class Payments extends Component {
    constructor(props){
        super(props);
        this.handlerResetList();
    }

    handlerResetList(){
        this.props.resetData();
        axios({
            method: 'get',
            headers: {"Access-Control-Allow-Origin": "http://localhost:9000"},
            url: 'http://localhost:57785/Payments?apikey=' + this.props.state.user.apikey
        }).then(response=>{
            if (response.data.status){
                response.data.data.map((element, i)=>{
                    if (this.props.state.payments.isOnlyInput == this.props.state.payments.isOnlyOutput){
                        this.props.addPaymentInfo(element);
                    } else if (this.props.state.payments.isOnlyInput && !element.output){
                        this.props.addPaymentInfo(element);  
                    } else if (this.props.state.payments.isOnlyOutput && element.output){
                        this.props.addPaymentInfo(element);  
                    }

                });
                this.props.setIsReady();
            } else{
                alert("Непредвиденная ошибка!");
                window.location.pathname = "/main";
            }
        });
    }

    handleChangeOutput(event){
        this.props.setIsOnlyOutput(!this.props.state.payments.isOnlyOutput);
        this.handlerResetList();
    }
    handleChangeInput(event){
        this.props.setIsOnlyInput(!this.props.state.payments.isOnlyInput);
        this.handlerResetList();
    }
    handlerChangeSelected(select){
        this.props.changeSelectedValue(select.target.value);
    }

    handlerFindByParams(event){
        let type = 1;
        if(this.props.state.payments.selected == 'account_for'){
            type = 2;
        }
        if (this.props.state.payments.selected == 'account_to'){
            type = 3;
        }

        let body ={
            apikey: this.props.state.user.apikey,
            type: type,
            value: this.props.state.payments.findValue
        };

        this.props.resetData();
        axios({
            method: 'post',
            headers: {"Access-Control-Allow-Origin": "http://localhost:9000"},
            url: 'http://localhost:57785/Find',
            data: body
        }).then(response=>{
            if (response.data.status){
                response.data.data.map((element, i)=>{
                    if (this.props.state.payments.isOnlyInput == this.props.state.payments.isOnlyOutput){
                        this.props.addPaymentInfo(element);
                    } else if (this.props.state.payments.isOnlyInput && !element.output){
                        this.props.addPaymentInfo(element);  
                    } else if (this.props.state.payments.isOnlyOutput && element.output){
                        this.props.addPaymentInfo(element);  
                    }

                });
                this.props.setIsReady();
            } else{
                alert("Непредвиденная ошибка!");
                window.location.pathname = "/main";
            }
        });
        event.preventDefault();
    }

    handlerSetFindValue(value){
        this.props.setFindValue(value.target.value);
    }



    render(){

        if (!this.props.state.payments.isReady) {
            return <div>Loading...</div>;
        } else {
            return <div className={styles.padding}>
            <div className={styles.title}>Список платежей</div>


            <div className={styles.find}>
                
                <input className={styles.elements}  
                        type="text" 
                        value={this.props.state.payments.findValue}
                        onChange={a=>this.handlerSetFindValue(a)}
                        placeholder="Введите значение"/>
                <div className={styles.elements}>
                    <select 
                        value={this.props.state.payments.selected}
                        onChange={select=>this.handlerChangeSelected(select)}>

                        <option value="name">По названию</option>
                        <option value="account_for">По номеру счета получателя</option>
                        <option value="account_to">По номеру счета отправителя</option>
                    </select>
                </div>
                <input type="submit" onClick={a=>this.handlerFindByParams(a)} value="Поиск"/>
            </div>


            <div> 
                <div>
                    Только входящие
                    <input type="checkbox" defaultChecked={this.props.state.payments.isOnlyInput} onChange={a=>this.handleChangeInput(a)} />
                </div>
                <div>
                    Только исходящие
                    <input type="checkbox" defaultChecked={this.props.state.payments.isOnlyOutput} onChange={a=>this.handleChangeOutput(a)} />
                </div>
               
            </div>

            
            <table className={styles.table}>
                <tbody>
                <tr>
                    <th>
                        Id платежа
                    </th>
                    <th>
                        Название платежа
                    </th>
                    <th>
                        Сумма 
                    </th>
                    <th>
                        Исходящий?
                    </th>
                    <th>
                        Дата платежа
                    </th>
                    <th>
                        Номер счета отправителя
                    </th>
                    <th>
                        Номер счета получателя
                    </th>
                </tr>
                    {
                        this.props.state.payments.payments.map((element, i)=>{
                            let href = "/payment?id="+element.PaymentId;
                            let output = "-";
                            if (element.Output){
                                output = "+";
                            }
                            return <tr key={i}>
                                <td className={styles.cells} key={i+"id"}><Link to={href}>{element.PaymentId}</Link></td>
                                <td className={styles.cells} key={i+"name"}>{element.PaymentName}</td>
                                <td className={styles.cells} key={i+"sum"}>{element.Sum}</td>
                                <td className={styles.cells} key={i+"output"}>{output}</td>
                                <td className={styles.cells} key={i+"date"}>{element.PaymentDate}</td>
                                <td className={styles.cells} key={i+"to"}>{element.ToAccountNumber}</td>
                                <td className={styles.cells} key={i+"for"}>{element.ForAccountNumber}</td>
                            </tr>
                        })
                    }
                    
                </tbody>
            </table>
        </div>
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payments);