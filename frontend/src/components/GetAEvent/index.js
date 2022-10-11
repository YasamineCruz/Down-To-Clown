import * as eventActions from '../../store/events'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import './GetAEvent.css'
import { useParams } from "react-router-dom";
import * as groupActions from "../../store/groups";
import { Link } from 'react-router-dom';

const check = (id, id2) => {
    if(id === id2) return true;
    return false
}

const GetAGroup = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { eventId } = params;
    const group = useSelector(state => state.group.group);
    const event = useSelector(store => store.event.event);
    const sessionUser = useSelector(state => state.session.user);

    let groupId;
    if(event) groupId = event.groupId
    console.log('----groupId----', groupId)
    useEffect(() => {
        dispatch(eventActions.getAEvent(eventId))
        dispatch(groupActions.getAGroup(groupId))
    }, [dispatch, eventId, groupId])
   console.log('---group----', group)
   console.log('----sessionUser----', sessionUser)
    return (
        <>
        {event && (
            <div>
                <div>Name: {event.name}</div>
                <div>Description: {event.description}</div>
                <div>Type: {event.type}</div>
                <div>Capacity: {event.capacity}</div>
                <div>Price: {event.price}</div>
                <div>Start Date: {event.startDate}</div>
                <div>End Date: {event.endDate}</div>
                { sessionUser && group && (
                    <div>
                  { check(sessionUser.id, group.organizerId) && (
                    <>
                    <Link to={`/events/${event.id}/edit`}>Edit Event</Link>
                    <Link to={`/events/${event.id}/delete`}>Delete Event</Link>
                    </>
                    )}
                    </div>   
                )}        
            </div>
        )}
        </>
    )
};

export default GetAGroup;