// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [passwordType, setPasswordType] = useState('password');
  const [checked, setChecked] = useState(false);
    
  useEffect(()=> {
    if(checked) setPasswordType('text')
    else setPasswordType('password')
  }, [passwordType, checked])


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
        <div className='meetupIcon'>
            <i className="fa-brands fa-meetup fa-5x"></i>  
        </div>
      <div>Log In</div>
      </ul>
      <label className='loginlabel'>
        Email
        <input
          type="text"
          className='loginInput'
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label className='loginlabel'>
        Password
        <input
          className='loginInput'
          type={passwordType}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label className='togglePassword'>
        Show Password
          <input type='checkbox' 
          onChange={() => setChecked(!checked)} 
          checked={checked}/>
          </label>
      <button type="submit" className='loginButton'>Log In</button>
    </form>
  );
}

export default LoginForm;