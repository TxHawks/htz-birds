// consts
import articleStyle from './consts/articleStyle';
import bps from './consts/bps';
import btnStyle from './consts/btnStyle';
import captionStyles from './consts/captionStyles';
import fontStacks from './consts/fontStacks';
import inputStyle from './consts/inputStyle';
import layoutStyle from './consts/layoutStyle';
import cardStyle from './consts/cardStyle';
import selectStyle from './consts/selectStyle';
import typeConf from './consts/typeConf';

// methods
import getColor from './methods/getColor';
import getDelay from './methods/getDelay';
import getDuration from './methods/getDuration';
import getTimingFunction from './methods/getTimingFunction';
import getTransition from './methods/getTransition';
import getTransitionString from './methods/getTransitionString';
import getMqString from './methods/getMqString';
import getZIndex from './methods/getZIndex';
import pxToRem from './methods/pxToRem';
import typesetter from './methods/typesetter';
import mq from './methods/mq';

/**
 * Haaretz theme object
 */
const htzTheme = Object.freeze({
  // Constants
  articleStyle,
  bps,
  btnStyle,
  captionStyles,
  direction: 'rtl',
  fontStacks,
  inputStyle,
  layoutStyle,
  cardStyle,
  selectStyle,
  typeConf,

  // Methods
  color: getColor,
  getDelay,
  getDuration,
  getTimingFunction,
  getTransition,
  getTransitionString,
  getMqString,
  getZIndex,
  mq,
  pxToRem,
  type: typesetter,
});

export default htzTheme;
