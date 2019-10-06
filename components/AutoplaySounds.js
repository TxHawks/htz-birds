import { useFela, } from 'react-fela';
import * as React from 'react';

import IconSpeaker from './IconSpeaker';

export default function AutoplaySounds() {
  const { css, theme, } = useFela();

  const className = css({
    fontWeight: '700',
    // marginTop: '5rem',

    transition: 'all 0.1s',
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

    extend: [
      theme.type(1, { untilBp: 's', }),
      theme.type(3, { fromBp: 's', }),
      theme.mq({ until: 's', }, {
        marginInlineStart: '2rem',
      }),
    ],
  });

  return (
    <React.Fragment>
      <button
        data-playing-text="לחצו להשתקת קול"
        data-paused-text="לחצו להפעלת קול"
        className={className}
        id="autoplayBtn"
      >
        <IconSpeaker
          size={[{ until: 's', value: 4, }, { from: 's', value: 5}, ]}
          color={[ 'green', '+1', ]}
          fill="cream"
          attrs={{ id: 'autoplayIcon', }}
        />
        &nbsp;
        <span id="autoplayBtnText">לחצו להפעלת קול</span>
      </button>
      <audio id="audioEl" preload="auto" autoPlay src="./static/audio/00intro.mp3" />
    </React.Fragment>
  );
}
