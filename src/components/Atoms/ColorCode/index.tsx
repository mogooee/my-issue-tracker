/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import PanelPreviewLabel from '@/components/Molecules/Dropdown/Panel/Label';
import Button from '@/components/Atoms/Button';

import * as S from '@/components/Atoms/ColorCode/index.styled';
import { LabelTypes } from '@/api/issue/types';

interface ColorCodeTypes {
  color?: string;
  setLabelState?: React.Dispatch<React.SetStateAction<LabelTypes>>;
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}

const MAX_COLORCODE_LENGTH = 7;
const DEFAULT_COLOR = '#EFF0F6';
const HEXA_COLOR_CODE_REGEX = /(#([a-fA-F0-9]{6}))/g;

const ColorCode = ({ color = DEFAULT_COLOR, setLabelState, isError, setIsError }: ColorCodeTypes) => {
  const isValidHexaCode = (code: string) => {
    if (!code.match(HEXA_COLOR_CODE_REGEX)) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };

  const changeColorCode = () => {
    const r = Math.floor(Math.random() * 127 + 128).toString(16);
    const g = Math.floor(Math.random() * 127 + 128).toString(16);
    const b = Math.floor(Math.random() * 127 + 128).toString(16);
    const newRandomColor = `#${r}${g}${b}`.toUpperCase();
    isValidHexaCode(newRandomColor);
    setLabelState?.((prev) => ({ ...prev, backgroundColorCode: newRandomColor }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    isValidHexaCode(value);
    setLabelState?.((prev) => ({ ...prev, backgroundColorCode: value }));
  };

  return (
    <S.ColorCode isError={isError}>
      <label>배경 색상</label>
      <S.EditTool>
        <input type="text" value={color} maxLength={MAX_COLORCODE_LENGTH} onChange={handleInputChange} />
        <PanelPreviewLabel backgroundColor={color} />
        <Button
          buttonStyle="NO_BORDER"
          iconInfo={{
            icon: 'RefreshCcw',
          }}
          label=""
          size="SMALL"
          handleOnClick={changeColorCode}
        />
      </S.EditTool>
    </S.ColorCode>
  );
};

export default ColorCode;
