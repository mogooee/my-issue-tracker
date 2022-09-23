import { FilterState, NoFilterKeysType } from '@/stores/filter';
import { useRecoilState } from 'recoil';

export const stateReg = /^is:/g;
export const noneFilterReg = /^no:/g;
const labelFilterReg = /^label:/g;
export const parsingFilterReg = /\w+:(@?\w+|".*?")/g;
export const doubleQuotationReg = /(^"|"$)/g;
export const issueStateReg = /is:("open"|"closed")/g;

export const OPEN_QUERY = 'is:"open"';

const useFilter = () => {
  const [filterState, setFilterState] = useRecoilState(FilterState);

  const isExistedFilter = (filter: string): boolean => {
    const [key, value] = filter.split(':');
    if (filter.match(noneFilterReg)) return !!filterState.no.find((e) => e === value);
    if (filter.match(labelFilterReg)) return !!filterState.label.find((e) => e === value);
    return filterState[key] === value;
  };

  const setIssueState = (queries: string | null) => {
    if (!queries || !queries.match(issueStateReg)) setFilterState((prev) => ({ ...prev, is: 'all' }));
  };

  const setParsingFilterState = (filter: string) => {
    const [key, value] = filter.split(':');
    const filterValue = value?.replace(doubleQuotationReg, '');

    setFilterState((prevState) => {
      // assignee:""
      if (!filterValue) return { ...prevState, no: [...prevState.no, key as NoFilterKeysType] };
      // no:assignee
      if (filter.match(noneFilterReg)) {
        const initPrevState = value === 'label' ? [] : '';
        const newNoFilterKey = value as NoFilterKeysType;
        return { ...prevState, [value]: initPrevState, no: [...prevState.no, newNoFilterKey] };
      }

      const newValue = filter.match(labelFilterReg) ? [...prevState.label, filterValue] : filterValue;
      const filterExistedKey = prevState.no.filter((e) => e !== key);
      return { ...prevState, [key]: newValue, no: filterExistedKey };
    });
  };

  const setRemovedFilterState = (filter: string) => {
    if (filter.match(noneFilterReg)) return;

    const [key, value] = filter.split(':');

    setFilterState((prevState) => {
      const removedValue = filter.match(labelFilterReg) ? prevState.label.filter((e) => e !== value) : '';
      return { ...prevState, [key]: removedValue };
    });
  };

  return { isExistedFilter, setIssueState, setParsingFilterState, setRemovedFilterState };
};

export default useFilter;