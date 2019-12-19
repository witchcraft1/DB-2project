import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTaskTable, fetchUserTable, deleteExec } from '../store/actions/';
import { Tab, Form, Label, Header } from 'semantic-ui-react';

class DeleteExec extends Component {
  componentWillMount() {
    this.props.fetchUserTable();
    this.props.fetchTaskTable();
    this.setState({ done: false })
  }
  handleSubmit = e => {
    if (this.state.user && this.state.task) {
      this.props.deleteExec({
        username: this.state.user,
        taskname: this.state.task
      });
      this.setState({ done: true });
    }
  }
  handleChangeUser = (e, { value }) => this.setState({ user: value });
  handleChangeTask = (e, { value }) => this.setState({ task: value });
  renderDone = () => {
    if (this.state.done)
      return this.props.msg.msg === 'done' ?
        <Label style={{ margin: '20px' }} size='big' color='green'>
          Done!
          <Header style={{ marginTop: '10px' }} as='h5'>Now check the table or refresh to continue</Header>
        </Label> :
        <Label style={{ margin: '20px' }} size='big' color='red'>
          Some issue has occured!
          <Header style={{ marginTop: '10px' }} as='h5'>{this.props.msg.msg}</Header>
        </Label>
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
            <Form.Select required options={
              this.props.userTable.map(key => ({ text: key.name, value: key.name }))
            } label='Choose a user' onChange={this.handleChangeUser} />
            <Form.Select required options={
              this.props.taskTable
                .filter(el => el.users.includes(this.state.user))
                .map(key => ({ text: key.name, value: key.name }))
            } label='Choose a task' onChange={this.handleChangeTask} />
            <Form.Button style={{
              marginTop: '22px'
            }} secondary onClick={this.handleSubmit}>Submit</Form.Button>
          </Form.Group>
        </Form>
        <div>{this.renderDone()}</div>
      </Tab.Pane>
    );
  }
}

export default connect(
  state => ({
    userTable: state.active.userTable,
    taskTable: state.active.taskTable,
    msg: state.active.msg
  }),
  { fetchUserTable, fetchTaskTable, deleteExec }
)(DeleteExec);