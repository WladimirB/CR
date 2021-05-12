import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Alert } from 'react-bootstrap';
import loader from '../loaders/loaderPost';
import {
  HOST, PORT, SIGN_IN, SIGN_OUT,
} from '../../config/uriparts';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'newUser',
      password: 'newuser',
      status: null,
      error: null,
      message: '',
      alert: '',
    };

    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.loader = loader.bind(this);
  }

  setUsername(event) {
    this.setState({ username: event.target.value });
  }

  setPassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSignIn(event) {
    event.preventDefault();
    const url = `${HOST}:${PORT}${SIGN_IN}`;
    this.loader(url, this.state);
  }

  handleLogout(event) {
    event.preventDefault();
    const url = `${HOST}:${PORT}${SIGN_OUT}`;
    this.loader(url, this.state, { Authorization: 'logout' });
  }

  render() {
    if (this.props.context.isLogged) {
      return (
        <>
          <h2 className="text-secondary text-center">Logout</h2>
          <Alert variant={this.state.alert}>
            {this.state.status}
            {' '}
            {this.state.message}
          </Alert>
          <Form>
            <Button variant="primary" type="submit" onClick={this.handleLogout}>
              Logout
            </Button>
          </Form>
        </>
      );
    }
    return (
      <>
        <h2 className="text-secondary text-center">Login</h2>
        <Alert variant={this.state.alert}>
          {this.state.status}
          {' '}
          {this.state.message}
        </Alert>
        <Form>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" value={this.state.username} onChange={this.setUsername} placeholder="Enter username" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={this.state.password} onChange={this.setPassword} placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.handleSignIn}>
            Login
          </Button>
        </Form>
      </>
    );
  }
}

export default LoginForm;
