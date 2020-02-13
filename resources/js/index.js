import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import '@fortawesome/fontawesome-free/css/all.min.css';


if (document.getElementById('root')) {
  ReactDOM.render(<App />, document.getElementById('root'));
}