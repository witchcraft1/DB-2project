import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddUser from './AddUser';
import DeleteUser from './DeleteUser';
import DeleteExec from './DeleteExec';
import CheckUser from './CheckUser';
import { Tab } from 'semantic-ui-react';

class UserMng extends Component {
    state = {
        panes: [
            { menuItem: 'Add new user to database', render: () => <AddUser /> },
            { menuItem: 'Delete user from database', render: () => <DeleteUser /> },
            { menuItem: 'Check user\'s tasks', render: () => <CheckUser /> },
            { menuItem: 'Delete an executor from a task', render: () => <DeleteExec /> }
        ]
    }
    render() {
        return (
            <Tab panes={this.state.panes} />
        );
    }
}

export default connect(
    null,
    null
)(UserMng);