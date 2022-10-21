import { csrfFetch } from './csrf';

const CREATE_GROUP = 'groups/createGroup';
const REMOVE_GROUP = 'groups/removeGroup';
const GET_GROUPS = 'groups/getGroups';
const UPDATE_GROUP = 'groups/updateGroup'
const GET_CURRENTUSERSGROUPS = 'groups/getCurrentUserGroups'
const GET_GROUP = 'groups/getGroup'

const createGroup = (group) => {
    return {
        type: CREATE_GROUP,
        payload: group,
    }
}

const getCurrentUserGroups = (groups) => {
    return {
        type: GET_CURRENTUSERSGROUPS,
        payload: groups
    }
}

const removeGroup = () => {
    return {
        type: REMOVE_GROUP,
    }
}

const getGroup = (group) => {
    return {
        type: GET_GROUP,
        payload: group
    }
}

const updateGroup = (group) => {
    return {
        type: UPDATE_GROUP,
        payload: group,
    }
}

const getGroups = (group) => {
    return {
        type: GET_GROUPS,
        payload: group
    }
}



export const createAGroup = (group) => async(dispatch) => {
    const { organizerId, name, description, type, private_key, city, state} = group;
    const response = await csrfFetch('/api/groups', {
        method: 'POST',
        body: JSON.stringify({
            organizerId, 
            name, 
            about: description, 
            type, 
            private: private_key,
            city, 
            state
        })
    });
    const data = await response.json();
    dispatch(createGroup(data))
    return response
}

export const createAGroupImg = (groupImg, groupId) => async(dispatch) => {
    const { url, preview} = groupImg
    await csrfFetch(`/api/groups/${groupId}/images`, {
        method:'POST',
        body: JSON.stringify({
            url,
            preview
        })
    });
    
    dispatch(getAGroup(groupId))
    return;
} 

export const getCurrentUsersGroups = () => async(dispatch) => {
    const response = await csrfFetch('/api/groups/current')
    const data = await response.json()
    dispatch(getCurrentUserGroups(data))
    return response
};

export const getAllGroups = () => async(dispatch) => {
    const response = await csrfFetch('/api/groups')
    const data = await response.json()
    dispatch(getGroups(data))
    return response
}

export const getAGroup = (groupId) => async(dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}`)
    const data = await response.json();
    dispatch(getGroup(data))
    return response
}

export const editAGroup = (group, groupId) => async(dispatch) => {
    const {name, description, type, private_key, city, state} = group;
    const response = await csrfFetch(`/api/groups/${groupId}`, {
        method: 'PUT',
        body: JSON.stringify({
            name,
            about: description,
            type,
            private: private_key,
            city,
            state
        })
    })
    const data = await response.json();
    dispatch(updateGroup(data));
    return response;
}



export const deleteGroup = (groupId) => async(dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}`, {
        method: 'DELETE'
    })
    await response.json();
    dispatch(removeGroup());
    return response;
}



const initialState = { group: null, groups: null, groupImg: null, currentUserGroups: null};

const groupReducer = (state = initialState, action) => {
    let newState;
    
    switch (action.type) {
      case CREATE_GROUP:
        newState = Object.assign({}, state);
        newState.group = action.payload;
        return newState;
     case GET_GROUPS:
        newState = Object.assign({}, state);
        newState.groups = action.payload;
        return newState;
     case UPDATE_GROUP:
        newState = Object.assign({}, state);
        newState.group = action.payload;
        return newState;
     case GET_GROUP:
        newState = Object.assign({}, state);
        newState.group = action.payload;
        return newState;
     case GET_CURRENTUSERSGROUPS:
        newState = Object.assign({}, state);
        newState.currentUserGroups = action.payload.Groups;
        return newState;
     case REMOVE_GROUP:
        newState = Object.assign({}, state);
        newState.group = action.payload;
        return newState;
      default:
        return state;
    }
};
  
  export default groupReducer;