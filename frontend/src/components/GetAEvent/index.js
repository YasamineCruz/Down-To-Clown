import * as eventActions from '../../store/events'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import './GetAEvent.css'
import { useParams } from "react-router-dom";
import * as groupActions from "../../store/groups";
import { Link } from 'react-router-dom';
import { getAllAttendancesByEventId } from '../../store/attendances';
import RequestAttendance from '../RequestAttendance';
import { getAllMembersByGroupId } from '../../store/members';
import ViewPendingApprovals from '../AttendanceApproval';
import DeleteAttendance from '../DeleteAttendance/DeleteAttendance';
import DeleteAAttendance from '../DeleteAttendance';

const check = (id, id2) => {
    if (id === id2) return true;
    return false
}

const DaysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const MonthsOfTheYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const checkAttendanceType = (userId, attendanceObject, eventId, groupId, membersObject) => {
    if (checkIfMember(userId, membersObject, groupId) && !checkAttendance(userId, attendanceObject, eventId)) {
        if (attendanceObject[eventId][userId].Attendance.status === 'member') return 'Attending Event'
        if (attendanceObject[eventId][userId].Attendance.status === 'pending') return 'Attendance pending'
        if (attendanceObject[eventId][userId].Attendance.status === 'waitlist') return `You've been waitlisted`
    }
    return false
}

const checkAttendance = (userId, attendanceObject, eventId) => {
    if (Object.values(attendanceObject).length >= 1) {
        if (attendanceObject[eventId]) {
            if (attendanceObject[eventId][userId]) {
                return false
            }
        }
    }
    return true
}

const checkIfMember = (userId, membersObject, groupId) => {
    if (Object.values(membersObject).length >= 1) {
        if (membersObject[groupId]) {
            if (membersObject[groupId][userId]) {
                if (membersObject[groupId][userId].Membership.status !== 'pending') return true
            }
        }
    }
    return false
}

