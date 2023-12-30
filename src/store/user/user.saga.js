import { takeLatest, put, call, all } from 'redux-saga/effects';

import { USER_ACTION_TYPES } from './user.types';

import { signInSuccess, signInFailed } from './user.action';

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithUserEmailAndPassword,
} from '../../utils/firebase-utils/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails,
    );
    console.log('inja chi inja miad', userSnapshot);
    console.log('inja chi inja miad', userSnapshot.data());
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInWithUserEmailAndPassword,
      email,
      password,
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* isUseAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSeassion() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUseAuthenticated);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSeassion),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
  ]);
}
