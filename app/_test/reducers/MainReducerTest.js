import reducer from '../../reducers';
import StartRequest from '../../actions/StartRequest';
import SetSearchingPattern from '../../actions/SetSearchingPattern';
import SetSearchingResult from '../../actions/SetSearchingResult';
import EndRequest from '../../actions/EndRequest';
import SetCurrentFilm from '../../actions/SetCurrentFilm';

describe('Reducer Test', () => {
    let new_state;

    it('START_REQUEST action', () => {
        new_state = getNewState(StartRequest());
        expect(new_state.is_sent_request).toBeTruthy();
    });

    it('END_REQUEST action', () => {
        new_state = getNewState(EndRequest());
        expect(new_state.is_sent_request).toBeFalsy();
    });

    it('SET_SEARCHING_PATTERN action', () => {
        let str = 'test';

        new_state = getNewState(SetSearchingPattern(str));
        expect(new_state.pattern).toBe(str);
    });

    it('SET_SEARCHING_RESULT action', () => {
        let collection = {search_result_collection: ['test1', 'test2']};

        new_state = getNewState(SetSearchingResult(collection));
        expect(new_state.search_result_collection).toEqual(collection.search_result_collection);
    });

    it('SET_SEARCHING_RESULT action', () => {
        let film = { current_film: {Title: 'Test', Year: 2005}};

        new_state = getNewState(SetCurrentFilm(film));
        expect(new_state.current_film).toEqual(film.current_film);
    });
});

function getNewState(action) {
    return reducer({}, action);
}