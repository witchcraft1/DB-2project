import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTaskTable, setTaskState } from '../store/actions/';
import { Tab, Form, Label, Header } from 'semantic-ui-react';

class SetTask extends Component {
  state = {
    taskname: 0,
    done: false,
    stateTable: ["working on", "almost done", "pending admin check", "done"]
  }
  handleSelectTask = (e, { value }) => {
    this.setState({ taskname: value });
  }
  handleSelectState = (e, { value }) => this.setState({ state: value });
  handleSubmit = e => {
    if (this.state.taskname && this.state.state) {
      this.props.setTaskState({
        taskname: this.state.taskname,
        state: this.state.state
      })
      this.setState({ done: true });
    }
  }
  componentDidMount() {
    this.props.fetchTaskTable();
  }
  renderDone() {
    if (this.state.done) {
      return (
        <Label style={{ margin: '20px' }} size='big' color='green'>
          Done!
          <Header style={{ marginTop: '10px' }} as='h5'>Now check the table or refresh to continue</Header>
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
              this.props.taskTable.map(key => ({ text: key.name, value: key.name }))
            } required label='Select a task' onChange={this.handleSelectTask} />
            <Form.Input onChange={this.handleSelectState} required placeholder='State' label='State' />
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
    taskTable: state.active.taskTable
  }),
  { fetchTaskTable, setTaskState }
)(SetTask);