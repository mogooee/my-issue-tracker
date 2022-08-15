import React from 'react';
import * as S from '@/components/Atoms/Label/index.styles';
import { COLORS } from '@/styles/theme';

export interface LabelTypes {
  title: string;
  icon?: React.ReactNode;
  labelStyle?: 'LIGHT' | 'DARK';
  backgroundColor: string;
}

const DEFAULT_COLORS = COLORS.PRIMARY.BLUE;

const Label = ({ labelStyle = 'LIGHT', backgroundColor = DEFAULT_COLORS, ...props }: LabelTypes) => {
  const { title, icon } = props;

  return (
    <S.Label labelStyle={labelStyle} backgroundColor={backgroundColor}>
      {icon}
      <span>{title}</span>
    </S.Label>
  );
};

export default Label;
