import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, NotFound, RedirectAuth, Login, OAuthSignUp, CommonSignUp, Issues } from '@/pages';

import { useRecoilState, useSetRecoilState } from 'recoil';
import OAuthState from '@/stores/auth';
import { UserInfoState } from '@/stores/userInfo';
import { silentRefresh, getUserInfo } from '@/api/testApi';

const Routers = (): JSX.Element => {
  const [isOAuth, setIsOAuth] = useRecoilState(OAuthState);
  const setUserInfoState = useSetRecoilState(UserInfoState);

  const saveUserInfo = async () => {
    const { id, email, nickname, profileImage } = await getUserInfo();
    setUserInfoState({ id, email, nickname, profileImage });
  };

  const silentLogin = async () => {
    try {
      await silentRefresh();
      await saveUserInfo();

      setIsOAuth(true);
    } catch (error) {
      setIsOAuth(false);
      throw error;
    }
  };

  useEffect(() => {
    silentLogin();
  }, []);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        {isOAuth ? (
          <>
            <Route path="/" element={<Home />}>
              <Route index element={<Issues />} />
              <Route path="/issues" element={<Issues />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />}>
              <Route index element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/redirect-auth" element={<RedirectAuth />} />
              <Route path="/signup-oauth" element={<OAuthSignUp />} />
              <Route path="/signup" element={<CommonSignUp />} />
            </Route>
            <Route path="*" element={<Login />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
