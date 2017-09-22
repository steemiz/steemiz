export default function getPostKey(post) {
  return `${post.author}/${post.permlink}`;
}
