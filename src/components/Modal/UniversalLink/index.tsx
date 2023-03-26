import { useSetRecoilState } from 'recoil';
import { iOSMobileModalState } from '@/stores/modal';

import Button from '@/components/Atoms/Button';
import AppLogo from '@/assets/logo/issueTracker.png';
import * as S from '@/components/Modal/UniversalLink/index.styles';

const UniversalLink = () => {
  const isiOSModalVisible = useSetRecoilState(iOSMobileModalState);
  const continueButtonHandler = () => isiOSModalVisible(false);

  return (
    <S.UniversalLink>
      <img src={AppLogo} alt="Issue Tracker App" />
      <p>
        Issue Tracker 앱을 설치했다면
        <br />
        최적의 환경에서 이용해보세요!
      </p>
      <a href={process.env.REACT_APP_UNIVERSAL_LINK}>
        <Button buttonStyle="STANDARD" label="앱으로 열기" size="MEDIUM" />
      </a>
      <S.ContinueButton
        buttonStyle="NO_BORDER"
        label="괜찮아요. 모바일웹으로 볼게요."
        size="SMALL"
        handleOnClick={continueButtonHandler}
      />
    </S.UniversalLink>
  );
};

export default UniversalLink;
