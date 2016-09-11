import './styl/PageTitle.styl';
import classNames from 'classnames';

export default class PageTitle extends React.Component {
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        className: React.PropTypes.string
    };
    
    render() {
        return <header>
            <h1 className={classNames('page-title', this.props.className)}>{this.props.title}</h1>
        </header>
    }
}