import { useFela, } from 'react-fela';
import * as React from 'react';

import { buildImgUrl } from '../utils/buildImgURLs';


export default function Seo({
  metaTitle,
  metaDescription,
  metaKeywords,
  canonicalUrl,
  ogTitle,
  ogImage,
  pubDate,
  ...rest
 }) {
  const { imgArray: ogImgArray, } = ogImage;
  const [ ogImgData, ] = ogImgArray;

  // const ogImageUrl = buildImgUrl(
  //   ogImage.contentId,
  //   { ...ogImgData, },
  //   {
  //     width: '1200',
  //     height: '630',
  //     quality: 'auto',
  //     aspect: ogImgData.aspects && 'headline' in ogImgData.aspects
  //       ? 'headline'
  //       : 'full',
  //   }
  // );
  const ogImageUrl = 'https://img.haarets.co.il/img/1.7912412/69811424.jpg?width=1200&height=630&trim=200,0,0';
  const canonical = 'https://www.haaretz.co.il/st/c/static/heb/2019/birds-project/';

  return (
    <React.Fragment>
      <meta name="referrer" content="always" key="referrer" />
      <meta name="robots" content="noarchive" key="robots" />

      <meta name="title" content={metaTitle} key="title" />
      <meta name="description" content={metaDescription} key="description" />
      <meta name="keywords" content={metaKeywords} key="keywords" />
      <meta property="og:title" content={ogTitle} key="og:title" />
      <meta property="og:description" content={metaDescription} key="og:description" />
      <meta property="og:type" content="article" key="of:type" />
      <meta property="og:url" content={canonical} key="og:url" />
      <meta property="og:image" content={ogImageUrl} key="og:image" />
      <meta property="og:image:width" content="1200" key="og:image:width" />
      <meta property="og:image:height" content="630" key="og:image:height" />
      <meta property="article:published" content={pubDate} key="article:published" />

      <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
      <meta name="twitter:site" content="@haaretz" key="twitter:site" />
      <meta name="twitter:title" content={ogTitle} key="twitter:title" />
      <meta name="twitter:description" content={metaDescription} key="twitter:description" />
      <meta name="twitter:image" content={ogImageUrl} key="twitter:image" />

      <link rel="canonical" href={canonical} />
    </React.Fragment>
  );
}
