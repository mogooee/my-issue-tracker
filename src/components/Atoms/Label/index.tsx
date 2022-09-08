import React from 'react';

import * as S from '@/components/Atoms/Label/index.styles';
import { COLORS } from '@/styles/theme';

import { LabelTypes } from '@/api/issue/types';

type AtomLabelType = {
  labelStyle?: 'LIGHT' | 'DARK';
  icon?: React.ReactNode;
  textColor?: 'WHITE' | 'BLACK';
  lineColor?: string;
  onClick?: () => void;
};

export type LabelType = Pick<LabelTypes, 'title' | 'backgroundColorCode'> & AtomLabelType;

const DEFAULT_COLORS = COLORS.PRIMARY.BLUE;

const Label = ({
  labelStyle = 'LIGHT',
  title,
  icon,
  onClick,
  backgroundColorCode = DEFAULT_COLORS,
  textColor = 'WHITE',
  lineColor = 'transparent',
}: LabelType) => (
  <S.Label
    labelStyle={labelStyle}
    backgroundColorCode={backgroundColorCode}
    textColor={textColor}
    lineColor={lineColor}
    onClick={onClick}
  >
    {icon}
    {title && <span>{title}</span>}
  </S.Label>
);

export default Label;
