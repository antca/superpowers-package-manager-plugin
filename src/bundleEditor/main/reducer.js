import { CHANGE_ACTIVE_PANEL } from './actions';

const initialMainStore = {
  activePanel: 'install',
};

function mainReducer(store = initialMainStore, action) {
  return ({
    [CHANGE_ACTIVE_PANEL]({ activePanel }) {
      return {
        ...store,
        activePanel,
      };
    },
  }[action.type] || (() => {}))(action.payload, action.meta) || store;
}

export default mainReducer;
