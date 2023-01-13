// frontend/src/components/ImageModalImageModal/index.js
import React, { useState } from 'react';
import { ImageModal } from '../../context/ImageModal';
import CreateGroupImage from './CreateGroupImage';


function CreateGroupImageModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='EGLink' onClick={() => {
        setShowModal(true);
      }}>Create a Group Image</div>
      {showModal && (
        <ImageModal onClose={() => setShowModal(false)}>
          <CreateGroupImage setShowModal={setShowModal}/>
        </ImageModal>
      )}
    </>
  );
}

export default CreateGroupImageModal;