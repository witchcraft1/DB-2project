import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserTable, fetchTaskTable } from '../store/actions/';
import { Tab, Form, List } from 'semantic-ui-react';

class SetTask extends Component {
  handleSelectUser = (e, { value }) => this.setState({ task: value });
  componentDidMount() {
    this.props.fetchUserTable();
    this.props.fetchTaskTable();
  }
  renderTask = () => {
    if (this.state)
      return (
        <List divided relaxed style={{ padding: '20px' }} >
          {
            this.props.userTable.find(el => el.name === this.state.task).tasks.map((el, id) => (
              <List.Item key={id}>
                <List.Icon name='wheelchair' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header>{el}</List.Header>
                  <List.Description>{this.props.taskTable.find(elem => elem.name === el).state}</List.Description>
                  <List.Description>{this.props.taskTable.find(elem => elem.name === el).updatedAt}</List.Description>
                </List.Content>
              </List.Item>
            ))
          }
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
              this.props.userTable.map(key => ({ text: key.name, value: key.name, key: key.id }))
            } required label='Select a user' onChange={this.handleSelectUser} />
          </Form.Group>
        </Form>
        {this.renderTask()}
      </Tab.Pane>
    );
  }
}

export default connect(
  state => ({
    userTable: state.active.userTable,
    taskTable: state.active.taskTable
  }),
  { fetchUserTable, fetchTaskTable }
)(SetTask);