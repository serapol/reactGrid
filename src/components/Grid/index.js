import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '../../components';

class Grid extends Component {
  state = {
    selectedCell: {
      row: null,
      col: null,
    }
  };

  selectCell = (row, col) => {
    this.setState({
      row,
      col,
    });
  };

  getModifiedActions(data) {
    const { actions } = this.props;
    const modifyElement = (element) => React.cloneElement(element, {
      onClick: (e) => {
        if (element.onClick) {
          e.stopPropagation();
          element.onClick(data);
        }
      }
    });

    if (!actions) return null;

    if (!Array.isArray(actions)) {
      return modifyElement(actions);
    }

    return React.Children.map(actions, (action) => modifyElement(action));
  }

  renderHeader() {
    const {
      data: {
        columns,
      },
      actions,
    } = this.props;

    return (
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableCell
              key={index}
              isHeader
            >
              {column.header}
            </TableCell>
          ))}
          {actions &&
          <TableCell isHeader>
            Actions
          </TableCell>
          }
        </TableRow>
      </TableHeader>
    );
  }

  renderBody() {
    const {
      data: {
        columns,
        rows,
      },
      actions,
      onCellClick,
      onRowClick,
    } = this.props;
    const {
      selectedCell,
    } = this.state;

    if (!rows || !rows.length) {
      return (
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={actions ? columns.length + 1 : columns.length}
              style={{ textAlign: 'center' }}
            >
              Users list is empty
            </TableCell>
          </TableRow>
        </TableBody>
      );
    }

    return (
      <TableBody>
        {rows.map((row, rowIndex) => (
        <TableRow
          key={rowIndex}
          onClick={() => {
            onRowClick(row);
          }}
        >
          {columns.map((column, colIndex) => {
            const fieldName = column.field;
            const fieldValue = row[fieldName];
            const handleClick = (fieldName, fieldValue) => () => {
              this.selectCell(rowIndex, colIndex);
              onCellClick(fieldName, fieldValue);
            };
            const isSelected = selectedCell.row === rowIndex
                                && selectedCell.col === colIndex;

            return (
              <TableCell
                key={colIndex}
                className={classNames({
                  'selected': isSelected,
                })}
                onClick={handleClick}
              >
                {fieldValue}
              </TableCell>
            );
          })}
          {actions &&
          <TableCell>
            {this.getModifiedActions(row)}
          </TableCell>
          }
        </TableRow>
        ))}
      </TableBody>
    );
  }

  render() {
    const {
      className,
      data, // eslint-disable-line no-unused-vars
      onRowClick, // eslint-disable-line no-unused-vars
      onCellClick, // eslint-disable-line no-unused-vars
      actions, // eslint-disable-line no-unused-vars
      ...otherProps
    } = this.props;

    return (
      <div
        {...otherProps}
        className={classNames(
          'grid',
          className,
        )}
      >
        <Table>
          {this.renderHeader()}
          {this.renderBody()}
        </Table>
      </div>
    );
  }
}

Grid.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  className: PropTypes.string,
  onRowClick: PropTypes.func,
  onCellClick: PropTypes.func,
};

Grid.defaultProps = {
  onRowClick: function () {},
  onCellClick: function () {},
};

export default Grid;
