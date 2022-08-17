import { MemeberResponseTypes } from '@/api/signUp';
import { atom } from 'recoil';

export const LoginUserInfoState = atom<MemeberResponseTypes>({
  key: 'LoginUserInfoState',
  default: {
    id: 0,
    email: '',
    nickname: '',
    profileImage: '',
  },
});
