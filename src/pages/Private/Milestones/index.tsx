import { useState } from 'react';

import styled from 'styled-components';
import Button from '@/components/Atoms/Button';
import MilestoneEditForm from '@/components/Molecules/MilestoneEditForm';
import NavLink from '@/components/Molecules/NavLink';
import { StyledNavLink } from '@/components/Molecules/NavLink/index.styles';

import { BUTTON_PROPS } from '@/components/Atoms/Button/options';
import { FallBackMilestoneTable } from '@/components/Organisms/MilestoneTable';
import { labelMilestone } from '@/components/Molecules/NavLink/options';

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
  const [isOpenAddEdit, setIsOpenAddEdit] = useState(false);

  const openAddEdit = () => {
    setIsOpenAddEdit((state) => !state);
  };

  return (
    <>
      <NavContainer>
        <NavLink navData={labelMilestone} navLinkStyle="LINE" />
        <Button {...(!isOpenAddEdit ? BUTTON_PROPS.ADD : BUTTON_PROPS.CLOSE)} handleOnClick={openAddEdit} />
      </NavContainer>
      {isOpenAddEdit && <MilestoneEditForm editMode="ADD" setOpenState={setIsOpenAddEdit} />}
      <FallBackMilestoneTable />
    </>
  );
};

export default Milestones;
