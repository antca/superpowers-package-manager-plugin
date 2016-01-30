import { take, put, fork, call } from 'redux-saga';

import { view } from '../../utils/npm';
import {
  updatePackageInfo,
  throwPackageInfoError,
} from './actions';
import {
  CONFIRM_PACKAGE,
} from '../search/actions';

import {
  changeActivePanel,
} from '../main/actions';

function* viewSaga() {
  const { payload: { packageName } } = yield take(CONFIRM_PACKAGE);

  yield fork(viewSaga);

  try {
    const packageInfo = yield call(view, packageName);
    yield put(updatePackageInfo(packageInfo));
    yield put(changeActivePanel('view'));
  }
  catch(error) {
    yield put(throwPackageInfoError(error));
  }
}

export default viewSaga;
