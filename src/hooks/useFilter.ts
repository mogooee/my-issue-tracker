import { FilterState, NoFilterKeysType } from '@/stores/filter';
import { useRecoilState } from 'recoil';

export const stateFilterReg = /^is:/g;
export const noneFilterReg = /^no:/g;
const labelFilterReg = /^label:/g;
export const parsingFilterReg = /\w+:(@?\w+|".*?")/g;
export const doubleQuotationReg = /(^"|"$)/g;

export const OPEN_QUERY = 'is:"open"';
export const CLOSED_QUERY = 'is:"closed"';

export const issueStateReg = new RegExp(`${OPEN_QUERY}|${CLOSED_QUERY}`);
export const URLIssueStateReg = new RegExp(`${encodeURIComponent(OPEN_QUERY)}|${encodeURIComponent(CLOSED_QUERY)}`);

const useFilter = () => {
  const [filterState, setFilterState] = useRecoilState(FilterState);

  const isExistedFilter = (filter: string): boolean => {
    const [key, value] = filter.split(':');
    if (filter.match(noneFilterReg)) return !!filterState.no?.find((e) => e === value);
    if (filter.match(labelFilterReg)) return !!filterState.label?.find((e) => e === value);
    return filterState[key] === value;
  };

  const setIssueState = (queries: string | null) => {
    if (!queries || !queries.match(issueStateReg)) setFilterState((prev) => ({ ...prev, is: 'all' }));
  };

  const setParsingFilterState = (filter: string) => {
    const [key, value] = filter.split(':');
    const filterValue = value?.replace(doubleQuotationReg, '');

    setFilterState((prevState) => {
      // assignee:"" || no:assignee
      if (!filterValue || filter.match(noneFilterReg)) {
        const deletedKeyState = { ...prevState };
        delete deletedKeyState[value];
        const newNoFilterKey = (filter.match(noneFilterReg) ? value : key) as NoFilterKeysType;
        return { ...deletedKeyState, no: [...(prevState.no || []), newNoFilterKey] };
      }

      const newValue = filter.match(labelFilterReg) ? [...(prevState.label || []), filterValue] : filterValue;
      const filterExistedKey = prevState.no?.filter((e) => e !== key);
      const newState = { ...prevState, [key]: newValue, no: filterExistedKey };

      if (!filterExistedKey) {
        delete newState.no;
      }

      return newState;
    });
  };

  const setRemovedFilterState = (filter: string) => {
    if (filter.match(noneFilterReg)) return;

    const [key, value] = filter.split(':');

    setFilterState((prevState) => {
      const removedValue = filter.match(labelFilterReg) ? prevState.label?.filter((e) => e !== value) : '';
      if (!removedValue) {
        const deletedKeyState = { ...prevState };
        delete deletedKeyState[key];
        return deletedKeyState;
      }

      return { ...prevState, [key]: removedValue };
    });
  };

  return { isExistedFilter, setIssueState, setParsingFilterState, setRemovedFilterState };
};

export default useFilter;
