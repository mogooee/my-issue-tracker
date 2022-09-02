/* eslint-disable react/prop-types */
import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import { useRecoilState, useRecoilValue } from 'recoil';
import { ClickMilestoneState } from '@/stores/milestone';
import ModalPortal from '@/Portal';
import Modal, { ModalState } from '@/components/Modal';
import DeleteMilestoneModal from '@/components/Modal/DeleteMilestone';

import {
  StyledIssueTable as StyledMilestoneTable,
  IssueHeader as StyledMilestoneHeader,
} from '@/components/Organisms/IssueTable/index.styles';
import Icon from '@/components/Atoms/Icon';
import NavLink from '@/components/Molecules/NavLink';
import MilestoneItem, { MilestoneItemTypes } from '@/components/Molecules/MilestoneItem';
import EmptyMilestoneItem from '@/components/Molecules/MilestoneItem/EmptyItem';

import SkeletonMilestoneTable from '@/components/Skeleton/MilestoneTable';
import ErrorMilestoneTable from '@/components/Organisms/MilestoneTable/Error';

import useFetchMilestone from '@/hooks/useFetchMilestone';

export interface MilestoneListTypes {
  closedMilestones: MilestoneItemTypes[];
  openedMilestones: MilestoneItemTypes[];
}

const MILESTONE_STATE_TAB = (data: MilestoneListTypes) => [
  {
    icon: <Icon icon="Milestone" fill="#14142B" stroke="#ffffff" />,
    link: '/milestone?state=open',
    title: `열린 마일스톤(${data.openedMilestones.length})`,
  },
  {
    icon: <Icon icon="Archive" stroke="#14142B" />,
    link: '/milestone?state=closed',
    title: `닫힌 마일스톤(${data.closedMilestones.length})`,
  },
];

const MilestoneTable = () => {
  const { milestoneData } = useFetchMilestone();
  const [isOpenModalState] = useRecoilState(ModalState);
  const clickMilestoneState = useRecoilValue(ClickMilestoneState);

  const [searchParams] = useSearchParams();
  const stateParam = searchParams.get('state');

  const isOpenMilestone = () => {
    if (!stateParam || stateParam === 'open') return true;
    if (stateParam === 'closed') return false;
  };

  const renderMilestones = (milestoneList: MilestoneItemTypes[]) => {
    if (milestoneList.length) {
      return milestoneList.map((info) => <MilestoneItem key={info.id} {...info} />);
    }

    return <EmptyMilestoneItem />;
  };

  useEffect(() => {}, [searchParams]);

  return (
    <>
      <StyledMilestoneTable>
        <StyledMilestoneHeader>
          <NavLink navData={MILESTONE_STATE_TAB(milestoneData!)} />
        </StyledMilestoneHeader>
        {isOpenMilestone()
          ? renderMilestones(milestoneData!.openedMilestones)
          : renderMilestones(milestoneData!.closedMilestones)}
      </StyledMilestoneTable>
      {isOpenModalState && (
        <ModalPortal>
          <Modal>
            <DeleteMilestoneModal id={clickMilestoneState.id} />
          </Modal>
          )
        </ModalPortal>
      )}
    </>
  );
};

export const FallBackMilestoneTable = () => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary
        onReset={reset}
        // eslint-disable-next-line react/no-unstable-nested-components
        fallbackRender={({ resetErrorBoundary }) => <ErrorMilestoneTable resetErrorBoundary={resetErrorBoundary} />}
      >
        <Suspense fallback={<SkeletonMilestoneTable />}>
          <MilestoneTable />
        </Suspense>
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
);

export default MilestoneTable;
