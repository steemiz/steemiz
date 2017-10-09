import { formatter } from 'steem';

const IMG_SERVICE_RESIZER = 'https://steemitimages.com/256x512/';

export default function format(post) {
  const metadata = JSON.parse(post.json_metadata);
  const mainImg = metadata && metadata.image ? `${IMG_SERVICE_RESIZER}${metadata.image[0]}` : undefined;
  return {
    ...post,
    json_metadata: metadata,
    main_img: mainImg,
    author_reputation: formatter.reputation(post.author_reputation),
  };
}
