import * as types from '../constants/ActionTypes';
import {COUNT_PHOTOS_IN_MAIN_CONSTANT} from "../constants/ActionTypes";

function OrderByDescAction(idss) {
    return {
        type: types.ORDER_BY_DESC_CONSTANT,
        count: COUNT_PHOTOS_IN_MAIN_CONSTANT,
        ids: idss
    };
}

export default OrderByDescAction;