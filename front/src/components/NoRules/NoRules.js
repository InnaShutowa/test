import React, {Component} from "react";
import nechist from "../../assets/away.jpg";

import style from "./styles.css"


class NoRules extends Component {

    render(){
        return <div className={style.main}>
            Нет доступа к странице!
            <br/><img src={nechist}/>
        </div>
    }
}

export default NoRules;