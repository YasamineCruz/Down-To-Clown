// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';

import './Navigation.css';


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
        <div className='divForLinks'>
        <NavLink className='createAGroupText' to='/start/location'>Create a Group</NavLink>
        <ProfileButton user={sessionUser} />
        </div>
        
    )
  } else {
    sessionLinks = (
      <nav className='navLinks'>
        <LoginFormModal />
        <NavLink className='NavLinks' to="/signup">Sign Up</NavLink>
      </nav>
    );
  }

  return (
    <nav className='navLinks'>
      <NavLink className='MeetupLogo' exact to="/">
          <img className='MeetupLogo' src='https://www.meetup.com/mu_static/en-US/logo--script.257d0bb1.svg' alt='text'/>
        </NavLink>
    <div>
        {isLoaded && sessionLinks}
    </div>
    </nav>
  );
}

export default Navigation;