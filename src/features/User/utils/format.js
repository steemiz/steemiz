import { formatter } from 'steem';

export default function format(user) {
  const metadata = JSON.parse(user.json_metadata);
  return {
    ...user,
    json_metadata: metadata,
    reputation: formatter.reputation(user.reputation),
  };
}
