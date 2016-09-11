import {SET_SEARCHING_RESULT} from "./Types";

export default function(search_result_collection) {
    return {
        type: SET_SEARCHING_RESULT,
        payload: search_result_collection
    }
}