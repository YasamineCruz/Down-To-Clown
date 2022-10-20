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
  
  const handleSubmitDemoUser = (e) => {
    return dispatch(sessionActions.login({credential: 'demo@user.io', password: 'password'}))
  } 

  return (
    <form onSubmit={handleSubmit}>
     <div className='meetupIcon'>
        <img className='down-to-clown-icon' src='https://cdn-icons-png.flaticon.com/512/184/184390.png' alt=''/>
     </div>
      <div className='LogInWords'>Log In</div>
      <div className='DemoUserDiv'>
        <i className="fas fa-user-circle fa-2x login-fa" />
        <button type='submit' onClick={(e) => handleSubmitDemoUser(e)} className='DemoUserButton'>
        Demo User
       </button>
       </div>
       {errors && (
        <ul className='create-group-errors'>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))} 
     </ul>
      )}
      <div className='LoginContent'>
      <label className='loginlabel'>
        <h3 className='login-modal-text'>Email</h3>
        <input
          type="text"
          className='loginInput'
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label className='loginlabel'>
        <h3 className='login-modal-text'>Password</h3>
        <div>
           <input
          className='loginInput'
          type={passwordType}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.length <= 0 && (
        <i onClick={() => setChecked(!checked)} className={checked === true ? "fa-regular fa-eye-slash view-password-login-no-errrors"  :   "fa-regular fa-eye view-password-login-no-errrors"}></i>
        )}
        {errors.length >= 1 && (
           <i onClick={() => setChecked(!checked)} className={checked === true ? "fa-regular fa-eye-slash view-password-login-errrors"  :   "fa-regular fa-eye view-password-login-errrors"}></i>
        )}
        </div>
      </label>
        <button type="submit" className='loginButton'>Log In</button>
    </div>
    </form>
  );
}

export default LoginForm;