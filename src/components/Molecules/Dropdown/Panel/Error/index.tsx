import Button from '@/components/Atoms/Button';
import { ErrorPanelTypes } from '@/components/Molecules/Dropdown/types';
import * as S from '@/components/Molecules/Dropdown/Panel/Error/index.styles';

const ErrorPanel = ({ handleOnClick }: ErrorPanelTypes) => (
  <S.ErrorPanel>
    <p>문제가 생겼습니다. 다시 시도해주세요.</p>
    <Button
      buttonStyle="NO_BORDER"
      iconInfo={{ icon: 'RefreshCcw' }}
      label="재시도"
      size="SMALL"
      handleOnClick={handleOnClick}
    />
  </S.ErrorPanel>
);

export default ErrorPanel;
