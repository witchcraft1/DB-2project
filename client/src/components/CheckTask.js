import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTaskTable, fetchUserTable } from '../store/actions/';
import { Tab, Form, List } from 'semantic-ui-react';

class SetTask extends Component {
  handleSelectTask = (e, { value }) => this.setState({ user: value });
  componentDidMount() {
    this.props.fetchTaskTable();
    this.props.fetchUserTable();
  }
  renderTask = () => {
    if (this.state)
      return (
        <List divided relaxed style={{ padding: '20px' }} >
          {this.props.taskTable.find(el => el.name === this.state.user).users.map((el, id) => (
            <List.Item key={id}>
              <List.Icon name='wheelchair' size='large' verticalAlign='middle' />
              <List.Content>
                <List.Header>{el}</List.Header>
              </List.Content>
            </List.Item>
          ))}
        </ List>
      )
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
              this.props.taskTable
                .map(key => ({ value: key.name, text: key.name, key: key.id }))
            } required label='Select a task' onChange={this.handleSelectTask} />
          </Form.Group>
        </Form>
        <div>{this.renderTask()}</div>
      </Tab.Pane>
    );
  }
}

export default connect(
  state => ({
    userTable: state.active.userTable,
    taskTable: state.active.taskTable
  }),
  { fetchTaskTable, fetchUserTable }
)(SetTask);