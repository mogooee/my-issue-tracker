import { CheckState, IssueTableCheckState } from '@/stores/checkBox';
import { useRecoilState, useRecoilValue } from 'recoil';

function useCheckBox() {
  const [checkState, setCheckState] = useRecoilState(CheckState);
  const { checkStatsState } = useRecoilValue(IssueTableCheckState);

  const clickParentCheckBox = (checked: boolean) => {
    let newCheckState = { ...checkState };

    if (checkStatsState === 'some') {
      const newChildCheckState = newCheckState.child.map((e) => true);
      newCheckState = { ...newCheckState, child: newChildCheckState };
    } else {
      const newChildCheckState = newCheckState.child.map((e) => checked);
      newCheckState = { parent: checked, child: newChildCheckState };
    }
    setCheckState(newCheckState);
  };

  const clickChildCheckBox = (id: number, checked: boolean) => {
    const newChildCheckState = [...checkState.child];
    newChildCheckState[id] = checked;
    const newCheckState = { parent: newChildCheckState.includes(true), child: newChildCheckState };
    setCheckState(newCheckState);
  };

  return { clickParentCheckBox, clickChildCheckBox };
}

export default useCheckBox;
