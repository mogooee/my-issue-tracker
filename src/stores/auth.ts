import { atom } from 'recoil';

const OAuthState = atom({
  key: 'OAuthState',
  default: false,
});

export default OAuthState;
