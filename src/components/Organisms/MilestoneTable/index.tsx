/* eslint-disable react/prop-types */
import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useRecoilState, useRecoilValue } from 'recoil';
import { ClickMilestoneState } from '@/stores/milestone';
import Modal from '@/components/Modal';
import { ModalState } from '@/stores/modal';
import DeleteMilestoneModal from '@/components/Modal/DeleteMilestone';

import Icon from '@/components/Atoms/Icon';
import NavLink from '@/components/Molecules/NavLink';
import Table from '@/components/Molecules/Table';
import MilestoneItem from '@/components/Organisms/MilestoneTable/MilestoneItem';
import EmptyMilestoneItem from '@/components/Organisms/MilestoneTable/MilestoneItem/EmptyItem';
import { MilestoneTypes } from '@/api/issue/types';

import SkeletonMilestoneTable from '@/components/Skeleton/MilestoneTable';
import ErrorTable from '@/components/Organisms/ErrorTable';

import useFetchMilestone from '@/api/milestone/useFetchMilestone';
import { COLORS } from '@/styles/theme';

import { MilestoneListTypes } from '@/api/milestone';
import CustomErrorBoundary from '@/components/ErrorBoundary';

const MILESTONE_STATE_TAB = (data: MilestoneListTypes) => [
  {
    icon: <Icon icon="Milestone" fill={COLORS.TITLE_ACTIVE} stroke={COLORS.OFF_WHITE} />,
    link: '/milestones?state=open',
    title: `열린 마일스톤(${data.openedMilestones.length})`,
    dataId: 'openMilestone',
  },
  {
    icon: <Icon icon="Archive" stroke={COLORS.TITLE_ACTIVE} />,
    link: '/milestones?state=closed',
    title: `닫힌 마일스톤(${data.closedMilestones.length})`,
    dataId: 'closedMilestone',
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

  const renderMilestones = (milestoneList: MilestoneTypes[]) => {
    if (milestoneList.length) {
      return milestoneList.map((info) => <MilestoneItem key={info.id} {...info} />);
    }

    return [<EmptyMilestoneItem />];
  };

  useEffect(() => {}, [searchParams]);

  return (
    <>
      <Table
        header={<NavLink navData={MILESTONE_STATE_TAB(milestoneData!)} defaultActive="openMilestone" />}
        item={
          isOpenMilestone()
            ? renderMilestones(milestoneData!.openedMilestones)
            : renderMilestones(milestoneData!.closedMilestones)
        }
      />
      {isOpenModalState && (
        <Modal>
          <DeleteMilestoneModal id={clickMilestoneState.id} />
        </Modal>
      )}
    </>
  );
};

export const FallBackMilestoneTable = () => (
  <CustomErrorBoundary
    // eslint-disable-next-line react/no-unstable-nested-components
    fallbackRender={({ resetErrorBoundary }) => <ErrorTable type="milestone" resetErrorBoundary={resetErrorBoundary} />}
  >
    <Suspense fallback={<SkeletonMilestoneTable />}>
      <MilestoneTable />
    </Suspense>
  </CustomErrorBoundary>
);

export default MilestoneTable;
