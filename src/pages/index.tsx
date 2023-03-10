import { lazy } from 'react';
import Home from '@/pages/Home';

import RedirectAuth from '@/pages/Public/RedirectAuth/RedirectAuth';
import Login from '@/pages/Public/Login';

const NotFound = lazy(() => import('@/pages/NotFound'));

// public
const OAuthSignUp = lazy(() => import('@/pages/Public/SignUp-OAuth'));
const CommonSignUp = lazy(() => import('@/pages/Public/SignUp-Common'));

// private
const Issues = lazy(() => import('@/pages/Private/Issues'));
const NewIssue = lazy(() => import('@/pages/Private/NewIssue'));
const IssueDetail = lazy(() => import('@/pages/Private/IssueDetail'));
const Labels = lazy(() => import('@/pages/Private/Labels'));
const Milestones = lazy(() => import('@/pages/Private/Milestones'));

export {
  Home,
  NotFound,
  RedirectAuth,
  Login,
  OAuthSignUp,
  CommonSignUp,
  Issues,
  NewIssue,
  IssueDetail,
  Labels,
  Milestones,
};
