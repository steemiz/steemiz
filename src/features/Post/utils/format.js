import steem from 'steem';

export default function format(post) {
  const metadata = JSON.parse(post.json_metadata);
  const mainImg = metadata && metadata.image ? metadata.image[0] : undefined;
  return {
    ...post,
    json_metadata: metadata,
    main_img: mainImg,
    author_reputation: steem.formatter.reputation(post.author_reputation),
  };
}
