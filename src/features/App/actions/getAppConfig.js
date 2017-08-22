import { all, put, takeLatest } from 'redux-saga/effects';
import steem from 'steem';

/*--------- CONSTANTS ---------*/
const GET_APP_CONFIG_BEGIN = 'GET_APP_CONFIG_BEGIN';
const GET_APP_CONFIG_SUCCESS = 'GET_APP_CONFIG_SUCCESS';
const GET_APP_CONFIG_FAILURE = 'GET_APP_CONFIG_FAILURE';
const SET_APP_PROPS = 'SET_APP_PROPS';
const SET_APP_TRENDING_TAGS = 'SET_APP_TRENDING_TAGS';
const SET_APP_DOLLAR_RATE = 'SET_APP_DOLLAR_RATE';

/*--------- ACTIONS ---------*/
export function getAppConfigBegin() {
  return { type: GET_APP_CONFIG_BEGIN };
}

function getAppConfigSuccess() {
  return { type: GET_APP_CONFIG_SUCCESS };
}

function getAppConfigFailure(message) {
  return { type: GET_APP_CONFIG_FAILURE, message };
}

function setAppProps(props) {
  return { type: SET_APP_PROPS, props };
}

function setAppTrendingTags(tags) {
  return { type: SET_APP_TRENDING_TAGS, tags };
}

function setAppDollarRate(rate) {
  return { type: SET_APP_DOLLAR_RATE, rate };
}

/*--------- REDUCER ---------*/
export function getAppConfigReducer(state, action) {
  switch (action.type) {
    case SET_APP_PROPS: {
      return {
        ...state,
        props: action.props,
      }
    }
    case SET_APP_TRENDING_TAGS: {
      return {
        ...state,
        trendingTags: action.tags,
      }
    }
    case SET_APP_DOLLAR_RATE: {
      return {
        ...state,
        rate: action.rate,
      }
    }
    default:
      return state;
  }
}

/*--------- SAGAS ---------*/
function* getAppConfig() {
  const steemiz = yield steem.api.getStateAsync(`trending/steemiz`);
  yield all([
    put(setAppProps(steemiz.props)),
    put(setAppTrendingTags(steemiz.tag_idx.trending.filter(tag => tag !== ''))),
    put(setAppDollarRate(parseFloat(steemiz.feed_price.base))),
  ]);

  yield put(getAppConfigSuccess());
}

export default function* getAppConfigManager() {
  yield takeLatest(GET_APP_CONFIG_BEGIN, getAppConfig);
}
