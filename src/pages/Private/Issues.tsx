import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { UserInfoState } from '@/stores/userInfo';
import { testLoginOauth } from '@/api/testApi';

import styled from 'styled-components';

import Icon from '@/components/Atoms/Icon';
import Button from '@/components/Atoms/Button';

import FilterBar from '@/components/Molecules/FilterBar';
import { FILTERBAR_INFO } from '@/components/Molecules/FilterBar/mocks';
import { FILTER_TABS_INFO } from '@/components/Molecules/Dropdown/mocks';
import NavLink from '@/components/Molecules/NavLink';

import Header from '@/components/Organisms/Header';
import IssueTable from '@/components/Organisms/IssueTable';
import { issueListData } from '@/components/Organisms/IssueTable/mocks';

const DivContainer = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'space-between' })};
  margin-bottom: 24px;
`;

const SubNav = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'center' })};

  button {
    margin-left: 16px;
  }
`;

const Issues = () => {
  const UserInfoStateValue = useRecoilValue(UserInfoState);
  const { id } = UserInfoStateValue;

  useEffect(() => {
    testLoginOauth(id);
  }, []);

  const FILTER_TABS = FILTER_TABS_INFO;

  return (
    <div>
      <Header user={UserInfoStateValue} />
      <DivContainer>
        <FilterBar {...FILTERBAR_INFO} />
        <SubNav>
          <NavLink
            navData={[
              { icon: <Icon icon="Tag" stroke="#14142B" />, title: '레이블 (3)', link: '/label' },
              { icon: <Icon icon="Milestone" fill="#14142B" />, title: '마일스톤 (2)', link: '/milestone' },
            ]}
            navLinkStyle="LINE"
          />
          <Button buttonStyle="STANDARD" label="이슈작성" size="SMALL" iconInfo={{ icon: 'Plus', stroke: '#FEFEFE' }} />
        </SubNav>
      </DivContainer>
      <IssueTable issueListData={issueListData} filterTabs={FILTER_TABS} />
    </div>
  );
};

export default Issues;
