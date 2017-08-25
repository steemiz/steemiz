import { put, takeLatest } from 'redux-saga/effects';
import update from 'immutability-helper';


/*--------- CONSTANTS ---------*/
const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';
const OPEN_NOTIFICATION = 'OPEN_NOTIFICATION';
const ACTION_LAUNCH_NOTIFICATION_BEGIN = 'ACTION_LAUNCH_NOTIFICATION_BEGIN';
const ACTION_LAUNCH_NOTIFICATION_SUCCESS = 'ACTION_LAUNCH_NOTIFICATION_SUCCESS';
const ACTION_LAUNCH_NOTIFICATION_FAILURE = 'ACTION_LAUNCH_NOTIFICATION_FAILURE';

/*--------- ACTIONS ---------*/
export function close() {
  return { type: CLOSE_NOTIFICATION };
}

export function open(message, actionName, actionFunction) {
  return { type: OPEN_NOTIFICATION, message, actionName, actionFunction };
}

export function actionLaunchBegin(actionFunction) {
  return { type: ACTION_LAUNCH_NOTIFICATION_BEGIN, actionFunction };
}

function actionLaunchSuccess() {
  return { type: ACTION_LAUNCH_NOTIFICATION_SUCCESS };
}

function actionLaunchFailure() {
  return { type: ACTION_LAUNCH_NOTIFICATION_FAILURE };
}

/*--------- REDUCER ---------*/
export function notificationReducer(state, action) {
  switch (action.type) {
    case CLOSE_NOTIFICATION: {
      return update(state, {
        isOpen: {$set: false},
        message: {$set: ''},
        actionName: {$set: ''},
        actionFunction: {$set: null},
      });
    }
    case OPEN_NOTIFICATION: {
      return update(state, {
        isOpen: {$set: true},
        message: {$set: action.message},
        actionName: {$set: action.actionName},
        actionFunction: {$set: action.actionFunction},
      });
    }
    case ACTION_LAUNCH_NOTIFICATION_SUCCESS: {
      return update(state, {
        actionName: {$set: ''},
        actionFunction: {$set: null},
      });
    }
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* actionLaunchNotification(action) {
  try {
    yield put(action.actionFunction());
    yield put(actionLaunchSuccess());
  } catch (e) {
    yield put(actionLaunchFailure(e));
  }
}

export default function* notificationManager() {
  yield takeLatest(ACTION_LAUNCH_NOTIFICATION_BEGIN, actionLaunchNotification);
}
