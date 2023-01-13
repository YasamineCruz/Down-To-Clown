import React, { useState } from 'react';
import { AttendanceApprovalModal } from '../../context/AttendanceApprovalModal'; 
import AttendanceApproval from './AttendanceApproval';


function ViewPendingApprovals({attendances, eventId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='EGLink' onClick={() => {
        setShowModal(true);
      }}>View Pending Attendances</div>
      {showModal && (
        <AttendanceApprovalModal onClose={() => setShowModal(false)}>
          <AttendanceApproval setShowModal={setShowModal} attendances={attendances} eventId={eventId}/>
        </AttendanceApprovalModal>
      )}
    </>
  );
}

export default ViewPendingApprovals;