import { useNavigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';
import { FilterState } from '@/stores/filter';

import * as S from '@/components/Organisms/Pagination/index.styled';
import Button from '@/components/Atoms/Button';
import { buttonLogic } from '@/components/Organisms/Pagination/helper';

const Paginiation = ({ totalPages, currentPage }: { totalPages: number; currentPage: number }): JSX.Element => {
  const navigate = useNavigate();
  const queries = useRecoilValue(FilterState);

  const PaginationButtons = (total: number, current: number) => {
    const isNumber = (x: any): x is number => typeof x === 'number';

    const buttons = buttonLogic(total, current).map((el, i) => {
      if (isNumber(el)) {
        return (
          <S.PaginationNumberButton
            key={`page-btn-${el}`}
            type="button"
            isActive={el - 1 === currentPage}
            onClick={() => navigate(`/issues?page=${el - 1}&q=${queries}`)}
          >
            {el}
          </S.PaginationNumberButton>
        );
      }

      // eslint-disable-next-line react/no-array-index-key
      return <div key={`ellipsis-${i}`}>…</div>;
    });

    return buttons;
  };

  return (
    <S.Pagination>
      <Button
        buttonStyle="NO_BORDER"
        label="< PREVIOUS"
        size="MEDIUM"
        disabled={currentPage <= 0}
        handleOnClick={() => navigate(`/issues?page=${currentPage > 0 ? currentPage - 1 : 0}&q=${queries}`)}
      />
      {PaginationButtons(totalPages, currentPage + 1)}
      <Button
        buttonStyle="NO_BORDER"
        label="NEXT >"
        size="MEDIUM"
        disabled={totalPages <= currentPage + 1}
        handleOnClick={() =>
          navigate(`/issues?page=${currentPage < totalPages ? currentPage + 1 : totalPages}&q=${queries}`)
        }
      />
    </S.Pagination>
  );
};
export default Paginiation;
