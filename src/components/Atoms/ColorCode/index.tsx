/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useRecoilState } from 'recoil';

import PanelPreviewLabel from '@/components/Molecules/Dropdown/Panel/Label';
import Button from '@/components/Atoms/Button';

import { LabelState } from '@/stores/labelList';

import * as S from '@/components/Atoms/ColorCode/index.styled';

interface ColorCodeTypes {
  defaultColor?: string;
}

const MAX_COLORCODE_LENGTH = 7;
const DEFAULT_COLOR = '#EFF0F6';
const HEAX_COLOR_CODE_REGEX = /(#([a-fA-F0-9]{6}))/g;

const ColorCode = ({ defaultColor = DEFAULT_COLOR }: ColorCodeTypes) => {
  const [labelState, setLabelState] = useRecoilState(LabelState);

  const changeColorCode = () => {
    const r = Math.floor(Math.random() * 127 + 128).toString(16);
    const g = Math.floor(Math.random() * 127 + 128).toString(16);
    const b = Math.floor(Math.random() * 127 + 128).toString(16);
    const newRandomColor = `#${r}${g}${b}`.toUpperCase();
    setLabelState((prev) => ({ ...prev, label: { ...prev.label, backgroundColorCode: newRandomColor } }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (!value.match(HEAX_COLOR_CODE_REGEX)) return;
    setLabelState((prev) => ({ ...prev, label: { ...prev.label, backgroundColorCode: value } }));
  };

  return (
    <S.ColorCode>
      <label>배경 색상</label>
      <input
        type="text"
        value={labelState.label.backgroundColorCode || defaultColor}
        maxLength={MAX_COLORCODE_LENGTH}
        onChange={handleInputChange}
      />
      <PanelPreviewLabel backgroundColor={labelState.label.backgroundColorCode || defaultColor} />
      <Button
        buttonStyle="NO_BORDER"
        iconInfo={{
          icon: 'RefreshCcw',
        }}
        label=""
        size="SMALL"
        handleOnClick={changeColorCode}
      />
    </S.ColorCode>
  );
};

export default ColorCode;
