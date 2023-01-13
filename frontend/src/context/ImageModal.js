// frontend/src/context/ImageModal.js
import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './ImageModal.css';

const ImageModalContext = React.createContext();

export function ImageModalProvider({ children }) {
  const ImageModalRef = useRef();
  const [value, setValue] = useState();
    
  useEffect(() => {
    setValue(ImageModalRef.current);
  }, [])


  return (
    <>
      <ImageModalContext.Provider value={value}>
        {children}
      </ImageModalContext.Provider>
      <div ref={ImageModalRef} />
    </>
  );
}


export function ImageModal({ onClose, children }) {
  const ImageModalNode = useContext(ImageModalContext);
  if (!ImageModalNode) return null;
  

  return ReactDOM.createPortal(
    <div id="ImageModal">
      <div id="ImageModal-background" onClick={onClose} />
      <div id="ImageModal-content">
        {children}
      </div>
    </div>,
    ImageModalNode
  );
}