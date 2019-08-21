import React, {Component} from "react";

import styles from "./styles.css"

class RegistrationCreateNickname extends Component {
       render(){
        return <div className={styles.mainForm}>
                    <div className={styles.title}>Регистрация</div>
                    <div className={styles.margin}></div>
                    <div className={styles.step}>Этап 1</div>
                    <p className={styles.unique}>Придумайте себе уникальный ник</p>
                    <p className={styles.cursive}>* Вы сможете изменить его позднее</p>
                    <form>
                        <input className={styles.input} type="text" placeholder="Nickname" />
                        <input className={styles.check} type="submit" value="  "/>
                        <input className={styles.button} type="submit" value="next"/>
                    </form>
            </div>
       } 
}

export default RegistrationCreateNickname;