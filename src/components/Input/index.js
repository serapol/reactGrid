import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Input extends Component {
  state = {
    validationState: this.props.validationState
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.validationState !== this.props.validationState) {
      this.setState({
        validationState: nextProps.validationState
      });
    }
  }

  getInputNode() {
    return this.inputNode;
  }

  handleInput = (e) => {
    const input = e.target;
    const value = this.props.trimValue ? input.value.trim() : input.value;
    const inputName = input.name;

    this.props.onInput(value, inputName, e);
  };

  handleBlurInput = (e) => {
    if (this.props.trimValue) {
      e.target.value = e.target.value.trim();
    }

    this.props.onBlur(e);
  };

  render() {
    const {
      className,
      style,
      type,
      inputLabel,
      inputStyle,
      errorMessage,
      validationState, // eslint-disable-line no-unused-vars
      trimValue, // eslint-disable-line no-unused-vars
      ...otherProps
    } = this.props;
    const isInvalid = this.state.validationState === 'error';

    return (
      <div
        className={classNames(
          'form-group',
          className,
          {
            [`has-${this.state.validationState}`]: this.state.validationState,
          }
        )}
        style={style}
      >
        {inputLabel && <label>{inputLabel}</label>}
        <input
          {...otherProps}
          className="form-control"
          type={type}
          ref={(node) => this.inputNode = node}
          style={inputStyle}
          onInput={this.handleInput}
          onBlur={this.handleBlurInput}
        />
        {isInvalid && errorMessage &&
        <div className="help-block">
          {errorMessage}
        </div>
        }
      </div>
    );
  }
}

Input.propTypes = {
  style: PropTypes.object,
  inputStyle: PropTypes.object,
  className: PropTypes.string,
  inputLabel: PropTypes.string,
  defaultValue: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  trimValue: PropTypes.bool,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  validationState: PropTypes.oneOf([
    'success',
    'error',
    ''
  ]),
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onInput: PropTypes.func
};

Input.defaultProps = {
  inputLabel: '',
  defaultValue: '',
  type: 'text',
  placeholder: '',
  errorMessage: '',
  validationState: '',
  trimValue: true,
  readOnly: false,
  disabled: false,
  onInput: function () {},
  onChange: function () {},
  onKeyDown: function () {},
  onBlur: function () {}
};

export default Input;
