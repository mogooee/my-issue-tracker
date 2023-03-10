import * as panels from '@/components/Molecules/Dropdown/Panel/panels';
import {
  BubblePanelTypes,
  DropdownPanelTypes,
  ErrorPanelTypes,
  ListPanelTypes,
  ReactionPanelTypes,
} from '@/components/Molecules/Dropdown/types';

const DropdownPanel = ({ type, prop }: DropdownPanelTypes): JSX.Element => {
  switch (type) {
    case 'Bubble':
      return <panels.Bubble {...(prop as BubblePanelTypes)} />;
    case 'List':
      return <panels.List {...(prop as ListPanelTypes)} />;
    case 'Reaction':
      return <panels.Reaction {...(prop as ReactionPanelTypes)} />;
    case 'Error':
      return <panels.Error {...(prop as ErrorPanelTypes)} />;
  }
};

export default DropdownPanel;
