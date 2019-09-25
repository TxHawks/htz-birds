import * as React from 'react';
import { useFela, } from 'react-fela';
import useData from '../hooks/useData';
import ArticleImage from './ArticleImage';
import PullQuote from './PullQuote';
import BirdInfo from './BirdInfo';

import birdsInfo from '../data/birdsInfo.json'

// const birdData = birdsInfo[2];

export default function ArticleBody() {
  const { css, theme, } = useFela();
  const bodyData = useData('body');
  const focusActiveStyles = {
    color: theme.color('link', 'base'),
    borderBottomColor: theme.color('link', 'base'),
  };

  const sectionClasses = css({
    margin: '6rem auto 0',
    position: 'relative',
    padding: '0 2rem',

    '&>*+*': {
      marginTop: '3rem',
    },
    '&>h2+*': {
      marginTop: '0',
    },

    '& a': {
      borderBottomColor: theme.color('link', 'base'),
      borderBottomWidth: theme.articleStyle.paragraphLink.borderBottomWidth,
      borderBottomStyle: theme.articleStyle.paragraphLink.borderBottomStyle,
      transitionProperty: 'all',

      ':hover': {
        ...focusActiveStyles,
        borderBottomColor: 'transparent',
      },
      ':focus': focusActiveStyles,
      ':active': focusActiveStyles,
      ':visited': { color: theme.color('bodyText', 'base'), },
      extend: [
        theme.getTransition(0, 'swiftOut'),
      ],
    },

    '& strong': { fontWeight: '700', },
    '& em': { fontStyle: 'italic', },
    '& u': { textDecoration: 'underline', },
    '&>p': { extend: [
      theme.type(1, { untilBp: 'xl', lines: 5, }),
      theme.type(0, { fromBp: 'xl', lines: 5, }),
    ], },
    '&>h2': { extend: [ theme.type(2), ], },
    '& mark': {
      // color: theme.color('cream'),
      backgroundColor: theme.color('green', '-8'),
    },

    extend: [
      theme.mq({ from: 's', until: 'm', }, {
        maxWidth: '100rem',
      }),
      theme.mq({ from: 'm', until: 'l', }, {
        maxWidth: '126rem',
        padding: '0 16rem',
      }),
      theme.mq({ from: 'l', until: 'xl', }, {
        maxWidth: '163rem',
        padding: '0 32rem 0 32rem',
      }),
      theme.mq({ from: 'xl', }, {
        maxWidth: '176rem',
        padding: '0 45rem',
      }),
    ],
  });

  return (
    <section className={sectionClasses}>
      {renderData(bodyData)}
    </section>
  );
}

function renderData(data) {
  const elements = data
    .map(element => {
      if (element.kind === 'htmlString') {
        const Tag = element.tag;
        return (
          <Tag
            {...element.attrs}
            dangerouslySetInnerHTML={{__html: element.content}}
          />
        );
      }

      // TODO: Images
      if (element.kind === 'image' && element.contentId !== '1.7900399') {
        return (
          <ArticleImage
            key={element.contentName}
            aspect="regular"
            data={element}
            sizes={[
              { from: 'xl', size: '1022px', },
              { from: 'l', size: '834px', },
              { from: 'm', size: '564px', },
              { from: 's', size: '574px', },
              { size: '100vw', },
            ]}
            widths={[ 320, 420, 580, 840, 1022, ]}
            isLazyload
          />
        );
      }

      // TODO: Pull-quotes
      if (element.inputTemplate === 'com.htz.MagazineArticleQuote') {
        return (<PullQuote>{element.text}</PullQuote>);
      }

      return null;
    })
    .filter(element => element != null);

  birdsInfo.forEach(item => { elements.splice(item.after, 0, <BirdInfo {...item} />); })

  return elements;
}
