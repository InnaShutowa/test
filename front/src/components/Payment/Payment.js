import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import axios from 'axios';
import queryString from 'query-string';
import styles from "./styles.css";

import GetPaymentInfoAction from "../../store/payment/Actions/GetPaymentInfoAction";


const mapStateToProps = function (state) {
    console.log(state);
    return {
        state: {
            payment: state.PaymentReducer,
            user: state.UserReducer
        }
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPaymentInfo: (data)=>{
            dispatch(GetPaymentInfoAction(data));
        }
    }
};

class Payment extends Component {
    constructor(props){
        super(props);

        let params = queryString.parse(this.props.location.search);
        axios({
            method: 'get',
            headers: {"Access-Control-Allow-Origin": "http://localhost:9000"},
            url: 'http://localhost:57785/PaymentInfo?apikey=' + this.props.state.user.apikey + '&paymentId='+params.id
        }).then(response=>{
            console.log(response);

            if (response.data.status){
                this.props.getPaymentInfo(response.data.data);
            } else{
                alert("Непредвиденная ошибка!");
                window.location.pathname = "/payments";
            }
        }).catch(error=>{
            alert("Непредвиденная ошибка!");
            window.location.pathname = "/payments";
        });
    }
    render() {
        
        let params = queryString.parse(this.props.location.search);

        if (this.props.state.payment.PaymentId == -1) {
            return <div>Loading...</div>;
          } else {
              let output = "входящий";
              if (this.props.state.payment.Output) {
                  output = "исходящий";
                }


            return <div className={styles.padding}>
                <div className={styles.title}>Подробная информация по платежу</div>
                <table className={styles.table}>
                    <tbody>
                        <tr>
                            <td className={styles.cells}>
                                Id платежа
                            </td>
                            <td className={styles.cells}>
                                {this.props.state.payment.PaymentId}
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.cells}>
                                Название платежа
                            </td>
                            <td className={styles.cells}>
                                {this.props.state.payment.PaymentName}
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.cells}>
                                Сумма
                            </td>
                            <td className={styles.cells}>
                                {this.props.state.payment.Sum}
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.cells}>
                                Дата платежа
                            </td>
                            <td className={styles.cells}>
                                {this.props.state.payment.PaymentDate}
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.cells}>
                                Исходящий / входящий платеж
                            </td>
                            <td className={styles.cells}>
                                {output}
                            </td>
                        </tr> 
                        <tr>
                            <td className={styles.cells}>
                                Номер счета отправителя
                            </td>
                            <td className={styles.cells}>
                                {this.props.state.payment.AccountNumber}
                            </td>
                        </tr>       
                        <tr>
                            <td className={styles.cells}>
                                Номер счета получателя
                            </td>
                            <td className={styles.cells}>
                                {this.props.state.payment.ForAccountNumber}
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.cells}>
                                Id отправителя
                            </td>
                            <td className={styles.cells}>
                                {this.props.state.payment.UserId}
                            </td>
                        </tr>  
                        <tr>
                            <td className={styles.cells}>
                                Id получателя
                            </td>
                            <td className={styles.cells}>
                                {this.props.state.payment.ForUserId}
                            </td>
                        </tr> 
                        <tr>
                            <td className={styles.cells}>
                                Имя отправителя
                            </td>
                            <td className={styles.cells}>
                                {this.props.state.payment.UserName} {this.props.state.payment.UserSecondName}
                            </td>
                        </tr>     
                        <tr>
                        <td className={styles.cells}>
                            Имя получателя
                        </td>
                        <td className={styles.cells}>
                            {this.props.state.payment.ForUserName} {this.props.state.payment.ForUserSecondName}
                        </td>
                    </tr>   
                    </tbody>                             
                </table>
            </div>;
          };
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);