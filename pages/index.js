import { useFela, } from 'react-fela';
import * as React from 'react';

import ActionBar from '../components/ActionBar';
import ArticleBody from '../components/ArticleBody';
import Hero from '../components/Hero';
import Masthead from '../components/Masthead';

export default function Mainpage() {
  const { css, theme } = useFela();
  const articleClasses = css({
    // backgroundImage: 'linear-gradient(to bottom, rgba(233,210,169,1) 0%, rgba(233,210,169,0) 30%),url(assets/bg.jpg)',
    // backgroundRepeat: 'no-repeat, repeat',
    backgroundImage: 'url(https://img.haarets.co.il/img/1.7926696/648593241.jpg)',
    backgroundRepeat: 'repeat',
    paddingBottom: '8rem',
    ':after': {
      color: theme.color('red'),
      // content: '"\\2766"',
      content: '"\\2741"',
      display: 'block',
      textAlign: 'center',
      marginTop: '6rem',

      ...theme.type(6)
    },
  });
  return (
    <React.Fragment>
      <Masthead />
      <article className={articleClasses}>
        <Hero />
        <ActionBar />
        <ArticleBody />
      </article>
    </React.Fragment>
  );
}
