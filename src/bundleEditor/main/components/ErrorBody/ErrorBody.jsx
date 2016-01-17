import _ from 'lodash';
import React from 'react';
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

export default ErrorBody;
