import * as types from '../constants/ActionTypes';

function SortPhotosAction(count) {
    return {
        type: types.SORT_PHOTOS_CONSTANT,
        count
    };
}

export default SortPhotosAction;