function makePhotos(photos){
    let tablePhotos = [];
    let rowPhotos = [];
    let i = 0;

    Object.values(photos).map(photo=>{
        if (i<3){
            rowPhotos.push(photo);
            i++;
        } else{
            i=0;
            tablePhotos.push(rowPhotos);

            rowPhotos = [];
            rowPhotos.push(photo);
            i++;
        }
    });
    if (rowPhotos.length!==0){
        tablePhotos.push(rowPhotos);
    }
    return tablePhotos;
}

export default makePhotos;