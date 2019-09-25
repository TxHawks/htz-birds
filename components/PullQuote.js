import * as React from 'react';
import { useFela, } from 'react-fela';

export default function PullQuote({ children, }) {
  const { css, theme, } = useFela()
  const className = css({
    // color: theme.color('green', 'base'),
    color: theme.color('red', 'base'),
    // fontWeight: '800',
    fontWeight: '300',
    letterSpacing: '0.02em',
    marginBottom: '6rem',
    textAlign: 'center',

    extend: [
      theme.type(5, { lines: 7, untilBp: 's', }),
      theme.type(5, { lines: 8, fromBp: 's', }),
      theme.mq({ until: 'l', }, { margin: '1rem auto 6rem', }),
      theme.mq({ from: 'l', until: 'xl', }, { margin: '-5rem -15rem 6rem', }),
      theme.mq({ from: 'xl', }, { margin: '-5rem -25rem 6rem', }),
    ],
  });

  return (
    <blockquote className={className}>
      {children}
    </blockquote>
  );
}
