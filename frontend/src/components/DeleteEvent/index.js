import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as eventActions from "../../store/events";
import { useSelector, useDispatch } from "react-redux";

const DeleteEvent = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { eventId } = params;
    const event = useSelector(state => state.event.event)
    const history = useHistory()

    useEffect(() => {
        dispatch(eventActions.getAEvent(eventId))
    }, [dispatch, eventId])

    const onSubmit = () => {
        dispatch(eventActions.deleteEvent(eventId))
        history.push('/events/current')
    }

    return (
        <form onSubmit={onSubmit}>
            {event && (
             <label>Are you sure you want to delete {event.name}?</label>   
            )}
            <button type='submit'>Delete Event</button>
        </form>
    )
}

export default DeleteEvent;