function isNullOrEmpty(data){
    if (data == null ||
        data =='' ||
        data == undefined){
            return true;
        }
    return false;
}

export default isNullOrEmpty;