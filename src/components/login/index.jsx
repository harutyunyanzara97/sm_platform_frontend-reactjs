import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, {useState} from 'react';
import "../../assets/login.css"
import {BASE_URL} from "../../config/config";
import Swal from "sweetalert2";
import {json} from "Assets/plugins/c3-chart/d3.v5.min";

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoggedin, setIsLoggedin] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setErrorMsg("Incorrect email and/or password");
    } else if (password.length < 5) {
      setErrorMsg('Password must be at least 5 characters');
    } else {

      const data = {
        email: email,
        password: password
      };

      fetch(`${BASE_URL}user/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(jsondata => {
        if(jsondata.status ===false) {
          setErrorMsg(jsondata.message);

        }
        else {
          localStorage.removeItem('token');
          localStorage.setItem('token', jsondata.data.token)
          localStorage.setItem('user', JSON.stringify(jsondata.data.user))
          // localStorage.setItem('role', jsondata.data.role)
          setIsLoggedin(true);
          if (jsondata.data.type === 'productAdmin') {
            window.location.href = "/product-dashboard";
          } else {
            window.location.href = "/home";
          }
        }
      })

      .catch(error => {
        console.log(error);
      });
    }
  };

  return (
    <Form className='form' onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control className="form-control"  type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control className="form-control"  type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Remember me" className="form-check-label"/>
      </Form.Group>
      <Button variant="primary" type="submit" className="btn btn-primary" >
        Login
      </Button>
      {errorMsg && <p className="error_msg">{errorMsg}</p>}
    </Form>
  );
}

export default Login;