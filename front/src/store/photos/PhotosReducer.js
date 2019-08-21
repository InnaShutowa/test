import {HEADER_CONST, LANDSCAPE_CONST, MY_LIFE_CONST, NO_HEADER_CONST, SOVA_CONST} from "./constants/PhotosUrls";
import sortedById from "../../helpers/sortedById";
import orderByWithSameLikesCount from "../../helpers/orderByWithSameLikes";
import orderByLikes from "../../helpers/orderByLikes";
import changeRating from "../../helpers/changeRating";

let initialState = {
    sort: 0,
    photos: [
        {
            id: 1,
            name: 'Сова',
            url: SOVA_CONST,
            likes: 5,
            currentUserRating: 0,
            date:1557781012,
            user: 'Inna'
        },
        {
            id: 2,
            name: 'Пейзажик',
            url: LANDSCAPE_CONST,
            likes: 4,
            currentUserRating: 0,
            date:1557700099,
            user: 'NewUser'
        },
        {
            id: 3,
            name: 'Жизнь моими глазами',
            url: MY_LIFE_CONST,
            likes: 3,
            currentUserRating: 0,
            date:1557780011,
            user: 'NewUser1'
        },
        {
            id: 4,
            name: 'Несбывшийся хедер сайта',
            url: NO_HEADER_CONST,
            likes: 8,
            currentUserRating: 0,
            date:1557780000,
            user: 'Inna'
        },
        {
            id: 5,
            name: 'Сбывшийся хедер сайта',
            url: HEADER_CONST,
            likes: 8,
            currentUserRating: 0,
            date:1557781068,
            user: 'NewUser'
        }
    ]
};

let sortedPhotos = [];

function Reducer(state = initialState, action) {
    console.log(action.type);
    console.log(handlers[action.type]);
    if (handlers[action.type]){
        console.log("adas");
        return handlers[action.type].handler(state, action);
    }
    return state;
}


const handlers  = {
        "CHANGE_RATING" : {
            handler(state, action){
                console.log("as");
                let inState = changeRating(state.photos, action.id, action.rating);
                // по убыванию
                if (state.sort === -1) {
                    sortedPhotos = [];
                    let ids = orderByLikes(state.photos);
                    sortedPhotos = sortedById(ids, state.photos, 1);
                    state = {
                        photos: orderByWithSameLikesCount(sortedPhotos).slice(0, action.count),
                        sort: -1
                    };
                    return state;
                }
                // по возрастанию
                if (state.sort === 1) {
                    sortedPhotos = [];
                    let ids = orderByLikes(state.photos);
                    sortedPhotos = sortedById(ids, state.photos, 0);
                    state = {
                        photos: orderByWithSameLikesCount(sortedPhotos).slice(0, action.count),
                        sort: 1
                    };
                    return state;
                }
                // забили
                state = {
                    photos: inState,
                    sort: 0
                };
                return state;
            }
        }, 
        "ORDER_BY" : {
             handler(state, action){
                if (action.ids.length!=0){
                    let a = sortedById(action.ids, state.photos, 1);
                    state = {
                        sort: 1,
                        photos: orderByWithSameLikesCount(a)
                    }
                    console.log(state);
                    return state;
                }
                return state;
            }
        },
        "ORDER_BY_DESC" : {
           handler(state, action){
            if (action.ids.length!=0){
                let a = sortedById(action.ids, state.photos, 0);
                state = {
                    sort: 1,
                    photos: orderByWithSameLikesCount(a)
                }
                return state;
            }
            return state;
           }
        }
    };

export default Reducer;