const GetAEvent = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { eventId } = params;
    const group = useSelector(state => state.group.group);
    const event = useSelector(state => state.event.event);
    const sessionUser = useSelector(state => state.session.user);
    const attendances = useSelector(state => state.attendance.attendances)
    const members = useSelector(state => state.members.members)
    const [sent, setSent] = useState(false)

    let groupId;
    if (event) groupId = event.groupId


    useEffect(() => {
        dispatch(eventActions.getAEvent(eventId))
        if (sessionUser) {
            dispatch(getAllAttendancesByEventId(eventId))
            setSent(true)
        }
        if (groupId) {
            dispatch(groupActions.getAGroup(groupId))
            dispatch(getAllMembersByGroupId(groupId))
        }
    }, [dispatch, eventId, groupId, sessionUser])


    let startDate = new Date(event?.startDate);

    let startDay = startDate.getDay();
    let startMonth = startDate.getMonth();
    let startDate2 = startDate.getDate();
    let startHours = startDate.getHours();
    let startMinutes = startDate.getMinutes();
    let startTime;

    if (startHours >= 13) {
        startTime = 'PM'
        startHours = startHours - 12
    } else {
        startTime = 'AM'
    }
    if (startMinutes === 0) startMinutes = `00`;
    if (startMinutes < 10 && startMinutes > 0) startMinutes = `0${startMinutes}`

    let endDate = new Date(event?.endDate);

    let endDay = endDate.getDay();
    let endMonth = endDate.getMonth();
    let endDate2 = endDate.getDate();
    let endHours = endDate.getHours();
    let endMinutes = endDate.getMinutes();
    let endTime;


    if (endHours >= 13) {
        endTime = 'PM'
        endHours = endHours - 12
    } else {
        endTime = 'AM'
    }
    if (endMinutes === 0) endMinutes = `00`;
    if (endMinutes < 10 && endMinutes > 0) endMinutes = `0${endMinutes}`

    return (
        <div className='event-container'>
            {event && group && Object.values(members).length >= 1 && (
                <div className='event-wrapper'>
                    <div className='event-upper-div'>
                        <div className='event-name'>{event.name}</div>
                        <div className='upper-info-div'>
                        </div>
                    </div>
                    <div className='event-bottom'>
                        <div className='event-middle-div'>
                            <div className='event-photo-div'>
                                {event?.EventImages && event.EventImages.length >= 1 && (
                                    <img className='event-img' src={event.EventImages[0].url} alt='' />
                                )}
                                {(!event.EventImages || event.EventImages.length) <= 0 && (
                                    <img className='event-img' src='https://www.pyrunco.com/wp-content/uploads/2020/12/upcoming-events.jpg' alt='' />
                                )}
                                <div className='event-details'>
                                    <div className='links-and-details'>
                                        <div className='EGLink abouttext'>Details</div>
                                        {sessionUser && group && sent && (
                                            <div className='event-page-links'>
                                                {check(sessionUser.id, group.organizerId) && (
                                                    <div className='event-page-links'>
                                                        <Link className='EGLink' to={`/events/${event.id}/edit`}>Edit Event</Link>
                                                        <Link className='EGLink' to={`/events/${event.id}/delete`}>Delete Event</Link>
                                                        {attendances && (
                                                            <ViewPendingApprovals attendances={attendances[eventId]} eventId={eventId} />
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className='event-description'>{event.description}</div>
                                </div>
                            </div>
                            <div className='event-middleInfo-Link'>
                                <Link to={`/groups/${groupId}`} className='event-association-wrapper'>
                                    <div className='lil-group-img'>
                                        <img className='event-group-img' src={group?.GroupImages[0]?.url} alt='' />
                                    </div>
                                    <div className='event-association'>
                                        <div className='group-association-name'>{group.name}</div>
                                        <div className='group-association-private'>
                                            {group.private === 0 ? `Private group` : `Public group`}
                                            <img className='group-association-question' src='https://secure.meetupstatic.com/next/images/Question.svg?w=32' alt='' />
                                        </div>
                                    </div>
                                </Link>
                                <div className='event-info-container'>
                                    <div className='event-info-wrapper'>
                                        <i className="fa-regular fa-clock clock"></i>
                                        <div className='event-location-time'>
                                            <div className='event-time'>{`${DaysOfTheWeek[startDay]}, ${MonthsOfTheYear[startMonth]} ${startDate2} at ${startHours}:${startMinutes} ${startTime}`}</div>
                                            <div className='event-time'>{` to ${DaysOfTheWeek[endDay]}, ${MonthsOfTheYear[endMonth]} ${endDate2} at ${endHours}:${endMinutes} ${endTime}`}</div>
                                        </div>
                                    </div>
                                    {event.Venue && (
                                        <div className='event-info-wrapper2'>
                                            {event.type === 'Online' ? (<i className="fa-solid fa-video clock"></i>) : (<i className="fa-solid fa-location-dot icon clock"></i>)}
                                            {event.type === 'Online' ? (<div className='event-type'>{event.type} Event</div>) : <div className='event-location'>{`${event.Venue.address} · ${event.Venue.city}, ${event.Venue.state}`}</div>}
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='event-sticky'>
                        <div className='event-sticky-time-loc'>
                            <div className='event-sticky-time'>{`${DaysOfTheWeek[startDay]}, ${MonthsOfTheYear[startMonth]} ${startDate2} · ${startHours}:${startMinutes} ${startTime}`}</div>
                            {event?.Venue && event.Venue.address !== 'Online' && (
                                <div className='event-sticky-name'>{`${event.Venue.address} · ${event.Venue.city}, ${event.Venue.state}`}</div>
                            )}

                        </div>
                        <div className='event-sticky-price'>
                            <div className='event-price'>{event.price}$</div>
                            <div className='event-sticky-capacity'>{event.capacity - group.numMembers} spots left</div>
                        </div>
                        <div>
                            {sessionUser && checkIfMember(sessionUser.id, members, groupId) && (
                                <div>
                                    {checkIfMember(sessionUser.id, members, groupId) && checkAttendance(sessionUser.id, attendances, eventId) && (
                                        <RequestAttendance user={sessionUser} eventId={eventId} type={event.type} />
                                    )}
                                    {checkAttendanceType(sessionUser.id, attendances, eventId, groupId, members) !== 'Attending Event' && (
                                        <div className='attendance-wrapper'>
                                            <div className='attendance-button-no-hover'>{checkAttendanceType(sessionUser.id, attendances, eventId, groupId, members)}</div>
                                        </div>
                                    )}
                                    {checkAttendanceType(sessionUser.id, attendances, eventId, groupId, members) === 'Attending Event' && (
                                        <DeleteAAttendance text={'Attending Event'} userId={sessionUser.id} eventId={eventId}/>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default GetAEvent;