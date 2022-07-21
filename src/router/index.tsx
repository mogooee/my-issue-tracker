import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, NotFound, RedirectAuth, Login, OAuthSignUp, CommonSignUp } from '@/pages';

const Routers = (): JSX.Element => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Login />} />
          <Route path="/redirect-auth" element={<RedirectAuth />} />
          <Route path="/signup-oauth" element={<OAuthSignUp />} />
          <Route path="/signup" element={<CommonSignUp />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
