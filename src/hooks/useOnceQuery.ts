import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { AppComponentMountState } from '@/stores/auth';

type CallbackFnType = (variables?: any) => any;

interface OptionTypes {
  enabled?: boolean;
  onSuccess?: CallbackFnType;
  onError?: CallbackFnType;
}

const useOnceQuery = (key: string[], keyFn: CallbackFnType, options: OptionTypes) => {
  const AppComponentDidMount = useRecoilValue(AppComponentMountState);
  const { enabled, onSuccess, onError } = options;

  useQuery(key, keyFn, {
    enabled: !AppComponentDidMount && enabled,
    cacheTime: Infinity,
    staleTime: Infinity,
    onSuccess,
    onError,
  });
};

export default useOnceQuery;
