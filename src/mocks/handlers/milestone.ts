// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import { ContentTypes, MilestoneTypes } from '@/api/issue/types';
import { issueTable } from '@/mocks/tables/issue';
import { MilestoneListTypes } from '@/api/milestone';
import { ERROR_CODE } from '@/api/constants';

export const milestones: MilestoneListTypes = {
  openedMilestones: [
    {
      id: 0,
      title: '마일스톤 1',
      description: null,
      dueDate: null,
      closed: false,
      openIssueCount: 3,
      closedIssueCount: 7,
    },
    {
      id: 2,
      title: '마일스톤 3',
      description: '열린 마일스톤에 대한 설명',
      dueDate: '2022-08-28',
      closed: false,
      openIssueCount: 5,
      closedIssueCount: 5,
    },
  ],
  closedMilestones: [
    {
      id: 1,
      title: '마일스톤 2',
      description: '닫힌 마일스톤에 대한 설명',
      dueDate: null,
      closed: true,
      openIssueCount: 16,
      closedIssueCount: 13,
    },
  ],
};

const findMilestoneHelper = (id: number) =>
  Object.values(milestones)
    .flat()
    .find((milestone) => milestone.id === id) as MilestoneTypes | undefined;

export const milestoneHandlers = [
  rest.get('api/milestones', (req, res, ctx) => res(ctx.status(200), ctx.json(milestones))),

  rest.post('api/milestones', async (req, res, ctx) => {
    const requestData = await req.json();
    const { title, description, dueDate } = requestData;

    if (!title) {
      return res(ctx.status(400), ctx.json('필수 입력값을 입력해주세요'));
    }

    const newMilestone = {
      id: title.charCodeAt(title.length - 1) + Math.floor(Math.random() * 10000),
      title,
      description,
      dueDate,
      closed: false,
      openIssueCount: 0,
      closedIssueCount: 0,
    };

    milestones.openedMilestones.push(newMilestone);

    return res(ctx.status(200), ctx.json(newMilestone));
  }),

  rest.patch('api/milestones/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const requestMilestoneData = await req.json();

    const findMilestone = findMilestoneHelper(Number(id));

    if (!findMilestone) {
      return res(ctx.status(400), ctx.json(ERROR_CODE.NOT_EXISTS_MILESTONE));
    }

    const patchMilestones = Object.values(milestones).map((state: MilestoneTypes[]) => {
      if (state.find((el) => el.id === Number(id))) {
        const updateMilestones = state.map((el) => (el.id === Number(id) ? { ...el, ...requestMilestoneData } : el));
        return updateMilestones;
      }
      return state;
    });

    const [newOpenedMilestones, newClosedMilestones] = patchMilestones;
    milestones.openedMilestones = newOpenedMilestones;
    milestones.closedMilestones = newClosedMilestones;

    const updatedIssues = (state: 'openIssues' | 'closedIssues'): ContentTypes[] =>
      issueTable[state].map((issue) => ({
        ...issue,
        milestone: issue.milestone?.id === Number(id) ? requestMilestoneData : issue.milestone,
      }));

    issueTable.openIssues = updatedIssues('openIssues');
    issueTable.closedIssues = updatedIssues('closedIssues');

    return res(ctx.status(200), ctx.json(patchMilestones));
  }),

  rest.patch('api/milestones/:id/status', async (req, res, ctx) => {
    const { id } = req.params;

    const findMilestone = findMilestoneHelper(Number(id));

    if (!findMilestone) {
      return res(ctx.status(400), ctx.json(ERROR_CODE.NOT_EXISTS_MILESTONE));
    }

    if (findMilestone.closed) {
      milestones.openedMilestones.push({ ...findMilestone, closed: false });
      milestones.closedMilestones = milestones.closedMilestones.filter((el) => el.id !== Number(id));
    } else {
      milestones.closedMilestones.push({ ...findMilestone, closed: true });
      milestones.openedMilestones = milestones.openedMilestones.filter((el) => el.id !== Number(id));
    }

    return res(ctx.status(200), ctx.json(milestones));
  }),

  rest.delete('api/milestones/:id', async (req, res, ctx) => {
    const { id } = req.params;

    const findMilestone = findMilestoneHelper(Number(id));

    if (!findMilestone) {
      return res(ctx.status(400), ctx.json(ERROR_CODE.NOT_EXISTS_MILESTONE));
    }

    const deleteMilestones = Object.values(milestones).map((state: MilestoneTypes[]) => {
      if (state.find((el) => el.id === Number(id))) {
        return state.filter((el) => el.id !== Number(id));
      }
      return state;
    });

    const [newOpenedMilestones, newClosedMilestones] = deleteMilestones;
    milestones.openedMilestones = newOpenedMilestones;
    milestones.closedMilestones = newClosedMilestones;

    const updatedIssues = (state: 'openIssues' | 'closedIssues'): ContentTypes[] =>
      issueTable[state].map((issue) => ({
        ...issue,
        milestone: issue.milestone?.id === Number(id) ? null : issue.milestone,
      }));

    issueTable.openIssues = updatedIssues('openIssues');
    issueTable.closedIssues = updatedIssues('closedIssues');

    return res(ctx.status(200), ctx.json({ message: '성공적으로 삭제되었습니다.' }));
  }),
];
