import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import OAuthState from '@/stores/auth';
import useLogin from '@/hooks/useLogin';

import LoadingSpinner from '@/components/Atoms/LoadingSpinner';

import PrivateRouter from '@/router/PrivateRouter';
import PublicRouter from '@/router/PublicRouter';

const Routers = (): JSX.Element => {
  const isOAuth = useRecoilValue(OAuthState);
  const [isLoading, setIsLoading] = useState(true);
  const { silentLogin } = useLogin();

  const silentRefresh = async () => {
    if (localStorage.getItem('Authentication')) {
      await silentLogin();
    }
    setIsLoading(false);
  };

  useEffect(() => {
    silentRefresh();
  }, []);

  return isLoading ? (
    <LoadingSpinner size={80} />
  ) : (
    <BrowserRouter basename={process.env.PUBLIC_URL}>{isOAuth ? <PrivateRouter /> : <PublicRouter />}</BrowserRouter>
  );
};

export default Routers;
