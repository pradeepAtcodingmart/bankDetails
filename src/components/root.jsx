import React, { createContext } from 'react';
import Drawer from './navigation';

export const { Provider, Consumer } = createContext();

class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Drawer />;
  }
}
export default Root;
