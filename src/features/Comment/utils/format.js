import { formatter } from 'steem';

export default function format(comment) {
  return {
    ...comment,
    author_reputation: formatter.reputation(comment.author_reputation),
  };
}
