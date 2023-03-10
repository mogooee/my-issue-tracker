import {
  BubblePanelTypes,
  DropdownTypes,
  ErrorPanelTypes,
  ListPanelTypes,
  ReactionPanelTypes,
} from '@/components/Molecules/Dropdown/types';
import * as S from '@/components/Molecules/Dropdown/index.styles';
import DropdownIndicator from '@/components/Molecules/Dropdown/Indicator';
import DropdownPanel from '@/components/Molecules/Dropdown/Panel';

const Dropdown = <Panel extends ReactionPanelTypes | ListPanelTypes | BubblePanelTypes | ErrorPanelTypes>({
  indicatorProps,
  type,
  panelProps,
  isActive,
  handleOnDropdownClick,
}: DropdownTypes<Panel>): JSX.Element => (
  <S.Dropdown dropdownStyle={indicatorProps.indicatorStyle} onClick={handleOnDropdownClick}>
    <DropdownIndicator isActive={isActive} {...indicatorProps} />
    <DropdownPanel type={type} prop={panelProps} />
  </S.Dropdown>
);
export default Dropdown;
