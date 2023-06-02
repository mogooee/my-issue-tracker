export interface ErrorMessage {
  errorCode: number;
  message: string;
}

type ErrorMessageType = {
  [key: number]: string;
};

export const ERROR_MESSAGE: ErrorMessageType = {
  1000: '요청에 Authorization 헤더가 존재하지 않습니다.',
  1001: '유효하지 않은 토큰입니다.',
  1002: '유효하지 않은 refresh_token입니다.',
  1003: '권한이 없는 사용자입니다.',
  1004: '요청에 refresh_token 쿠키가 존재하지 않습니다.',
  2000: '필수 제공 동의 항목을 동의하지 않았습니다.',
  2001: 'code가 유효하지 않습니다.',
  2002: '유효하지 않은 AuthProviderType입니다.',
  2100: '중복되는 아이디가 존재합니다.',
  2101: '중복되는 닉네임이 존재합니다.',
  2102: '로그인에 실패했습니다. 아이디와 비밀번호를 다시 확인해주세요.',
  2103: '(으)로 이미 가입된 이메일입니다.',
  3000: '존재하지 않는 이슈입니다.',
  3001: '존재하지 않는 회원입니다.',
  3002: '존재하지 않는 라벨입니다.',
  3003: '존재하지 않는 코멘트입니다.',
  3004: '존재하지 않는 마일스톤입니다.',
  3005: '존재하지 않는 리액션입니다.',
  4001: '이미지 파일만 업로드 가능합니다.',
  4002: '파일 변환 중 에러가 발생하였습니다.',
  4003: '잘못된 형식의 파일 이름입니다.',
  5001: '유효하지 않은 색상 코드입니다.',
  5002: '중복되는 레이블 이름이 존재합니다.',
  5003: '중복되는 리액션이 존재합니다.',
  5004: '중복되는 마일스톤 이름이 존재합니다.',
  6001: '삭제할 수 없는 코멘트입니다.',
  6002: '삭제하려는 마일스톤이 해당 이슈에 존재하지 않습니다.',
};

export const ERROR_CODE = {
  NO_AUTHORIZATION_HEADER: { errorCode: 1000, message: ERROR_MESSAGE[1000] },
  INVALID_TOKEN: { errorCode: 1001, message: ERROR_MESSAGE[1001] },
  INVALID_REFRESH_TOKEN: { errorCode: 1002, message: ERROR_MESSAGE[1002] },
  INVALID_AUTHOR: { errorCode: 1003, message: ERROR_MESSAGE[1003] },
  ESSENTIAL_FIELD_DISAGREE: { errorCode: 2000, message: ERROR_MESSAGE[2000] },
  INVALID_CODE: { errorCode: 2001, message: ERROR_MESSAGE[2001] },
  INVALID_AUTH_PROVIDER_TYPE: { errorCode: 2002, message: ERROR_MESSAGE[2002] },
  DUPLICATED_ID: { errorCode: 2100, message: ERROR_MESSAGE[2100] },
  DUPLICATED_NICKNAME: { errorCode: 2101, message: ERROR_MESSAGE[2101] },
  SIGN_IN_FAIL: { errorCode: 2102, message: ERROR_MESSAGE[2102] },
  DUPLICATED_EMAIL: { errorCode: 2103, message: ERROR_MESSAGE[2103] },
  NOT_EXISTS_ISSUE: { errorCode: 3000, message: ERROR_MESSAGE[3000] },
  NOT_EXISTS_MEMBER: { errorCode: 3001, message: ERROR_MESSAGE[3001] },
  NOT_EXISTS_LABEL: { errorCode: 3002, message: ERROR_MESSAGE[3002] },
  NOT_EXISTS_COMMENT: { errorCode: 3003, message: ERROR_MESSAGE[3003] },
  NOT_EXISTS_MILESTONE: { errorCode: 3004, message: ERROR_MESSAGE[3004] },
  INVALID_CONTENT_TYPE: { errorCode: 4001, message: ERROR_MESSAGE[4001] },
  FILE_CONVERT_FAIL: { errorCode: 4002, message: ERROR_MESSAGE[4002] },
  INVALID_FILE_NAME: { errorCode: 4003, message: ERROR_MESSAGE[4003] },
  INVALID_HEX_COLOR_CODE: { errorCode: 5001, message: ERROR_MESSAGE[5001] },
  DUPLICATED_LABEL_TITLE: { errorCode: 5002, message: ERROR_MESSAGE[5002] },
  DUPLICATED_REACTION: { errorCode: 5003, message: ERROR_MESSAGE[5003] },
  DUPLICATED_MILESTONE_TITLE: { errorCode: 5004, message: ERROR_MESSAGE[5004] },
  NOT_DELETABLE_COMMENT: { errorCode: 6001, message: ERROR_MESSAGE[6001] },
  NOT_MATCHED_MILESTONE: { errorCode: 6002, message: ERROR_MESSAGE[6002] },
};
