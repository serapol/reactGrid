import React  from 'react';
import PropTypes from 'prop-types';

const TableFooter = ({
 children,
 ...otherProps
}) => (
  <tfoot {...otherProps}>
    {children}
  </tfoot>
);

TableFooter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableFooter;
