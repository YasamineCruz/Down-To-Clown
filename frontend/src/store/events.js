import { csrfFetch } from './csrf';

const CREATE_EVENT = 'events/createEvent';
const REMOVE_EVENT = 'events/removeEvent';
const GET_EVENTS = 'events/getEvents';
const UPDATE_EVENT = 'events/updateEvent'
const CREATE_EVENTIMG = 'events/createEventImg'
const GET_EVENT = 'events/getEvent'
const GET_EVENTGROUP = 'events/getEventByGroup'


const createEvent = (event) => {
    return {
        type: CREATE_EVENT,
        payload: event,
    }
}

const getEventByGroup = (events) => {
    return {
        type: GET_EVENTGROUP,
        payload: events
    }
}

const removeEvent = () => {
    return {
        type: REMOVE_EVENT,
    }
}

const getEvent = (event) => {
    return {
        type: GET_EVENT,
        payload: event
    }
}

const updateEvent = (event) => {
    return {
        type: UPDATE_EVENT,
        payload: event,
    }
}

const createEventImg = (eventImg) => {
    return {
        type: CREATE_EVENTIMG,
        payload: eventImg
    }
}

const getEvents = (events) => {
    return {
        type: GET_EVENTS,
        payload: events
    }
}


export const createAEvent = (event, groupId) => async(dispatch) => {
    const { venueId, name, description, type, capacity, price, startDate, endDate} = event;
    const response = await csrfFetch(`/api/groups/${groupId}/events`, {
        method: 'POST',
        body: JSON.stringify({
            venueId,
            name,
            description,
            type,
            capacity,
            price,
            startDate,
            endDate
        })
    });
    const data = await response.json();
    dispatch(createEvent(data))
    return response
}

export const editAEvent = (event, eventId) => async(dispatch) => {
    const {venueId, name, description, type, capacity, price, startDate, endDate} = event;
    const response = await csrfFetch(`/api/events/${eventId}`, {
        method: 'PUT',
        body: JSON.stringify({
            venueId,
            name,
            description,
            type,
            capacity,
            price,
            startDate,
            endDate
        })
    })
    const data = await response.json();
    dispatch(updateEvent(data));
    return response;
}

export const createAEventImg = (eventImg, eventId) => async(dispatch) => {
    const { url, preview} = eventImg
    const response = await csrfFetch(`/api/events/${eventId}/images`, {
        method:'POST',
        body: JSON.stringify({
            id: eventId,
            url,
            preview
        })
    });
    const data = await response.json();
    dispatch(createEventImg(data))
    return response
} 



export const getAllEvents = () => async(dispatch) => {
    const response = await csrfFetch('/api/events')
    const data = await response.json()
    dispatch(getEvents(data))
    return response
}

export const getAllEventsByGroup = (groupId) => async(dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}/events`)
    const data = await response.json();
    dispatch(getEventByGroup(data))
    return response
}

export const getAEvent = (eventId) => async(dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}`)
    const data = await response.json();
    dispatch(getEvent(data))
    return response
}


export const deleteEvent = (eventId) => async(dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}`, {
        method: 'DELETE'
    })
    await response.json();
    dispatch(removeEvent());
    return response;
}



const initialState = { event: null, events: null, eventImg: null };

const eventReducer = (state = initialState, action) => {
    let newState;
    
    switch (action.type) {
      case CREATE_EVENT:
        newState = Object.assign({}, state);
        newState.event = action.payload;
        return newState;
     case GET_EVENTS:
        newState = Object.assign({}, state);
        newState.events = action.payload;
        return newState;
     case CREATE_EVENTIMG:
        newState = Object.assign({}, state);
        newState.eventImg = action.payload;
        return newState;
     case UPDATE_EVENT:
        newState = Object.assign({}, state);
        newState.event = action.payload;
        return newState;
     case GET_EVENT:
        newState = Object.assign({}, state);
        newState.event = action.payload;
        return newState;
     case REMOVE_EVENT:
        newState = Object.assign({}, state);
        newState.event = action.payload;
        return newState;
     case GET_EVENTGROUP:
        newState = Object.assign({}, state);
        newState.events = action.payload;
        return newState;
      default:
        return state;
    }
};
  
  export default eventReducer;