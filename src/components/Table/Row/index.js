import React  from 'react';
import PropTypes from 'prop-types';

const TableRow = ({
 children,
 ...otherProps
}) => (
  <tr {...otherProps}>
    {children}
  </tr>
);

TableRow.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TableRow;
