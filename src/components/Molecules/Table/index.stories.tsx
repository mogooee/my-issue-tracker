import { ComponentStory, ComponentMeta } from '@storybook/react';
import Table from '@/components/Molecules/Table';
import styled from 'styled-components';

export default {
  title: 'Molecules/Table',
  component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

const StoryTableItem = styled.div`
  padding: 16px 32px;
`;

export const Initial = Template.bind({});
Initial.args = {
  header: <span>헤더</span>,
  item: [
    <StoryTableItem>
      <span>내용</span>
    </StoryTableItem>,
    <StoryTableItem>
      <span>제목</span>
      <span>내용</span>
      <div style={{ marginLeft: 'auto' }}>날짜</div>
    </StoryTableItem>,
  ],
};
