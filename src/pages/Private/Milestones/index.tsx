import { useState } from 'react';

import Button from '@/components/Atoms/Button';
import MilestoneEditForm from '@/components/Molecules/MilestoneEditForm';
import NavLink from '@/components/Molecules/NavLink';

import { BUTTON_PROPS } from '@/components/Atoms/Button/options';
import { FallBackMilestoneTable } from '@/components/Organisms/MilestoneTable';
import { labelMilestone } from '@/components/Molecules/NavLink/options';

import * as S from '@/pages/Private/Milestones/index.styles';

const Milestones = () => {
  const [isOpenAddEdit, setIsOpenAddEdit] = useState(false);

  const openAddEdit = () => {
    setIsOpenAddEdit((state) => !state);
  };

  return (
    <>
      <S.NavContainer>
        <NavLink navData={labelMilestone()} navLinkStyle="LINE" />
        <Button {...(!isOpenAddEdit ? BUTTON_PROPS.ADD : BUTTON_PROPS.CLOSE)} handleOnClick={openAddEdit} />
      </S.NavContainer>
      {isOpenAddEdit && <MilestoneEditForm editMode="ADD" setOpenState={setIsOpenAddEdit} />}
      <FallBackMilestoneTable />
    </>
  );
};

export default Milestones;
