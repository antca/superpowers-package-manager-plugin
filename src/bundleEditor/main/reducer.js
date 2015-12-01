import { UPDATE_MESSAGE } from './actions';

const initialMainStore = {
  message: 'Hello !',
};

function mainReducer(store = initialMainStore, action) {
  return ({
    [UPDATE_MESSAGE]({ newMessage }) {
      return {
        ...store,
        message: newMessage,
      };
    },
  }[action.type] || (() => {}))(action.payload, action.meta) || store;
}

export default mainReducer;
