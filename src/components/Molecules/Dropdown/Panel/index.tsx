import * as panels from '@/components/Molecules/Dropdown/Panel/panels';
import { DropdownPanelTypes, ListPanelTypes, ReactionPanelTypes } from '@/components/Molecules/Dropdown/types';

const DropdownPanel = ({ type, prop }: DropdownPanelTypes): JSX.Element => {
  switch (type) {
    case 'List':
      return <panels.List {...(prop as ListPanelTypes)} />;
    case 'Reaction':
      return <panels.Reaction {...(prop as ReactionPanelTypes)} />;
  }
};

export default DropdownPanel;
