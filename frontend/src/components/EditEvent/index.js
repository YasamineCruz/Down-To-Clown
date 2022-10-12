import * as eventActions from "../../store/events";
import * as groupActions from '../../store/groups'
import { useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const EditEvent = () => {
    const history = useHistory();
    const params = useParams()
    const dispatch = useDispatch();

    const event = useSelector(state => state.event.event)
    const group = useSelector(state => state.group.group);
    
    const { eventId } = params
    
    const [ venueId, setVenueId] = useState(event?.venueId);
    const [ name, setName] = useState(event?.name);
    const [ description, setDescription] = useState(event?.description);
    const [ type, setType] = useState(event?.type);
    const [ capacity, setCapacity] = useState(event?.capacity);
    const [ price, setPrice] = useState(event?.price);
    const [ startDate, setStartDate] = useState(event?.startDate);
    const [ endDate, setEndDate] = useState(event?.endDate);
    const [ validationErrors, setValidationErrors] = useState([]);
    const [ startDay, setStartDay] = useState('');
    const [ startMonth, setStartMonth] = useState('');
    const [ startYear, setStartYear] = useState('');
    const [ startHour, setStartHour] = useState('');
    const [ startMinutes, setStartMinutes] = useState('')
    const [ endDay, setEndDay] = useState('');
    const [ endMonth, setEndMonth] = useState('');
    const [ endYear, setEndYear] = useState('');
    const [ endHour, setEndHour] = useState('');
    const [ endMinutes, setEndMinutes] = useState('');

    let groupId;
    if(event) groupId = event.groupId
   
    useEffect(() => {
        dispatch(groupActions.getAGroup(groupId))
    }, [dispatch, groupId])

    useEffect(()=>{
        dispatch(eventActions.getAEvent(eventId))
    },[dispatch, eventId])

    const onSubmit = async(e) => {
        e.preventDefault();

        let errors = [];
        if(isNaN(venueId)) errors.push('There must be a venue selected') 
        if(name.length < 5) errors.push('Name must be 5 character or longer')
        if(!description.length) errors.push('Description is required')
        if(type !== 'Online' && type !== 'In person') errors.push('Type must be Online or In person')
        if(isNaN(capacity)) errors.push('Capacity must be an integer')
        if(isNaN(price)) errors.push('Price is invalid')
        if(startDate < fullDate) errors.push('Start Date must be in the future')
        if(endDate < startDate) errors.push('End Date must be greater than start Date')

        await dispatch(eventActions.editAEvent({venueId, name, description, type, capacity, price, startDate, endDate}, eventId))
        .catch(async (res) => {
            const data = await res.json();
            if(data && data.errors) {
                let dataErrors = Object.values(data.errors)
                errors.push(...dataErrors)
            }
        })

        setValidationErrors(errors)
        
        if(errors.length <= 0) {
            setVenueId('');
            setName('');
            setDescription('');
            setType('');
            setCapacity('');
            setPrice('');
            setStartDate('');
            setEndDate('');
            history.push(`/groups/${groupId}`)
        }  
    };

    let fullDate = new Date()

    let year = fullDate.getFullYear();
    let month = fullDate.getMonth();
    let day = fullDate.getDate();
    let hour = fullDate.getHours();
    let minutes = fullDate.getMinutes()
    
    if(!startYear) setStartYear(year);
    if(!startMonth) setStartMonth(month);
    if(!startDay) setStartDay(day);
    if(!startHour) setStartHour(hour + 1);
    if(!startMinutes) setStartMinutes(minutes);
    if(!endHour) setEndHour(startHour)
    if(!endMinutes && startMinutes) setEndMinutes(startMinutes + 1)

    let inPersonVenues = [];
    if(group) {
       for(let i = 0; i < group.Venues.length; i++){
        let venue = group.Venues[i];
        if(venue.address !== 'Online') inPersonVenues.push(venue)
       }
    }

    return ( 
        <>
        <form onSubmit={onSubmit}>
        { validationErrors && (
            <ul>
            {validationErrors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))} 
            </ul>
                )
            }
        { ( (type === 'In person' || type === '') && group) && ( 
            <>
            { group.Venues.length >= 1 && (
               <div className="dropdown">
            <span>View Venues</span>
                <div className="dropdown-content">
                    {group && (
                        <div>
                         { inPersonVenues.map(venue => {
                            if(venue.name !== 'Online'){
                            return (
                            <div className='VenueCard' onClick={() => setVenueId(venue.id)} >
                                <div>{venue.address}</div>
                                <div>{venue.city}</div>
                                <div>{venue.state}</div>
                            </div>
                                )} else return <></>
                            }
                        )}
                        </div>
                    )}
                </div>
            </div> 
            )}
            </>
        )}
        { ( (type === 'In person' || type === '') && group) && (
            <>
            {!inPersonVenues.length && (
                <div>
                <Link to={`/groups/${groupId}/newVenue`}>For In person events you must have a Venue. Create one Here</Link>
            </div>
            )}
            </>
        )}
        <label> Name
            <input type='text' onChange={(e) => setName(e.target.value)} value={name}/>
        </label>
        <label> Description
            <input type='text' onChange={(e) => setDescription(e.target.value)} value={description}/>
        </label>
        <>
        <label>Type
            <input type='radio' onChange={(e) => setType(e.target.value)} value='Online' checked={type === 'Online'}/> Online
            <input type='radio' onChange={(e) => setType(e.target.value)} value='In person' checked={type === 'In person'}/> In person
        </label>
        </>
        <label> Capacity
            <input onChange={(e) => setCapacity(e.target.value)} className='Capacity' type='number' min='1' step='1' placeholder='1' value={capacity}/>
        </label>
        <label> Price
            <input onChange={(e) => setPrice(e.target.value)} className='Price' type='number' min='1' step='.01' placeholder='1' value={price}/>
        </label>
        <label> Start Date:
            <input type='date' 
            value={`${startYear}-${startMonth}-${startDay}`} 
            min={`${startYear}-${startMonth}-${startDay}`} 
            onChange={(e) => { 
                let dateArr = e.target.value.split('-'); 
                setStartYear(dateArr[0]);
                setStartMonth(dateArr[1]);
                setStartDay(dateArr[2])
                if(startHour && startMinutes) setStartDate(new Date(startYear, startMonth, startDay, startHour, startMinutes));
            }} 
            required/>
                <label> Start Time:
                <input 
                type='time' 
                min={`${startHour}:${startMinutes}`} 
                value={`${startHour}:${startMinutes}`}
                onChange={(e) => {
                    let timeArr = e.target.value.split(':')
                    setStartHour(timeArr[0]);
                    setStartMinutes(timeArr[1]);
                    if(startYear && startMonth && startDay) setStartDate(new Date(startYear, startMonth, startDay, startHour, startMinutes));
                }} 
                required/>
                </label>
        </label>
        <label> End Date:
            <input type='date' 
            value={`${endYear}-${endMonth}-${endDay}`} 
            min={`${startYear}-${startMonth}-${startDay}`}
            onChange={(e) => { 
                let dateArr = e.target.value.split('-'); 
                setEndYear(dateArr[0]);
                setEndMonth(dateArr[1]);
                setEndDay(dateArr[2])
                if(endHour && endMinutes) setEndDate(new Date(endYear, endMonth, endDay, endHour, endMinutes));
            }} 
            required/>
            <label> EndTime:
            <input 
            type='time' 
            min={`${startHour}:${startMinutes + 1}`}
            value={`${endHour}:${endMinutes}`} 
            onChange={(e) => {
                let timeArr = e.target.value.split(':');
                setEndHour(timeArr[0]);
                setEndMinutes(timeArr[1]);
                if(endYear && endMonth && endDay) setEndDate(new Date(endYear, endMonth, endDay, endHour, endMinutes));
            }}
            required/>
            </label>
        </label>
        <button type='submit'>
            Submit
        </button>
        </form>
        </>
    )
}

export default EditEvent;