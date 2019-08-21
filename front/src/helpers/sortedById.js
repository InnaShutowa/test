let newPhotos = [];
// по возрастанию
function sortedById(ids, photos, desc){
    newPhotos = [];
    ids.map(id=>{
        photos.map(photo=>{
            if (photo.id === id){
                newPhotos.push(photo);
            }
        });
    });

    console.log(newPhotos);

    if (desc == 0) return newPhotos;

    // по убыванию
    return newPhotos.reverse();
}

export default sortedById;