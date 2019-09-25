import { useFela, } from 'react-fela';
import { parseComponentProp, parseStyleProps, } from '@haaretz/htz-css-tools';
import PropTypes from 'prop-types';
import React from 'react';

import { attrsPropType, } from '../../propTypes/attrsPropType';
import { stylesPropType, } from '../../propTypes/stylesPropType';
import setColor from '../../utils/setColor';

LayoutRow.propTypes = {
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
  /** The HTML tag a `<LayoutRow />` will be rendered as */
  tagName: PropTypes.string,
  id: PropTypes.string,
  /**
   * A special property holding miscellaneous CSS values that
   * trump all default values. Processed by
   * [`parseStyleProps`](https://Haaretz.github.io/htz-frontend/htz-css-tools#parsestyleprops)
   */
  miscStyles: stylesPropType,
  elementRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.object, }),
  ]),
};

LayoutRow.defaultProps = {
  attrs: null,
  bgc: null,
  children: null,
  tagName: 'div',
  id: null,
  miscStyles: null,
  elementRef: null,
};

export default function LayoutRow({
  attrs,
  children,
  tagName,
  id,
  miscStyles,
  bgc,
  namedBgc,
  elementRef,
}) {
  const className = useFela({ bgc, namedBgc, miscStyles, }).css(style);
  const Tag = tagName;
  return (
    <Tag className={className} id={id} ref={elementRef} {...attrs}>
      {children}
    </Tag>
  );
}

function style({ bgc, namedBgc, miscStyles, theme, }) {
  return {
    width: '100%',

    extend: [
      bgc || !namedBgc
        ? { backgroundColor: bgc || theme.color('layout', 'rowBg'), }
        : parseComponentProp(
          'backgroundColor',
          namedBgc,
          theme.mq,
          setColor,
          theme.color
        ),
      ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
    ],
  };
}
