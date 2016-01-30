import React, { PropTypes as T } from 'react';
import {
  ListGroupItem,
  Input,
  Glyphicon,
  Button,
} from 'react-bootstrap';

const propTypes = {
  binding: T.object.isRequired,
  bindingId: T.number.isRequired,
  moduleName: T.string.isRequired,
  onChangeBinding: T.func.isRequired,
  onDeleteBinding: T.func.isRequired,
};

function Binding({ moduleName, binding, bindingId, onChangeBinding, onDeleteBinding }) {
  return (
    <ListGroupItem style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <Input
        addonBefore={`${moduleName}${binding.modulePath === '' ? '' : '/'}`}
        onChange={({ target }) => onChangeBinding(moduleName, bindingId, {
          ...binding,
          modulePath: target.value,
        })}
        standalone
        type='text'
        value={binding.modulePath}
      />
      <div style={{ margin: '0.3em' }}><Glyphicon glyph='arrow-right'/></div>
      <Input
        onChange={({ target }) => onChangeBinding(moduleName, bindingId, {
          ...binding,
          propertyName: target.value,
        })}
        standalone
        style={{ minWidth: '8em' }}
        type='text'
        value={binding.propertyName}
      />
      <Button
        bsSize='xsmall'
        bsStyle={'danger'}
        onClick={() => onDeleteBinding(moduleName, bindingId)}
        style={{ marginLeft: '0.3em' }}
      >
        <Glyphicon glyph='remove'/>
      </Button>
    </ListGroupItem>
  );
}

export default Object.assign(Binding, { propTypes });
