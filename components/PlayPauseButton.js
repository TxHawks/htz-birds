import { useFela, } from 'react-fela';
import * as React from 'react';

import VisuallyHidden from './VisuallyHidden';

export default function PlayPauseButton({ audio, name, }) {
  const { css, theme, } = useFela();

  // Button's height, in rems
  const size = 4;
  const barSpaceRatio = 0.3;
  const transitionDuration = '0.3s';
  const color = theme.color('green', 'base');
  const hoverColor = theme.color('green', '+2');

  const paddingSize = Math.max(1, Math.round(size / 4));
  const innerSize = 0.66;
  const className = css({
    borderRadius: '50%',
    backgroundColor: color,
    boxSizing: 'border-box',
    fontSize: `${size}rem`,
    padding: `${1 - innerSize}em`,
    transition: `all ${transitionDuration}`,

    '&:hover': {
      backgroundColor: hoverColor,
    },
    '&:focus': {
      backgroundColor: hoverColor,
      outline: 'none',
    },
    '&:active': {
      outline: 'none',
      backgroundColor: hoverColor,
      transform: 'scale(0.9)',
    },


    '&>div': {
      width: `${innerSize}em`,
      height: `${innerSize}em`,
      position: 'relative',
      transform:'translate(10%,0)',
      transition: `all ${transitionDuration}`,
    },
    '&:hover>div': {
      transform:'translate(10%,0)',
    },
    '&>div:before': {
      content: '""',
      position: 'absolute',
      left: '0',
      top: '50%',
      transform: 'translateY(-50%)',
      height: '50%',
      borderColor: `transparent transparent transparent ${theme.color('green', '-10')}`,
      borderStyle: 'solid',
      borderWidth: `${innerSize * 0.5}em 0 ${innerSize * 0.5}em ${innerSize}em`,
      transition: `all ${transitionDuration}`,
    },
    '&:hover>div:before': {
      borderColor: `transparent transparent transparent ${theme.color('white')}`,
    },
    '&:focus>div:before': {
      borderColor: `transparent transparent transparent ${theme.color('white')}`,
    },
    '&:hover>div:after': {
      borderColor: `transparent transparent transparent ${theme.color('white')}`,
    },
    '&:focus>div:after': {
      borderColor: `transparent transparent transparent ${theme.color('white')}`,
    },
    '&>div:after': {
      opacity: '0',
      content: '""',
      position: 'absolute',
      left: 'auto',
      right: '0',
      top: '50%',
      transform: 'translateY(-50%)',
      height: '0',
      borderColor: `transparent transparent transparent ${theme.color('green', '-10')}`,
      borderStyle: 'solid',
      borderWidth: `${innerSize * 0.25}em 0 ${innerSize * 0.25}em ${innerSize * 0.5}em`,
      transition: `all ${transitionDuration}`,
    },
    '&.isPauseBtn>div': {
      transform:'translate(0,0)',
    },
    '&.isPauseBtn:hover>div': {
      transform:'translate(0,0)',
    },
    '&.isPauseBtn>div:before': {
      borderWidth: `0 0 0 ${(innerSize - (innerSize * barSpaceRatio)) / 2}em`,
      height: '100%',
    },
    '&.isPauseBtn>div:after': {
      opacity: '1',
      borderWidth: `0 0 0 ${(innerSize - (innerSize * barSpaceRatio)) / 2}em`,
      height: '100%',
    },
  });

  return (
    <button
      className={'jsPlayBtn ' + className}
      data-audio={audio}
      data-playing="false"
      aria-labelledby={`bird_${audio}`}
    >
      <div />
    </button>
  );
}
