import React, { PropTypes as T, Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import _ from 'lodash';

class ErrorContainer extends Component {
  static propTypes = {
    errors: T.array.isRequired,
  }
  render() {
    const { errors } = this.props;
    return (
      <div>
       {errors.map(({ origin, error }) =>
         <Alert bsStyle='danger' key={origin}>
           <h4>{_.capitalize(origin)} {'error'}</h4>
            <strong>{error.message}</strong>
         </Alert>)}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    errors: _.map(state, (section, key) => ({ origin: key, error: section.error }))
      .filter((section) => section.error),
  }),
)(ErrorContainer);
