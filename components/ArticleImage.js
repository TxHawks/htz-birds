import { rgba, } from '@haaretz/htz-css-tools';
import { useFela, } from 'react-fela';
import * as React from 'react';

import { bps, } from '../theme/index';
import Caption from './Caption';
import Image from './Image';
import getImageAssets from '../utils/getImageAssets';
import getImgWidthHeight from '../utils/getImgWidthHeight';

/**
 * @param {Object} props
 * @param {Object} props.data
 *   Image data from the model
 * @param {string} props.aspect
 *   The aspect ratio of the image
 *   one of:
 *     * `regular`
 *     * `headline`
 *     * `landscape`
 *     * `square`
 *     * `full`
 *  @param {string|Array<{ from?: 's'|'m'|'l'|'xl', size: string, }>} [props.sizes]
 *    An array of objects to generate the `sizes` attribute from.React
 *    each item must have a `size` key holding a string representing the
 *    size of the image and an optional `from` key, holding a string with
 *    the name of one of the named breakpoints, indicating what is the
 *    minimum breakpoint the size applies to.
 *  @param {number[]} widths
 *    An array of image widths available for the `src` and `srcset` attributes
 *  @param {boolean} isLazyload
 *    Should the image be lazyloaded
 */
export default function ArticleImage({
  aspect,
  data,
  isLazyload=true,
  sizes,
  widths,
} = {}) {
  const { css,theme, } = useFela();
  const namedWidthBreakpoints = bps.widths;
  // Sort sizes by breakpoint size
  const sortedSizes = typeof sizes === 'string'
    ? sizes
    : sizes.sort(
      (a, b) => largeToSmall(namedWidthBreakpoints[a.size], namedWidthBreakpoints[b.size])
    );
  // Sort widths small to large
  const sortedWidths = widths.sort(smallToLarge);
  const imageAssets = getImageAssets({ bps, sizes: sortedSizes, widths: sortedWidths, aspect, });

  const figureClasses = css({
    extend: [
      theme.mq({ until: 's', }, { marginLeft: '-2rem', marginRight: '-2rem', }),
      theme.mq({ from: 'l', until: 'xl', }, { margin: '6rem -20rem', }),
      theme.mq({ from: 'xl', }, { margin: '6rem -30rem', }),
    ],
  });

  const imgWrapperClasses = css({
    position: 'relative',
    height: '0',
    paddingBottom: getAspectRatioPercentage({aspect, data}),
  });

  return (
    <figure className={figureClasses}>
      <div className={imgWrapperClasses}>
        <Image
          isLazyload={isLazyload}
          data={data}
          options={imageAssets}
          miscStyle={{
            extend: [
              theme.mq({ from: 's', }, {
                border: `4px solid ${theme.color('neutral', '-1')}`,
              }),
            ],
          }}
        />
      </div>
      <Caption caption={data.title} credit={data.credit || data.photographer}/>
    </figure>
  );
}


/////////////////////////
//  UTILS AND HELPERS  //
/////////////////////////

function largeToSmall(a,b) {
  if (a == null) return -1;
  if (a === b) return 0;
  return  a > b ? -1 : 1;
}
function smallToLarge(a,b) {
  if (a == null) return 1;
  if (a === b) return 0;
  return  a < b ? -1 : 1;
}

function getAspectRatioPercentage({ aspect, data, asNumber=false, } = {}) {
  const { width, height, } = getImgWidthHeight(data.imgArray[0].aspects, aspect);
  const ratio = (height / width) * 100;
  return asNumber ? ratio : `${ratio}%`;
}
