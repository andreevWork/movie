import Index from "../components/pages/Index/IndexPage";
import SearchResultPage from "../components/pages/SearchResult/SearchResultPage";
import FilmCardPage from "../components/pages/FilmCard/FilmCardPage";
import UrlsMapping from "./UrlsMapping";

const Routes = [
    {
        path: UrlsMapping.index,
        component: Index
    },
    {
        path: UrlsMapping.search_result,
        component: SearchResultPage
    },
    {
        path: UrlsMapping.film,
        component: FilmCardPage
    }
];

export default Routes;