import { csrfFetch } from './csrf';

const CREATE_GROUP = 'groups/createGroup';
// const REMOVE_GROUP = 'groups/removeGroup';
const GET_GROUPS = 'groups/getGroups';
// const UPDATE_GROUP = 'groups/updateGroup'
const CREATE_GROUPIMG = 'groups/createGroupImg'
// const GET_CURRENTUSERSGROUPS = 'groups/getCurrentUserGroups'

const createGroup = (group) => {
    return {
        type: CREATE_GROUP,
        payload: group,
    }
}

// const getCurrentUserGroups = (groups) => {
//     return {
//         type: GET_CURRENTUSERSGROUPS,
//         payload: groups
//     }
// }

// const removeGroup = () => {
//     return {
//         type: REMOVE_GROUP,
//     }
// }

const createGroupImg = (groupImg) => {
    return {
        type: CREATE_GROUPIMG,
        payload: groupImg
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
    const response = await csrfFetch(`/api/groups/${groupId}/images`, {
        method:'POST',
        body: JSON.stringify({
            id: groupId,
            url,
            preview
        })
    });
    const data = await response.json();
    dispatch(createGroupImg(data))
    return response
} 

// export const getCurrentUsersGroups = (sessionUser) => async(dispatch) => {
//     const response = await csrfFetch('/api/groups/current', {
//         method: 'GET',
//         user: sessionUser,
//     })
//     const data = await response.json()
//     dispatch(getCurrentUserGroups(data))
//     return response
// };

export const getAllGroups = () => async(dispatch) => {
    const response = await csrfFetch('/api/groups', {
        method: 'GET'
    })
    const data = await response.json()
    dispatch(getGroups(data))
    return response
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
     case CREATE_GROUPIMG:
        newState = Object.assign({}, state);
        newState.groupImg = action.payload;
        return newState;
      default:
        return state;
    }
};
  
  export default groupReducer;