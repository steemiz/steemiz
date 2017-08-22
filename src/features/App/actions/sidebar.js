import update from 'immutability-helper';

/*--------- CONSTANTS ---------*/
const OPEN_SIDEBAR = 'OPEN_SIDEBAR';
const CLOSE_SIDEBAR = 'CLOSE_SIDEBAR';
const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

/*--------- ACTIONS ---------*/
export function openSidebar() {
  return { type: OPEN_SIDEBAR };
}

export function closeSidebar() {
  return { type: CLOSE_SIDEBAR };
}

export function toggleSidebar() {
  return { type: TOGGLE_SIDEBAR };
}

/*--------- REDUCER ---------*/
export function sidebarReducer(state, action) {
  switch (action.type) {
    case OPEN_SIDEBAR: {
      return update(state, {
        sidebar: {
          open: {$set: true},
        }
      });
    }
    case CLOSE_SIDEBAR: {
      return update(state, {
        sidebar: {
          open: {$set: false},
        }
      });
    }
    case TOGGLE_SIDEBAR: {
      return update(state, {
        sidebar: {
          open: {$apply: open => !open},
        }
      });
    }
    default:
      return state;
  }
}
