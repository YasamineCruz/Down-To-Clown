// frontend/src/context/Modal.js
import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './DeleteAttendanceModal.css';

const DeleteAttendanceModalContext = React.createContext();

export function DeleteAttendanceModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])


  return (
    <>
      <DeleteAttendanceModalContext.Provider value={value}>
        {children}
      </DeleteAttendanceModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}


export function DeleteAttendanceModal({ onClose, children }) {
  const modalNode = useContext(DeleteAttendanceModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="delete-attendance-modal">
      <div id="delete-attendance-modal-background" onClick={onClose} />
      <div id="delete-attendance-modal-content">
        {children}
      </div>
    </div>,
    modalNode
  );
}