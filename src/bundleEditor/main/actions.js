const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
function updateMessage(newMessage) {
  return {
    type: UPDATE_MESSAGE,
    payload: {
      newMessage,
    },
  };
}

export default {
  UPDATE_MESSAGE,
  updateMessage,
};
