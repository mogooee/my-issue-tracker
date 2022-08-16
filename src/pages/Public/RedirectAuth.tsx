import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { UserInfoState } from '@/stores/userInfo';
import OAuthState from '@/stores/auth';

import { getAuthMemberData, RedirectAuthTypes } from '@/api/redirectAuth';
import { getUserInfo, silentRefresh } from '@/api/testApi';

const RedirectAuth = () => {
  const navigate = useNavigate();
  const setIsOAuth = useSetRecoilState(OAuthState);
  const setUserInfoState = useSetRecoilState(UserInfoState);

  const [searchParams] = useSearchParams();
  const provider = searchParams.get('provider')!;
  const code = searchParams.get('code')!;

  const { data } = useQuery<RedirectAuthTypes>(['auth'], () => getAuthMemberData(provider, code));

  const saveUserInfo = async () => {
    const { id, email, nickname, profileImage } = await getUserInfo();
    setUserInfoState({ id, email, nickname, profileImage });
  };

  const login = async () => {
    await silentRefresh();
    await saveUserInfo();
    setIsOAuth(true);

    navigate('/issues');
  };

  useEffect(() => {
    const { signInMember } = data!;
    if (signInMember) {
      login();
    } else {
      navigate('/signup-oauth');
    }
  }, []);

  return <div />;
};

export default RedirectAuth;
