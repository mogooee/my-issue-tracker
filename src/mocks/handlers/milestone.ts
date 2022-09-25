// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import { MilestoneTypes } from '@/api/issue/types';
import { MilestoneListTypes } from '@/api/milestone';

const tokenErrorMessage = { message: '토큰이 유효하지 않습니다.' };

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

export const milestoneHandlers = [
  rest.get('api/milestones', (req, res, ctx) =>
    // if (!req.cookies['refresh-token']) {
    //   return res(ctx.status(400), ctx.json(false));
    // }

    res(ctx.status(200), ctx.json(milestones)),
  ),

  rest.post('api/milestones', async (req, res, ctx) => {
    const requestData = await req.json();
    const { title, description, dueDate } = requestData;

    if (!title) {
      return res(ctx.status(400), ctx.json('필수 입력값을 입력해주세요'));
    }

    // if (!req.cookies['refresh-token']) {
    //   return res(ctx.status(400), ctx.json(tokenErrorMessage.message));
    // }

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
    const patchMilestone = await req.json();

    const patchMilestones = Object.values(milestones).map((state: MilestoneTypes[]) => {
      if (state.find((el) => el.id === Number(id))) {
        const updateMilestones = state.map((el) => (el.id === Number(id) ? { ...el, ...patchMilestone } : el));
        return updateMilestones;
      }
      return state;
    });

    const [newOpenedMilestones, newClosedMilestones] = patchMilestones;
    milestones.openedMilestones = newOpenedMilestones;
    milestones.closedMilestones = newClosedMilestones;

    // if (!req.cookies['refresh-token']) {
    //   return res(ctx.status(400), ctx.json(tokenErrorMessage.message));
    // }

    return res(ctx.status(200), ctx.json(patchMilestones));
  }),

  rest.patch('api/milestones/:id/status', async (req, res, ctx) => {
    const { id } = req.params;

    const find = () => {
      const result: MilestoneTypes[] = [];
      Object.values(milestones).forEach((state: MilestoneTypes[]) => {
        const findMilestone = state.find((el) => el.id === Number(id));
        if (findMilestone) {
          result.push(findMilestone);
        }
      });

      return result[0];
    };

    const milestone = find();

    if (milestone.closed) {
      milestones.openedMilestones.push({ ...milestone, closed: false });
      milestones.closedMilestones = milestones.closedMilestones.filter((el) => el.id !== Number(id));
    } else {
      milestones.closedMilestones.push({ ...milestone, closed: true });
      milestones.openedMilestones = milestones.openedMilestones.filter((el) => el.id !== Number(id));
    }

    // if (!req.cookies['refresh-token']) {
    //   return res(ctx.status(400), ctx.json(tokenErrorMessage.message));
    // }

    return res(ctx.status(200), ctx.json(milestones));
  }),

  rest.delete('api/milestones/:id', async (req, res, ctx) => {
    const { id } = req.params;

    const deleteMilestones = Object.values(milestones).map((state: MilestoneTypes[]) => {
      if (state.find((el) => el.id === Number(id))) {
        return state.filter((el) => el.id !== Number(id));
      }
      return state;
    });

    const [newOpenedMilestones, newClosedMilestones] = deleteMilestones;
    milestones.openedMilestones = newOpenedMilestones;
    milestones.closedMilestones = newClosedMilestones;

    // if (!req.cookies['refresh-token']) {
    //   console.log(!req.cookies['refresh-token']);
    //   return res(ctx.status(400), ctx.json(tokenErrorMessage.message));
    // }

    return res(ctx.status(200), ctx.json({ message: '성공적으로 삭제되었습니다.' }));
  }),
];
