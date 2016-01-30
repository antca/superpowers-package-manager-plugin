import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';

function ErrorBody({ errors }) {
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

export { ErrorBody };
export default connect(
  (state) => ({
    errors: _.map(state, (section, key) => ({ origin: key, error: section.error }))
      .filter((section) => section.error),
  }),
)(ErrorBody);
