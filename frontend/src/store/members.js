import { csrfFetch } from './csrf';

const GET_MEMBERS = 'members/getMembers'
const EDIT_MEMBERSHIP = 'members/editMembership'

const getMembers = (members, groupId) => {
    return {
        type: GET_MEMBERS,
        payload: members,
        groupId
    }
}

const editMembership = (member, groupId) => {
    return {
        type: EDIT_MEMBERSHIP,
        payload: member,
        groupId
    }
}


export const requestAMembership = (groupId, memberId) => async(dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}/membership`, {
        method:'POST',
        body: JSON.stringify({
            memberId,
            status: 'pending'
        })
    })
    if(response.ok){
        let member = await response.json()
        dispatch(getAllMembersByGroupId(groupId))
        return member
    }
}

export const editAMembership = (memberId, groupId, status) => async(dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}/membership`, {
        method: 'PUT',
        body: JSON.stringify({
            memberId,
            status
        })
    })
    if(response.ok){
        const member = await response.json();
        dispatch(editMembership(member, groupId));
        return response;
    }
}

export const getAllMembersByGroupId = (groupId) => async(dispatch) => {
    
    const response = await csrfFetch(`/api/groups/${groupId}/members`)
    
    if(response.ok){
        const members = await response.json();
        dispatch(getMembers(members, groupId))
        return response
    }
};

const initialState = { members: {}};

const membersReducer = ( state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_MEMBERS:
            newState = {...state, members: {...state.members}};
            newState.members[action.groupId] = {...state.members[action.groupId]}
            action.payload.Members.forEach(member => newState.members[action.groupId][member.id] = member)
            return newState;
        case EDIT_MEMBERSHIP:
            newState = {...state, members: {...state.members}};
            newState.members[action.groupId] = {...state.members[action.groupId]}
            newState.members[action.groupId][action.payload.memberId].Membership.status = action.payload.status
            return newState
        default:
            return state;
    }
};

export default membersReducer;