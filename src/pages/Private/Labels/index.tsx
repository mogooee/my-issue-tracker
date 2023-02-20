import { useState } from 'react';

import * as S from '@/pages/Private/Labels/index.styles';

import Button from '@/components/Atoms/Button';
import LabelEditForm from '@/components/Molecules/LabelEditForm';
import NavLink from '@/components/Molecules/NavLink';
import { FallbackLabelTable } from '@/components/Organisms/LabelTable';

import { initLabelState } from '@/components/Molecules/LabelEditForm/constants';
import { labelMilestone } from '@/components/Molecules/NavLink/options';
import { BUTTON_PROPS } from '@/components/Atoms/Button/options';

const Labels = () => {
  const [isAddLabel, setIsAddLabel] = useState<boolean>(false);

  const handleCloseButtonClick = () => {
    setIsAddLabel(false);
  };

  const handleAddButtonClick = () => {
    setIsAddLabel(true);
  };

  const closeButtonProps = { ...BUTTON_PROPS.CLOSE, handleOnClick: handleCloseButtonClick };
  const addButtonProps = { ...BUTTON_PROPS.ADD, handleOnClick: handleAddButtonClick };

  return (
    <S.Labels>
      <S.SubNav>
        <NavLink navData={labelMilestone()} navLinkStyle="LINE" />
        <Button {...(isAddLabel ? closeButtonProps : addButtonProps)} />
      </S.SubNav>
      {isAddLabel && <LabelEditForm id={0} type="ADD" labelProps={initLabelState} setIsEditLabel={setIsAddLabel} />}
      <FallbackLabelTable />
    </S.Labels>
  );
};
export default Labels;
