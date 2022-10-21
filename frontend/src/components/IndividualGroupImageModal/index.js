// frontend/src/components/IndividualImageModalIndividualImageModal/index.js
import React, { useState } from 'react';
import { IndividualImageModal } from '../../context/IndividualImageModal';
import GetAGroupImage from './GetAGroupImage';


function GetIndividualGroupImageModal({url}) {
  const [showIndividualImageModal, setShowIndividualImageModal] = useState(false);
    
  return (
    <>
      <div className='EGLink' onClick={() => {
        setShowIndividualImageModal(true);

      }}>View</div>
      {showIndividualImageModal && (
        <IndividualImageModal onClose={() => setShowIndividualImageModal(false)}>
          <GetAGroupImage url={url}/>
        </IndividualImageModal>
      )}
    </>
  );
}

export default GetIndividualGroupImageModal;