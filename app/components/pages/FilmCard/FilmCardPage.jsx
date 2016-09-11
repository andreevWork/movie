import './styl/FilmCard.styl';
import PageTitle from '../../common/PageTitle/PageTitle';
import { connect } from 'react-redux';
import {getApiForFilm, getPayloadForFilm} from "../../../routes/UrlsMapping";
import GoToFilm from "../../../actions/GoToFilm";

class FilmCard extends React.Component {

    componentDidMount() {
        if(!this.props.current_film) {
            this.props.initPage(this.props.params.id);
        }
    }

    renderCard() {
        let {current_film} = this.props,
            {Poster = '', Title = ''} = current_film,
            keys = Object.keys(current_film);

        return <div className="film-card">
            <PageTitle title={Title} />
            <article className="film-card__data">
                <table>
                    <tbody>
                    <tr>
                        <td rowSpan={keys.length} className="film-card__poster">
                            <img src={Poster === 'N/A' ? '' : Poster} alt={`Poster ${Title}`} />
                        </td>
                        <td>Title:</td>
                        <td>
                            <div className="film-card__props">
                                {Title}
                            </div>
                        </td>
                    </tr>
                    {keys.map((key, i) => {
                        if(this.notRenderProps(key)) return;

                        return <tr key={i} >
                            <td>{key}:</td>
                            <td>
                                <div className="film-card__props">
                                    {current_film[key]}
                                </div>
                            </td>
                        </tr>;
                    })}
                    </tbody>
                </table>
            </article>
        </div>;
    }

    render() {
        if(this.props.current_film && this.props.current_film.Response) {
            return this.renderCard();
        } else if(this.props.current_film && !this.props.current_film.Response) {
            return <span>'Incorrect imdbID'</span>;
        } else {
            return null;
        }
    }

    notRenderProps(key) {
        return key === "Title" || key === 'Poster' || key === 'imdbID' || key === 'Response';
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initPage(imdbID) {
            dispatch(GoToFilm(imdbID));
        }
    }
};

const mapStateToProps = (state) => {
    return {
        current_film: state.current_film
    }
};

const FilmCardPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(FilmCard);

if(IS_SERVER) {
    FilmCardPage.getApi = ({params: {id: imdbID}}) => {
        return getApiForFilm(imdbID);
    };

    FilmCardPage.getPayload = (response) => {
        return getPayloadForFilm(response);
    };    
}


export default FilmCardPage;