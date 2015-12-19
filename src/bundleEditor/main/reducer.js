import { REMOVE_DEPENDENCY } from '../../data/actions';
import { CHANGE_ACTIVE_PANEL } from './actions';

const initialMainStore = {
  activePanel: 'search',
};

function mainReducer(store = initialMainStore, action) {
  return ({
    [CHANGE_ACTIVE_PANEL]({ activePanel }) {
      return {
        ...store,
        activePanel,
      };
    },
    [REMOVE_DEPENDENCY]() {
      return {
        ...store,
        activePanel: 'manage',
      };
    },
  }[action.type] || (() => {}))(action.payload, action.meta) || store;
}

export default mainReducer;
