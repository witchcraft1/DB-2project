import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTask } from '../store/actions/';
import { Tab, Form, Label, Header } from 'semantic-ui-react';

class AddTask extends Component {
  state = {
    name: '',
    done: false
  }
  handleChange = (e, { value }) => this.setState({ name: value });
  handleSubmit = e => {
    if (this.state.name) {
      this.props.addTask({ name: this.state.name });
      this.setState({ done: true });
    }
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
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
          }} widths={2}>
            <Form.Input required onChange={this.handleChange} label='Name' placeholder='Name' />
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
  null,
  { addTask }
)(AddTask);