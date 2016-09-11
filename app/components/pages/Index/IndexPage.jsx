import './styl/Index.styl';
import PageTitle from '../../common/PageTitle/PageTitle';
import SearchigFilm from '../../../actions/SearchigFilm';

import { connect } from 'react-redux';


class Index extends React.Component {

    static contextTypes = {
        router: React.PropTypes.shape({
            push: React.PropTypes.func.isRequired
        })
    };

    state = {
        value: this.props.pattern || ''
    };

    onSubmit(e) {
        e.preventDefault();
        if(this.state.value.length > 1) {
            this.props.search(this.state.value);
        }
    }

    onInput({target: {value}}) {
        this.setState({value});
    }

    render() {
        return <div className="main-page">
            <PageTitle title="Search Movies" />
            <form className="main-page__search-form" onSubmit={::this.onSubmit} >
                <input
                    value={this.state.value}
                    onInput={::this.onInput}
                    className="main-page__search-input"
                    type="search"
                    placeholder="Enter movie title"
                />
                <button className="main-page__search-submit" type="submit">
                    Search
                </button>
            </form>
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        pattern: state.pattern
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        search(str) {
            dispatch(SearchigFilm(str));
        }
    }
};

const IndexPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);

export default IndexPage;
