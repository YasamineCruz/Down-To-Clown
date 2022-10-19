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
        history.push('/events')
    }

    return (
        <div className='edit-event-container'>
          <form className='edit-event-form-wrapper' onSubmit={onSubmit}>
            {event && (
                <div className='edit-grouptext-wrapper'>
                    <div className='edit-group-div-wrapper'>
                        <h1 className='delete-group-h1-text'>Are you sure you want to delete {event.name}?</h1>
                    </div>
                </div>
            )}
            <div className="button-container">
              <button className='nextButton-selected' type='submit'>Delete Event</button>  
            </div>
         </form>   
        </div>
       
    )
}

export default DeleteEvent;