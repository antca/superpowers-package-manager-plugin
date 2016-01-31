import React, { PropTypes as T } from 'react';
import { Input } from 'react-bootstrap';

const propTypes = {
  label: T.string.isRequired,
  onSelectVersion: T.func.isRequired,
  packageName: T.string.isRequired,
  value: T.string.isRequired,
  versions: T.object.isRequired,
};

function VersionSelect({ versions, onSelectVersion, value, packageName, label }) {
  return (
    <Input
      bsSize='small'
      label={label}
      onChange={({ target }) => onSelectVersion(packageName, target.value)}
      type='select'
      value={value}
    >
      {Object.keys(versions)
        .reverse()
        .map((version) =>
          <option key={version} value={version}>{version}</option>
        )}
    </Input>
  );
}

export default Object.assign(VersionSelect, { propTypes });
