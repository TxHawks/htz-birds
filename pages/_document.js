import Document, {  Head, Html, Main, } from 'next/document'
import { renderToSheetList } from 'fela-dom'
import { StyleProvider as FelaProvider, createRenderer, } from '@haaretz/fela-utils';

import { theme, cssReset, fontStacks, } from '../theme/index';
import Seo from '../components/Seo';

import preload from '../static/js/preload.json';
import fileManifest from '../static/js/file-manifest.json';
import audioFiles from '../static/js/audioFiles.json';
import data from '../data/data.json';

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
  // Preloading audio as images because, despite being in the spec,
  // audio isn't preloaded by browsers
  return audioFiles.map(filename => (
    <link rel="preload" as="image" href={`./static/audio/${filename}`} />
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
          <title>{data.seoData.metaTitle}</title>
          {/* Assets and domains */}
          <PreloadJS />
          <link rel="preconnect" href="https://img.haarets.co.il" />
          <link rel=" dns-prefetch" href="https://img.haarets.co.il" />
          <Polyfills isPolyfill/>

          {/* FAVICONS */}
          <link rel="shortcut icon" href={'/static/htz/images/favicon.ico'} />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href={'/static/htz/images/apple-touch-icon-152x152.png'}
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href={'/static/htz/images/apple-touch-icon-144x144.png'}
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href={'/static/htz/images/apple-touch-icon-120x120.png'}
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href={'/static/htz/images/apple-touch-icon-114x114.png'}
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href={'/static/htz/images/apple-touch-icon-72x72.png'}
          />

          <meta
            name="msapplication-TileColor"
            content="#0B7EB5"
            key="msapplication-TileColor"
          />
          <meta
            name="msapplication-TileImage"
            content={`/static/htz/images/mstile-144x144.png`}
            key="msapplication-TileImage"
          />

          {styleNodes}

          {/* <PreloadAudio /> */}

          <Seo {...data.seoData} />

          {/* Chartbeat */}
          <React.Fragment>
            <script
              type="text/javascript"
              dangerouslySetInnerHTML={{
                __html: `
              var _sf_async_config = _sf_async_config || {};
              /** CONFIGURATION START **/
              _sf_async_config.sections = 'סוף שבוע';
              _sf_async_config.authors = 'נטע אחיטוב';
              var _sf_startpt = (new Date()).getTime();
              /** CONFIGURATION END **/
              (function() {
                function loadChartbeat() {
                  var e = document.createElement('script');
                  e.setAttribute('language', 'javascript');
                  e.setAttribute('type', 'text/javascript');
                  e.setAttribute('src','https://s3.amazonaws.com/static.chartbeat.com/js/chartbeat.js');
                  document.body.appendChild(e);
                }
                  var oldonload = window.onload;
                  window.onload = (typeof window.onload != 'function')
                    ? loadChartbeat
                    : function() {
                      oldonload();
                      loadChartbeat();
                    };
                })();`,
              }}
            />
          </React.Fragment>

          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '801998859871552');fbq('track', 'PageView');
            `,
            }}
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-589309-3', 'auto', { allowLinker: true });
            ga('require', 'ec');
            `,
            }}
          />
        </CustomHead>
        <body>
          <Main />

          <script crossOrigin="anonymous" src={polyfillSrc} />
          {/* <NextScript /> */}
          <script type="module" src={`./static/js/${fileManifest.index}`}></script>
          <script noModule src={`./static/js/${fileManifest.indexNomodule}`}></script>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: data.jsonld[0], }}
          />
        </body>
      </Html>
    );
  }
}
