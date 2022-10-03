import { useEffect } from 'react';
import useLogin from '@/api/sign/useLogin';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import OAuthState, { AppComponentMountState } from '@/stores/auth';

import PrivateRouter from '@/router/PrivateRouter';
import PublicRouter from '@/router/PublicRouter';

const Routers = (): JSX.Element => {
  const { useSilentLogin } = useLogin();
  const isOAuth = useRecoilValue(OAuthState);
  const setAppComponentDidMount = useSetRecoilState(AppComponentMountState);

  useSilentLogin();

  useEffect(() => {
    setAppComponentDidMount(true);
  }, []);

  return isOAuth ? <PrivateRouter /> : <PublicRouter />;
};

export default Routers;
