import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';


const SignupForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [passwordType, setPasswordType] = useState('password')
    const [checked, setChecked] = useState(false)

    
    useEffect(()=> {
      if(checked) setPasswordType('text')
      else setPasswordType('password')
    }, [passwordType, checked])

    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(password === confirmPassword){
          setErrors([]);
          return dispatch(sessionActions.signup({ username, email, firstName, lastName, password}))
          .catch(async (res) => {
            const data = await res.json();
            if(data && data.errors) setErrors(data.errors)
        })
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    }
    
    return (
        <div className='signupDiv'>
        <form onSubmit={handleSubmit} className='signupForm'>
            <ul className='create-group-errors'>
                {errors.map((errors, idx) => <li key={idx}>{errors}</li>)}
            </ul>
            <div className='meetupIcon'>
              <img className='down-to-clown-icon' src='https://cdn-icons-png.flaticon.com/512/184/184390.png' alt=''/>
            </div>
            <div className='LogInWords'>Sign up</div>
            <div className='LoginContent'>
          <label className='loginlabel'>
            <h3 className='login-modal-text'>Username</h3>
            <input
            className='loginInput' 
            type='text' 
            placeholder='Enter unique username' 
            onChange={(e)=> setUsername(e.target.value)} 
            value={username} 
            name={username}
            required/>
          </label>
          <label className='loginlabel'>
            <h3 className='login-modal-text'>Email</h3>
            <input
            className='loginInput'  
            type='text' 
            placeholder='Enter email' 
            onChange={(e)=> setEmail(e.target.value)} 
            value={email} 
            name={email}
            required/>
          </label>
          <label className='loginlabel'>
            <h3 className='login-modal-text'>First name</h3>
            <input
            className='loginInput'  
            type='text' 
            placeholder='Enter first name' 
            onChange={(e)=> setFirstName(e.target.value)} 
            value={firstName} 
            name={firstName}
            required/>
          </label>
          <label className='loginlabel'>
            <h3 className='login-modal-text'>Last name</h3>
            <input
            className='loginInput'  
            type='text' 
            placeholder='Enter last name' 
            onChange={(e)=> setLastName(e.target.value)} 
            value={lastName} 
            name={lastName}
            required/>
          </label>
          <label className='signuplabel'>
            <h3 className='login-modal-text'>Password</h3>
            <div>
              <input 
                className='loginInput' 
                type={passwordType} 
                placeholder='Enter password' 
                onChange={(e)=> setPassword(e.target.value)} 
                value={password} 
                name={password}
                required/>
                  <i onClick={() => setChecked(!checked)} className={checked === true ? "fa-regular fa-eye-slash view-password2" :   "fa-regular fa-eye view-password2"}></i>
            </div>
          </label>
          <label className='signuplabel'>
            <h3 className='login-modal-text'>Confirm Password</h3>
            <div>
               <input 
                  className='loginInput' 
                  type={passwordType}
                  placeholder='Enter password' 
                  onChange={(e)=> setConfirmPassword(e.target.value)} 
                  value={confirmPassword} 
                  name={confirmPassword}
                  required/>
                  <i onClick={() => setChecked(!checked)} className={checked === true ? "fa-regular fa-eye-slash view-password3" :   "fa-regular fa-eye view-password3"}></i>
            </div> 
          </label>
          <button type='submit' className='loginButton'>Sign up</button>
          </div>    
        </form>
        </div>
    )
};

export default SignupForm;