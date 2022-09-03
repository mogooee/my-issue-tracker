import { Suspense } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { COLORS } from '@/styles/theme';
import * as S from '@/components/Organisms/LabelTable/index.styled';

import Label from '@/components/Atoms/Label';
import Button from '@/components/Atoms/Button';
import Table from '@/components/Molecules/Table';
import TableItem from '@/components/Molecules/Table/TableItem';
import AddLabelField from '@/components/Molecules/AddLabelField';

import { LabelState, LabelTypes } from '@/stores/labelList';

import useLabelFetch from '@/hooks/useLabelFetch';
import Modal, { ModalState } from '@/components/Modal';
import DeleteCheck from '@/components/Modal/DeleteCheck';
import ErrorTable from '@/components/Organisms/ErrorTable';
import LabelTableSkeleton from '@/components/Skeleton/LabelTable';

const LabelTable = () => {
  const { useGetLabel, replaceLabel } = useLabelFetch();

  const { data: labelContents } = useGetLabel();

  const labelNum = labelContents!.length;

  const navigate = useNavigate();
  const [labelState, setLabelState] = useRecoilState(LabelState);
  const [isModal, setIsModal] = useRecoilState(ModalState);

  const resetLabelState = useResetRecoilState(LabelState);

  const handleEditButtonClick = (props: LabelTypes) => {
    setLabelState({ type: 'EDIT', label: props });
  };

  const handleCompleteButtonClick = (id: number) => {
    replaceLabel({ id, replacedLabel: labelState.label });
    resetLabelState();
  };

  const handleDeleteButtonClick = (id: number) => {
    setLabelState((prev) => ({ type: 'DELETE', label: { ...prev.label, id } }));
    setIsModal(true);
  };

  const handleCancleButtonClick = () => {
    resetLabelState();
  };

  const handleLabelClick = (title: string) => {
    navigate(`/issues?q=label%3A"${title}"`);
  };

  return (
    <S.LabelTable>
      <Table
        header={<span>{`${labelNum}개의 레이블`}</span>}
        item={labelContents!.map(({ id, title, backgroundColorCode, description, textColor }) => (
          <TableItem key={id}>
            {labelState.type === 'EDIT' && labelState.label.id === id ? (
              <AddLabelField
                type="EDIT"
                onClickCancleButton={handleCancleButtonClick}
                onClickCompleteButton={() => handleCompleteButtonClick(id)}
              />
            ) : (
              <S.LabelItem>
                <Label
                  title={title}
                  backgroundColor={backgroundColorCode}
                  textColor={textColor}
                  onClick={() => handleLabelClick(title)}
                />
                <S.Description>{description}</S.Description>
                <S.EditButton>
                  <Button
                    buttonStyle="NO_BORDER"
                    iconInfo={{
                      icon: 'Edit',
                      stroke: COLORS.LABEL,
                    }}
                    label="편집"
                    size="SMALL"
                    handleOnClick={() =>
                      handleEditButtonClick({ id, title, backgroundColorCode, description, textColor })
                    }
                  />
                  <Button
                    buttonStyle="NO_BORDER"
                    iconInfo={{
                      icon: 'Trash',
                      stroke: COLORS.ERROR.RED,
                    }}
                    label="삭제"
                    size="SMALL"
                    handleOnClick={() => handleDeleteButtonClick(id)}
                  />
                </S.EditButton>
              </S.LabelItem>
            )}
          </TableItem>
        ))}
      />
      {isModal && (
        <Modal>
          <DeleteCheck id={labelState.label.id} />
        </Modal>
      )}
    </S.LabelTable>
  );
};

export const FallbackLabelTable = () => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary
        onReset={reset}
        // eslint-disable-next-line react/no-unstable-nested-components
        fallbackRender={({ resetErrorBoundary }) => <ErrorTable type="label" resetErrorBoundary={resetErrorBoundary} />}
      >
        <Suspense fallback={<LabelTableSkeleton />}>
          <LabelTable />
        </Suspense>
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
);

export default FallbackLabelTable;
