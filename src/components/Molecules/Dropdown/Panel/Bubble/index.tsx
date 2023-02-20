import { BubblePanelTypes } from '@/components/Molecules/Dropdown/types';
import * as S from '@/components/Molecules/Dropdown/Panel/Bubble/index.styles';

const Bubble = ({ ...props }: BubblePanelTypes) => {
  const { panelList, position } = props as BubblePanelTypes;

  return (
    <S.ButtonGroup position={position ?? 'LEFT'}>
      {panelList.map(({ title, onClick }) => (
        <li key={title}>
          <button type="button" onClick={onClick}>
            {title}
          </button>
        </li>
      ))}
    </S.ButtonGroup>
  );
};

export default Bubble;
