import { requestAMembership } from "../../store/members"
import { useDispatch } from "react-redux"

export default function RequestMembership({groupName, groupId, memberId, setShowModal}) {
    const dispatch = useDispatch()

    const request = async (e) => {
        e.preventDefault()
        await dispatch(requestAMembership(groupId, memberId))
        setShowModal(false)
    }
   

    return (
        <div className='request-membership-container'>
            <div className='request-wrapper'>
            <div className='request-text'>Would you like to requst a membership to {groupName}?</div>
            <div className='button-container3'>
                <button className='request-cancel-button' onClick={() => setShowModal(false)} type='button'>Cancel</button>
                <button  className='request-yes-button' onClick={(e)=> request(e)}>
                    Request Membership
                </button>
            </div>

            </div>
        </div>
    )
}