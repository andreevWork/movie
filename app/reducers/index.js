import {START_REQUEST, SET_SEARCHING_PATTERN, SET_SEARCHING_RESULT, END_REQUEST, SET_CURRENT_FILM} from '../actions/Types';

export default (function (handlers) {
    return function (state = {}, action) {
        if(handlers[action.type]) {
            return handlers[action.type](state, action);
        }

        return state;
    };
})({
    [START_REQUEST]: function (state, action) {
        return {
            ...state,
            is_sent_request: true
        };
    },
    [END_REQUEST]: function (state, action) {
        return {
            ...state,
            is_sent_request: false
        };
    },
    [SET_SEARCHING_PATTERN]: function (state, {payload: {pattern}}) {
        return {
            ...state,
            pattern
        };
    },
    [SET_SEARCHING_RESULT]: function (state, {payload: {search_result_collection}}) {
        return {
            ...state,
            search_result_collection
        };
    },
    [SET_CURRENT_FILM]: function (state, {payload: {current_film}}) {
        return {
            ...state,
            current_film
        };
    }
});