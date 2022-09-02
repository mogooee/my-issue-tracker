import * as S from '@/components/Atoms/ProgressBar/index.styles';

export interface PrograssBarTypes {
  open: number;
  close: number;
  showState?: boolean;
  title?: string;
}

const PrograssBar = ({ open, close, showState, title }: PrograssBarTypes) => {
  const percent = 100;
  const progressValue = Math.floor((close / (open + close)) * 100);

  return (
    <>
      <S.PrograssBar value={progressValue} max={percent} />
      {title && <S.PrograssTitle>{title}</S.PrograssTitle>}
      {showState && (
        <S.PrograssState>
          <span>{progressValue}%</span>
          <span>열린 이슈 {open}</span>
          <span>닫힌 이슈 {close}</span>
        </S.PrograssState>
      )}
    </>
  );
};

export default PrograssBar;
