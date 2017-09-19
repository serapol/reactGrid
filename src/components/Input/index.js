import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Input extends Component {
  state = {
    validationState: this.props.validationState,
    showPassword: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.validationState !== this.props.validationState) {
      this.setState({
        validationState: nextProps.validationState
      });
    }
  }

  value(value) {
    if (value) {
      this.inputNode.value = value;
      return value;
    }

    return this.inputNode.value;
  }

  focus() {
    this.inputNode.focus();
  }

  getInputNode() {
    return this.inputNode;
  }

  handleInput = (e) => {
    const input = e.target;
    const value = this.props.trimValue ? input.value.trim() : input.value;
    const inputName = input.name;
    const isValid = this.props.validate(value);

    this.props.onInput(value, inputName, e);

    if (isValid !== null) {
      this.setState({
        validationState: isValid ? 'success' : 'error'
      });
    }
  };

  handleBlurInput = (e) => {
    if (this.props.trimValue) {
      e.target.value = e.target.value.trim();
    }

    this.props.onBlur(e);
  };

  toggleShowPassword = () => {
    if (!this.inputNode.value
      && !this.state.showPassword
    ) {
      return;
    }

    this.setState({
      showPassword: !this.state.showPassword
    });
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
      validate, // eslint-disable-line no-unused-vars
      ...otherProps
    } = this.props;

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
        {errorMessage &&
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
  validationState: React.PropTypes.oneOf([
    'success',
    'error',
    ''
  ]),
  validate: React.PropTypes.func,
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
  validate: function () { return null; },
  onInput: function () {},
  onChange: function () {},
  onKeyDown: function () {},
  onBlur: function () {}
};

export default Input;
