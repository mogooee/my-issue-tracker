import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

export interface SignUpFormDataTypes {
  resourceOwnerId: string;
  email: string;
  profileImage: string;
}

export interface SignInMemberTypes {
  id: number;
  email: string;
  nickname: string;
  profileImage: string;
}

export interface RedirectAuthTypes {
  signUpFormData: SignUpFormDataTypes | null;
  signInMember: SignInMemberTypes | null;
}

const RedirectAuth = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const provider = searchParams.get('provider');

  const navigate = useNavigate();

  const fetchData = async (): Promise<RedirectAuthTypes> => {
    const { data } = await axios.get<RedirectAuthTypes>(
      `${process.env.REACT_APP_PUBLIC_URL}/api/auth/${provider}?code=${code}`,
    );
    return data;
  };

  const { data } = useQuery<RedirectAuthTypes>(['auth'], fetchData);

  useEffect(() => {
    const { signUpFormData, signInMember } = data!;
    if (signInMember) {
      // 로그인 -> 로컬에 정보저장해서 로그인 유지
      window.localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/issues');
    } else if (signUpFormData) {
      navigate('/signup-oauth');
    }
  }, []);

  return <div />;
};

export default RedirectAuth;
