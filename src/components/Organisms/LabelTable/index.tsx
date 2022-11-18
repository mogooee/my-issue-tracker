/* eslint-disable react/prop-types */
import { Suspense, useState } from 'react';
import { useRecoilValue } from 'recoil';

import * as S from '@/components/Organisms/LabelTable/index.styled';

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
  const labelNum = labelData!.length;

  const isModal = useRecoilValue(ModalState);
  const [deleteLabelId, setDeleteLabelId] = useState<number>(0);

  const handleDeleteButtonClick = () => {
    deleteLabel(deleteLabelId);
  };

  return (
    <S.LabelTable>
      <Table
        header={<span>{`${labelNum}개의 레이블`}</span>}
        item={labelData!.map((props) => (
          <LabelItem key={props.id} setDeleteLabelId={setDeleteLabelId} {...props} />
        ))}
      />
      {isModal && (
        <Modal>
          <DeleteCheck handleDeleteButtonClick={handleDeleteButtonClick} />
        </Modal>
      )}
    </S.LabelTable>
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
