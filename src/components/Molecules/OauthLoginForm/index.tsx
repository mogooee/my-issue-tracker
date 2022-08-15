import OauthLoginButton, { OauthLoginTypes } from '@/components/Atoms/OauthLoginButton';
import * as S from '@/components/Molecules/OauthLoginForm/index.styles';

const OauthLoginForm = () => {
  const OauthBtnInfo: OauthLoginTypes[] = [
    { type: 'Github', link: `${process.env.REACT_APP_GITHUB_AUTH_URL}` },
    { type: 'Naver', link: `${process.env.REACT_APP_NAVER_AUTH_URL}` },
    { type: 'Kakao', link: `${process.env.REACT_APP_KAKAO_AUTH_URL}` },
  ];

  const OauthBtns = OauthBtnInfo.map((info) => <OauthLoginButton key={info.type} type={info.type} link={info.link} />);

  return (
    <S.OauthLoginForm>
      <p>간편하게 로그인 / 회원가입</p>
      <div className="Oauth_Btns">{OauthBtns}</div>
    </S.OauthLoginForm>
  );
};

export default OauthLoginForm;
