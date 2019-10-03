import React from 'react';
import { useFela, } from 'react-fela';
import { parseComponentProp, parseStyleProps, parseTypographyProp, } from '@haaretz/htz-css-tools';
import setColor from '../utils/setColor';

function captionWrapperStyle({
  theme,
  backgroundColor,
  color,
  typeStyles,
  miscStyles,
}) {
  const { bgc, captionColor, captionTypeSettings, fontFamily, fontWeight, } = theme.captionStyles || {};
  const typeSettings = typeStyles || captionTypeSettings;

  return {
    wordBreak: 'break-word',
    overflowX: 'hidden',
    fontFamily,
    fontWeight,
    extend: [
      theme.mq({ until: 's', }, { padding: '0 2rem', }),
      // Set background color
      ...(backgroundColor || bgc
        ? [
          parseComponentProp(
            'backgroundColor',
            backgroundColor || bgc,
            theme.mq,
            setColor,
            theme.color
          ),
        ]
        : []),

      // Set color
      ...(captionColor || color
        ? [ parseComponentProp('color', color || captionColor, theme.mq, setColor, theme.color), ]
        : []),
      // set typographic styles (line height and font-size)
      ...(typeSettings ? [ parseTypographyProp(typeSettings, theme.type), ] : []),
      ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []),
    ],
  };
}

function CaptionWrapper({
  backgroundColor,
  color,
  typeStyles,
  miscStyles,
  children,
}) {
  const { css, theme } = useFela({
    backgroundColor,
    color,
    typeStyles,
    miscStyles,
  });
  const className = css(captionWrapperStyle);

  return (
    <figcaption className={className}>
      {children}
    </figcaption>
  );
}

function creditStyle({ theme, prefix, floatCredit, typeStyles, }) {
  const { fontWeight, creditTypeSettings, } = theme.captionStyles.creditStyles || {};
  const typeSettings = typeStyles || creditTypeSettings;
  return {
    display: 'inline',
    flexShrink: '0',
    fontWeight,
    extend: [
      ...(floatCredit ? [ { float: 'inline-end', }, ] : []),
      // set typographic styles (line height and font-size)
      ...(typeSettings ? [ parseTypographyProp(typeSettings, theme.type), ] : []),
    ],
  };
}

// eslint-disable-next-line react/prop-types
function Credit({ floatCredit, children, typeStyles, }) {
  const { css } = useFela({ floatCredit, typeStyles });
  const className = css(creditStyle);

  return (
    <span className={className}>
      {children}
    </span>
  );
}

export default function Caption({
    backgroundColor,
    color,
    typeStyles,
    miscStyles,
    caption,
    credit,
    floatCredit = true,
    creditTypeStyles,
    creditprefix = 'צילום',
    captionMiscStyles,
  }) {
  const { css, theme, } = useFela();
  const captionClasses = css({
    marginEnd: '1rem',
    extend: [
      // Trump all other styles with those defined in `miscStyles`
      ...(captionMiscStyles ? parseStyleProps(captionMiscStyles, theme.mq, theme.type) : []),
    ],
  });

  if (!caption && !credit) return null;

  return (
    <CaptionWrapper
      backgroundColor={backgroundColor}
      color={color}
      typeStyles={typeStyles}
      miscStyles={miscStyles}
    >
      {caption
        ? (
          <span className={captionClasses}>
            {caption}
          </span>
        )
        : ''
      }
      {credit
        ? (
          <Credit floatCredit={floatCredit} typeStyles={creditTypeStyles}>
            {`${creditprefix}: ${credit}`}
          </Credit>
        )
        : ''
      }
    </CaptionWrapper>
  );
};
