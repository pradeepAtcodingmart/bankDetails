import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Shield extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null, hasError: false };
  }

  static getDrivedStateFromError() {
    return {
      hasError: true
    };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div>
          <p>{error}</p>
        </div>
      );
    }
    return children;
  }
}

Shield.propTypes = {
  children: PropTypes.node
};
