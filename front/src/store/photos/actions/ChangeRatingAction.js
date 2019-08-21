import * as types from '../constants/ActionTypes';

function ChangeRatingAction(id, rating) {
    return {
        type: types.CHANGE_RATING_CONSTANT,
        id: id,
        rating: rating,
        count: types.COUNT_PHOTOS_IN_MAIN_CONSTANT
    };
}

export default ChangeRatingAction;