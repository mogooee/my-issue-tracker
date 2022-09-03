import { EditInputTypes } from './EditInput';

export const EDIT_FORM_INFO: EditInputTypes[] = [
  {
    formKey: 'title',
    label: '제목',
    maxLength: 12,
    placeholder: '마일스톤 이름',
  },
  {
    formKey: 'dueDate',
    label: '완료일',
    maxLength: 10,
    placeholder: '완료일(선택) ex.YYYY-MM-DD',
  },
  {
    formKey: 'description',
    label: '설명',
    maxLength: 30,
    placeholder: '설명(선택)',
  },
];
