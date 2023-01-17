import styled from 'styled-components';
import { Divider } from '@/pages/Private/NewIssue/index.styles';

export const IssueInfo = styled.div<{ isNotExistInfo: boolean }>`
  display: none;

  @media ${({ theme }) => theme.DEVICE.MOBILE} {
    display: ${({ isNotExistInfo }) => (isNotExistInfo ? ` none` : `grid`)};
    grid-template-columns: repeat(2, auto);
    gap: 12px 20px;

    .milestone__title {
      ${({ theme }) => theme.FONTSTYLES.TEXT_SMALL};
    }
  }
`;

export const ImagesWrapper = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 26px;
    height: 26px;
  }

  img + img {
    margin-left: 4px;
  }
`;

export const LabelWrapper = styled.div`
  div {
    display: inline-block;
    margin: 0px 4px 2px 0px;
  }
`;

export const IssueInfoType = styled.span`
  ${({ theme }) => theme.FONTSTYLES.TEXT_SMALL};
`;

export const IssueInfoDivider = styled(Divider)`
  display: none;

  @media ${({ theme }) => theme.DEVICE.MOBILE} {
    display: block;
  }
`;
