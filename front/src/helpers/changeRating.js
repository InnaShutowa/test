function changeRating(photos, id, rating){
    let newPhotos = [];
    photos.map(photo => {
        if (photo.id !== id) {
            newPhotos.push(photo);
        } else {
            if (rating + photo.likes >= 0) {
                photo.likes += rating;

                if (photo.currentUserRating + rating === 0) {
                    photo.currentUserRating = 0;
                } else {
                    photo.currentUserRating = rating;
                }
            }
            newPhotos.push(photo);
        }
    });
    return newPhotos; 
}

export default changeRating;