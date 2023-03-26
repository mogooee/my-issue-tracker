/* eslint-disable react/prop-types */
import { Suspense, useState } from 'react';
import { useRecoilValue } from 'recoil';

import * as S from '@/components/Organisms/LabelTable/LabelItem/index.styles';

import Table from '@/components/Molecules/Table';
import ErrorTable from '@/components/Organisms/ErrorTable';
import LabelItem from '@/components/Organisms/LabelTable/LabelItem';
import LabelTableSkeleton from '@/components/Skeleton/LabelTable';
import DeleteCheck from '@/components/Modal/DeleteCheck';

import useFetchLabel from '@/api/label/useFetchLabel';
import Modal from '@/components/Modal';
import { ModalState } from '@/stores/modal';

import CustomErrorBoundary from '@/components/ErrorBoundary';

const EmptyLabelItem = () => (
  <S.NoLabelItem>
    <span>해당하는 레이블이 없습니다. 👀</span>
  </S.NoLabelItem>
);

const LabelTable = () => {
  const { useLabelData, deleteLabel } = useFetchLabel();
  const { data: labelData } = useLabelData();
  const labelDataNum = labelData!.length;
  const labelTableTitle = `${labelDataNum}개의 레이블`;

  const isModal = useRecoilValue(ModalState);
  const [deleteLabelId, setDeleteLabelId] = useState<number>(0);

  const handleDeleteButtonClick = () => {
    deleteLabel(deleteLabelId);
  };

  return (
    <>
      <Table
        header={<span>{labelTableTitle}</span>}
        item={
          labelDataNum
            ? labelData!.map((props) => <LabelItem key={props.id} setDeleteLabelId={setDeleteLabelId} {...props} />)
            : [<EmptyLabelItem />]
        }
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
