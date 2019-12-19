import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTask, fetchTaskTable, fetchUserTable } from '../store/actions/';
import { Tab, Form, Label, Header } from 'semantic-ui-react';

class SetTask extends Component {
    state = {
        username: 0,
        taskname: 0,
        done: false
    }
    handleSelectUser = (e, { value }) => {
        this.setState({ username: value });
    }
    handleSelectTask = (e, { value }) => {
        this.setState({ taskname: value });
    }
    handleSubmit = e => {
        if (this.state.username && this.state.taskname) {
            this.props.setTask({
                username: this.state.username,
                taskname: this.state.taskname
            });
            this.setState({ done: true });
        }
    }
    componentDidMount() {
        this.props.fetchTaskTable();
        this.props.fetchUserTable();
    }
    renderDone() {
        if (this.state.done) {
            return (
                <Label style={{ margin: '20px' }} size='big' color='green'>
                    Done!
                    <Header style={{ marginTop: '10px' }} as='h5'>
                        Now check the table or refresh to continue
                    </Header>
                </Label>
            )
        }
    }
    render() {
        return (
            <Tab.Pane>
                <Form unstackable>
                    <Form.Group style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '20px'
                    }} widths={2}>
                        <Form.Select options={
                            this.props.userTable.map(key => ({ text: key.name, value: key.name }))
                        } required label='Select a user' onChange={this.handleSelectUser} />
                        <Form.Select options={
                            this.props.taskTable.map(key => ({ text: key.name, value: key.name }))
                        } required label='Select a task' onChange={this.handleSelectTask} />
                        <Form.Button secondary style={{
                            marginTop: '22px'
                        }} onClick={this.handleSubmit}>Submit</Form.Button>
                    </Form.Group>
                </Form>
                <div>{this.renderDone()}</div>
            </Tab.Pane>
        );
    }
}

export default connect(
    state => ({
        taskTable: state.active.taskTable,
        userTable: state.active.userTable
    }),
    { fetchTaskTable, fetchUserTable, setTask }
)(SetTask);