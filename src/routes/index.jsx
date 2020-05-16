import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Drawer from '../components/navigation';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/'>
            <Drawer />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default Routes;
