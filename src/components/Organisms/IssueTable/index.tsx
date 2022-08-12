import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import CheckBox from '@/components/Atoms/CheckBox';
import Icon from '@/components/Atoms/Icon';
import NavLink from '@/components/Molecules/NavLink';
import IssueItem, { IssueInfoTypes } from '@/components/Molecules/IssueItem';

import { CheckState, IssueTableCheckState } from '@/stores/checkBox';

import * as S from '@/components/Organisms/IssueTable/index.styles';

interface IssueTableTypes {
  issueListData: IssueInfoTypes[];
}

const openCloseIssue = [
  {
    icon: <Icon icon="AlertCircle" stroke="#007AFF" />,
    title: '열린 이슈',
    link: '/issues/open',
  },
  {
    icon: <Icon icon="Archive" stroke="#0025E7" />,
    title: '닫힌 이슈',
    link: '/issues/close',
  },
];

const IssueTable = ({ issueListData }: IssueTableTypes) => {
  const [checkState, setCheckState] = useRecoilState(CheckState);
  const { checkedIssueNum } = useRecoilValue(IssueTableCheckState);

  useEffect(() => {
    setCheckState({ ...checkState, child: Array.from({ length: issueListData.length }, () => false) });
  }, []);

  return (
    <S.StyledIssueTable>
      <S.IssueHeader>
        <tr>
          <th>
            <CheckBox id={-1} type="parent" checked={checkState.parent} />
            <S.IssueStates>
              {checkedIssueNum > 0 ? (
                <span>{`${checkedIssueNum}개 이슈 선택`}</span>
              ) : (
                <NavLink navData={openCloseIssue} />
              )}
            </S.IssueStates>
            <S.IssueInfoTabs>
              {checkedIssueNum > 0 ? <span>상태 수정</span> : <span>담당자 레이블 마일스톤 작성자</span>}
            </S.IssueInfoTabs>
          </th>
        </tr>
      </S.IssueHeader>
      <S.IssueContent>
        {issueListData.map((props) => (
          <tr key={props.id}>
            <td>
              <IssueItem issueInfo={props} />
            </td>
          </tr>
        ))}
      </S.IssueContent>
    </S.StyledIssueTable>
  );
};

export default IssueTable;
