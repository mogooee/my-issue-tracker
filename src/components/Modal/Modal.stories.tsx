import { ComponentStory, ComponentMeta } from '@storybook/react';
import Modal from '@/components/Modal';
import CancelNewIssueModal from '@/components/Modal/CancelNewIssue';
import CompleteSignUpModal from '@/components/Modal/CompleteSignUp';
import DeleteCheckModal from '@/components/Modal/DeleteCheck';
import ServiceLoadingModal from '@/components/Modal/ServiceLoading';
import UniversalLinkModal from '@/components/Modal/UniversalLink';

export default {
  title: 'Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const CancelNewIssueTemplate: ComponentStory<typeof Modal> = () => (
  <Modal>
    <CancelNewIssueModal />
  </Modal>
);

export const CancelNewIssue = CancelNewIssueTemplate.bind({});

const CompleteSignUpTemplate: ComponentStory<typeof Modal> = () => (
  <Modal>
    <CompleteSignUpModal id="newUser" />
  </Modal>
);

export const CompleteSignUp = CompleteSignUpTemplate.bind({});

const DeleteCheckTemplate: ComponentStory<typeof Modal> = () => (
  <Modal>
    <DeleteCheckModal handleDeleteButtonClick={() => {}} />
  </Modal>
);

export const DeleteCheck = DeleteCheckTemplate.bind({});

const ServiceLoadingTemplete: ComponentStory<typeof Modal> = () => (
  <Modal>
    <ServiceLoadingModal />
  </Modal>
);

export const ServiceLoading = ServiceLoadingTemplete.bind({});

const UniversalLinkTemplete: ComponentStory<typeof Modal> = () => (
  <Modal>
    <UniversalLinkModal />
  </Modal>
);

export const UniversalLink = UniversalLinkTemplete.bind({});
