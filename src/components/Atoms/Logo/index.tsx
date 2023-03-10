import { Link } from 'react-router-dom';
import * as Logos from '@/components/Atoms/Logo/svgs';
import { useResetRecoilState } from 'recoil';
import { FilterState } from '@/stores/filter';

export type LogoSizeType = keyof typeof Logos;

interface LogoType {
  logoSize: LogoSizeType;
}

const Logo = ({ logoSize }: LogoType) => {
  const LogoImg = Logos[logoSize];

  const resetFilterValue = useResetRecoilState(FilterState);

  return (
    <Link to="/" aria-label="issue tracker logo" onClick={resetFilterValue}>
      <LogoImg />
    </Link>
  );
};

export default Logo;
