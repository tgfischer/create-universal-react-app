/* global __LOGGER__: false */
import React from 'react';
import {logging} from 'react-server';

const logger = logging.getLogger(__LOGGER__);

export default class HelloWorld extends React.Component {
  state = {
    exclamationCount: 0,
  };

  onButtonClick = () => {
    logger.info(`Getting more excited! previously ${this.state.exclamationCount} excitements.`);
    this.setState({exclamationCount: this.state.exclamationCount + 1});
  };

  render () {
    return (
      <div>
        <h2>Hello, World{'!'.repeat(this.state.exclamationCount)}</h2>
        <button onClick={this.onButtonClick}>Get More Excited!</button>
      </div>
    );
  }
}
