import steem from 'steem';

const steemAPI = steem.api;
/** *
 * Get the path from URL and the API object of steem and return the correct API call based on path
 * @param sortBy - as in URL like 'trending'
 * @param query {Object} - the same query sending to Steem API
 * @returns {function}
 */
export const getDiscussionsFromAPI = function getDiscussionsFromAPI(sortBy, query) {
  switch (sortBy) {
    case 'feed':
      return steemAPI.getDiscussionsByFeedAsync(query);
    case 'hot':
      return steemAPI.getDiscussionsByHotAsync(query);
    case 'cashout':
      return steemAPI.getDiscussionsByCashoutAsync(query);
    case 'created':
      return steemAPI.getDiscussionsByCreatedAsync(query);
    case 'active':
      return steemAPI.getDiscussionsByActiveAsync(query);
    case 'trending':
      return steemAPI.getDiscussionsByTrendingAsync(query);
    case 'blog':
      return steemAPI.getDiscussionsByBlogAsync(query);
    case 'comments':
      return steemAPI.getDiscussionsByCommentsAsync(query);
    default:
      throw new Error('There is not API endpoint defined for this sorting');
  }
};