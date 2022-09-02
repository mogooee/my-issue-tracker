import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import useLogin from '@/hooks/useLogin';

import PrivateRouter from '@/router/PrivateRouter';
import PublicRouter from '@/router/PublicRouter';

const Routers = (): JSX.Element => {
  const { silentLogin, saveLoginUserInfo } = useLogin();

  let isOAuth = false;

  if (localStorage.getItem('Authentication')) {
    const isLogined = silentLogin();
    if (isLogined) isOAuth = true;
  }

  useEffect(() => {
    if (isOAuth) {
      saveLoginUserInfo();
    }
  }, []);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>{isOAuth ? <PrivateRouter /> : <PublicRouter />}</BrowserRouter>
  );
};

export default Routers;
