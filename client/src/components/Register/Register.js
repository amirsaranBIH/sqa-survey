import './Register.css';
import { useRef } from 'react';
import axios from 'axios';

function Register() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  function onSubmitHandler(e) {
    e.preventDefault();

    const emailValue = emailInputRef.current.value;
    const passwordValue = passwordInputRef.current.value;
    
    axios.post('http://localhost:3001/api/auth/register', {
      email: emailValue,
      password: passwordValue
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" ref={emailInputRef} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" ref={passwordInputRef} />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default Register;
