import { Route, Routes } from 'react-router-dom';
import { Home, NotFound, Issues, Labels, Milestones, NewIssue } from '@/pages';

const PrivateRouter = () => (
  <Routes>
    <Route path="/" element={<Home />}>
      <Route index element={<Issues />} />
      <Route path="/issues" element={<Issues />} />
      <Route path="/issues/new" element={<NewIssue />} />
      <Route path="/labels" element={<Labels />} />
      <Route path="/milestones" element={<Milestones />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default PrivateRouter;
