import { call, put, takeEvery } from 'redux-saga/effects';
import steem, { formatter } from 'steem';

/*--------- CONSTANTS ---------*/
const GET_REWARDS_BEGIN = 'GET_REWARDS_BEGIN';
const GET_REWARDS_SUCCESS = 'GET_REWARDS_SUCCESS';
const GET_REWARDS_FAILURE = 'GET_REWARDS_FAILURE';

/*--------- ACTIONS ---------*/
export function getRewardsBegin(accountName) {
  return { type: GET_REWARDS_BEGIN, accountName };
}

export function getRewardsSuccess(accountName, state) {
  return { type: GET_REWARDS_SUCCESS, accountName, state };
}

export function getRewardsFailure(message) {
  return { type: GET_REWARDS_FAILURE, message };
}

/*--------- REDUCER ---------*/
export function getRewardsReducer(state, action) {
  switch (action.type) {
    case GET_REWARDS_SUCCESS: {
      return state;
    }
    default:
      return state;
  }
}

const formatRewards = list => list.filter((op) => {
  // filtering out some types of transactions to integrate it with Steemit results
  const type = op[1].op[0];
  const data = op[1].op[1];

  if (type === 'curation_reward' || type === 'author_reward') {
    return false;
  }

  if (data.sbd_payout === '0.000 SBD' && data.vesting_payout === '0.000000 VESTS') {
    return false;
  }
  return true;
});

function vestToSteem(vestingShares, totalVestingShares, totalVestingFundSteem) {
  return parseFloat(totalVestingFundSteem) * (parseFloat(vestingShares) / parseFloat(totalVestingShares));
}

/*--------- SAGAS ---------*/
function* getRewards({ accountName }) {
  try {
    const state = yield steem.api.getStateAsync(`@najoh/transfers`);
    const steemiz = yield steem.api.getStateAsync(`trending/steemiz`);
    console.log('state', state);
    console.log('steemiz', steemiz);
    const vestingShares = state.accounts.najoh.vesting_shares;
    const totalVestingShares = steemiz.props.total_vesting_shares;
    const totalVestingFundSteem = steemiz.props.total_vesting_fund_steem;
    const power = vestToSteem(vestingShares, totalVestingShares, totalVestingFundSteem);
    console.log('power', power);
    //const formatted = formatRewards(state.accounts.najoh.transfer_history).reverse();
    const history = formatRewards(state.accounts.najoh.transfer_history).reverse();
    //console.log('transfers', history);
    console.log('transfers', history.map(reward => ({
      type: reward[1].op[0],
      ...reward[1].op[1],
      steemPower: vestToSteem(reward[1].op[1].reward_vests, totalVestingShares, totalVestingFundSteem),
    })));

    //yield put(getRewardsSuccess(accountName, state));
  } catch(e) {
    yield put(getRewardsFailure(e.message));
  }
}

export default function* getRewardsManager() {
  yield takeEvery(GET_REWARDS_BEGIN, getRewards);
}
