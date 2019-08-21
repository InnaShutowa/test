import React from "react";

import AboutPhoto from "../AboutPhoto";

import style from "./styles.css";
import AboutPhotoTitle from "../AboutPhotoTitle";
import makePhotos from "../../helpers/makePhotos";


const Photos = (state) => {
    console.log(state.photos);
    const photosList = makePhotos(state.photos);
    console.log(photosList);
    return <div className={style.table}> {
        photosList.map(photosRow => (
            <div className={style.row}>
                {
                    photosRow.map(photo => (
                        <div className={style.cell}>
                            <AboutPhotoTitle user={photo.user} date={photo.date}/>
                            <img className={style.image} src={photo.url} alt={"photo"}/>
                            <AboutPhoto name={photo.name} likes={photo.likes} id={photo.id} currentUserRating={photo.currentUserRating}/>
                        </div>
                    ))
                }
            </div>
        ))
    }
    </div>
};
export default Photos;