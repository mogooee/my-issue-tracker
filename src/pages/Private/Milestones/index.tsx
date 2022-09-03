import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { LoginUserInfoState } from '@/stores/loginUserInfo';

import styled from 'styled-components';
import Button from '@/components/Atoms/Button';
import EditMilestone from '@/components/Molecules/EditMilestone';
import NavLink from '@/components/Molecules/NavLink';
import Header from '@/components/Organisms/Header';
import { StyledNavLink } from '@/components/Molecules/NavLink/index.styles';

import { BUTTON_PROPS, NAV_DATA } from '@/pages/Private/Milestones/constants';
import { FallBackMilestoneTable } from '@/components/Organisms/MilestoneTable';

const NavContainer = styled.div`
  ${({ theme }) => theme.MIXIN.FLEX({ align: 'center', justify: 'space-between' })};
  margin-bottom: 24px;

  div {
    overflow: hidden;
  }

  ${StyledNavLink} {
    &.active {
      background: ${({ theme }) => theme.COLORS.LINE};
    }
  }
`;

const Milestones = () => {
  const LoginUserInfoStateValue = useRecoilValue(LoginUserInfoState);
  const [isOpenAddEdit, setIsOpenAddEdit] = useState(false);

  const openAddEdit = () => {
    setIsOpenAddEdit((state) => !state);
  };

  return (
    <div>
      <Header user={LoginUserInfoStateValue} />
      <NavContainer>
        <NavLink navData={NAV_DATA} navLinkStyle="LINE" />
        <Button {...(!isOpenAddEdit ? BUTTON_PROPS.ADD : BUTTON_PROPS.CLOSE)} handleOnClick={openAddEdit} />
      </NavContainer>
      {isOpenAddEdit && <EditMilestone editMode="ADD" setOpenState={setIsOpenAddEdit} />}
      <FallBackMilestoneTable />
    </div>
  );
};

export default Milestones;
