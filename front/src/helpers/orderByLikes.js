let sortedPhotosIds = [];

function orderBy(array){
    
    let elementSortedArray = {};
    let max = 0;
    let newArr = [];
    array.map(photo => {
        if (photo.likes > max) {
            max = photo.likes;
            elementSortedArray = photo.id;
        }
    });
console.log(elementSortedArray);
    sortedPhotosIds.push(elementSortedArray);

    array.map(photo => {
        if (photo.id !== elementSortedArray) {
            newArr.push(photo);
        }
    });

    if (newArr.length > 0) {
        orderBy(newArr);
    }
}

function orderByLikes(array){
    sortedPhotosIds = [];
    orderBy(array);
    return sortedPhotosIds;
}

export default orderByLikes;