import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ComplaintForm from './components/complaint-form'
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
	<Provider store={store}>
		<ComplaintForm/>
	</Provider>, document.getElementById('root'));
registerServiceWorker();
