import React from 'react';
import {
  Panel,
  ListGroup,
  ListGroupItem,
  Button,
  Glyphicon,
} from 'react-bootstrap';

import Binding from './Binding';

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

export default Bindings;
