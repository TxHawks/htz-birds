import Document, {  Head, Html, Main, } from 'next/document'
// import Document, {  Head, Html, Main, NextScript, } from 'next/document'
import { renderToSheetList } from 'fela-dom'
import { theme, cssReset, fontStacks, } from '../theme/index';
import { StyleProvider as FelaProvider, createRenderer, } from '@haaretz/fela-utils';

import preload from '../static/js/preload.json';
import fileManifest from '../static/js/file-manifest.json';
import audioFiles from '../static/js/audioFiles.json';


const styleRenderer = createRenderer({ isRtl: true, });

const polyfillSrc = 'https://polyfill.io/v3/polyfill.min.js?flags=gated&unknown=polyfill&features=IntersectionObserver%2CIntersectionObserverEntry%2Cdefault%2CObject.entries%2CArray.prototype.entries%2Cfetch%2CArray.prototype.find%2CArray.prototype.findIndex%2CArray.prototype.includes%2CFunction.prototype.name%2CArray.prototype.%40%40iterator';

class CustomHead extends Head {
  render() {
    const res = super.render();

    function transform(node) {
      // remove all link preloads
      if (node && node.type === 'link' && node.props && node.props.rel === 'preload') {
        return null;
      }
      if (node && node.props && node.props.children) {
        return {
          ...node,
          props: {
            ...node.props,
            children: Array.isArray(node.props.children)
            ? node.props.children.map(transform)
            : transform(node.props.children),
          },
        }
      }
      if (Array.isArray(node)) {
        return node.map(transform);
      }

      return node;
    }

    return transform(res);
  }
}

function Polyfills() {
  return <link rel="preload" crossOrigin="anonymous" href={polyfillSrc} as="script" />
}
function PreloadJS() {
  return preload.index.map(module => (
    <link rel="preload" as="script" crossOrigin="anonymous" href={`./static/js/${module}`} />
  ));
}
function PreloadAudio() {
  return audioFiles.map(filename => (
    <link rel="preload" as="audio" href={`./static/audio/${filename}`} />
  ));
}


export default class CustomDocument extends Document {
  static async getInitialProps ({ renderPage }) {
    // Render webfonts
    fontStacks.webfonts.forEach(fontFamilyRule => styleRenderer.renderFont(...fontFamilyRule));

    // Render css reset
    styleRenderer.renderStatic(cssReset);
    // Array.isArray(cssReset)
    //   ? cssReset.forEach(rule => styleRenderer.renderStatic(rule))
    //   : styleRenderer.renderStatic(cssReset);

    const page = renderPage(App => props => (
      <FelaProvider theme={theme} renderer={styleRenderer}>
        <App {...props} />
      </FelaProvider>
    ));

    const sheetList = renderToSheetList(styleRenderer);
    // styleRenderer.clear();

    return {
      ...page,
      sheetList,
    };
  }

  render () {
    const styleNodes = this.props.sheetList.map(
      ({ type, rehydration, support, media, css }) => (
        <style
          dangerouslySetInnerHTML={{ __html: css }}
          data-fela-id=""
          data-fela-rehydration={rehydration}
          data-fela-support={support}
          data-fela-type={type}
          key={`${type}-${media}`}
          media={media}
        />
      ));

    return (
      <Html lang="he" dir="rtl">
        <CustomHead>
          <PreloadJS />
          <Polyfills isPolyfill/>
          {styleNodes}

          <PreloadAudio />
        </CustomHead>
        <body>
          <Main />

          <script crossOrigin="anonymous" src={polyfillSrc} />
          {/* <NextScript /> */}
          <script type="module" src={`./static/js/${fileManifest.index}`}></script>
          <script noModule src={`./static/js/${fileManifest.indexNomodule}`}></script>
        </body>
      </Html>
    )
  }
}
