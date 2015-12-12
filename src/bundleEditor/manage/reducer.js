import { cleanModulePath } from '../utils/node';
import { ADD_DEPENDENCY } from '../view/actions';
import { SELECT_VERSION } from '../install/actions';

const initialManageStore = {
  dependencies: {},
};

function manageReducer(store = initialManageStore, action) {
  return ({
    [SELECT_VERSION]({ packageName, version }) {
      return {
        ...store,
        dependencies: {
          ...store.dependencies,
          [packageName]: {
            ...store.dependencies[packageName],
            version,
          },
        },
      };
    },
    [ADD_DEPENDENCY]({ packageInfo }) {
      const { name, versions, 'dist-tags': { latest } } = packageInfo;
      const { main } = versions[latest];
      return {
        ...store,
        dependencies: {
          ...store.dependencies,
          [name]: {
            version: latest,
            bindings: [{ modulePath: cleanModulePath(main), propertyName: name }],
          },
        },
      };
    },
  }[action.type] || (() => {}))(action.payload, action.meta) || store;
}

export default manageReducer;
