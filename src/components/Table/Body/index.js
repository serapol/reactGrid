import React  from 'react';
import PropTypes from 'prop-types';

const TableBody = ({
 children,
 ...otherProps
}) => (
  <tbody {...otherProps}>
    {children}
  </tbody>
);

TableBody.propTypes = {
  children: PropTypes.node,
};

export default TableBody;
