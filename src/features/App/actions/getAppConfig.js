import { all, put, takeLatest } from 'redux-saga/effects';
import steem from 'steem';

/*--------- CONSTANTS ---------*/
const GET_APP_CONFIG_BEGIN = 'GET_APP_CONFIG_BEGIN';
export const GET_APP_CONFIG_SUCCESS = 'GET_APP_CONFIG_SUCCESS';
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

function setAppProps(props, rewardFund, votingValueCalculator) {
  return { type: SET_APP_PROPS, props, rewardFund, votingValueCalculator };
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
        rewardFund: action.rewardFund,
        votingValueCalculator: action.votingValueCalculator,
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
  try {
    const [steemiz, rewardFund] = yield all([
      steem.api.getStateAsync(`trending/steemiz`),
      steem.api.getRewardFundAsync('post'),
    ]);
    const rate = parseFloat(steemiz.feed_price.base);

    yield all([
      put(setAppProps(steemiz.props, rewardFund)),
      put(setAppTrendingTags(steemiz.tag_idx.trending.filter(tag => tag !== ''))),
      put(setAppDollarRate(rate)),
    ]);

    yield put(getAppConfigSuccess());
  } catch (e) {
    console.log('get app failure', e);
    yield put(getAppConfigFailure(e.message));
    // RETRY
    yield put(getAppConfigBegin());
  }
}

export default function* getAppConfigManager() {
  yield takeLatest(GET_APP_CONFIG_BEGIN, getAppConfig);
}
