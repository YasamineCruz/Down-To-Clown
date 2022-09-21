// frontend/src/context/GroupModal.js
import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './GroupModal.css';

const GroupModalContext = React.createContext();

export function GroupModalProvider({ children }) {
  const groupmodalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(groupmodalRef.current);
  }, [])

  return (
    <>
      <GroupModalContext.Provider value={value}>
        {children}
      </GroupModalContext.Provider>
      <div ref={groupmodalRef} />
    </>
  );
}

export function GroupModal({ onClose, children }) {
  const groupmodalNode = useContext(GroupModalContext);
  if (!groupmodalNode) return null;

  return ReactDOM.createPortal(
    <div id="groupmodal">
      <div id="groupmodal-background" onClick={onClose} />
      <div id="groupmodal-content">
        {children}
      </div>
    </div>,
    groupmodalNode
  );
}