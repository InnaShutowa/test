import React, {Component} from "react";
import styles from "./styles.css"

class RegistrationPassword extends Component {
    render() {
        return <div className={styles.mainForm}>
            <div className={styles.title}>Регистрация</div>
            <div className={styles.margin}></div>
            <div className={styles.step}>Этап 3</div>
            <p className={styles.unique}>Установите пароль для доступа к аккаунту</p>

            <form>
                <input className={styles.input} type="password" placeholder="Введите пароль" /> <br/>
                <input className={styles.input} type="password" placeholder="Подтвердите пароль" /><br/>
                <input className={styles.button} type="submit" value="finish" />
            </form>
        </div>
    }
}

export default RegistrationPassword;