import './styles.scss';
import React, { Component, PropTypes } from 'react';
import Notification from './Notification';

class App extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <div className="container">
          {this.props.children}
        </div>
        <Notification />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
