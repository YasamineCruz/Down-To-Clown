import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as eventActions from '../../store/events'
import './GetEventByGroup.css'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const DaysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const MonthsOfTheYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const GetEventsByGroup = () => {
    const dispatch = useDispatch();
    const events = useSelector(store => store.event.eventsByGroup)
    const params = useParams();
    const { groupId } = params;
    const [ timeframe, setTimeframe] = useState('upcoming')

    let upcoming = [];
    let past = [];

    let currentDate = new Date()

    if(events){
        events.Events.forEach(event => {
            let eventDate = new Date(event.startDate)
            if(eventDate > currentDate){
                upcoming.push(event)
                console.log('upcoming', upcoming)
            }else{
                past.push(event)
            }

        })
    }



    useEffect(() => {
        dispatch(eventActions.getAllEventsByGroup(groupId))
    },[dispatch, groupId])
  
    
    
return (
        <div className='eventsForGroup-container'>
            <div className='timeFrame'>
                <div onClick={()=> setTimeframe('upcoming')} className={timeframe === 'upcoming' ? `upcoming-selected` : `upcoming-not-selected`}>Upcoming</div>
                <div onClick={()=> setTimeframe('past')} className={timeframe ==='past' ? `past-selected` : `past-not-selected`}>Past</div>
            </div>
        {events && events.statusCode === 404 && (
            <div className='events-for-group-none'>There are currently no events for this Group.</div>
        )}
        {events && events.statusCode !== 404 && upcoming.length >= 1 && timeframe === 'upcoming' && (  
            <div className='eventsForGroup-wrapper2'>
                {upcoming.map(event => {

                    let startDate = new Date(event.startDate);
                    let startDay = startDate.getDay();
                    let startMonth = startDate.getMonth();
                    let startDate2 = startDate.getDate();
                    let startHours = startDate.getHours();
                    let startMinutes = startDate.getMinutes();
                    let startTime;

                    if(startHours >= 13) {
                        startTime = 'PM'
                        startHours = startHours - 12
                    } else {
                        startTime = 'AM'
                    }
                    if(startMinutes === 0) startMinutes = `00`;
                    if(startMinutes < 10 && startMinutes > 0) startMinutes = `0${startMinutes}`

                    return (
                    <Link key={event.id} className='eventsForGroup-wrapper' to={`/events/${event.id}`}>
                        <div key={event.id} className='event-link'>
                            <div className='events-for-group-time'>{`${DaysOfTheWeek[startDay]}, ${MonthsOfTheYear[startMonth]} ${startDate2} at ${startHours}:${startMinutes} ${startTime}`}</div>
                            <div className='events-for-group-name'>{event.name}</div>
                            <div className='events-for-group-type'>
                                {event.type === 'Online' ? (<i class="fa-solid fa-video clock"></i>) : (<i className="fa-solid fa-location-dot icon clock"></i>)}
                                {event.type === 'Online' ? (<div className='events-groups-type'>{event.type} Event</div>) :  <div className='event-location'>{`${event.Venue.address} · ${event.Venue.city}, ${event.Venue.state}`}</div>}
                            </div>
                            <div className='events-for-group-attending'>{event.numAttending <= 1 ? `${event.numAttending} attendee` : `${event.numAttending} attendees`}</div>
                        </div>
                    </Link>
                        )
                    }
                )}
            </div>
        )}
        {events && events.statusCode !== 404 && past.length >= 1 && timeframe === 'past' && (  
            <div className='eventsForGroup-wrapper2'>
                {past.map(event => {

                    let startDate = new Date(event.startDate);
                    let startDay = startDate.getDay();
                    let startMonth = startDate.getMonth();
                    let startDate2 = startDate.getDate();
                    let startHours = startDate.getHours();
                    let startMinutes = startDate.getMinutes();
                    let startTime;

                    if(startHours >= 13) {
                        startTime = 'PM'
                        startHours = startHours - 12
                    } else {
                        startTime = 'AM'
                    }
                    if(startMinutes === 0) startMinutes = `00`;
                    if(startMinutes < 10 && startMinutes > 0) startMinutes = `0${startMinutes}`

                    return (
                    <Link key={event.id} className='eventsForGroup-wrapper' to={`/events/${event.id}`}>
                        <div key={event.id} className='event-link'>
                            <div className='events-for-group-time'>{`${DaysOfTheWeek[startDay]}, ${MonthsOfTheYear[startMonth]} ${startDate2} at ${startHours}:${startMinutes} ${startTime}`}</div>
                            <div className='events-for-group-name'>{event.name}</div>
                            <div className='events-for-group-type'>
                                {event.type === 'Online' ? (<i class="fa-solid fa-video clock"></i>) : (<i className="fa-solid fa-location-dot icon clock"></i>)}
                                {event.type === 'Online' ? (<div className='events-groups-type'>{event.type} Event</div>) :  <div className='event-location'>{`${event.Venue.address} · ${event.Venue.city}, ${event.Venue.state}`}</div>}
                            </div>
                            <div className='events-for-group-attending'>{event.numAttending <= 1 ? `${event.numAttending} attendee` : `${event.numAttending} attendees`}</div>
                        </div>
                    </Link>
                        )
                    }
                )}
            </div>
        )}
        {events && events.statusCode !== 404 && upcoming.length <= 0 && timeframe === 'upcoming' && (
           <div className='events-for-group-none'>There are currently no upcoming events for this Group.</div>
        )}
        {events && events.statusCode !== 404 && past.length <= 0 && timeframe === 'past' && (
            <div className='events-for-group-none'>There are currently no past events for this Group.</div>
        )}
        </div>
    )
}

export default GetEventsByGroup;