const initialInstallStore = {};

function installReducer(store = initialInstallStore, action) {
  return ({
  }[action.type] || (() => {}))(action.payload, action.meta) || store;
}

export default installReducer;
