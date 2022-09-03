import { atom } from 'recoil';

const OAuthState = atom({
  key: 'OAuthState',
  default: false,
});

export const AppComponentMountState = atom({
  key: 'AppComponentMountState',
  default: false,
});

export default OAuthState;
