import React from "react";
import style from "./styles.css";
import RatingButtons from "../RatingButtons";


const AboutPhoto = (obj) => (
    <div>
        {
            console.log(obj)
        }

        <div className={style.name}>{obj.name}</div>
        <RatingButtons id={obj.id} likes={obj.likes} currentUserRating={obj.currentUserRating}/>
    </div>
);

export default AboutPhoto;