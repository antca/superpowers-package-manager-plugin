import React, { PropTypes as T } from 'react';
import { Button } from 'react-bootstrap';

const propTypes = {
  i18n: T.func.isRequired,
  isDepedencyInstalled: T.bool.isRequired,
  onClick: T.func.isRequired,
};

function AddEditButton({ isDepedencyInstalled, onClick, i18n }) {
  return (
    <Button
      block
      bsStyle={isDepedencyInstalled ? 'primary' : 'success'}
      onClick={onClick}
    >
      {i18n(`bundleEditor:view.buttons.${isDepedencyInstalled ? 'edit' : 'add'}`)}
    </Button>
  );
}

export default Object.assign(AddEditButton, { propTypes });
