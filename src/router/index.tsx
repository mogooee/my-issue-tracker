import { BrowserRouter } from 'react-router-dom';

import useLogin from '@/hooks/useLogin';

import PrivateRouter from '@/router/PrivateRouter';
import PublicRouter from '@/router/PublicRouter';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import OAuthState, { AppComponentMountState } from '@/stores/auth';
import { useEffect } from 'react';

const Routers = (): JSX.Element => {
  const { useSilentLogin } = useLogin();
  const isOAuth = useRecoilValue(OAuthState);
  const setAppComponentDidMount = useSetRecoilState(AppComponentMountState);

  useSilentLogin();

  useEffect(() => {
    setAppComponentDidMount(true);
  }, []);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>{isOAuth ? <PrivateRouter /> : <PublicRouter />}</BrowserRouter>
  );
};

export default Routers;
