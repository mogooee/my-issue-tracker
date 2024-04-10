export enum CustomErrorCode {
  NO_AUTHORIZATION_HEADER = 1000,
  INVALID_TOKEN = 1001,
  INVALID_REFRESH_TOKEN = 1002,
  INVALID_AUTHOR = 1003,
  EMPTY_REFRESH_COOKIE = 1004,
  ESSENTIAL_FIELD_DISAGREE = 2000,
  INVALID_CODE = 2001,
  INVALID_AUTH_PROVIDER_TYPE = 2002,
  DUPLICATED_ID = 2100,
  DUPLICATED_NICKNAME = 2101,
  SIGN_IN_FAIL = 2102,
  DUPLICATED_EMAIL = 2103,
  NOT_EXISTS_ISSUE = 3000,
  NOT_EXISTS_MEMBER = 3001,
  NOT_EXISTS_LABEL = 3002,
  NOT_EXISTS_COMMENT = 3003,
  NOT_EXISTS_MILESTONE = 3004,
  NOT_EXITSTS_REACTION = 3005,
  INVALID_CONTENT_TYPE = 4001,
  FILE_CONVERT_FAIL = 4002,
  INVALID_FILE_NAME = 4003,
  INVALID_HEX_COLOR_CODE = 5001,
  DUPLICATED_LABEL_TITLE = 5002,
  DUPLICATED_REACTION = 5003,
  DUPLICATED_MILESTONE_TITLE = 5004,
  NOT_DELETABLE_COMMENT = 6001,
  NOT_MATCHED_MILESTONE = 6002,
}

type ErrorMessageType = Record<CustomErrorCode, string>;

export interface ErrorMessage {
  errorCode: CustomErrorCode;
  message: string;
}

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

export const makeErrRes = (errorCode: CustomErrorCode): ErrorMessage => ({
  errorCode,
  message: ERROR_MESSAGE[errorCode],
});
