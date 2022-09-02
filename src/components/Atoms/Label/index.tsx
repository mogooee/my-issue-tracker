import React from 'react';
import * as S from '@/components/Atoms/Label/index.styles';
import { COLORS } from '@/styles/theme';

export interface LabelTypes {
  title: string;
  icon?: React.ReactNode;
  labelStyle?: 'LIGHT' | 'DARK';
  backgroundColor: string;
  textColor: 'WHITE' | 'BLACK';
}

const DEFAULT_COLORS = COLORS.PRIMARY.BLUE;

const Label = ({ labelStyle = 'LIGHT', backgroundColor = DEFAULT_COLORS, ...props }: LabelTypes) => {
  const { title, icon, textColor } = props;

  return (
    <S.Label labelStyle={labelStyle} backgroundColor={backgroundColor} textColor={textColor}>
      {icon}
      <span>{title}</span>
    </S.Label>
  );
};

export default Label;
