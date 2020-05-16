import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import Routes from './routes';
import Snackbar from './components/snackbar/index';
import { ConfirmProvider } from './context';
import Drawer from './components/navigation';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    return (
      <React.Fragment>
        <ConfirmProvider value={this.state}>
          <Snackbar />
          <Routes />
        </ConfirmProvider>
      </React.Fragment>
    );
  }
}

export default hot(App);
