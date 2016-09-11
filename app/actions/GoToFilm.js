import StartRequest from "./StartRequest";
import SetCurrentFilm from "./SetCurrentFilm";
import EndRequest from "./EndRequest";
import Request from "../utils/Request";
import { browserHistory } from 'react-router';
import UrlsMapping, {getApiForFilm, getPayloadForFilm} from "../routes/UrlsMapping";
import FilmCardPage from '../components/pages/FilmCard/FilmCardPage';

export default function(imdbID) {
    return dispatch => {
        dispatch(StartRequest());
        new Request(getApiForFilm(imdbID))
            .send()
            .then(res => {
                dispatch(SetCurrentFilm(getPayloadForFilm(res.data)));
                dispatch(EndRequest());
                browserHistory.push({
                    pathname: UrlsMapping.film.replace(':id', imdbID)
                });
            })
    };
}