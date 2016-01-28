import React from 'react';
import {
  Glyphicon,
  Button,
  ButtonGroup,
} from 'react-bootstrap';

import VersionSelect from './VersionSelect';
import Bindings from './Bindings';

function EditBody({
  packageInfo,
  onResetBindings,
  onSelectVersion,
  onAddBinding,
  onChangeBinding,
  onDeleteBinding,
  onRemoveDependency,
  dependencies,
  i18n,
}) {
  if(!packageInfo || !dependencies[packageInfo.name]) {
    return <noscript/>;
  }
  const {
    versions,
    name,
  } = packageInfo;
  const {
    version,
    bindings,
  } = dependencies[name];
  return (
    <div>
      <h2>{name}</h2>
        <form>
          <VersionSelect
            label={i18n('bundleEditor:edit.labels.version')}
            onSelectVersion={onSelectVersion}
            packageName={name}
            value={version}
            versions={versions}
          />
          <Bindings
            bindings={bindings}
            label={i18n('bundleEditor:edit.labels.bindings')}
            moduleName={name}
            onAddBinding={onAddBinding}
            onChangeBinding={onChangeBinding}
            onDeleteBinding={onDeleteBinding}
          />
            <ButtonGroup justified style={{ marginTop: '0.6em' }}>
              <ButtonGroup>
                <Button bsStyle='info' onClick={() => onResetBindings(packageInfo)}>
                  {i18n('bundleEditor:edit.buttons.reset')}<Glyphicon glyph='repeat' style={{ marginLeft: '0.3em' }}/>
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button bsStyle='danger' onClick={() => onRemoveDependency(name)}>
                  {i18n('bundleEditor:edit.buttons.remove')}<Glyphicon glyph='trash' style={{ marginLeft: '0.3em' }}/>
                </Button>
              </ButtonGroup>
            </ButtonGroup>
        </form>
    </div>
  );
}

export default EditBody;
