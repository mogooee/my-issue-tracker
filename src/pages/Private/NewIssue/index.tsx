/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { LoginUserInfoState } from '@/stores/loginUserInfo';
import { NewIssueFormState } from '@/stores/newIssue';

import * as S from '@/pages/Private/NewIssue/index.styles';
import Button from '@/components/Atoms/Button';
import Input from '@/components/Atoms/Input';
import UserImage from '@/components/Atoms/UserImage';
import SideBar from '@/components/Organisms/SideBar';
import TextAreaEditer from '@/components/Molecules/TextAreaEditer';
import { DEFAULT_CONTENT_LIST } from '@/components/Organisms/SideBar/mock';

import useInput from '@/hooks/useInput';
import { NEW_ISSUE_BUTTON_INFO } from '@/components/Atoms/Button/options';

import Modal from '@/components/Modal';
import { ModalState } from '@/stores/modal';
import CancelNewIssueModal from '@/components/Modal/CancelNewIssue';

import { filterUncheckedItem, getFindDropdownItem } from '@/components/Organisms/SideBar/utils';
import { ContentListTypes, isMilestoneTypes, UpdateSideBarFuncTypes } from '@/components/Organisms/SideBar/types';

import useFetchIssue from '@/api/issue/useFetchIssue';

import CustomErrorBoundary from '@/components/ErrorBoundary';
import ErrorSideBar from '@/components/Organisms/SideBar/ErrorSideBar';

const NewIssue = () => {
  const LoginUserInfoStateValue = useRecoilValue(LoginUserInfoState);
  const [isOpenModal, setIsOpenModal] = useRecoilState(ModalState);
  const [newIssueFormState, setNewIssueFormState] = useRecoilState(NewIssueFormState);

  const [contentList, setContentList] = useState(DEFAULT_CONTENT_LIST);

  const { createNewIssueMutate } = useFetchIssue();
  const { isActive, isTyping, onChangeInput, onClickInput, onBlurInput } = useInput();

  const OnClickCancelButton = () => setIsOpenModal(true);

  const isDisabeldCreateIssueButton = () => newIssueFormState.title === '';

  const updateTitleState = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    onChangeInput(event);
    setNewIssueFormState({ ...newIssueFormState, title: target.value });
  };

  const updateSideBarItemState = ({ ...props }: UpdateSideBarFuncTypes) => {
    const { id, panel, checked, dropdownList } = props;

    // 드롭다운 리스트에서 체크한 아이템의 정보를 찾는다.
    const findDropdownItem = getFindDropdownItem({ id: id!, dropdownList });

    const contentKey = panel as keyof ContentListTypes;

    // 마일스톤의 드롭다운 아이템 체크시
    if (contentKey === 'milestone' && checked) {
      if (id !== 'no:milestone' && isMilestoneTypes(findDropdownItem!)) {
        // 하나의 요소만 들어갈 수 있도록 한다.
        setContentList({ ...contentList, [contentKey]: [findDropdownItem] });
        setNewIssueFormState({ ...newIssueFormState, milestoneId: findDropdownItem.id });
        return;
      }
      // 마일스톤 없음을 체크하면 아무 값도 들어가지 않는다.
      setContentList({ ...contentList, [contentKey]: [] });
      setNewIssueFormState({ ...newIssueFormState, milestoneId: null });
      return;
    }

    // 담당자, 레이블 드롭다운 아이템 체크시 findDropdownItem한 요소를 content 리스트에 추가한다.
    if (contentKey !== 'milestone' && checked) {
      setContentList({ ...contentList, [contentKey]: [...contentList[contentKey], findDropdownItem] });
      setNewIssueFormState({
        ...newIssueFormState,
        [`${contentKey}Ids`]: [...newIssueFormState[`${contentKey}Ids`], findDropdownItem!.id],
      });
      return;
    }

    if (contentKey !== 'milestone' && !checked) {
      // 드롭다운 리스트에서 체크 해제하면, content 리스트에서 해당하는 요소를 제외한다.
      const filterContentList = filterUncheckedItem({ id: id!, contentKey, contentList });
      setContentList({ ...contentList, [contentKey]: [...filterContentList] });
      setNewIssueFormState({
        ...newIssueFormState,
        [`${contentKey}Ids`]: filterContentList.map((list) => list.id),
      });
    }
  };

  const onClickCreateNewIssueButton = () => {
    createNewIssueMutate({
      newIssueFormData: newIssueFormState,
      memberId: LoginUserInfoStateValue.id,
    });
  };

  return (
    <>
      <S.NewIssue>
        <h1>새로운 이슈 작성</h1>
        <S.Divider />
        <S.NewIssueEditer>
          <UserImage imgSize="MEDIUM" {...LoginUserInfoStateValue} />
          <S.NewIssueForm isActive={isActive}>
            <Input
              inputMaxLength={255}
              inputPlaceholder="제목"
              inputSize="MEDIUM"
              inputType="text"
              isActive={isActive}
              isTyping={isTyping}
              onChange={updateTitleState}
              onClick={onClickInput}
              onBlur={onBlurInput}
            />
            <TextAreaEditer edit="ISSUE" textAreaValue={newIssueFormState.comment} />
          </S.NewIssueForm>
          <CustomErrorBoundary
            fallbackRender={({ resetState, errorCode }) => (
              <ErrorSideBar contentList={DEFAULT_CONTENT_LIST} resetState={resetState!} errorCode={errorCode} />
            )}
          >
            <SideBar content={contentList} handleOnChange={updateSideBarItemState} />
          </CustomErrorBoundary>
        </S.NewIssueEditer>
        <S.Divider />
        <S.NewIssueButtons>
          <Button {...NEW_ISSUE_BUTTON_INFO.CANCEL} handleOnClick={OnClickCancelButton} />
          <Button
            {...NEW_ISSUE_BUTTON_INFO.COMPLETE}
            disabled={isDisabeldCreateIssueButton()}
            handleOnClick={onClickCreateNewIssueButton}
          />
        </S.NewIssueButtons>
      </S.NewIssue>
      {isOpenModal && (
        <Modal>
          <CancelNewIssueModal />
        </Modal>
      )}
    </>
  );
};

export default NewIssue;
