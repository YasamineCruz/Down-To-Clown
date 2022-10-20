// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';

import './Navigation.css';
import SignupFormModal from '../SignupFormModal';


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
        <div className='divForLinks'>
        <NavLink className='createAGroupText' to='/start/location'>Start a new group - 100% off!</NavLink>
        <ProfileButton user={sessionUser} />
        </div>
        
    )
  } else {
    sessionLinks = (
      <nav className='navLinks'>
        <LoginFormModal />
        <SignupFormModal />
      </nav>
    );
  }

  return (
    <nav className='navLinks'>
      <NavLink className='MeetupLogoContainer' exact to="/">
          <img className='MeetupLogo' src='https://cdn-icons-png.flaticon.com/512/184/184390.png' alt='text'/>
          <img className='Down-To-Clown-Logo' src='https://api.logo.com/api/v2/images?format=webp&logo=logo_bfafb3f0-5f63-4779-a694-f1b3f22e91d3&width=1000&background=transparent&fit=contain&u=1666303194' alt=''/>
        </NavLink>
    <div>
        {isLoaded && sessionLinks}
    </div>
    </nav>
  );
}

export default Navigation;