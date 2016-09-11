import './stylus/app.styl';

import { Router, browserHistory } from 'react-router';
import Routes from './routes/Routes';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';

let store = createStore(
    reducer,
    window.__STATE__,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <Router routes={Routes} history={browserHistory} />
    </Provider>,
    document.getElementById("container")
);