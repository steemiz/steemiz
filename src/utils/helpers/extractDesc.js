import remarkableStripper from './RemarkableStripper';
import sanitize from 'sanitize-html';
import { htmlDecode } from './Html';

export default function extractDesc(content) {
  let desc;

  // Short description.
  // Remove bold and header, etc.
  // Stripping removes links with titles (so we got the links above)..
  // Remove block quotes if detected comment preview
  const body2 = remarkableStripper.render(content.depth > 1 ? content.body.replace(/>([\s\S]*?).*\s*/g,'') : content.body);
  desc = sanitize(body2, {allowedTags: []});// remove all html, leaving text
  desc = htmlDecode(desc);

  // Strip any raw URLs from preview text
  desc = desc.replace(/https?:\/\/[^\s]+/g, '');

  // Grab only the first line (not working as expected. does rendering/sanitizing strip newlines?)
  desc = desc.trim().split("\n")[0];

  if(desc.length > 140) {
    desc = desc.substring(0, 140).trim();

    const dotSpace = desc.lastIndexOf('. ');
    if(dotSpace > 80 && !content.depth > 1) {
      desc = desc.substring(0, dotSpace + 1)
    } else {
      // Truncate, remove the last (likely partial) word (along with random punctuation), and add ellipses
      desc = desc.substring(0, 120).trim().replace(/[,!\?]?\s+[^\s]+$/, "…");
    }
  }
  return desc;
}