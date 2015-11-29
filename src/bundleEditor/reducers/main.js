import {
  UPDATE_MESSAGE,
} from '../actions/types';

function mainReducer(store = { message: 'world !' }, action) {
  return ({
    [UPDATE_MESSAGE]({ newMessage }) {
      return {
        ...store,
        message: newMessage,
      };
    },
  }[action.type] || (() => store))(action.payload);
}

export default mainReducer;
