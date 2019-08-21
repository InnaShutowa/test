import React, {Component} from "react";

import styles from "./styles.css"

class RegistrationFullInfo extends Component {
       render(){
           return <div className={styles.mainForm}>
               <div className={styles.title}>Регистрация</div>
                <div className={styles.margin}></div>
                <div className={styles.step}>Этап 2</div>
               <p className={styles.unique}>Заполните анкету</p>

               <form>
                    <input className={styles.input} type="text" placeholder="Имя" /> <br/>
                    <input className={styles.input} type="text" placeholder="Фамилия" /> <br/>
                    <input className={styles.input} type="text" placeholder="Номер телефона" /> <br/>
                    <input className={styles.input} type="text" placeholder="Email" /> <br/>
                    <input className={styles.button} type="submit" value="next"/>
               </form>
           </div>
       }
}

export default RegistrationFullInfo;