import { cleanModulePath } from '../utils/node';
import { ADD_DEPENDENCY } from '../view/actions';
import {
  SELECT_VERSION,
  UPDATE_BINDING,
  ADD_BINDING,
} from '../install/actions';

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
    [UPDATE_BINDING]({ moduleName, bindingId, binding }) {
      return {
        ...store,
        dependencies: {
          ...store.dependencies,
          [moduleName]: {
            ...store.dependencies[moduleName],
            bindings: [
              ...store.dependencies[moduleName].bindings.slice(0, bindingId),
              store.dependencies[moduleName].bindings[bindingId] = binding,
              ...store.dependencies[moduleName].bindings.slice(bindingId + 1),
            ],
          },
        },
      };
    },
    [ADD_BINDING]({ moduleName }) {
      return {
        ...store,
        dependencies: {
          ...store.dependencies,
          [moduleName]: {
            ...store.dependencies[moduleName],
            bindings: [
              ...store.dependencies[moduleName].bindings,
              { modulePath: '', propertyName: '' },
            ],
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
