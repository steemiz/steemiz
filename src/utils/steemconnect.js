import sc2 from 'sc2-sdk';

sc2.init({
  app: 'steemiz.app',
  callbackURL: process.env.REACT_APP_STEEMCONNECT_REDIRECT_URL,
  accessToken: 'access_token',
  scope: ['vote', 'comment']
});

export default sc2;