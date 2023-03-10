import { Link } from 'react-router-dom';

import * as S from '@/pages/Private/Issues/NavInline/index.styles';

import FilterBar from '@/components/Molecules/FilterBar';
import { FILTERBAR_INFO } from '@/components/Molecules/FilterBar/mocks';

import NavLink from '@/components/Molecules/NavLink';
import { labelMilestone } from '@/components/Molecules/NavLink/options';

import Button from '@/components/Atoms/Button';
import { NEW_ISSUE_BUTTON_INFO } from '@/components/Atoms/Button/options';

const IssuesNavInline = () => (
  <S.NavInline>
    <FilterBar {...FILTERBAR_INFO} />
    <S.SubNav>
      <NavLink navData={labelMilestone(0, 0)} navLinkStyle="LINE" />
      <Link to="/issues/new">
        <Button {...NEW_ISSUE_BUTTON_INFO.WRITE} />
      </Link>
    </S.SubNav>
  </S.NavInline>
);

export default IssuesNavInline;
