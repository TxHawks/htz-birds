// @flow

// consts
import baseColors from './consts/baseColors';
import bps from './consts/bps';
import cssReset from './consts/cssReset';
import fontStacks from './consts/fontStacks';

// methods
import getColor from './methods/getColor';
import mq from './methods/mq';
import pxToRem from './methods/pxToRem';
import typesetter from './methods/typesetter';

import theme from './theme';

export default theme;
export {
  theme,
  cssReset,
  baseColors,
  bps,
  fontStacks,
  getColor,
  mq,
  pxToRem,
  typesetter,
};
