// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw';
import { MilestoneTypes } from '@/api/issue/types';
import { MilestoneListTypes } from '@/api/milestone';

const tokenErrorMessage = { message: '토큰이 유효하지 않습니다.' };

export const milestones: MilestoneListTypes = {
  openedMilestones: [
    {
      id: 1,
      title: '제목만 있는 마일스톤',
      description: null,
      dueDate: null,
      openIssueCount: 4,
      closedIssueCount: 0,
      closed: false,
    },
    {
      id: 2,
      title: '제목과 설명이 있는 마일스톤',
      description: '하지만 완료일은 없다',
      dueDate: null,
      openIssueCount: 1,
      closedIssueCount: 3,
      closed: false,
    },
    {
      id: 3,
      title: '모든걸 다 가진 마일스톤',
      description: 'perfect',
      dueDate: '2022-08-31',
      openIssueCount: 0,
      closedIssueCount: 0,
      closed: false,
    },
  ],
  closedMilestones: [
    {
      id: 4,
      title: '닫혀버린 마일스톤',
      description: 'closed',
      dueDate: '2022-08-31',
      openIssueCount: 0,
      closedIssueCount: 0,
      closed: true,
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
