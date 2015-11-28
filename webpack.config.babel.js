import path from 'path';
export default {
  entry: {
    api: path.join(__dirname, 'src/api'),
    componentEditor: path.join(__dirname, 'src/componentEditors'),
    component: path.join(__dirname, 'src/components'),
    data: path.join(__dirname, 'src/data'),
    runtime: path.join(__dirname, 'src/runtime'),
    settingsEditor: path.join(__dirname, 'src/settingsEditors'),
  },
  output: {
      path: path.join(__dirname, '[name]'),
      filename: 'index.js',
  },
}
