import UserSagas from './features/User/actions';
import PostSagas from './features/Post/actions';
import CommentsSagas from './features/Comment/actions';
import VoteSagas from './features/Vote/actions';

export default UserSagas
  .concat(PostSagas)
  .concat(CommentsSagas)
  .concat(VoteSagas);
