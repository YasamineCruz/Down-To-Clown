// frontend/src/components/ImageModalImageModal/index.js
import React, { useState } from 'react';
import { ImageModal } from '../../context/ImageModal';
import CreateGroupImage from './CreateGroupImage';


function CreateGroupImageModal() {
  const [showImageModal, setShowImageModal] = useState(false);

  return (
    <>
      <div className='EGLink' onClick={() => {
        setShowImageModal(true);
        document.getElementById('ImageModal').style.display = 'flex'
      }}>Create a Group Image</div>
      {showImageModal && (
        <ImageModal onClose={() => setShowImageModal(false)}>
          <CreateGroupImage />
        </ImageModal>
      )}
    </>
  );
}

export default CreateGroupImageModal;