import { atom, useRecoilValue, useResetRecoilState } from 'recoil';

export interface SignUpFormErrorTypes {
  id: 'id' | 'password' | 'passwordVerification' | 'email' | 'nickname';
  state: boolean;
  errMsg: string;
}

export const SignUpFormErrorState = atom<SignUpFormErrorTypes[]>({
  key: 'SignUpFormErrorState',
  default: [
    { id: 'id', state: false, errMsg: '' },
    { id: 'password', state: false, errMsg: '' },
    { id: 'passwordVerification', state: false, errMsg: '' },
    { id: 'email', state: false, errMsg: '' },
    { id: 'nickname', state: false, errMsg: '' },
  ],
});

export const isError = () => {
  let error = false;

  const signUpFormErrorValue = useRecoilValue(SignUpFormErrorState);
  signUpFormErrorValue.forEach((obj) => {
    if (obj.state) error = true;
  });

  return error;
};

export interface SignUpFormTypes {
  id: string;
  password: string;
  email: string;
  nickname: string;
}

export const SignUpFormState = atom<SignUpFormTypes>({
  key: 'SignUpFormState',
  default: { id: '', password: '', email: '', nickname: '' },
});

export const resetSignUpForm = () => {
  const resetSignUpFormErrorState = useResetRecoilState(SignUpFormErrorState);
  const resetSignUpFormState = useResetRecoilState(SignUpFormState);

  resetSignUpFormErrorState();
  resetSignUpFormState();
};
