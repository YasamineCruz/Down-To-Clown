import './MembershipApproval.css'
import { getCurrentUsersGroups } from '../../store/groups'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllMembersByGroupId } from '../../store/members'
import { editAMembership } from '../../store/members'
const pending = (groupsArray, membersObject) => {
    const pendingMembers = [];

    groupsArray.forEach(group => {
        if (membersObject[group.id]) {
            let currentMembers = membersObject[group.id]
            for (const i in currentMembers) {
                let member = currentMembers[i]

                if (member.Membership?.status === 'pending') pendingMembers.push(member)
            }
        }
    })

    return pendingMembers
}

export default function MembershipApproval() {
    const dispatch = useDispatch()
    const groups = useSelector(state => state.group.currentUserGroups)
    const members = useSelector(state => state.members.members)
    const currentUser = useSelector(state => state.session.user)

    let currentOrganizersGroups = []
    groups?.forEach(group => { if (group.organizerId === currentUser.id) currentOrganizersGroups.push(group) })


    useEffect(() => {
        dispatch(getCurrentUsersGroups())
    }, [dispatch])

    useEffect(() => {
        if (groups) {
            groups.forEach(group => dispatch(getAllMembersByGroupId(group.id)))
        }
    }, [groups, dispatch])

    let currentPendingMembers = pending(currentOrganizersGroups ? currentOrganizersGroups : [], members)


    const Accept = async (memberId, groupId) => {
        let status = 'member'
        await dispatch(editAMembership(memberId, groupId, status))
    }

    const Deny = async (memberId, groupId) => {
        let status = 'denied'
        await dispatch(editAMembership(memberId, groupId, status))
    }
    console.log('CURRENT PENDING', currentPendingMembers)
    return (
        <div>
            <div>
                {currentPendingMembers.length <= 0 && (
                    <div className='profile-dropdown-text space'>No Memberships pending...</div>
                )}
                {currentPendingMembers.length >= 1 && (
                    <div>{currentPendingMembers.map(member => {
                        return (
                            <div className='pending-wrapper space'>
                                <div className='member-name profile-dropdown-text'>{member.firstName} {member.lastName[0]} </div>
                                <div className='pending-buttons'>
                                    <i class="fa-solid fa-circle-check green" onClick={() => Accept(member.id, member.groupId)}></i>
                                    <i class="fa-solid fa-circle-xmark red" onClick={() => Deny(member.id, member.groupId)}></i>
                                </div>
                            </div>
                        )
                    })}</div>
                )}
            </div>
        </div>
    )
}