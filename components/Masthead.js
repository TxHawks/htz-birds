import { useFela, } from 'react-fela'
import * as React from 'react';

import Logo from './IconHaaretzLogo';
import VisuallyHidden from './VisuallyHidden';

export default function Masthead() {
  const { css, theme, } = useFela();

  const headerClasses = css({
    display: 'flex',
    left: '0',
    justifyContent: 'center',
    padding: '1rem 2rem',
    position: 'absolute',
    top: '0',
    width: '100%',
    zIndex: theme.getZIndex('masthead'),
  })

  return (
    <header className={headerClasses}>
      <a href="/">
        <Logo color="neutral" size={4} />
        <VisuallyHidden>
          לדף הבית של הארץ
        </VisuallyHidden>
      </a>
    </header>
  )
}
