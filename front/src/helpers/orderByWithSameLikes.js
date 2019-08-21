

let sortedPhotosByDate = [];

function orderByWithSameLikesCount(sortedPhotos){
    let array = [];
    let resultSortedPhotos = [];

    sortedPhotos.map(photo=>{
        let buff = 0;
        array.map(elems=>{
            if (elems.id===photo.id){
                buff = 1;
            }
        });
        if (buff === 0){
            array = [];
            array.push(photo);
            sortedPhotos.map(ph=>{
                if (ph.id !== photo.id){
                    if (ph.likes === photo.likes){
                        array.push(ph);
                    }
                }
            });
            
            sortedPhotosByDate = [];
            SortingByDate(array);
            resultSortedPhotos = resultSortedPhotos.concat(sortedPhotosByDate);
        }
    });
    return resultSortedPhotos;
}


function SortingByDate(array){
    let newArray = [];
    let max = 0;
    let elementSortedArray = {};
    array.map(photo=>{
        if (photo.date > max) {
            max = photo.date;
            elementSortedArray = photo;
        }
    });
    sortedPhotosByDate.push(elementSortedArray);
    array.map(photo=>{
        if (photo.id !== elementSortedArray.id){
            newArray.push(photo);
        }
    });
    if (newArray.length!==0){
        SortingByDate(newArray);
    }
}



export default orderByWithSameLikesCount;