import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { UserInfoState } from '@/stores/userInfo';
import { testLoginOauth } from '@/api/testApi';

const Issues = () => {
  const UserInfoStateValue = useRecoilValue(UserInfoState);

  useEffect(() => {
    const { id } = UserInfoStateValue;
    testLoginOauth(id);
  }, []);

  return <div>이슈페이지</div>;
};

export default Issues;
