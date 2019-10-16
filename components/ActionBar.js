import { useFela, } from 'react-fela';
import * as React from 'react';

import AutoplaySounds from './AutoplaySounds';
import IconFacebookLogo from './IconFacebookLogo';
import IconTwitter from './IconTwitter';
import IconWhatsapp from './IconWhatsapp';
import VisuallyHidden from './VisuallyHidden';

import data from '../data/data.json';

const { seoData, } = data;

export default function ShareBar(props) {
  const { css, theme, } = useFela();

  const spacerClasses = css({
    height: '5rem',
  });
  const wrapperClasses = css({
    display: 'flex',
    fontWeight: '700',
    justifyContent: 'center',
    padding: '1rem 0 0',
    position: 'sticky',
    textAlign: 'center',
    top: '0',

    '&.isSticky': {
      backgroundColor: theme.color('cream'),
      zIndex: 10,
      boxShadow: '0 0 2rem 2rem #e9d2a9',
    },

    '&.isSticky>.shareIcons': {
      animationName: keyframes,
      animationDuration: '0.7s',
      animationFillMode: 'forwards',
      display: 'block',
    }
  });

  return (
    <>
      <div id="actionBarSentinal" className={spacerClasses}/>
      <aside id="actionBar" className={wrapperClasses}>
        <AutoplaySounds />
        <ShareIcons />
      </aside>
    </>
  );
}


function ShareIcons() {
  const { css, theme, } = useFela();
  const wrapperClasses = css({
    display: 'none',
    flexGrow: '0',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  });

  const btnStyle = isFirst => ({
    padding: '0 0.5rem',
    // ...(isFirst ? { marginInlineStart: '1rem', } : {}),
  });

  return (
    <div className={`jsSharIcons shareIcons ${wrapperClasses}`}>
      <button
				id="fbShare"
        className={`${css(btnStyle(true))}`}
        title="שתפו בפייסבוק"
      >
        <IconFacebookLogo
          size={5}
          color="facebook"
        />
        <VisuallyHidden>
          שתפו בפייסבוק
        </VisuallyHidden>
      </button>
      <button
				id="twitterShare"
        className={css(btnStyle(false), {
          '@media (max-width: 23.375em)': { display: 'none', },
        })}
        title="שתפו בטוויטר"
      >
        <IconTwitter
          size={5}
          color="twitter"
        />
        <VisuallyHidden>
          שתפו בטוויטר
        </VisuallyHidden>
      </button>
      <a
				id="whatsappShare"
        className={css(btnStyle(false), { extend: [ theme.mq({ from: 'l', }, { display: 'none', }) ] })}
        title="שתפו בוואטצאפ"
        href={`whatsapp://send?text=${encodeURIComponent(`${seoData.ogTitle}\nhttps://www.haaretz.co.il/st/c/static/heb/2019/birds-project/`)}`}
      >
        <IconWhatsapp
          size={5}
          color={[ 'whatsapp', '+2' ]}
        />
        <VisuallyHidden>
          שתפו בוואטצאפ
        </VisuallyHidden>
      </a>
      <a
				id="whatsappShare"
        className={css(btnStyle(false), { extend: [ theme.mq({ until: 'l', }, { display: 'none', }) ] })}
        title="שתפו בוואטצאפ"
        href={`https://web.whatsapp.com/send?text=${encodeURIComponent(`${seoData.ogTitle}\nhttps://www.haaretz.co.il/st/c/static/heb/2019/birds-project/`)}`}
        target="_blank"
      >
        <IconWhatsapp
          size={5}
          color={[ 'whatsapp', '+2' ]}
        />
        <VisuallyHidden>
          שתפו בוואטצאפ
        </VisuallyHidden>
      </a>
    </div>
  );
}

const keyframes = {
  '0%': {
    opacity: '0',
    width: '0',
  },
  '100%': {
    opacity: '1',
    width: '23rem',
  },
};
