import axios, { AxiosError } from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import LoadingSpinner from '@/components/Atoms/LoadingSpinner';

interface SignUpFormDataTypes {
  resourceOwnerId: string;
  email: string;
  profileImage: string;
}

export interface SignInMemberTypes {
  id: number;
  email: string;
  nickname: string;
  profileImage: string;
}

export interface RedirectAuthTypes {
  signUpFormData: SignUpFormDataTypes | null;
  signInMember: SignInMemberTypes | null;
}

const StyledDiv = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ direction: 'column', align: 'center', justify: 'center' })};
  height: 100vh;
`;

const RedirectAuth = () => {
  // http://localhost:3000/redirect-auth?provider=GITHUB&code=1
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const provider = searchParams.get('provider');

  const navigate = useNavigate();

  const getData = async () => {
    try {
      const { data } = await axios.get<RedirectAuthTypes>(`/api/auth/${provider}?code=${code}`);
      const { signUpFormData, signInMember } = data;

      if (signInMember) {
        // 로그인 -> 로컬에 정보저장해서 로그인 유지
        navigate('/issues');
      } else {
        // 쿼리에 저장해서 signUpForm에서 사용
        navigate('/signup-oauth');
      }
    } catch (error) {
      const err = error as AxiosError;
      throw err;
    }
  };

  getData();

  return (
    <StyledDiv>
      <LoadingSpinner size={80} />
    </StyledDiv>
  );
};

export default RedirectAuth;
