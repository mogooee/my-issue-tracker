import { ErrorMessage, ERROR_MESSAGE } from '@/api/constants';
import { AxiosError } from 'axios';

const useAlertHelper = (errorCode: number) => {
  switch (errorCode) {
    case 3001:
    case 3002:
    case 3003:
    case 3004:
    case 3005:
    case 4001:
    case 4002:
    case 4003:
    case 5001:
    case 5002:
    case 5003:
    case 5004:
    case 6001:
    case 6002:
      alert(ERROR_MESSAGE[errorCode]);
      break;
    default:
      break;
  }
};

const useNotifyError = (error: Error) => {
  const err = error as AxiosError<ErrorMessage>;
  const { errorCode } = err.response!.data;
  useAlertHelper(errorCode);
};

export default useNotifyError;
