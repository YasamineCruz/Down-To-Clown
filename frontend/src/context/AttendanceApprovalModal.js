// frontend/src/context/Modal.js
import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './AttendanceApprovalModal.css';

const AttendanceApprovalModalContext = React.createContext();

export function AttendanceApprovalModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])


  return (
    <>
      <AttendanceApprovalModalContext.Provider value={value}>
        {children}
      </AttendanceApprovalModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}


export function AttendanceApprovalModal({ onClose, children }) {
  const modalNode = useContext(AttendanceApprovalModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="attendance-approval-modal">
      <div id="attendance-approval-modal-background" onClick={onClose} />
      <div id="attendance-approval-modal-content">
        {children}
      </div>
    </div>,
    modalNode
  );
}