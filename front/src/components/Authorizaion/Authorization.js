import React, {Component} from "react";
import {connect} from "react-redux";
import styles from "./styles.css"


import AuthUserAction from "../../store/user/actions/AuthUserAction";
import SetEmailAction from "../../store/user/Actions/SetEmailAction";
import SetPasswordAction from "../../store/user/Actions/SetPasswordAction";

const mapStateToProps = function (state) {
    console.log(state.UserReducer);
    return {
        state: state.UserReducer.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        authUserAction: (email, password) => {
            dispatch(AuthUserAction(email, password));
        },
        setEmailAction: (email)=>{
            dispatch(SetEmailAction(email));
        },
        setPasswordAction: (password) =>{
            dispatch(SetPasswordAction(password));
        }
    }
};


class Authorization extends Component {
    

    handleChange () {
        console.log("aaaa");
        console.log(this.props);
        this.props.authUserAction(this.props.state.email, this.props.state.password);
    }
    
    handlePasswordChange (password){
        this.props.setPasswordAction(password);
    }
    
    handlerEmailChange (email){
        this.props.setEmailAction(email);
    }

    render() {
        return <div className={styles.mainForm}>
            <div className={styles.title}>Авторизация</div>
            <div className={styles.margin}></div>
            <form>
                
                <input className={styles.input} 
                    type="text" 
                    placeholder="Введите email" 
                    
                    onChange={a=>this.handlerEmailChange(a)}/> <br/>

                <input className={styles.input} 
                    type="password" 
                    placeholder="Введите пароль" 
                    onChange={a=>this.handlePasswordChange(a)}/><br/>

                <input className={styles.button} type="submit" value="Войти" onSubmit={this.handleChange()} />
            </form>
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authorization);