import { useRecoilValue } from 'recoil';
import * as S from '@/components/Organisms/Pagination/index.styled';
import NavLink from '@/components/Molecules/NavLink';
import { FilterStatsState, PageState } from '@/stores/filter';

const Paginiation = (): JSX.Element => {
  const pageState = useRecoilValue(PageState);
  const { queries } = useRecoilValue(FilterStatsState);
  return (
    <S.Pagination>
      <NavLink
        navData={[
          {
            link: `/issues?page=${pageState - 1}&q=${queries}`,
            title: '< Previous',
            dataId: 'previous page',
          },
          {
            link: `/issues?page=0&q=${queries}`,
            title: '1',
            dataId: 'page 1',
          },
          {
            link: `/issues?page=1&q=${queries}`,
            title: '2',
            dataId: 'page 2',
          },
          {
            link: `/issues?page=${pageState + 1}&q=${queries}`,
            title: 'Next >',
            dataId: 'next page',
          },
        ]}
        defaultActive="page 1"
      />
    </S.Pagination>
  );
};
export default Paginiation;
