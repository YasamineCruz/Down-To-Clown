// frontend/src/components/MembershipModalMembershipModal/index.js
import React, { useState } from 'react';
import { MembershipModal } from '../../context/Membership';
import RequestMembership from './RequestMembership';


function CreateGroupMembershipModal({memberId, groupId, groupName}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='EGLink' onClick={() => {
        setShowModal(true);
      }}>Request Membership</div>
      {showModal && (
        <MembershipModal onClose={() => setShowModal(false)}>
          <RequestMembership setShowModal={setShowModal} memberId={memberId} groupId={groupId} groupName={groupName}/>
        </MembershipModal>
      )}
    </>
  );
}

export default CreateGroupMembershipModal;