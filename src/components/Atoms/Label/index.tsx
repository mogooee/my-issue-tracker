import React from 'react';
import * as S from '@/components/Atoms/Label/index.styles';
import { COLORS } from '@/styles/theme';

export interface LabelTypes {
  title: string;
  icon?: React.ReactNode;
  labelStyle?: 'LIGHT' | 'DARK';
  backgroundColor: string;
  textColor: 'WHITE' | 'BLACK';
  onClick?: () => void;
}

const DEFAULT_COLORS = COLORS.PRIMARY.BLUE;

const Label = ({ labelStyle = 'LIGHT', backgroundColor = DEFAULT_COLORS, ...props }: LabelTypes) => {
  const { title, icon, textColor, onClick } = props;

  return (
    <S.Label labelStyle={labelStyle} backgroundColor={backgroundColor} textColor={textColor} onClick={onClick}>
      {icon}
      <span>{title}</span>
    </S.Label>
  );
};

export default Label;
