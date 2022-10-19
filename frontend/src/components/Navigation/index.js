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
      <NavLink className='MeetupLogo' exact to="/">
          <img className='MeetupLogo' src='https://cdn-icons-png.flaticon.com/512/184/184390.png' alt='text'/>
        </NavLink>
    <div>
        {isLoaded && sessionLinks}
    </div>
    </nav>
  );
}

export default Navigation;