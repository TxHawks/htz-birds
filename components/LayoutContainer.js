import React from 'react';
import { useFela, } from 'react-fela';
import PropTypes from 'prop-types';
import { parseComponentProp, parseStyleProps, } from '@haaretz/htz-css-tools';
import setColor from '../../utils/setColor';
import { attrsPropType, } from '../../propTypes/attrsPropType';
import { stylesPropType, } from '../../propTypes/stylesPropType';

LayoutContainer.propTypes = {
  /**
   * An object of attrbutes to set on the DOM element.
   * Passed to the underlying react element
   */
  attrs: attrsPropType,
  /**
   * backgroundColor that will trump the default backgroundColor defined in the theme
   */
  bgc: PropTypes.string,
  /** The Children to be rendered inside a `<LayoutContainer>` */
  children: PropTypes.node,
  /** The HTML tag a `<LayoutContainer />` will be rendered as */
  tagName: PropTypes.string,
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
};

LayoutContainer.defaultProps = {
  attrs: null,
  bgc: null,
  children: null,
  tagName: 'div',
  miscStyles: null,
};

export const styles = ({ bgc, namedBgc, miscStyles, theme, }) => ({
  marginRight: 'auto',
  marginLeft: 'auto',
  width: '100%',
  extend: [
    bgc || !namedBgc
      ? { backgroundColor: bgc || theme.color('layout', 'containerBg'), }
      : parseComponentProp(
        'backgroundColor',
        namedBgc,
        theme.mq,
        setColor,
        theme.color
      ),
    parseComponentProp(
      'maxWidth',
      [
        { from: 's', until: 'm', value: 100, },
        { from: 'm', until: 'l', value: 768 / 6, },
        { from: 'l', until: 'xl', value: 1024 / 6, },
        { from: 'xl', value: (1280 - 17) / 7, },
      ],
      theme.mq
    ),
    ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
  ],
});

export default function LayoutContainer({
  attrs,
  bgc,
  namedBgc,
  children,
  miscStyles,
  tagName,
}) {
  const className = useFela({ bgc, namedBgc, miscStyles, }).css(styles);
  const Tag = tagName;
  return (
    <Tag {...attrs} className={className}>
      {children}
    </Tag>
  );
}
