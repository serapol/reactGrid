import './styles.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from '../../components';
import { formatPhone } from '../../helpers/formats';

class UsersView extends Component {
  removeUser = (user) => {
    const { removeUser } = this.props.redux.actions.UsersActions;

    removeUser(user.id);
  };

  editUser = (user) => {
    const { linkTo } = this.props.redux.actions.GenericActions;

    linkTo(`/user/${user.id}`);
  };

  handleCellClick = (fieldName, fieldValue) => {
    // eslint-disable-next-line no-console
    console.log('handleCellClick', fieldName, fieldValue);
  };

  handleAddUserClick = () => {
    const { linkTo } = this.props.redux.actions.GenericActions;

    linkTo(`/user/new`);
  };

  render() {
    const { users } = this.props.redux.state;
    const gridData = {
      columns: [
        {header: 'User Name', field: 'name'},
        {header: 'Phone', field: 'phone'},
        {header: 'E-mail', field: 'email'},
      ],

      rows: users,
    };

    return (
      <div className="users-view">
        <h1>Users</h1>
        <Grid
          data={gridData}
          formatDataRules={{
            phone: formatPhone,
          }}
          actions={[
            <Button
              key="edit-btn"
              onClick={this.editUser}
            >
              <span className="glyphicon glyphicon-pencil"/>
            </Button>,
            <Button
              key="remove-btn"
              onClick={this.removeUser}
            >
              <span className="glyphicon glyphicon-trash"/>
            </Button>,
          ]}
          onCellClick={this.handleCellClick}
        />
        <div className="row">
          <Button
            type="primary"
            onClick={this.handleAddUserClick}
          >
            Add user
          </Button>

        </div>
      </div>
    );
  }
}

UsersView.propTypes = {
  redux: PropTypes.object,
};

export default UsersView;
