const UrlsMapping = {
    index: '/',
    search_result: '/search',
    film: '/film/:id'
};

export const api_base_url = 'http://www.omdbapi.com/';

export function getApiForSearch(pattern) {
    return `${api_base_url}?s=${encodeURIComponent(pattern)}`;
}

export function getPayloadForSearch(response) {
    return { search_result_collection: response.Search };
}

export function getPayloadForFilm(response) {
    return { current_film: response };
}

export function getApiForFilm(imdbID) {
    return `${api_base_url}?i=${encodeURIComponent(imdbID)}`;
}


export default UrlsMapping;