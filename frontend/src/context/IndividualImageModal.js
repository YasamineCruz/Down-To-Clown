// frontend/src/context/IndividualImageModal.js
import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './IndividualImageModal.css';

const IndividualImageModalContext = React.createContext();

export function IndividualImageModalProvider({ children }) {
  const IndividualImageModalRef = useRef();
  const [value, setValue] = useState();
    
  useEffect(() => {
    setValue(IndividualImageModalRef.current);
  }, [])


  return (
    <>
      <IndividualImageModalContext.Provider value={value}>
        {children}
      </IndividualImageModalContext.Provider>
      <div ref={IndividualImageModalRef} />
    </>
  );
}


export function IndividualImageModal({ onClose, children }) {
  const IndividualImageModalNode = useContext(IndividualImageModalContext);
  if (!IndividualImageModalNode) return null;
  

  return ReactDOM.createPortal(
    <div id="IndividualImageModal">
      <div id="IndividualImageModal-background" onClick={onClose} />
      <div id="IndividualImageModal-content">
        {children}
      </div>
    </div>,
    IndividualImageModalNode
  );
}