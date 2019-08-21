import * as types from '../constants/ActionTypes';

function AddPhotoAction(name, url, likes) {
    return {
        type: types.ADD_PHOTO_CONSTANT,
        name,
        url,
        likes
    };
}

export default AddPhotoAction;