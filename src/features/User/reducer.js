import update from 'immutability-helper';
import isEmpty from 'lodash/isEmpty';
import { formatter } from 'steem';
import { GET_APP_CONFIG_SUCCESS } from 'features/App/actions/getAppConfig';

/*--------- REDUCER ---------*/
export default function usersReducer(state, action) {
  switch (action.type) {
    case GET_APP_CONFIG_SUCCESS: {
      // RECALCULATE STEEM POWER OF ALL USER IN CASE APP PROPS RESPOND SLOWLY
      if (!isEmpty(state.accounts)) {
        const props = action.props;
        const accounts = state.accounts;
        let newAccounts = {};
        Object.keys(accounts).forEach(key => {
          newAccounts[key] = {
            ...accounts[key],
            steemPower: formatter.vestToSteem(
              accounts[key].vesting_shares,
              props.total_vesting_shares,
              props.total_vesting_fund_steem
            ),
          };
        });
        return update(state, {
          accounts: {$set: newAccounts},
        });
      }
      return state;
    }
    default:
      return state;
  }
}
