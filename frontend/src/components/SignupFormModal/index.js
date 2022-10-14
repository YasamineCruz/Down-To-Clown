// frontend/src/components/SignupFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupFormModal';

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='signup' onClick={() => setShowModal(true)}>Sign Up</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;