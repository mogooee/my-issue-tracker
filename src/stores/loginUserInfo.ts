import { atom } from 'recoil';
import { UserTypes } from '@/api/issue/types';

const testUser = {
  id: 0,
  email: 'dobby@gmail.com',
  nickname: '도비',
  profileImage: 'https://avatars.githubusercontent.com/u/85747667?v=4',
};

export const LoginUserInfoState = atom<UserTypes>({
  key: 'LoginUserInfoState',
  default: {
    id: 0,
    email: '',
    nickname: '',
    profileImage: '',
  },
});
