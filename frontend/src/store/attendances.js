import { csrfFetch } from './csrf';

const GET_ATTENDANCES = 'attendances/getAttendances'
const EDIT_ATTENDANCE = 'attendances/editAttendance'

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
    const response = await csrfFetch(`/api/events/${eventId}/attendance`, {
        method: 'PUT',
        body: JSON.stringify({
            attendanceId,
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

const initialState = { attendances: {}};

const attendancesReducer = ( state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_ATTENDANCES:
            console.log('action in get_attendances',action)
            newState = {...state, attendances: {...state.attendances}};
            newState.attendances[action.eventId] = {...state.attendances[action.eventId]}
            action.payload.Attendees.forEach(attendance => newState.attendances[action.eventId][attendance.id] = attendance)
            return newState;
        case EDIT_ATTENDANCE:
            console.log('action is edit_attendance')
            newState = {...state, attendances: {...state.attendances}};
            newState.attendances[action.eventId] = {...state.attendances[action.eventId]}
            newState.attendances[action.eventId][action.payload.attendanceId].Attendance.status = action.payload.status
            return newState
        default:
            return state;
    }
};

export default attendancesReducer;