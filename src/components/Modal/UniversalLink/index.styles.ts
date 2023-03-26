import Button from '@/components/Atoms/Button';
import styled from 'styled-components';

export const UniversalLink = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ direction: 'column', align: 'center', justify: 'center' })};

  img {
    width: 72px;
    height: 72px;
    border: 1px solid ${({ theme }) => theme.COLORS.PLACEHOLDER};
    border-radius: 16px;
  }

  p {
    margin: 12px 0;
    ${({ theme }) => theme.FONTSTYLES.TEXT_MEDIUM};
  }
`;
export const ContinueButton = styled(Button)`
  text-decoration: underline;
  color: ${({ theme }) => theme.COLORS.PLACEHOLDER};

  &:hover:not([disabled]) {
    color: ${({ theme }) => theme.COLORS.BODY};
  }
`;
