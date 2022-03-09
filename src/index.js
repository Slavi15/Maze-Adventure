import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faTimes, faEnvelope, faPhoneFlip } from '@fortawesome/free-solid-svg-icons';
import './index.scss';
import reportWebVitals from './reportWebVitals';

library.add(faBars, faTimes, faEnvelope, faPhoneFlip);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
