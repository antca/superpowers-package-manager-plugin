import React from 'react';
import { Button } from 'react-bootstrap';

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

export default AddEditButton;
