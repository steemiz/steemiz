export const manageContentVote = (content, weight, accountName) => {
  if (weight > 0) {
    // VOTE
    content.active_votes.push({
      voter: accountName,
      percent: weight,
    });
    content.net_votes++;
  } else {
    // UNVOTE
    content.active_votes = content.active_votes.filter(vote => {
      return vote.voter !== accountName && vote.percent > 0;
    });
    content.net_votes--;
  }
  return content;
};