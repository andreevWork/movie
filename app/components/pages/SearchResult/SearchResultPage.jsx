import './styl/SearchResultPage.styl';
import PageTitle from '../../common/PageTitle/PageTitle';
import GoToFilm from '../../../actions/GoToFilm';
import { connect } from 'react-redux';
import {getApiForSearch, getPayloadForSearch} from "../../../routes/UrlsMapping";
import SearchingFilm from '../../../actions/SearchingFilm';
import { browserHistory } from 'react-router';
import UrlsMapping from "../../../routes/UrlsMapping";
import SetSearchingPattern from "../../../actions/SetSearchingPattern";

class SearchResult extends React.Component {
    componentDidMount() {
        if(!this.props.search_result_collection) {
            this.props.initPage(this.props.location.query.s);
        } else {
            if(!this.props.pattern) {
                this.props.setPattern(this.props.location.query.s);
            }
        }
    }
    
    render() {
        return <div className="search-result">
            <PageTitle title="Searching Result" />
            <div className="search-result-pattern">for: <b>{this.props.pattern}</b></div>
            <article className="search-result__list">
                {!this.props.search_result_collection && "Nothing was found"}
                {this.props.search_result_collection && this.props.search_result_collection.map(
                    (movie, i) => <MovieSnippet goToFilm={this.props.goToFilm} key={i} {...movie} />
                )}
            </article>
        </div>;
    }
}

const MovieSnippet = ({Title, Year, Type, Poster, imdbID, goToFilm}) => <div className="search-result__list-item">
    <table className="search-result__list-item-data">
        <tbody>
            <tr>
                <td rowSpan="3" className="search-result__list-item-poster">
                    <img onClick={() => goToFilm(imdbID)} src={Poster === 'N/A' ? '' : Poster} alt={`Poster ${Title}`} />    
                </td>
                <td>Title:</td>
                <td>
                    <div className="search-result__list-item-title">
                        {Title}
                    </div>
                </td>
            </tr>
            <tr>
                <td>Year:</td>
                <td>{Year}</td>
            </tr>
            <tr>
                <td>Type:</td>
                <td>{Type}</td>
            </tr>
            <tr>
                <td colSpan="3">
                    <a className="search-result__list-item-link" onClick={() => goToFilm(imdbID)} >more info >></a>
                </td>
            </tr>
        </tbody>
    </table>
</div>;

const mapStateToProps = (state) => {
    return {
        search_result_collection: state.search_result_collection,
        pattern: state.pattern
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        goToFilm(imdbID) {
            dispatch(GoToFilm(imdbID, () => {
                browserHistory.push({
                    pathname: UrlsMapping.film.replace(':id', imdbID)
                });
            }));
        },
        initPage(str) {
            dispatch(SearchingFilm(str));
        },
        setPattern(str) {
            dispatch(SetSearchingPattern(str));
        }
    }
};

const SearchResultPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResult);

if(IS_SERVER) {
    SearchResultPage.getApi = ({location: {query: {s: pattern}}}) => {
        return getApiForSearch(pattern);
    };

    SearchResultPage.getPayload = (response) => {
        return getPayloadForSearch(response);
    };
}

export default SearchResultPage;