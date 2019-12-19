import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteUser, fetchUserTable } from '../store/actions/';
import { Tab, Form, Label, Header } from 'semantic-ui-react';

class DeleteUser extends Component {
  state = {
    done: false
  }
  componentDidMount() {
    this.props.fetchUserTable();
    this.setState({ done: false })
  }
  handleSubmit = e => {
    if (this.state.user) {
      this.props.deleteUser(this.state.user);
      this.setState({ done: true });
    }
  }
  handleChange = (e, { value }) => this.setState({ user: value });
  renderDone = () => {
    if (this.props.msg && this.state.done)
      return this.props.msg === 'done' ?
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
            } label='Choose a user you want to delete' onChange={this.handleChange} />
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
    msg: state.active.msg
  }),
  { fetchUserTable, deleteUser }
)(DeleteUser);