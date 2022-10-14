import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';


const SignupForm = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
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
            <ul>
                {errors.map((errors, idx) => <li key={idx}>{errors}</li>)}
            </ul>
            <div className='meetupIcon'>
                <i className="fa-brands fa-meetup fa-5x"></i>  
            </div>
          <label className='signupLabel'>
            Username
            <input
            className='signupInput' 
            type='text' 
            placeholder='Enter unique username' 
            onChange={(e)=> setUsername(e.target.value)} 
            value={username} 
            name={username}
            required/>
          </label>
          <label className='signupLabel'>
            Email
            <input
            className='signupInput'  
            type='text' 
            placeholder='Enter email' 
            onChange={(e)=> setEmail(e.target.value)} 
            value={email} 
            name={email}
            required/>
          </label>
          <label className='signupLabel'>
            First Name
            <input
            className='signupInput'  
            type='text' 
            placeholder='Enter first name' 
            onChange={(e)=> setFirstName(e.target.value)} 
            value={firstName} 
            name={firstName}
            required/>
          </label>
          <label className='signupLabel'>
            Last Name
            <input
            className='signupInput'  
            type='text' 
            placeholder='Enter last name' 
            onChange={(e)=> setLastName(e.target.value)} 
            value={lastName} 
            name={lastName}
            required/>
          </label>
          <label className='signupLabel'>
            Password
            <input 
            className='signupInput' 
            type={passwordType} 
            placeholder='Enter password' 
            onChange={(e)=> setPassword(e.target.value)} 
            value={password} 
            name={password}
            required/>
          </label>
          <label className='signupLabel'>
            Confirm Password
            <input 
            className='signupInput' 
            type={passwordType}
            placeholder='Enter password' 
            onChange={(e)=> setConfirmPassword(e.target.value)} 
            value={confirmPassword} 
            name={confirmPassword}
            required/>
          </label>
          <label className='togglePassword'>
            Show Password
          <input type='checkbox' 
          onChange={() => setChecked(!checked)} 
          checked={checked}/>
          </label>
          <button type='submit' className='signupButton'>Sign up</button>    
        </form>
        </div>
    )
};

export default SignupForm;