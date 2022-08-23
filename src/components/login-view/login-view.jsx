import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import { setUser, validateInput } from '../../actions/actions';
import { connect } from 'react-redux';
import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 or more characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password is required.');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be 6 or more characters long');
      isReq = false;
    }
    return isReq;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
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
  
      <Form>
         <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" vaue={username} onChange={e=>setUsername(e.target.value)} />
                {/* code added here to display validation error */}
                {usernameErr && <p>{usernameErr}</p>}
            </Form.Group>
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" vaue={password} onChange={e=>setPassword(e.target.value)} />
                 {/* code added here to display validation error */}
                {passwordErr && <p>{passwordErr}</p>}
            </Form.Group>
            <Button variant="primary" type='submit' onClick={handleSubmit}>Submit</Button><br></br>
            <Link to={`/register`} >
                <Button  type='button' variant="danger" className='btn'>Register</Button>
        </Link> 
      </Form>

   

  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};

export default LoginView 
}