import React, { PropTypes as T } from 'react';
import {
  Panel,
  ListGroup,
  ListGroupItem,
  Button,
  Glyphicon,
} from 'react-bootstrap';

import Binding from './Binding';

const propTypes = {
  bindings: T.array.isRequired,
  label: T.string.isRequired,
  moduleName: T.string.isRequired,
  onAddBinding: T.func.isRequired,
  onChangeBinding: T.func.isRequired,
  onDeleteBinding: T.func.isRequired,
};

function Bindings({ moduleName, bindings, onChangeBinding, onAddBinding, onDeleteBinding, label }) {
  return (
    <div>
      <label>{label}</label>
      <Panel>
        <ListGroup fill>
          {bindings.map((binding, index) =>
            <Binding
              binding={binding}
              bindingId={index}
              key={index}
              moduleName={moduleName}
              onChangeBinding={onChangeBinding}
              onDeleteBinding={onDeleteBinding}
            />)}
          <ListGroupItem>
            <Button block onClick={() => onAddBinding(moduleName)}>
              <Glyphicon glyph='plus-sign'/>
            </Button>
          </ListGroupItem>
        </ListGroup>
      </Panel>
    </div>
  );
}

export default Object.assign(Bindings, { propTypes });
