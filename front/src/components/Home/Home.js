import React, {Component} from "react";
import {connect} from "react-redux";

import styles from "./styles.css"

const mapStateToProps = function (state) {
    return {
        state: state.UserReducer
    };
};

class Home extends Component {
    render() {
        return <div className={styles.padding}>
            <div className={styles.title}>Личный кабинет пользователя</div>
            <table className={styles.table}>
                <tbody>
                    <tr className={styles.cell}>
                        <td className={styles.cell}>
                            Id пользователя
                        </td>
                        <td className={styles.cell}>
                            {this.props.state.userId}
                        </td>
                    </tr>
                    <tr className={styles.cell}>
                        <td className={styles.cell}>
                            Имя 
                        </td>
                        <td className={styles.cell}>
                            {this.props.state.firstName}
                        </td>
                    </tr>
                    <tr className={styles.cell}>
                        <td className={styles.cell}>
                            Фамилия 
                        </td>
                        <td className={styles.cell}>
                            {this.props.state.secondName}
                        </td>
                    </tr>
                    <tr className={styles.cell}>
                        <td className={styles.cell}>
                            Email
                        </td>
                        <td className={styles.cell}>
                            {this.props.state.email}
                        </td>
                    </tr>
                    <tr className={styles.cell}>
                        <td className={styles.cell}>
                            Номер счета
                        </td>
                        <td className={styles.cell}>
                            {this.props.state.accountNumber}
                        </td>
                    </tr>
                    <tr className={styles.cell}>
                        <td className={styles.cell}>
                            Бюджет
                        </td>
                        <td className={styles.cell}>
                            {this.props.state.budget}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    }
};


export default connect(mapStateToProps)(Home);