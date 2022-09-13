import { CheckState, DefaultCheckIds } from '@/stores/checkBox';
import { useRecoilState, useRecoilValue } from 'recoil';

function useCheckBox() {
  const [checkState, setCheckState] = useRecoilState(CheckState);
  const defaultCheckIds = useRecoilValue(DefaultCheckIds);
  const newCheckState: { parent: boolean; child: number[] } = { parent: false, child: [] };

  const clickParentCheckBox = () => {
    const totalCheckIds =
      // eslint-disable-next-line no-nested-ternary
      checkState.issueState === 'ALL'
        ? [...defaultCheckIds.openIds, ...defaultCheckIds.closedIds]
        : checkState.issueState === 'OPEN'
        ? defaultCheckIds.openIds
        : defaultCheckIds.closedIds;
    const isAllCheckedChildBox = checkState.child.length === totalCheckIds.length;

    if (isAllCheckedChildBox) {
      newCheckState.parent = false;
      newCheckState.child = [];
    } else {
      newCheckState.parent = true;
      newCheckState.child = totalCheckIds;
    }

    setCheckState({ ...checkState, ...newCheckState });
  };

  const clickChildCheckBox = (id: number) => {
    const isCheckedCheckBox = checkState.child.find((checked) => checked === id);

    if (isCheckedCheckBox) {
      newCheckState.child = checkState.child.filter((checked) => checked !== id);
    } else {
      newCheckState.child = [...checkState.child, id];
    }

    newCheckState.parent = newCheckState.child.length > 0;

    setCheckState({ ...checkState, ...newCheckState });
  };

  return { clickParentCheckBox, clickChildCheckBox };
}

export default useCheckBox;
