import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import * as eventActions from '../../store/events'
import './GetEvents.css'
import '../ReadAllGroups/ReadGroups.css'
import { Link } from "react-router-dom";

const DaysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const MonthsOfTheYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const GetEvents = () => {
    const dispatch = useDispatch();
    const events = useSelector(store => store.event.events)

    useEffect(() => {
        dispatch(eventActions.getAllEvents())
    },[dispatch])

    
    
    return (
        <div className='EGWrapper'>
         <div className='EGTitles'>
         <h2 className='EGTitle EGTitleColorBlue'>
            Events
        </h2>
        <h2>
            <Link className='EGTitle EGTitleColorGrey' to='/groups'>Groups</Link>
        </h2>   
        </div>
        <div className='GroupsMaster'>
        {events && (
            <div className='GroupsDiv'>
                {events.Events.map(event => {
                    let date = new Date(event.startDate);
                    let day = date.getDay();
                    let month = date.getMonth();
                    let date2 = date.getDate();
                    let hours = date.getHours();
                    let minutes = date.getMinutes();
                    let time;

                    if(hours >= 13) {
                        time = 'PM'
                        hours = hours - 12
                    } else {
                        time = 'AM'
                    }
                    if(minutes === 0) minutes = `00`;
                    if(minutes < 10 && minutes > 0) minutes = `0${minutes}`
                   
                    if(event.previewImage === 'Event does not have a preview Image'){
                        return (
                          <Link className='EventsLink' key={event.id} to={`/events/${event.id}`}>
                            <div className='GroupDiv'>
                                <img className='GroupsImages' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3j3PyYLsHz2xgGv3MN_T7CZAkz-JTz4bkxw&usqp=CAU' alt='' />
                                <div className='GroupsInfo'>
                                    <div className=''>{`${DaysOfTheWeek[day]}, ${MonthsOfTheYear[month]} ${date2} ${hours}:${minutes} ${time}`}</div>
                                    <div className='GroupsName'>{event.name}</div>
                                    <div className='GroupsAbout'>{event.description}</div>
                                </div>
                            </div>
                        </Link>  
                        )
                    } else {
                       return (
                        <Link className='EventsLink' key={event.id} to={`/events/${event.id}`}>
                        <div className='GroupDiv'>
                            <img className='GroupsImages' src={event.previewImage} alt='' />
                            <div className='GroupsInfo'>
                                <div className=''>{`${DaysOfTheWeek[day]}, ${MonthsOfTheYear[month]} ${date2} ${hours}:${minutes} ${time}`}</div>
                                <div className='GroupsName'>{event.name}</div>
                                <div className='GroupsAbout'>{event.description}</div>
                            </div>
                        </div>
                    </Link>  
                    ) 
                    }
                    
                        }
                    )
                }
            </div>
        )}    
        </div>   
        
        </div>
    )
}

export default GetEvents;