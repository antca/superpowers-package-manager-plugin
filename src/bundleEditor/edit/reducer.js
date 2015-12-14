const initialEditStore = {};

function editReducer(store = initialEditStore, action) {
  return ({
  }[action.type] || (() => {}))(action.payload, action.meta) || store;
}

export default editReducer;
