import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Alert } from 'react-bootstrap';
import loader from '../loaders/loaderPost';
import { HOST, PORT, REGISTER } from '../../config/uriparts';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'newUser',
      email: 'newUser@email.com',
      password: 'newuser',
      status: null,
      error: null,
      message: '',
      alert: '',
    };

    this.setUsername = this.setUsername.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.loader = loader.bind(this);
  }

  setUsername(event) {
    this.setState({ username: event.target.value });
  }

  setEmail(event) {
    this.setState({ email: event.target.value });
  }

  setPassword(event) {
    this.setState({ password: event.target.value });
  }

  handleRegister(event) {
    event.preventDefault();
    const url = `${HOST}:${PORT}${REGISTER}`;
    this.loader(url, this.state);
  }

  render() {
    return (
      <>
        <h2 className="text-secondary text-center">Register</h2>
        <Alert variant={ this.state.alert }>{ this.state.status } { this.state.message }</Alert>
        <Form>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" value={this.state.username} onChange={this.setUsername} placeholder="Enter username" />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" value={this.state.email} onChange={this.setEmail} placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={this.state.password} onChange={this.setPassword} placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.handleRegister}>
            Register
          </Button>
        </Form>
      </>
    );
  }
}

export default RegisterForm;
