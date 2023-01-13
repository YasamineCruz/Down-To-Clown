import { csrfFetch } from './csrf';

const GET_ATTENDANCES = 'attendances/getAttendances'
const EDIT_ATTENDANCE = 'attendances/editAttendance'
const DELETE_ATTENDANCE = 'attendances/deleteAttendance'

const getAttendances = (attendances, eventId) => {
    return {
        type: GET_ATTENDANCES,
        payload: attendances,
        eventId
    }
}

const editAttendance = (attendance, eventId) => {
    return {
        type: EDIT_ATTENDANCE,
        payload: attendance,
        eventId
    }
}

const deleteAttendance = (userId, eventId) => {
    return {
        type: DELETE_ATTENDANCE,
        userId,
        eventId
    }
}



export const requestAAttendance = (eventId, userId) => async(dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}/attendance`, {
        method:'POST',
        body: JSON.stringify({
            userId,
            status: 'pending'
        })
    })
    if(response.ok){
        let attendance = await response.json()
        dispatch(getAllAttendancesByEventId(eventId))
        return attendance
    }
}

export const editAAttendance = (attendanceId, eventId, status) => async(dispatch) => {
    console.log('SKEET SKEET', attendanceId)
    const response = await csrfFetch(`/api/events/${eventId}/attendance`, {
        method: 'PUT',
        body: JSON.stringify({
            userId: attendanceId,
            status
        })
    })
    if(response.ok){
        const attendance = await response.json();
        dispatch(editAttendance(attendance, eventId));
        return response;
    }
}

export const getAllAttendancesByEventId = (eventId) => async(dispatch) => {
    
    const response = await csrfFetch(`/api/events/${eventId}/attendees`)
    
    if(response.ok){
        const attendees = await response.json();
        dispatch(getAttendances(attendees, eventId))
        return response
    }
};

export const deleteAAttendance = (userId, eventId) => async(dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}/attendance/${userId}`, {
        method: 'DELETE'
    })
    if(response.ok){
        let msg = await response.json()
        dispatch(deleteAttendance(userId, eventId))
        return msg
    }
}

const initialState = { attendances: {}};

const attendancesReducer = ( state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_ATTENDANCES:
            newState = {...state, attendances: {...state.attendances}};
            newState.attendances[action.eventId] = {...state.attendances[action.eventId]}
            action.payload.Attendees.forEach(attendance => newState.attendances[action.eventId][attendance.id] = attendance)
            return newState;
        case EDIT_ATTENDANCE:
            newState = {...state, attendances: {...state.attendances}};
            newState.attendances[action.eventId] = {...state.attendances[action.eventId]}
            newState.attendances[action.eventId][action.payload.userId].Attendance.status = action.payload.status
            return newState
        case DELETE_ATTENDANCE:
            newState = {...state, attendances: {...state.attendances}};
            newState.attendances[action.eventId] = {...state.attendances[action.eventId]}
            delete newState.attendances[action.eventId][action.userId]
            return newState
        default:
            return state;
    }
};

export default attendancesReducer;