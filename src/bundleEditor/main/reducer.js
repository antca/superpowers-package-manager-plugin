import { UPDATE_MESSAGE } from './actions';
import { UPDATE_SEARCH_BAR_CONTENT } from '../search/actions';
import searchReducer from '../search/reducer';

const initialMainStore = {
  search: {
    searchBarContent: '',
  },
  message: 'Hello !',
};

function mainReducer(store = initialMainStore, action) {
  return ({
    [UPDATE_MESSAGE]({ payload: { newMessage } }) {
      return {
        ...store,
        message: newMessage,
      };
    },
    [UPDATE_SEARCH_BAR_CONTENT](actionToDelegate) {
      return {
        ...store,
        search: searchReducer(store.search, actionToDelegate),
      };
    },
  }[action.type] || (() => store))(action);
}

export default mainReducer;
