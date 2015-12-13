const initialManageStore = {
  dependencies: {},
};

function manageReducer(store = initialManageStore, action) {
  return ({
  }[action.type] || (() => {}))(action.payload, action.meta) || store;
}

export default manageReducer;
