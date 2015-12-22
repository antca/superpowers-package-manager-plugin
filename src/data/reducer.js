import { cleanModulePath } from '../bundleEditor/utils/node';
import _ from 'lodash';
import {
  UPDATE_ASSET_STATE,
  SELECT_VERSION,
  UPDATE_BINDING,
  ADD_BINDING,
  DELETE_BINDING,
  ADD_DEPENDENCY,
  REMOVE_DEPENDENCY,
  REBUILD,
  REBUILD_FINISHED,
  REBUILD_FAILED,
  THROW_ERROR,
} from './actions';

const initialDataStore = {
  dependencies: {},
  building: false,
  dirty: true,
  error: null,
};

function dataReducer(store = initialDataStore, action) {
  return ({
    [UPDATE_ASSET_STATE]({ state }) {
      return state;
    },
    [SELECT_VERSION]({ packageName, version }) {
      return {
        ...store,
        dirty: true,
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
        dirty: true,
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
        dirty: true,
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
    [DELETE_BINDING]({ moduleName, bindingId }) {
      return {
        ...store,
        dirty: true,
        dependencies: {
          ...store.dependencies,
          [moduleName]: {
            ...store.dependencies[moduleName],
            bindings: [
              ...store.dependencies[moduleName].bindings.slice(0, bindingId),
              ...store.dependencies[moduleName].bindings.slice(bindingId + 1),
            ],
          },
        },
      };
    },
    [REMOVE_DEPENDENCY]({ packageName }) {
      return {
        ...store,
        dirty: true,
        dependencies: _.omit(store.dependencies, packageName),
      };
    },
    [ADD_DEPENDENCY]({ packageInfo }) {
      const { name, versions, 'dist-tags': { latest } } = packageInfo;
      const { main } = versions[latest];
      return {
        ...store,
        dirty: true,
        dependencies: {
          ...store.dependencies,
          [name]: {
            version: latest,
            bindings: [{ modulePath: cleanModulePath(main), propertyName: name }],
          },
        },
      };
    },
    [REBUILD]() {
      return {
        ...store,
        dirty: false,
        building: true,
        error: null,
      };
    },
    [REBUILD_FINISHED]() {
      return {
        ...store,
        dirty: false,
        building: false,
        error: null,
      };
    },
    [REBUILD_FAILED](error) {
      return {
        ...store,
        dirty: true,
        building: false,
        error,
      };
    },
    [THROW_ERROR](error) {
      return {
        ...store,
        error,
      };
    },
  }[action.type] || (() => {}))(action.payload, action.meta) || store;
}

export default dataReducer;
