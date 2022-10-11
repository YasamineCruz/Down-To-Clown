import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as eventActions from '../../store/events'
import './GetEventByGroup.css'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const GetEventsByGroup = () => {
    const dispatch = useDispatch();
    const events = useSelector(store => store.event.events)
    const params = useParams();
    const { groupId } = params;

    useEffect(() => {
        dispatch(eventActions.getAllEventsByGroup(groupId))
    },[dispatch, groupId])
  
    
    return (
        <>
        {events && events.statusCode === 404 && (
            <div>There are currently no events for this Group.</div>
        )}
        {events && events.statusCode !== 404 && (
            <div>
                {events.Events.map(event => (
                    <Link key={event.id} to={`/events/${event.id}`}>
                        <div key={event.id} className='EventCard'>
                            <div>Name: {event.name}</div>
                            <div>Description: {event.description}</div>
                            <div>Type: {event.type}</div>
                            <div>Capacity: {event.capacity}</div>
                            <div>Price: {event.price}</div>
                            <div>Start Date: {event.startDate}</div>
                            <div>End Date: {event.endDate}</div>
                        </div>
                    </Link>
                ))}
            </div>
        )}
        </>
    )
}

export default GetEventsByGroup;