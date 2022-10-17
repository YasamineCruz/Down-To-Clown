import { csrfFetch } from './csrf';

const GET_MEMBERS = 'members/getMembers'

const getMembers = (members) => {
    return {
        type: GET_MEMBERS,
        payload: members
    }
}

export const getAllMembersByGroupId = (groupId) => async(dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}/members`)

    if(response.ok){
        const members = await response.json();
        dispatch(getMembers(members))
        return response
    }
};

const initialState = { members: {}};

const membersReducer = ( state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_MEMBERS:
            newState = {...state, members: {}};
            action.payload.Members.forEach(member => newState.members[member.id] = member)
            return newState;
        default:
            return state;
    }
};

export default membersReducer;