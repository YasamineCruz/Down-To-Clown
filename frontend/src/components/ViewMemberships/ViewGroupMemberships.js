import { useDispatch } from "react-redux";
import { deleteAMembership } from "../../store/members";

export default function ViewGroupMemberships({ memberships, groupId }) {
    const dispatch = useDispatch()
    let noneOrganizerArray = [];
    memberships.forEach(member => {
        if (member.Membership.status === 'member') noneOrganizerArray.push(member)
    })

    const Deny = async (memberId, groupId) => {
        let status = 'denied'
        await dispatch(deleteAMembership(groupId, memberId))
    }

    return (
        <div className='pending-attendance-wrapper'>
            {noneOrganizerArray.length >= 1 && (
                <div>
                    <div className='Big-Pend-Text'>Current Memberships</div>
                <div>
                    <div className='delete-membership-text'>Delete Membership</div>
                    {noneOrganizerArray.map(member => {
                        return (
                            <div className='member-info-container'>
                                <div className='member-name2 profile-dropdown-text'>{member.firstName} {member.lastName}</div>
                                <div className='pending-buttons2'>
                                    <i class="fa-solid fa-circle-xmark red pointer" onClick={() => Deny(member.id, member.groupId)}></i>
                                </div>
                            </div>
                        )
                    })}
                    </div>
                </div>
            )}
            {noneOrganizerArray.length <= 0 && (
                <div>No current Memberships available.</div>
            )}
        </div>
    )
}