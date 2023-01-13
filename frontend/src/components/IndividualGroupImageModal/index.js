// frontend/src/components/IndividualImageModalIndividualImageModal/index.js
import React, { useState } from 'react';
import { IndividualImageModal } from '../../context/IndividualImageModal';
import GetAGroupImage from './GetAGroupImage';


function GetIndividualGroupImageModal({image, groupId, organizerId}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className='EGLink' onClick={() => {
        setShowModal(true);
      }}>
        <img className='GroupsImages2' key={image.id} src={image.url} alt=''/>
        View</div>
      {showModal && (
        <IndividualImageModal onClose={() => setShowModal(false)}>
          <GetAGroupImage url={image.url} setShowModal={setShowModal} groupId={groupId} id={image.id} organizerId={organizerId}/>
        </IndividualImageModal>
      )}
    </>
  );
}

export default GetIndividualGroupImageModal;