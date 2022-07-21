import OauthLoginButton, { OauthLoginTypes } from '@/components/Atoms/OauthLoginButton';
import * as S from '@/components/Molecules/OauthLoginForm/index.styles';

const OauthLoginForm = () => {
  const OauthBtnInfo: OauthLoginTypes[] = [
    { type: 'Github', link: '#!' },
    { type: 'Naver', link: '#!' },
    { type: 'Kakao', link: '#!' },
  ];

  const OauthBtns = OauthBtnInfo.map((info) => {
    return <OauthLoginButton key={info.type} type={info.type} link={info.link} />;
  });

  return (
    <S.OauthLoginForm>
      <p>간편하게 로그인 / 회원가입</p>
      <div className="Oauth_Btns">{OauthBtns}</div>
    </S.OauthLoginForm>
  );
};

export default OauthLoginForm;
