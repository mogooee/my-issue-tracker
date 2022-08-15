import { atom, selector } from 'recoil';

export interface CheckStateTypes {
  parent: boolean;
  child: boolean[];
}

export const CheckState = atom<CheckStateTypes>({
  key: 'CheckState',
  default: { parent: false, child: [] },
});

export const IssueTableCheckState = selector({
  key: 'IssueTableCheckState',
  get: ({ get }) => {
    const issueCheckState = get(CheckState);
    const totalIssueNum = issueCheckState.child.length;
    const checkedIssueNum = issueCheckState.child.filter((e) => e === true).length;

    let checkStatsState = '';
    if (!checkedIssueNum) checkStatsState = 'none';
    else {
      checkStatsState = checkedIssueNum === totalIssueNum ? 'every' : 'some';
    }

    return {
      totalIssueNum,
      checkedIssueNum,
      checkStatsState,
    };
  },
});
