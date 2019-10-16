import { useFela, } from 'react-fela';
import * as React from 'react';

import IconSpeaker from './IconSpeaker';

export default function AutoplaySounds() {
  const { css, theme, } = useFela();

  const className = css({
    flexGrow: '0',
    fontWeight: '700',
    position: 'relative',
    transition: 'all 0.1s',
    whiteSpace: 'nowrap',

    '&:hover': {
      color: theme.color('green'),
    },
    '&:focus': {
      color: theme.color('green'),
      outline: 'none',
    },
    '&:active': {
      color: theme.color('green', '-4'),
      outline: 'none',
    },

    '&:after': {
      content: '""',
      position: 'absolute',
      zIndex: '-1',
      backgroundColor: theme.color('highlight'),
      width: '110%',
      height: '115%',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-60%) skew(-10deg, -1deg) scale(0,1)',
      transformOrigin: 'center right',
      transition: 'all 0.15s',
      opacity: '1',
    },

    '&.isHighlighted:after': {
      transform: 'translate(-50%,-60%) skew(-10deg, -1deg) scale(1,1)',
      transition: 'all 0.3s',
      opacity: '0.6',
    },

    extend: [
      // theme.type(1, { untilBp: 's', }),
      theme.type(3, { fromBp: 's', }),
      theme.mq({ until: 's', }, {
        marginInlineStart: '2rem',
      }),
    ],
  });

  return (
    <React.Fragment>
      <button
        data-playing-text="לחצו להשתקת הקול"
        data-paused-text="לחצו לשמיעת ציוץ הציפורים"
        id="autoplayBtn"
        className={className}
      >
        <IconSpeaker
          size={[{ until: 's', value: 4, }, { from: 's', value: 5}, ]}
          color={[ 'green', '+1', ]}
          fill="cream"
          attrs={{ id: 'autoplayIcon', }}
        />
        &nbsp;
        <span id="autoplayBtnText">לחצו לשמיעת ציוץ הציפורים</span>
      </button>
      <audio id="audioEl" preload="auto" src="./static/audio/00intro.mp3" />
    </React.Fragment>
  );
}
