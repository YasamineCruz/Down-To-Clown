// frontend/src/context/MembershipModal.js
import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Membership.css';

const MembershipModalContext = React.createContext();

export function MembershipModalProvider({ children }) {
  const MembershipModalRef = useRef();
  const [value, setValue] = useState();
    
  useEffect(() => {
    setValue(MembershipModalRef.current);
  }, [])


  return (
    <>
      <MembershipModalContext.Provider value={value}>
        {children}
      </MembershipModalContext.Provider>
      <div ref={MembershipModalRef} />
    </>
  );
}


export function MembershipModal({ onClose, children }) {
  const MembershipModalNode = useContext(MembershipModalContext);
  if (!MembershipModalNode) return null;
  

  return ReactDOM.createPortal(
    <div id="MembershipModal">
      <div id="MembershipModal-background" onClick={onClose} />
      <div id="MembershipModal-content">
        {children}
      </div>
    </div>,
    MembershipModalNode
  );
}