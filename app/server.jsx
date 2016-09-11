import request from 'request';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import Routes  from './routes/Routes.js';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';

const app = express();

app.use('/', express.static('dist'));

app.set('view engine', 'jade');
app.set('views', __dirname);

app.get('/*', function (req, res) {
    if(req.url.match(/favicon\.ico/)) return;

    match({ routes: Routes, location: req.url }, (e, red, renderProps) => {
        let component = renderProps.components[renderProps.components.length - 1];
        if(component.getApi) {
            request(component.getApi(renderProps), function (error, response) {
                res.render(
                    'index',
                    getPropsToRender(component.getPayload(JSON.parse(response.body)), renderProps)
                );
            });   
        } else {
            res.render(
                'index',
                getPropsToRender({}, renderProps)
            );
        }
    });
});

function getPropsToRender(initialState, renderProps) {
    let store = createStore(reducer, initialState);
    return {
        html : renderToString(<Provider store={store}><RouterContext {...renderProps} /></Provider>),
        __state : initialState
    };  
}

app.listen(3001, function () {
    console.log('Server was started on 3001 port.');
});