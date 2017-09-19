import './style.scss';
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
      selectedCell: {
        row,
        col,
      }
    });
  };

  getModifiedActions(data) {
    const { actions } = this.props;
    const modifyElement = (element) => React.cloneElement(element, {
      onClick: (e) => {
        const { onClick } = element.props;

        if (onClick) {
          e.stopPropagation();
          onClick(data);
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
      formatDataRules,
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
            const isSelected = selectedCell.row === rowIndex
              && selectedCell.col === colIndex;
            const handleClick = (e) => {
              e.stopPropagation();
              this.selectCell(rowIndex, colIndex);
              onCellClick(fieldName, fieldValue);
            };
            const formatDataHandler = formatDataRules[fieldName];

            return (
              <TableCell
                key={colIndex}
                className={classNames({
                  'selected': isSelected,
                })}
                onClick={handleClick}
              >
                {formatDataHandler ? formatDataHandler(fieldValue) : fieldValue}
              </TableCell>
            );
          })}
          {actions &&
          <TableCell>
            <div className="actions-cell">
              {this.getModifiedActions(row)}
            </div>
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
      formatDataRules, // eslint-disable-line no-unused-vars
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
  formatDataRules: PropTypes.object,
  actions: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
  className: PropTypes.string,
  onRowClick: PropTypes.func,
  onCellClick: PropTypes.func,
};

Grid.defaultProps = {
  formatDataRules: {},
  onRowClick: function () {},
  onCellClick: function () {},
};

export default Grid;
