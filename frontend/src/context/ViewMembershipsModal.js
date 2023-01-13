// frontend/src/context/Modal.js
import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './ViewMembershipsModal.css';

const ViewMembershipsModalContext = React.createContext();

export function ViewMembershipsModalProvider({ children }) {
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current);
    }, [])


    return (
        <>
            <ViewMembershipsModalContext.Provider value={value}>
                {children}
            </ViewMembershipsModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
}


export function ViewMembershipsModal({ onClose, children }) {
    const modalNode = useContext(ViewMembershipsModalContext);
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <div id="view-memberships-modal">
            <div id="view-memberships-modal-background" onClick={onClose} />
            <div id="view-memberships-modal-content">
                {children}
            </div>
        </div>,
        modalNode
    );
}