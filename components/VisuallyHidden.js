import React from 'react';
import { useFela, } from 'react-fela';
import PropTypes from 'prop-types';
import { visuallyHidden, } from '@haaretz/htz-css-tools';

const styles = visuallyHidden();

VisuallyHidden.propTypes = {
  /** ID for the HTML element (to be referenced with the aria-describedby attribute) */
  id: PropTypes.string,
  children: PropTypes.node,
  tagName: PropTypes.node,
};

VisuallyHidden.defaultProps = {
  id: null,
  children: null,
  tagName: 'span',
};

export default function VisuallyHidden({ id, children, tagName, }) {
  const className = useFela().css(styles);
  const Tag = tagName;

  return (
    <Tag id={id} className={className}>
      {children}
    </Tag>
  );
}
