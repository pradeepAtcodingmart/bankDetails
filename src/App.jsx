import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import Routes from './routes';
import './assets/css/common.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    return (
      <React.Fragment>
        <Routes />
      </React.Fragment>
    );
  }
}

export default hot(App);
