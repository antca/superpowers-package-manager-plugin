const MAIN_PATH_REGEXP = /^(?:(\.|\.\.)\/)?(.*?)(:?\.js)?$/;

function cleanModulePath(path = '/index.js') {
  const result = MAIN_PATH_REGEXP.exec(path);
  if(result === null) {
    throw new Error(`'${path}' is not a valid module path`);
  }
  const cleanPath = result[2];
  const isNotDirrectPath = result[1] === '..';
  return `${isNotDirrectPath ? '../' : ''}${cleanPath}`;
}

export { cleanModulePath };
