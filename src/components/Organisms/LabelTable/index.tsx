/* eslint-disable react/prop-types */
import { Suspense } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import * as S from '@/components/Organisms/LabelTable/index.styled';

import Table from '@/components/Molecules/Table';
import TableItem from '@/components/Molecules/Table/TableItem';
import AddLabelField from '@/components/Molecules/LabelEditForm';

import { LabelState } from '@/stores/label';

import useFetchLabel from '@/api/label/useFetchLabel';
import Modal, { ModalState } from '@/components/Modal';
import DeleteCheck from '@/components/Modal/DeleteCheck';
import ErrorTable from '@/components/Organisms/ErrorTable';
import LabelTableSkeleton from '@/components/Skeleton/LabelTable';
import LabelItem from '@/components/Organisms/LabelTable/LabelItem';

import CustomErrorBoundary from '@/components/ErrorBoundary';

const LabelTable = () => {
  const { useLabelData, replaceLabel, deleteLabel } = useFetchLabel();

  const { data: labelData } = useLabelData();
  const labelNum = labelData!.length;

  const labelState = useRecoilValue(LabelState);
  const isModal = useRecoilValue(ModalState);
  const resetLabelState = useResetRecoilState(LabelState);

  const handleCompleteButtonClick = (id: number) => {
    replaceLabel({ id, replacedLabel: labelState.label });
    resetLabelState();
  };

  const handleCancleButtonClick = () => {
    resetLabelState();
  };

  const handleDeleteButtonClick = () => {
    deleteLabel(labelState.label.id);
  };

  return (
    <S.LabelTable>
      <Table
        header={<span>{`${labelNum}개의 레이블`}</span>}
        item={labelData!.map((props) => (
          <TableItem key={props.id}>
            {labelState.type === 'EDIT' && labelState.label.id === props.id ? (
              <AddLabelField
                type="EDIT"
                onClickCancleButton={handleCancleButtonClick}
                onClickCompleteButton={() => handleCompleteButtonClick(props.id)}
              />
            ) : (
              <LabelItem {...props} />
            )}
          </TableItem>
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
