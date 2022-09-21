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
        <>
        <ProfileButton user={sessionUser} />
        <NavLink className='NavLinks' to='/start/location'>Create a Group</NavLink>
        </>
        
    )
  } else {
    sessionLinks = (
      <nav className='NavLinks'>
        <LoginFormModal />
        <NavLink className='NavLinks' to="/signup">Sign Up</NavLink>
      </nav>
    );
  }

  return (
    <nav className='NavLinks'>
      <NavLink className='MeetupLogo' exact to="/">
          <img className='MeetupLogo' src='https://www.meetup.com/mu_static/en-US/logo--script.257d0bb1.svg' alt='text'/>
        </NavLink>
    <ul className='NavLinks'>
        {isLoaded && sessionLinks}
    </ul>
    </nav>
  );
}

export default Navigation;