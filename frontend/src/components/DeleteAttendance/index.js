import React, { useState } from 'react';
import { DeleteAttendanceModal } from '../../context/DeleteAttendanceModal';
import DeleteAttendance from './DeleteAttendance';


function DeleteAAttendance({userId, eventId, text}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='attendance-wrapper'>
      <div className='attendance-button-no-hover pointer' onClick={() => {
        setShowModal(true);
      }}>{text}</div>
      {showModal && (
        <DeleteAttendanceModal onClose={() => setShowModal(false)}>
          <DeleteAttendance setShowModal={setShowModal} userId={userId} eventId={eventId}/>
        </DeleteAttendanceModal>
      )}
    </div>
  );
}

export default DeleteAAttendance;