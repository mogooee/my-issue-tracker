import { ComponentStory, ComponentMeta } from '@storybook/react';
import Table from '@/components/Molecules/Table';
import TableItem from './TableItem';

export default {
  title: 'Molecules/Table',
  component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Initial = Template.bind({});
Initial.args = {
  header: <span>헤더</span>,
  item: (
    <>
      <TableItem>
        <span>내용</span>
      </TableItem>
      <TableItem>
        <span>제목</span>
        <span>내용</span>
        <div style={{ marginLeft: 'auto' }}>날짜</div>
      </TableItem>
    </>
  ),
};
