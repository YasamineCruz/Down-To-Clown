import { csrfFetch } from './csrf';

const CREATE_VENUE = 'venues/createVenue';
const UPDATE_VENUE = 'venues/updateVenue'

const createVenue = (venue) => {
    return {
        type: CREATE_VENUE,
        payload: venue,
    }
}


const editVenue = (venue) => {
    return {
        type: UPDATE_VENUE,
        payload: venue,
    }
}




export const createAVenue = (groupId, venue) => async(dispatch) => {
    const { address, city, state, lat, lng } = venue;
    const response = await csrfFetch(`/api/groups/${groupId}/venues`, {
        method: 'POST',
        body: JSON.stringify({
            address,
            city,
            state,
            lat,
            lng
        })
    });
    const data = await response.json();
    dispatch(createVenue(data))
    return response
}


export const editAVenue = (venue, venueId) => async(dispatch) => {
    const { address, city, state, lat, lng } = venue;
    const response = await csrfFetch(`/api/venues/${venueId}`, {
        method: 'PUT',
        body: JSON.stringify({
            address,
            city,
            state,
            lat,
            lng
        })
    })
    const data = await response.json();
    dispatch(editVenue(data));
    return response;
}


const initialState = { venue: null};

const venueReducer = (state = initialState, action) => {
    let newState;
    
    switch (action.type) {
      case CREATE_VENUE:
        newState = Object.assign({}, state);
        newState.venue = action.payload;
        return newState;
     case UPDATE_VENUE:
        newState = Object.assign({}, state);
        newState.venue = action.payload;
        return newState;
      default:
        return state;
    }
};
  
  export default venueReducer;