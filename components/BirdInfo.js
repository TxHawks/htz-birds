import { useFela, } from 'react-fela';
import * as React from 'react';

import Image from './Image';
import PlayPauseButton from './PlayPauseButton';
import getImageAssets from '../utils/getImageAssets';

export default function BirdInfo({ name, status, text, audio, image, credit, }) {
  const { css, theme, } = useFela();
  const imgWithTitle = { ...image, title: name, credit,};

  const imgOptions = getImageAssets({
    bps: theme.bps,
    aspect: 'full',
    sizes: [
      { from: 'xl', size: '350px', } ,
      { size: '300px', } ,
    ],
    widths: [ 300, 350, 510, ]
  });

  const asideClasses = css({
    display: 'grid',
    // gridTemplateAreas:`
    // "img content"
    // "btn content"
    // `,
    gridRowGap: '2rem',
    gridTemplateAreas:`
    "img rule header"
    "img rule btn"
    "img rule text"
    `,
    gridTemplateColumns: 'minmax(100px,34rem) 1rem minmax(36rem,1fr)',
    gridTemplateRows: 'auto auto 1fr',

    extend: [
      // theme.mq({ from: 'l', }, {
      //   gridTemplateAreas:`
      //   "img btn"
      //   "img content"
      //   "img content"
      //   `,
      // }),
    ],
  });
  const imgWrapperClasses = css({
    alignSelf: 'start',
    maxWidth: '50rem',
    position: 'relative',
    height: '0',
    paddingBottom: '100%',
    gridArea: 'img',
  });
  const nameClasses = css({
    color: theme.color('green', 'base'),
    paddingInlineStart: '1rem',
    extend: [ theme.type(3), ],
  });
  const btnWrapperClasses = css({
    alignItems: 'center',
    display: 'flex',
    gridArea: 'btn',
    paddingInlineStart: '1rem',
  });
  const statusClasses = css({
    backgroundColor: theme.color('green', 'base'),
    color: theme.color('green', '-10'),
    padding: '0 1rem',
  });
  const textClasses = css({
    gridArea: 'text',
    paddingInlineStart: '1rem',
  });

  return (
    <aside className={'jsBirdInfo ' + asideClasses} data-name={name}>
      <div className={imgWrapperClasses}>
        <Image
          contentId={image.contentId}
          data={imgWithTitle}
          options={imgOptions}
          isLazyload
        />
      </div>
      <div
          className={css({
            gridArea: 'rule',
            marginTop: '-0.5rem',
            backgroundColor: theme.color('green', 'base'),
            height: '30rem',

            extend: [
              theme.mq({ from: 's', }, {
                height: 'auto',
              })
            ],
        })}
      />
      <header className={css({ gridArea: 'header', })}>
        <h3 className={nameClasses}>{name}</h3>
        <p className={statusClasses}>
          {status}
        </p>
      </header>
      <div className={'jsBirdInfoStatus ' + btnWrapperClasses}>
        <PlayPauseButton
          audio={audio}
          name={name}
        />
        <span
          id={`bird_${audio}`}
          data-text-play={`לחצו לשמיעת הציוץ של ${name}`}
          data-text-pause="השתיקו קול"
          className={'jsBirdInfoStatusText ' + css({
            marginInlineStart: '1rem',
            fontWeight: '700',
            extend: [ theme.type(-2), ],
          })}
        >
          לחצו לשמיעת הציוץ של {name}
        </span>
      </div>
      <p className={textClasses}>{text}</p>
    </aside>
  );
}
