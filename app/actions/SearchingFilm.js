import StartRequest from "./StartRequest";
import SetSearchingPattern from "./SetSearchingPattern";
import SetSearchingResult from "./SetSearchingResult";
import EndRequest from "./EndRequest";
import Request from "../utils/Request";
import {getApiForSearch, getPayloadForSearch} from "../routes/UrlsMapping";

export default function(pattern, cb) {
    return dispatch => {
        dispatch(StartRequest());
        dispatch(SetSearchingPattern(pattern));
        new Request(getApiForSearch(pattern))
            .send()
            .then(res => {
                dispatch(SetSearchingResult(getPayloadForSearch(res.data)));
                dispatch(EndRequest());
                if(cb) cb();
            })
    };
}