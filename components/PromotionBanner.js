import { rgba, } from '@haaretz/htz-css-tools';
import { useFela, } from 'react-fela';
import * as React from 'react';

import Astronaut from './Astronaut';

export default function PromotionBanner() {
  const { css, theme, } = useFela();
  const fgColor = [ 'red', '+1', ];

  const outerWrapperClasses = css({
    marginTop: '-1rem !important',
    position: 'relative',
    boxShadow: `0 0 6rem 4rem ${theme.color('cream')}`,
    backgroundImage: `radial-gradient(${rgba(theme.color('cream'), 0)}, ${theme.color('cream')})`,
    paddingTop: '8rem',
  });
  const innerWrapperClasses = css({
    borderTop: `2px solid ${theme.color(...fgColor)}`,
    position: 'relative',
    paddingTop: 'calc(5rem - 2px)',
    textAlign: 'center',
  });

  const astroClasses = css({
    // backgroundColor: `${theme.color('cream')}`,
    // boxShadow: `0 0 2rem 0.5rem ${theme.color('cream')}`,
    left: '50%',
    // padding: '0.5rem',
    position: 'absolute',
    top: '-11rem',
    transform: 'translate(-50%, 0)',
    height: '15rem',
    overflow: 'hidden',
  });

  const headerClasses = css({
    marginTop: '2rem',
    fontWeight: '700',
    color: theme.color(...fgColor),
    // color: theme.color('green', '+2'),
    extend: [
      theme.type(4, { lines: 7, }),
    ],
  });
  const ctaClasses = css({
    display: 'inline-block',
    marginTop: '3rem',
    backgroundColor: theme.color('sales', '+2'),
    borderBottomStyle: 'none !important',
    padding: '0.5rem 2rem',
    fontWeight: '700',

    '&:hover': {
      backgroundColor: theme.color('sales', 'base'),
    color: `${theme.color('bodyText')} !important`,
    },
    '&:focus': {
      backgroundColor: theme.color('sales', 'base'),
      color: `${theme.color('bodyText')} !important`,
    },

    extend: [
      theme.type(2),
    ],
  });

  const loginClasses = css({
    marginTop: '2rem',
    display: 'none',

    '&.isLoggedIn': {
      display: 'inline-block',
    },

    extend: [
      theme.type(-1),
    ],
  });



  return (
    <aside className={outerWrapperClasses}>
      <div className={innerWrapperClasses}>
        <div className={astroClasses}>
          <Astronaut size={33} />
        </div>
        <h2>
          כתבה זו זמינה למנויים בלבד
        </h2>
        <p className={headerClasses}>לא תעופו מקריאת הכתבה הזו, אבל ציוצים של ציפורים בהחלט תוכלו לשמוע</p>

        <a
          id="purchaseBtn"
          href="https://promotions.haaretz.co.il/promotions-page/?htm_source=article&htm_medium=banner&htm_campaign=birds&htm_content=subscription"
          className={ctaClasses}
        >
          לרכישה
        </a>
        <br />
        <a
          id="loginLink"
          href="https://login.haaretz.co.il"
          className={loginClasses}
        >
          כבר מנויים? התחברו
        </a>
      </div>
    </aside>
  );
}
