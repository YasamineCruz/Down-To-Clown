import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as eventActions from '../../store/events'
import './GetEvents.css'

const GetEvents = () => {
    const dispatch = useDispatch();
    const events = useSelector(store => store.event.events)

    useEffect(() => {
        dispatch(eventActions.getAllEvents())
    },[dispatch])
    
    return (
        <>
        {events && (
            <div>
                {events.Events.map(event => (
                    <div key={event.id} className='EventCard'>
                    <div>Name: {event.name}</div>
                    <div>Description: {event.description}</div>
                    <div>Type: {event.type}</div>
                    <div>Capacity: {event.capacity}</div>
                    <div>Price: {event.price}</div>
                    <div>Start Date: {event.startDate}</div>
                    <div>End Date: {event.endDate}</div>
                    </div>
                ))}
            </div>
        )}
        </>
    )
}

export default GetEvents;