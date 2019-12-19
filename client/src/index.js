import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './store/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as serviceWorker from './serviceWorker';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const run = () => {
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>, 
		document.getElementById('root')
	);
};

store.subscribe(run);

run();
serviceWorker.unregister();