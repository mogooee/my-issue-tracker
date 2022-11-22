import { useNavigate, useSearchParams } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import { FilterStatsState } from '@/stores/filter';

import { IssueTypes, PageTypes } from '@/api/issue/types';

import * as S from '@/components/Organisms/Pagination/index.styled';
import NavLink from '@/components/Molecules/NavLink';
import Button from '@/components/Atoms/Button';

const Paginiation = ({ issuesData }: { issuesData: IssueTypes & PageTypes }): JSX.Element => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pageParams = Number(searchParams.get('page')) || 0;

  const { queries } = useRecoilValue(FilterStatsState);
  const { first, last, totalPages } = issuesData;

  const navData = (pages: number) => {
    const data = Array.from({ length: pages }, (_, index) => ({
      link: `/issues?page=${index}&q=${queries}`,
      title: `${index + 1}`,
      dataId: `page ${index + 1}`,
    }));

    return data;
  };

  return (
    <S.Pagination>
      <Button
        buttonStyle="NO_BORDER"
        label="< PREVIOUS"
        size="MEDIUM"
        disabled={first}
        handleOnClick={() => navigate(`/issues?page=${pageParams > 0 ? pageParams - 1 : 0}&q=${queries}`)}
      />
      <NavLink navData={navData(totalPages)} defaultActive="page 1" />
      <Button
        buttonStyle="NO_BORDER"
        label="NEXT >"
        size="MEDIUM"
        disabled={last}
        handleOnClick={() =>
          navigate(`/issues?page=${pageParams < totalPages ? pageParams + 1 : totalPages}&q=${queries}`)
        }
      />
    </S.Pagination>
  );
};
export default Paginiation;
