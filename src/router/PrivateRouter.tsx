import { Route, Routes } from 'react-router-dom';
import { Home, NotFound, Issues, Milestones } from '@/pages';

const PrivateRouter = () => (
  <Routes>
    <Route path="/" element={<Home />}>
      <Route index element={<Issues />} />
      <Route path="/issues" element={<Issues />} />
      <Route path="/milestone" element={<Milestones />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default PrivateRouter;
