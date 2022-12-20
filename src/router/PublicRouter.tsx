import { Navigate, Route, Routes } from 'react-router-dom';
import { Home, RedirectAuth, Login, OAuthSignUp, CommonSignUp } from '@/pages';

const PublicRouter = () => (
  <Routes>
    <Route path="/" element={<Home />}>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/redirect-auth" element={<RedirectAuth />} />
      <Route path="/signup-oauth" element={<OAuthSignUp />} />
      <Route path="/signup" element={<CommonSignUp />} />
    </Route>
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default PublicRouter;
