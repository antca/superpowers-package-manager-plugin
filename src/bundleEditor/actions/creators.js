import {
  UPDATE_MESSAGE,
} from './types';

function updateMessage(newMessage) {
  return {
    type: UPDATE_MESSAGE,
    payload: {
      newMessage,
    },
  };
}

export default {
  updateMessage,
};
