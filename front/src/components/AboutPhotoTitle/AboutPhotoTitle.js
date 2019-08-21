import React from "react";
import style from "./styles.css";


const AboutPhotoTitle = (obj) => (

    <div>
        <div className={style.name}>{obj.user}</div>
        <div>{
          new Date(obj.date*1000).getDate() + "." +
          new Date(obj.date*1000).getMonth() + "." +
          new Date(obj.date*1000).getFullYear() + " "+
          new Date(obj.date*1000).getHours() + ":"+
          new Date(obj.date*1000).getMinutes()
        }</div>
    </div>
);

export default AboutPhotoTitle;