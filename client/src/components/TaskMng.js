import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddTask from './AddTask';
import SetTaskState from './SetTaskState';
import SetTask from './SetTask';
import CheckTask from './CheckTask';
import { Tab } from 'semantic-ui-react';

class TaskMng extends Component {
	state = {
		panes: [
			{ menuItem: 'Add new task to database', render: () => <AddTask /> },
			{ menuItem: 'Set task state', render: () => <SetTaskState /> },
			{ menuItem: 'Check executors', render: () => <CheckTask /> },
			{ menuItem: 'Apply task to a user', render: () => <SetTask /> }
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
)(TaskMng);