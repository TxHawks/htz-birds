import color from '../methods/getColor';
import getDuration from '../methods/getDuration';
import getTimingFunction from '../methods/getTimingFunction';
import type from '../methods/typesetter';

const article = Object.freeze({
  marginStart: [
    { until: 'l', value: '0', },
    { from: 'l', until: 'xl', value: '27rem', },
    { from: 'xl', value: '30rem', },
  ],
  marginEnd: [
    { until: 'l', value: '0', },
    { from: 'l', until: 'xl', value: '57rem', },
    { from: 'xl', value: '51rem', },
  ],
});

const paragraphLink = Object.freeze({
  borderBottomWidth: '1px',
  borderBottomStyle: 'solid',
  borderBottomWidthActive: '2px',
});


const body = Object.freeze({
  marginBottom: [ { until: 'xl', value: '4rem', }, { from: 'xl', value: '3rem', }, ],
  maxWidth: '90rem',
  width: [
    { from: 's', until: 'l', value: '80rem', },
    { from: 'l', until: 'xl', value: '70.5rem', },
    { from: 'xl', value: '80rem', },
  ],
  margin: [ { from: 's', until: 'l', value: 'auto', }, ],
  marginStart: [ { until: 's', value: '2rem', }, { from: 'l', value: '4rem', }, ],
  marginEnd: [ { until: 's', value: '2rem', }, ],
});

const paragraphStyles = Object.freeze({});


/**
 * Contains theme for article header elements: kicker, title
 * @type {Object}
 */
const header = Object.freeze({
  bylineFontSize: [
    { until: 's', value: -2, },
    { from: 's', until: 'l', value: -1, },
    { from: 'l', until: 'xl', value: 0, },
    { from: 'xl', value: -1, },
  ],
  marginStart: [ { until: 'l', value: '2rem', }, { from: 'l', value: '4rem', }, ],
  marginEnd: [
    { until: 'm', value: '2rem', },
    { from: 'm', until: 'l', value: '2rem', },
  ],
});

const articleStyle = Object.freeze({
  article,
  header,
  body,
  paragraphStyles,
  paragraphLink,
});

export default articleStyle;
