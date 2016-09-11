import {SET_SEARCHING_PATTERN} from "./Types";

export default function(pattern) {
    return {
        type: SET_SEARCHING_PATTERN,
        payload: {pattern}
    }
}