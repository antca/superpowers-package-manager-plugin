import React from 'react';
import { Input } from 'react-bootstrap';

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

export default VersionSelect;
