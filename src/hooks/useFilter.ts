import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { FilterState, PageState } from '@/stores/filter';
import { LoginUserInfoState } from '@/stores/loginUserInfo';

export const OPEN_QUERY = 'is:open';
export const CLOSED_QUERY = 'is:closed';

export const issueStateReg = new RegExp(`${OPEN_QUERY}|${CLOSED_QUERY}`);
export const noneFilterReg = /.?no:(\w+)/g;
const filterReg = /(^\w+):(".*"|\S+)/g;
const labelReg = /^label:/;

const useNewFilter = () => {
  const pageState = useRecoilValue(PageState);
  const filterState = useRecoilValue(FilterState);
  const loginUserInfo = useRecoilValue(LoginUserInfoState);
  const navigate = useNavigate();

  const addFilter = (filter: string) => {
    const noneExistedFilterReg = new RegExp(`.${filter.replace(filterReg, 'no:$1')}`);
    const existedFilterReg = new RegExp(
      `.${filter.replace(noneFilterReg.test(filter) ? noneFilterReg : filterReg, '$1')}:(".*"|\\S+)`,
      'g',
    );

    if (existedFilterReg.test(filterState) && !labelReg.test(filter)) {
      return `${filterState.replace(existedFilterReg, '')} ${filter}`;
    }

    if (noneExistedFilterReg.test(filterState)) {
      return `${filterState.replace(noneExistedFilterReg, '')} ${filter}`;
    }

    if (noneFilterReg.test(filter)) {
      return `${filterState.replace(existedFilterReg, '')} ${filter}`;
    }

    return `${filterState} ${filter}`;
  };

  const removeFilter = (filter: string) => filterState.replace(` ${filter}`, '');

  const isExistedFilter = (filter: string) => filterState.includes(filter);

  const parseFilter = (filter: string) => {
    if (isExistedFilter(filter)) {
      return removeFilter(filter);
    }

    return addFilter(filter);
  };

  const searchFilter = (filter: string) => {
    navigate(`/issues?page=${pageState}&q=${filter}`);
  };

  const changeNotEngFilter = (value: string) => {
    const engReg = /^[a-z]+$/gi;
    return engReg.test(value) ? value : `"${value}"`;
  };

  return { isExistedFilter, parseFilter, searchFilter, changeNotEngFilter };
};

export default useNewFilter;
