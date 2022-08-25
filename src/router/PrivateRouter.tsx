import { Route, Routes } from 'react-router-dom';
import { Home, NotFound, Issues, LabelList } from '@/pages';

const PrivateRouter = () => (
  <Routes>
    <Route path="/" element={<Home />}>
      <Route index element={<Issues />} />
      <Route path="/issues" element={<Issues />} />
      <Route path="/label" element={<LabelList />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default PrivateRouter;
