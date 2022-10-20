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
    const [checked, setChecked] = useState(false);
    const [submitted, setSubmitted] = useState(false)

    
    useEffect(()=> {
      if(checked) setPasswordType('text')
      else setPasswordType('password')
    }, [passwordType, checked])

    useEffect(()=> {
      let validationErrors = []
      if(username.length < 4) validationErrors.push('Please provide a username with at least 4 characters.')
      if(firstName.length < 2) validationErrors.push('First name must be at least 2 characters.')
      if(lastName.length < 2) validationErrors.push('Last name must be at least 2 characters.')
      if(password.length < 6) validationErrors.push('Password must be 6 characters or more.')
      if(!email.includes('@') || !email.includes('.com')) validationErrors.push('Invalid email')
      if(password !== confirmPassword) validationErrors.push('Confirm Password field must be the same as the Password field')
      setErrors(validationErrors)
    },[username, firstName, lastName, password, email])

    
    const handleSubmit = (e) => {
        e.preventDefault();

        setSubmitted(true);

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

    console.log(errors)
    
    return (
        <div className='signupDiv'>
        <form onSubmit={handleSubmit} className='signupForm'>
            <div className='meetupIcon'>
              <img className='down-to-clown-icon' src='https://cdn-icons-png.flaticon.com/512/184/184390.png' alt=''/>
            </div>
            <div className='LogInWords'>Sign up</div>
          {errors && submitted === true && (
            <ul className='signup-errors'>
            {errors.map((errors, idx) => <li className='errors-li' key={idx}>{errors}</li>)}
            </ul>
          )}

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
                {submitted === false && (
                  <i onClick={() => setChecked(!checked)} className={checked === true ? "fa-regular fa-eye-slash view-password-signup-no-errors" :   "fa-regular fa-eye view-password-signup-no-errors"}></i>
                )}
                {errors.length <= 0 && submitted === true && (
                  <i onClick={() => setChecked(!checked)} className={checked === true ? "fa-regular fa-eye-slash view-password-signup-no-errors" :   "fa-regular fa-eye view-password-signup-no-errors"}></i>
                )}
                {errors.length <= 1 && submitted === true && errors[0] === 'Confirm Password field must be the same as the Password field' && (
                  <i onClick={() => setChecked(!checked)} className={checked === true ? "fa-regular fa-eye-slash view-password-signup-two-errors" :   "fa-regular fa-eye view-password-signup-two-errors"}></i>
                )}
                {errors.length === 1 && submitted === true && errors[0] !== 'Confirm Password field must be the same as the Password field' && (
                  <i onClick={() => setChecked(!checked)} className={checked === true ? "fa-regular fa-eye-slash view-password-signup-one-errors" :   "fa-regular fa-eye view-password-signup-one-errors"}></i>
                )}
                {errors.length === 2 && submitted === true &&  (
                  <i onClick={() => setChecked(!checked)} className={checked === true ? "fa-regular fa-eye-slash view-password-signup-two-errors" :   "fa-regular fa-eye view-password-signup-two-errors"}></i>
                )}
                {errors.length === 3 && submitted === true &&  (
                  <i onClick={() => setChecked(!checked)} className={checked === true ? "fa-regular fa-eye-slash view-password-signup-three-errors" :   "fa-regular fa-eye view-password-signup-three-errors"}></i>
                )}
                {errors.length === 4 && submitted === true &&  (
                  <i onClick={() => setChecked(!checked)} className={checked === true ? "fa-regular fa-eye-slash view-password-signup-four-errors" :   "fa-regular fa-eye view-password-signup-four-errors"}></i>
                )}
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
                  {submitted === false && (
                    <i onClick={() => setChecked(!checked)} className={checked === true ? "fa-regular fa-eye-slash view-password2-signup-no-errors" :   "fa-regular fa-eye view-password2-signup-no-errors"}></i>
                  )}
                  {errors.length <= 0 && submitted === true && (
                    <i onClick={() => setChecked(!checked)} className={checked === true ? "fa-regular fa-eye-slash view-password2-signup-no-errors" :   "fa-regular fa-eye view-password2-signup-no-errors"}></i>
                  )}
                  {errors.length <= 1 && submitted === true && errors[0] === 'Confirm Password field must be the same as the Password field' && (
                    <i onClick={() => setChecked(!checked)} className={checked === true ? "fa-regular fa-eye-slash view-password2-signup-two-errors" :   "fa-regular fa-eye view-password2-signup-two-errors"}></i>
                  )}
                  {errors.length === 1 && submitted === true && errors[0] !== 'Confirm Password field must be the same as the Password field' && (
                  <i onClick={() => setChecked(!checked)} className={checked === true ? "fa-regular fa-eye-slash view-password2-signup-one-errors" :   "fa-regular fa-eye view-password2-signup-one-errors"}></i>
                )}
                {errors.length === 2 && submitted === true && (
                  <i onClick={() => setChecked(!checked)} className={checked === true ? "fa-regular fa-eye-slash view-password2-signup-two-errors" :   "fa-regular fa-eye view-password2-signup-two-errors"}></i>
                )}
                {errors.length === 3 && submitted === true &&  (
                  <i onClick={() => setChecked(!checked)} className={checked === true ? "fa-regular fa-eye-slash view-password2-signup-three-errors" :   "fa-regular fa-eye view-password2-signup-three-errors"}></i>
                )}
                {errors.length === 4 && submitted === true &&  (
                  <i onClick={() => setChecked(!checked)} className={checked === true ? "fa-regular fa-eye-slash view-password2-signup-four-errors" :   "fa-regular fa-eye view-password2-signup-four-errors"}></i>
                )}
            </div> 
          </label>
          <button type='submit' className='loginButton'>Sign up</button>
          </div>    
        </form>
        </div>
    )
};

export default SignupForm;