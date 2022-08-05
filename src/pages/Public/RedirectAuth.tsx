import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { getAuthMemberData, RedirectAuthTypes } from '@/api/redirectAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { silentRefresh, getUserInfo } from '@/api/test';
import { UserInfoState } from '@/stores/userInfo';

const RedirectAuth = () => {
  const [searchParams] = useSearchParams();
  const provider = searchParams.get('provider')!;
  const code = searchParams.get('code')!;

  const navigate = useNavigate();
  const setUserInfoState = useSetRecoilState(UserInfoState);

  const { data } = useQuery<RedirectAuthTypes>(['auth'], () => getAuthMemberData(provider, code));

  const saveUserInfo = async () => {
    const { id, email, nickname, profileImage } = await getUserInfo();
    setUserInfoState({ id, email, nickname, profileImage });
  };

  const login = async () => {
    // 리프레시토큰을 가지고 새로운 리프레시토큰, 액세스 토큰을 발급받는다
    await silentRefresh();
    // 액세스 토큰으로 유저정보 api 요청
    await saveUserInfo();
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
