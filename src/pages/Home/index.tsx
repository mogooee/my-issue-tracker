import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { LoginUserInfoState } from '@/stores/loginUserInfo';

import Header from '@/components/Organisms/Header';
import OAuthState from '@/stores/auth';

import Modal from '@/components/Modal';
import UniversalLink from '@/components/Modal/UniversalLink';
import { iOSMobileModalState } from '@/stores/modal';

import * as S from '@/pages/Home/index.styles';

const Home = () => {
  const LoginUserInfoStateValue = useRecoilValue(LoginUserInfoState);
  const isOauthState = useRecoilValue(OAuthState);
  const isiOSMobileModalVisible = useRecoilValue(iOSMobileModalState);
  const isiOSMobileDevice = navigator.userAgent.match(/iPad|iPhone|Macintosh/i) && navigator.maxTouchPoints > 1;

  return (
    <S.Home>
      <div>
        {isOauthState && <Header user={LoginUserInfoStateValue} />}
        <Outlet />
      </div>
      {isiOSMobileDevice && isiOSMobileModalVisible && (
        <Modal>
          <UniversalLink />
        </Modal>
      )}
    </S.Home>
  );
};

export default Home;
