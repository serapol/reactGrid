import './style.scss';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Layer } from '../../components';

const BASE_CLASS_NAME = 'snackbar';

class Snackbar extends Component {
  componentDidMount() {
    const { show } = this.props;

    if (show) {
      this.addEventListeners();
      this.setAutoHideTimer();
    }
  }

  componentDidUpdate() {
    const { show } = this.props;

    if (show) {
      this.removeEventListeners();
      this.addEventListeners();

      this.setAutoHideTimer();
    }
  }

  componentWillUnmount() {
    this.removeEventListeners();
    clearTimeout(this.autoHideTimerId);
  }

  hide = () => {
    const {
      show,
      onHide
    } = this.props;

    if (show) {
      this.removeEventListeners();
      clearTimeout(this.autoHideTimerId);
      onHide();
    }
  };

  addEventListeners() {
    window.addEventListener('click', this.hide, true);
  }

  removeEventListeners() {
    window.removeEventListener('click', this.hide, true);
  }

  autoHideTimerId = null;
  setAutoHideTimer() {
    const { autoHideDuration } = this.props;

    if (autoHideDuration <= 0) return;

    clearTimeout(this.autoHideTimerId);
    this.autoHideTimerId = setTimeout(() => {
      this.hide();
    }, autoHideDuration);
  }

  render() {
    const {
      show,
      type,
      children,
      onHide, // eslint-disable-line no-unused-vars
      autoHideDuration, // eslint-disable-line no-unused-vars
      ...otherProps
    } = this.props;

    return (
      <Layer className={`${BASE_CLASS_NAME}-layer`}>
        <div
          {...otherProps}
          className={classNames(
            BASE_CLASS_NAME,
            `${type}`,
            {
              'show': show
            }
          )}
        >
          {children}
        </div>
      </Layer>
    );
  }
}

Snackbar.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool.isRequired,
  type: PropTypes.oneOf([
    'success',
    'notice',
    'error'
  ]),
  onHide: PropTypes.func,
  autoHideDuration: PropTypes.number
};

Snackbar.defaultProps = {
  show: false,
  type: 'success',
  autoHideDuration: 4000,
  onHide: () => {}
};

export default Snackbar;
