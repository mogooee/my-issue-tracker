export const COLORS = {
  TITLE_ACTIVE: '#14142B',
  BODY: '#4E4B66',
  LABEL: '#6E7191',
  PLACEHOLDER: '#A0A3BD',
  LINE: '#D9DBE9',
  TAB_LINE: '#BDBDBD',
  INPUT_BACKGROUND: '#EFF0F6',
  BACKGROUND: '#F7F7FC',
  OFF_WHITE: '#FEFEFE',

  PRIMARY: {
    BLUE: '#007AFF',
    LIGHT_BLUE: '#C7EBFF',
    DARK_BLUE: '#004DE3',
  },
  SECONDORY: {
    PURPLE: '#0025E7',
    LIGHT_PURPLE: '#CCD4FF',
    DARK_PURPLE: '#020070',
  },
  ERROR: {
    RED: '#FF3B30 ',
    LIGHT_RED: '#FFD1CF',
    DARK_RED: '#C60B00',
  },
  SUCCESS: {
    GREEN: '#34C759',
    LIGHT_GREEN: '#DDFFE6',
    DARK_GREEN: '#00A028',
  },
};

export const FONTSTYLES = {
  DISPLAY_REGULER: {
    fontWeight: 400,
    fontSize: '3.2rem',
    lineHeight: '4.8rem',
  },
  DISPLAY_BOLD: {
    fontWeight: 700,
    fontSize: '3.2rem',
    lineHeight: '4.8rem',
  },
  TEXT_LARGE: {
    fontWeight: 400,
    fontSize: '2.4rem',
    lineHeight: '4rem',
  },
  TEXT_MEDIUM: {
    fontWeight: 400,
    fontSize: '1.8rem',
    lineHeight: '3.2rem',
  },
  TEXT_SMALL: {
    fontWeight: 400,
    fontSize: '1.6rem',
    lineHeight: '2.8rem',
  },
  TEXT_XSMALL: {
    fontWeight: 500,
    fontSize: '1.2rem',
    lineHeight: '2rem',
  },
  LINK_LARGE: {
    fontWeight: 700,
    fontSize: '2.4rem',
    lineHeight: '4rem',
  },
  LINK_MEDIUM: {
    fontWeight: 700,
    fontSize: '1.8rem',
    lineHeight: '3.2rem',
  },
  LINK_SMALL: {
    fontWeight: 700,
    fontSize: '1.6rem',
    lineHeight: '2.8rem',
  },
  LINK_XSMALL: {
    fontWeight: 700,
    fontSize: '1.2rem',
    lineHeight: '2rem',
  },
};

const BUTTON_SIZE = {
  LARGE: { width: '340px', height: '64px' },
  MEDIUM: { width: '240px', height: '56px' },
  SMALL: { width: '120px', height: '40px' },
};

const TEXT_INPUT_SIZE = {
  LARGE: { width: '340px', height: '64px' },
  MEDIUM: { width: '320px', height: '56px' },
  SMALL: { width: '300px', height: '40px' },
};

const TEXTAREA_SIZE = {
  MEDIUM: { width: '340px', height: '220px' },
  LARGE: { width: '880px', height: '343px' },
};

const MIXIN = {
  FLEX: ({ direction = 'row', align = 'center', justify = 'center' }) => `
    display: flex;
    flex-direction: ${direction};
    justify-content: ${justify};
    align-items: ${align};
  `,
  GRID: ({ align = 'center', justify = 'center' }) => `
  display:grid;
  align-items: ${align};
  justify-content: ${justify};
  `,
};

const DEVICE_SIZE = {
  MOBILE: 320,
  LARGE_MOBILE: 380,
  TABLET: 768,
  DESKTOP: 1024,
};

const DEVICE = {
  MOBILE: `screen and (max-width: ${DEVICE_SIZE.TABLET - 1}px)`,
  TABLET: `screen and (min-width: ${DEVICE_SIZE.TABLET}px) and (max-width: ${DEVICE_SIZE.DESKTOP - 1}px)`,
  MOBILE_OR_TABLET: `screen and (max-width: ${DEVICE_SIZE.DESKTOP - 1}px)`,
  DESKTOP: `screen and (min-width: ${DEVICE_SIZE.DESKTOP}px)`,
};

const THEME = {
  COLORS,
  FONTSTYLES,
  BUTTON_SIZE,
  TEXT_INPUT_SIZE,
  TEXTAREA_SIZE,
  MIXIN,
  DEVICE,
  DEVICE_SIZE,
};

export default THEME;
