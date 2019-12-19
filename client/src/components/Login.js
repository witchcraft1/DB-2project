import React, { Component } from 'react';
import { logIn, check, signUp } from '../store/actions/';
import { connect } from 'react-redux';
import { Button, Header, Icon, Segment, Form } from 'semantic-ui-react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { login: true };
  }
  componentWillMount() {
    this.props.check();
  }
  handleSubmit = () => {
    if (this.state.name && this.state.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/) && this.state.pwd) {
      this.props.signUp({
        name: this.state.name,
        email: this.state.email,
        pwd: this.state.pwd
      });
    }
  }
  renderLogin() {
    return (
      <Segment placeholder>
        <Header style={{ paddingTop: '20px' }} icon>
          <Icon name='lock' />
          Log into the database
                    </Header>
        <Form unstackable>
          <Form.Group style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '20px'
          }}
            widths={2}>
            <Form.Input label='Your email' onChange={(e, { value }) => this.setState({ email: value })} placeholder='Your email' />
            <Form.Input type="password" label='Password' onChange={(e, { value }) => this.setState({ pwd: value })} placeholder='Password' />
          </Form.Group>
          <Button style={{ marginBottom: '20px' }} secondary onClick={() => this.props.logIn({ login: this.state ? this.state.email : '', pwd: this.state ? this.state.pwd : '' })}>Log In</Button>
          <Button style={{ marginBottom: '20px' }} secondary onClick={() => this.setState({ login: false })}>Sign Up</Button>

        </Form>
      </Segment>
    );
  }
  renderRegistr() {
    return (
      <Segment placeholder>
        <Header style={{ paddingTop: '20px' }} icon>
          <Icon name='lock' />
          Sign into the database
                    </Header>
        <Form unstackable>
          <Form.Group style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '20px'
          }}
            widths={2}>
            <Form.Input label='Your name' onChange={(e, { value }) => this.setState({ name: value })} placeholder='Your name' />
            <Form.Input label='Your @email' onChange={(e, { value }) => this.setState({ email: value })} placeholder='Your email' />
            <Form.Input type="password" label='Password' onChange={(e, { value }) => this.setState({ pwd: value })} placeholder='Password' />
          </Form.Group>
          <Button style={{ marginBottom: '20px' }} secondary onClick={() => this.setState({ login: true })}>Log In</Button>
          <Button style={{ marginBottom: '20px' }} secondary onClick={this.handleSubmit}>Sign Up</Button>
        </Form>
      </Segment>
    );
  }
  render() {
    return this.state.login ? this.renderLogin() : this.renderRegistr();
  }
}

export default connect(
  null,
  { logIn, check, signUp }
)(Login);