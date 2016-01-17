import _ from 'lodash';
import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';

import ErrorBody from './ErrorBody';

@connect(
  (state) => ({
    errors: _.map(state, (section, key) => ({ origin: key, error: section.error }))
      .filter((section) => section.error),
  }),
)
@autobind
class ErrorBodyContainer extends Component {
  static propTypes = {
    errors: T.array.isRequired,
  };

  render() {
    return (
      <ErrorBody {...this.props} {...this.state}/>
    );
  }
}

export default ErrorBodyContainer;
