// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import { ContentTypes, MilestoneTypes } from '@/api/issue/types';
import { issueTable } from '@/mocks/tables/issue';
import { MILESTONE_TABLE } from '@/mocks/tables/milestone';
import { ERROR_CODE } from '@/api/constants';

export const findMilestoneHelper = (id: number) =>
  Object.values(MILESTONE_TABLE)
    .flat()
    .find((milestone) => milestone.id === id) as MilestoneTypes | undefined;

export const milestoneHandlers = [
  rest.get('api/milestones', (req, res, ctx) => res(ctx.status(200), ctx.json(MILESTONE_TABLE))),

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

    MILESTONE_TABLE.openedMilestones.push(newMilestone);

    return res(ctx.status(200), ctx.json(newMilestone));
  }),

  rest.patch('api/milestones/:id', async (req, res, ctx) => {
    const { id } = req.params;
    const requestMilestoneData = await req.json();

    const findMilestone = findMilestoneHelper(Number(id));

    if (!findMilestone) {
      return res(ctx.status(400), ctx.json(ERROR_CODE.NOT_EXISTS_MILESTONE));
    }

    const patchMilestones = Object.values(MILESTONE_TABLE).map((state: MilestoneTypes[]) => {
      if (state.find((el) => el.id === Number(id))) {
        const updateMilestones = state.map((el) => (el.id === Number(id) ? { ...el, ...requestMilestoneData } : el));
        return updateMilestones;
      }
      return state;
    });

    const [newOpenedMilestones, newClosedMilestones] = patchMilestones;
    MILESTONE_TABLE.openedMilestones = newOpenedMilestones;
    MILESTONE_TABLE.closedMilestones = newClosedMilestones;

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
      MILESTONE_TABLE.openedMilestones.push({ ...findMilestone, closed: false });
      MILESTONE_TABLE.closedMilestones = MILESTONE_TABLE.closedMilestones.filter((el) => el.id !== Number(id));
    } else {
      MILESTONE_TABLE.closedMilestones.push({ ...findMilestone, closed: true });
      MILESTONE_TABLE.openedMilestones = MILESTONE_TABLE.openedMilestones.filter((el) => el.id !== Number(id));
    }

    return res(ctx.status(200), ctx.json(MILESTONE_TABLE));
  }),

  rest.delete('api/milestones/:id', async (req, res, ctx) => {
    const { id } = req.params;

    const findMilestone = findMilestoneHelper(Number(id));

    if (!findMilestone) {
      return res(ctx.status(400), ctx.json(ERROR_CODE.NOT_EXISTS_MILESTONE));
    }

    const deleteMilestones = Object.values(MILESTONE_TABLE).map((state: MilestoneTypes[]) => {
      if (state.find((el) => el.id === Number(id))) {
        return state.filter((el) => el.id !== Number(id));
      }
      return state;
    });

    const [newOpenedMilestones, newClosedMilestones] = deleteMilestones;
    MILESTONE_TABLE.openedMilestones = newOpenedMilestones;
    MILESTONE_TABLE.closedMilestones = newClosedMilestones;

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
