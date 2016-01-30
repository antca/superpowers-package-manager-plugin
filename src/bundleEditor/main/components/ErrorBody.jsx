import _ from 'lodash';
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';

const propTypes = {
  errors: T.array.isRequired,
};

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

Object.assign(ErrorBody, { propTypes });

export { ErrorBody };
export default connect(
  (state) => ({
    errors: _.map(state, (section, key) => ({ origin: key, error: section.error }))
      .filter((section) => section.error),
  }),
)(ErrorBody);
