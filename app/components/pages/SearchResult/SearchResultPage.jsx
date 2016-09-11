import './styl/SearchResultPage.styl';
import PageTitle from '../../common/PageTitle/PageTitle';
import GoToFilm from '../../../actions/GoToFilm';
import { connect } from 'react-redux';
import {getApiForSearch, getPayloadForSearch} from "../../../routes/UrlsMapping";

class SearchResult extends React.Component {
    render() {
        return <div className="search-result">
            <PageTitle title="Searching Result" />
            <div className="search-result-pattern">for: <b>{this.props.location.query.s}</b></div>
            <article className="search-result__list">
                {this.props.search_result_collection.map(
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
        search_result_collection: state.search_result_collection
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        goToFilm(imdbID) {
            dispatch(GoToFilm(imdbID));
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