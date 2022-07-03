// 一套默认主题以及一套暗黑主题
// 一套默认主题以及一套暗黑主题
export const themes = {
  default: {
    primaryBackGroundColor: `${255},${255},${255}`,
    primaryTextColor: `${0},${0},${0}`,
    primaryActiveColor: `${255},${92},${79}`,
    primaryActiveTextColor: `${255},${255},${255}`,
    primaryTipColor: `${158},${158},${158}`,
    primaryTagTextColor: `${255},${255},${255}`,
    primarySubColor: `${87},${87},${87}`,
    primaryTagBackGroundColor: `${62},${84},${124}`,
    primaryHightlightColor: `${63},${87},${183}`,
    primaryLinkColor: `${75},${23},${60}`,
    primaryHoverColor: `${39},${72},${108}`
  },
  dark: {
    primaryBackGroundColor: `${25},${25},${25}`,
    primaryTextColor: `${233},${233},${233}`,
    primaryActiveColor: `${250},${102},${43}`,
    primaryActiveTextColor: `${233},${233},${233}`,
    primaryTipColor: `${233},${233},${233}`,
    primaryTagTextColor: `${0},${0},${0}`,
    primarySubColor: `${233},${233},${233}`,
    primaryTagBackGroundColor: `${238},${237},${255}`,
    primaryHightlightColor: `${187},${255},${255}`,
    primaryLinkColor: `${75},${23},${60}`,
    primaryHoverColor: `${39},${72},${108}`
  }
};

export const defaultConfig: GlobalConfig = {
  marginGeneral: 1,
  veryBigText: 2,
  bigText: 1.5,
  smallText: 1,
  midText: 1.3,
  verySamllText: 0.8,
  paddingGeneral: 1,
  borderRadius: 1,
  borderLine: 0.28,
  bgColor: 'rgb(255, 255, 255)',
  textColor: 'rgb(0, 0, 0)',
  globlBgColor: 'rgb(236, 236, 236)',
  tipTextColor: 'rgb(160, 160, 160)',
  bgTextColor: 'rgb(255, 255, 255)',
  hoverColor: 'rgb(250, 14, 73)',
  hoverTextColor: 'rgb(255, 255, 255)',
  linkColor: 'rgb(14, 136, 250)',
  activeColor: 'rgb(250, 14, 73)',
  shadowColor: 'rgba(0, 0, 0, 0.3)',
  themeColor: 'rgb(250, 14, 73)',
  warnningTextColor: 'rgb(247, 44, 8)',
  errorTextColor: 'rgb(255, 0, 0)',
  // 都是背景图片的配置项
  backGroundImg: '',
  backGroundImgBlur: 0,
  backGroundImgLight: 100,
  backGroundImgRepeat: 'repeat',
  backGroundImgSize: 'cover',
  backgroundImgAttachment: 'scroll'
};

export const darkConfig: GlobalConfig = {
  marginGeneral: 1,
  veryBigText: 2,
  bigText: 1.5,
  smallText: 1,
  midText: 1.3,
  verySamllText: 0.8,
  paddingGeneral: 1,
  borderRadius: 1,
  borderLine: 0.28,
  bgColor: 'rgb(28, 28, 28)',
  textColor: 'rgb(255, 255, 255)',
  globlBgColor: 'rgb(0, 0, 0)',
  tipTextColor: 'rgb(160, 160, 160)',
  bgTextColor: 'rgb(255, 255, 255)',
  hoverColor: 'rgb(3, 108, 183)',
  hoverTextColor: 'rgb(255, 255, 255)',
  linkColor: 'rgb(14, 136, 250)',
  activeColor: 'rgb(250, 14, 73)',
  shadowColor: 'rgba(255, 255, 255, 0.5)',
  themeColor: 'rgb(250, 14, 73)',
  warnningTextColor: 'rgb(247, 44, 8)',
  errorTextColor: 'rgb(255, 0, 0)',
  // 都是背景图片的配置项
  backGroundImg: '',
  backGroundImgBlur: 0,
  backGroundImgLight: 100,
  backGroundImgRepeat: 'repeat',
  backGroundImgSize: 'cover',
  backgroundImgAttachment: 'scroll'
};
