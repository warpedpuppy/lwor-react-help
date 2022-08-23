import React, { useState } from 'react';
import { Form, Card, Col, Row, Container, CardGroup, Button } from "react-bootstrap";

import axios from 'axios';
import PropTypes from 'prop-types'

import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    /* Send a request to the server for authentication */
    axios.post('https://intense-ridge-76926.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  return (
    <div className="login-view">
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label id="label" >Username:</Form.Label>
          <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label id="label" >Password:</Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>

  );
}