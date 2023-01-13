import React, { useState } from 'react';
import { ViewMembershipsModal } from '../../context/ViewMembershipsModal'; 
import ViewGroupMemberships from './ViewGroupMemberships';


function ViewApprovedMembers({memberships, groupId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='EGLink view-membership-edit' onClick={() => {
        setShowModal(true);
      }}>View All Memberships</div>
      {showModal && (
        <ViewMembershipsModal onClose={() => setShowModal(false)}>
          <ViewGroupMemberships setShowModal={setShowModal} memberships={memberships} groupId={groupId}/>
        </ViewMembershipsModal>
      )}
    </>
  );
}

export default ViewApprovedMembers;