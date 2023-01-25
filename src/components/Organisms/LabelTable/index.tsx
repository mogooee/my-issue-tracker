/* eslint-disable react/prop-types */
import { Suspense, useState } from 'react';
import { useRecoilValue } from 'recoil';

import Table from '@/components/Molecules/Table';
import ErrorTable from '@/components/Organisms/ErrorTable';
import LabelItem from '@/components/Organisms/LabelTable/LabelItem';
import LabelTableSkeleton from '@/components/Skeleton/LabelTable';
import DeleteCheck from '@/components/Modal/DeleteCheck';

import useFetchLabel from '@/api/label/useFetchLabel';
import Modal, { ModalState } from '@/components/Modal';

import CustomErrorBoundary from '@/components/ErrorBoundary';

const LabelTable = () => {
  const { useLabelData, deleteLabel } = useFetchLabel();
  const { data: labelData } = useLabelData();
  const labelTableTitle = `${labelData!.length}개의 레이블`;

  const isModal = useRecoilValue(ModalState);
  const [deleteLabelId, setDeleteLabelId] = useState<number>(0);

  const handleDeleteButtonClick = () => {
    deleteLabel(deleteLabelId);
  };

  return (
    <>
      <Table
        header={<span>{labelTableTitle}</span>}
        item={labelData!.map((props) => (
          <LabelItem key={props.id} setDeleteLabelId={setDeleteLabelId} {...props} />
        ))}
      />
      {isModal && (
        <Modal>
          <DeleteCheck handleDeleteButtonClick={handleDeleteButtonClick} />
        </Modal>
      )}
    </>
  );
};

export const FallbackLabelTable = () => (
  <CustomErrorBoundary
    // eslint-disable-next-line react/no-unstable-nested-components
    fallbackRender={({ resetErrorBoundary }) => <ErrorTable type="label" resetErrorBoundary={resetErrorBoundary} />}
  >
    <Suspense fallback={<LabelTableSkeleton />}>
      <LabelTable />
    </Suspense>
  </CustomErrorBoundary>
);

export default FallbackLabelTable;
