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
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <nav class='NavLinks'>
        <LoginFormModal />
        <NavLink className='NavLinks' to="/signup">Sign Up</NavLink>
      </nav>
    );
  }

  return (
    <nav className='NavLinks'>
    <ul className='NavLinks'> 
        <NavLink className='NavLinks' exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
    </ul>
    </nav>
  );
}

export default Navigation;