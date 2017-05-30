import React from 'react';

import ReactDOM from 'react-dom';

import App from './App';

import registerServiceWorker from './registerServiceWorker';

import './index.css';



/* ReactDOM.render() instantiates the root component, starts the framework, and injects the markup into a raw DOM element, provided as the second argument. */
/* ReactDOM.render is located at the bottom of the script after the sub-components are defined. */
ReactDOM.render( 
  <App />, 
  document.getElementById('root')
);


registerServiceWorker();
