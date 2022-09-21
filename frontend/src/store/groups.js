import { csrfFetch } from './csrf';

const CREATE_GROUP = 'groups/createGroup';
// const REMOVE_GROUP = 'groups/removeGroup';
// const GET_GROUPS = 'groups/getGroups';
// const UPDATE_GROUP = 'groups/updateGroup'

const createGroup = (group) => {
    return {
        type: CREATE_GROUP,
        payload: group,
    }
}

// const removeGroup = () => {
//     return {
//         type: REMOVE_GROUP,
//     }
// }



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

const initialState = { page: 1 };

const groupReducer = (state = initialState, action) => {
    let newState;
    
    switch (action.type) {
      case CREATE_GROUP:
        newState = Object.assign({}, state);
        newState.user = action.payload;
        return newState;
      default:
        return state;
    }
};
  
  export default groupReducer;