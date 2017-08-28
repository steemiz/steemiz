
/*--------- CONSTANTS ---------*/
const SET_CATEGORY_TAG = 'SET_CATEGORY_TAG';

/*--------- ACTIONS ---------*/
export function setCategoryTag(category, tag) {
  return { type: SET_CATEGORY_TAG, category, tag };
}

/*--------- REDUCER ---------*/
export function setCategoryTagReducer(state, action) {
  switch (action.type) {
    case SET_CATEGORY_TAG: {
      return {
        ...state,
        currentCategory: action.category,
        currentTag: action.tag,
      }
    }
    default:
      return state;
  }
}
