// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [arrow, setArrow] = useState('fa-solid fa-angle-up navArrow')
  const sessionUser = useSelector(state => state.session.user);

  const openMenu = () => {
    if (showMenu) {
      setArrow('fa-solid fa-angle-up navArrow')
      return
    };
    setShowMenu(true);
    setArrow("fa-sharp fa-solid fa-angle-down navArrow")
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
    <div className='button-Container'>
      <div className='outerCircle' onClick={openMenu}></div>
      <button className="circles" onClick={openMenu}>
        { sessionUser && (
          <div className='sessionUserInitial'>
            {sessionUser.firstName[0]}
          </div>
        )}
      </button>
      <i class={arrow} onClick={openMenu}></i>
      <div>
      </div>
      {showMenu && (
        <div className="profile-dropdown">
          <div className='profile-dropdown-text'>
            <Link className='navGroupLink' to='/user/groups'>Your groups</Link>
          </div>
          <div className='line'></div>
          <div className='profile-dropdown-text'>{user.username}</div>
          <div className='profile-dropdown-text'>{user.email}</div>
          <div className='profile-dropdown-text'>
            <div onClick={logout}>Log Out</div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}

export default ProfileButton;