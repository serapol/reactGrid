import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

const BASE_CSS_CLASS_NAME = 'btn';

class Button extends Component {
  componentDidMount() {
    if (this.props.focused) {
      this.DOMNode.focus();
    }
  }

  render() {
    const {
      className,
      type,
      size,
      children,
      focused, // eslint-disable-line no-unused-vars
      ...otherProps,
    } = this.props;

    return (
      <button
        {...otherProps}
        ref={(button) => { this.DOMNode = button; }}
        className={classNames(
          BASE_CSS_CLASS_NAME,
          `${BASE_CSS_CLASS_NAME}-${type}`,
          className,
          {
            [`${BASE_CSS_CLASS_NAME}-${size}`]: size,
          }
        )}
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  className: PropTypes.string,
  focused: PropTypes.bool,
  type: PropTypes.oneOf([
    'default',
    'primary',
    'success',
    'warning',
    'info',
    'danger',
    'link'
  ]),
  size: PropTypes.oneOf([
    'lg',
    'sm',
    'xs',
  ]),
  children: PropTypes.node,
};

Button.defaultProps = {
  focused: false,
  disabled: false,
  type: 'default',
};

export default Button;
