import {SET_CURRENT_FILM} from "./Types";

export default function(current_film) {
    return {
        type: SET_CURRENT_FILM,
        payload: current_film
    }
}