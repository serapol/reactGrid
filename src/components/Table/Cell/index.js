import React  from 'react';
import PropTypes from 'prop-types';

const TableCell = ({
  children,
  isHeader,
 ...otherProps
}) => {
  if (isHeader) {
    return (
      <th {...otherProps}>
        {children}
      </th>
    );
  }

  return (
    <td {...otherProps}>
      {children}
    </td>
  );
};

TableCell.propTypes = {
  isHeader: PropTypes.bool,
  children: PropTypes.node,
};

TableCell.defaultProps = {
  isHeader: false,
};

export default TableCell;
