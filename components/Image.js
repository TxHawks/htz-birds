import { useFela } from 'react-fela';
import * as React from 'react';

import { buildImgUrl, buildImgUrls, } from '../utils/buildImgURLs';
import getImgWidthHeight from '../utils/getImgWidthHeight';

export default function Image({ isLazyload, data, options, removeTitle, miscStyle}) {
  const { css, theme, } = useFela();
  const { transforms, sizes } = options;
  const imgData = data.imgArray[0];
  const hasSrcset = transforms.length > 1;
  const contentId = data.contentId;

  const title =
    data.title
      ? `${data.title}. `
      : ''
    + data.credit
      ? `צילום: ${data.credit}`
      : '';
  const src = buildImgUrl(contentId, imgData, transforms[0]);
  const srcset = hasSrcset ? buildImgUrls(contentId, imgData, transforms) : undefined;
  const attrsPrefix = isLazyload ? 'data-' : '';
  const aspect = transforms[0].aspect;
  const { width, height, } = getImgWidthHeight(data.imgArray[0].aspects, aspect);
  const imgAttrs = {
    alt: data.accesibility,
    height: Math.round(height),
    width: Math.round(width),
    [attrsPrefix + 'src']: src,
    ...(hasSrcset ? { [attrsPrefix + 'srcset']: srcset } : {}),
    ...(isLazyload ? { loading: 'lazy', } : {}),
    ...((removeTitle || !title) ? {} : { title }),
  };

  const className = css({
    position: 'absolute',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    width: '100%',
    height: '100%',
    mixBlendMode: 'multiply',
    // fade in lazy loaded images with lazysizes
    // TODO: Fix for native lazyloading by adding the `lazyloaded` class
    // to images on their `load` event
    ...(isLazyload
      ? {
        transition: 'opacity .3s ease-out',
        opacity: '0',
        '&.lazyloaded': {
          opacity: '1',
        },
      }
      : {}
    ),
  }, miscStyle);


  return (
    <img
      className={(isLazyload ? 'lazyload ' : '') + className}
      sizes={sizes}
      {...imgAttrs}
    />
  );
}
