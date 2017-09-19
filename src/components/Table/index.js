import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const BASE_CSS_CLASS_NAME = 'table';

class Table extends Component {
  render() {
    const {
      bordered,
      condensed,
      hover,
      responsive,
      striped,
      children,
      ...otherProps
    } = this.props;

    const table = (
      <table
        {...otherProps}
        className={classNames(
          BASE_CSS_CLASS_NAME,
          {
            [`${BASE_CSS_CLASS_NAME}-bordered`]: bordered,
            [`${BASE_CSS_CLASS_NAME}-condensed`]: condensed,
            [`${BASE_CSS_CLASS_NAME}-hover`]: hover,
            [`${BASE_CSS_CLASS_NAME}-striped`]: striped,
          }
        )}
      >
        {children}
      </table>
    );

    if (responsive) {
      return (
        <div className={`${BASE_CSS_CLASS_NAME}-responsive`}>
          {table}
        </div>
      );
    }

    return table;
  }
}

Table.propTypes = {
  striped: PropTypes.bool,
  bordered: PropTypes.bool,
  condensed: PropTypes.bool,
  hover: PropTypes.bool,
  responsive: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Table.defaultProps = {
  bordered: false,
  condensed: false,
  hover: false,
  responsive: false,
  striped: false,
};

export default Table;
