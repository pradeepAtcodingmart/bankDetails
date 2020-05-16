import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Shield from './errorHandler/shield';

ReactDOM.render(
  <Shield>
    <App />
  </Shield>,
  document.getElementById('root')
);
