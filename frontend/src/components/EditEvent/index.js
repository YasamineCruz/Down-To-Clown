import * as eventActions from "../../store/events";
import * as groupActions from '../../store/groups'
import { useSelector, useDispatch} from 'react-redux'
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
// import { Link } from "react-router-dom";
import './EditEvent.css'

const EditEvent = () => {
    const history = useHistory();
    const params = useParams()
    const dispatch = useDispatch();

    const event = useSelector(state => state.event.event)
    const group = useSelector(state => state.group.group);
    let sessionUser = useSelector(state => state.session.user)
    
    const { eventId } = params
    
    const [ venueId, setVenueId] = useState(null);
    const [ name, setName] = useState(null);
    const [ description, setDescription] = useState(null);
    const [ type, setType] = useState(null);
    const [ capacity, setCapacity] = useState(null);
    const [ price, setPrice] = useState(null);
    const [ startDate, setStartDate] = useState(null);
    const [ endDate, setEndDate] = useState(null);
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
    const [ submitted, setSubmitted] = useState(false);
   const [ loaded, setLoaded] = useState(false)

    const fullDate = useMemo(() => { return new Date()}, [])

    if(!sessionUser) history.push('/');

    if(group && sessionUser){
        if(group.organizerId !== sessionUser.id) history.push('/')
    }

    useEffect(()=> {
        setLoaded(true)
        if(loaded && event){
            if(venueId === null) setVenueId(event.venueId)
            if(name === null) setName(event.name)
            if(description === null) setDescription(event.description)
            if(type === null) setType(event.type)
            if(capacity === null) setCapacity(event.capacity)
            if(price === null) setPrice(event.price)
            if(startDate === null) setStartDate(event.startDate)
            if(endDate === null) setEndDate(event.endDate)
        }

    },[event, venueId, name, description, type, capacity, price, loaded, startDate, endDate])
   
    let groupId;
    if(event) groupId = event.groupId
   
    useEffect(() => {
        if(groupId){
         dispatch(groupActions.getAGroup(groupId))   
        }
    }, [dispatch, groupId])

    useEffect(()=>{
        dispatch(eventActions.getAEvent(eventId))
    },[dispatch, eventId])
    
    useEffect(()=>{
        let errors = [];

        if(isNaN(venueId)) errors.push('There must be a venue selected') 
        if(!name || name.length < 5) errors.push('Name must be 5 character or longer')
        if(!description) errors.push('Description is required')
        if(type !== 'Online' && type !== 'In person') errors.push('Type must be Online or In person')
        if(isNaN(capacity)) errors.push('Capacity must be an integer')
        if(isNaN(price)) errors.push('Price is invalid')
        if(startDate < fullDate) {
            errors.push('Start Date must be in the future')
        }
        if(endDate < startDate) errors.push('End Date must be greater than start Date')
        
        setValidationErrors(errors)
        
    },[fullDate, venueId, name, description, type, capacity, price, startDate, endDate])

    const onSubmit = async(e) => {
        e.preventDefault();
        let errors = [];
        setSubmitted(true)
        
        if(validationErrors.length <=0 ){
            await dispatch(eventActions.editAEvent({venueId, name, description, type, capacity, price, startDate, endDate}, eventId))
        .catch(async (res) => {
            const data = await res.json();
            if(data && data.errors) {
                let dataErrors = Object.values(data.errors)
                errors.push(...dataErrors)
            }
        })}

        setValidationErrors(errors)
        
        if(validationErrors.length <= 0) {
            setVenueId('');
            setName('');
            setDescription('');
            setType('');
            setCapacity('');
            setPrice('');
            setStartDate('');
            setEndDate('');
            history.push(`/events/${eventId}`)
        }  
    };

    let endDate2;
    let startDate2;

    if(event){
        endDate2 = new Date(event.endDate)
        startDate2 = new Date(event.startDate)
    }

    if(endDate2 && startDate2){
    let yearS = startDate2.getFullYear();
    let monthS = startDate2.getMonth();
    let dayS = startDate2.getDate();
    let hourS = startDate2.getHours();
    let minutesS = startDate2.getMinutes();
    if(monthS < 10) monthS= `0${monthS}`
    if(dayS < 10) dayS = `0${dayS}`
    if(minutesS < 10 && minutesS !== 0) minutesS = `00`
    if(minutesS === 0) minutesS = `00`
    if(hourS < 10) hourS = `0${hourS}`

    let yearE = endDate2.getFullYear();
    let monthE = endDate2.getMonth();
    let dayE = endDate2.getDate();
    let hourE = endDate2.getHours();
    let minutesE = endDate2.getMinutes();
    if(monthE < 10) monthE = `0${monthE}`
    if(dayE < 10) dayE = `0${dayE}`
    if(minutesE < 10 && minutesE !== 0) minutesE = `00`
    if(minutesE === 0) minutesE = `00`
    if(hourE < 10) hourE = `0${hourE}`
    
    
    
    if(!startYear) setStartYear(yearS);
    if(!startMonth) setStartMonth(monthS);
    if(!startDay) setStartDay(dayS);
    if(!startHour) setStartHour(hourS);
    if(!startMinutes) setStartMinutes(minutesS);

    if(!endYear) setEndYear(yearE)
    if(!endMonth) setEndMonth(monthE)
    if(!endDay) setEndDay(dayE)
    if(!endHour) setEndHour(hourE)
    if(!endMinutes) setEndMinutes(minutesE)    
    }
    


    let inPersonVenues = [];
    if(group) {
       for(let i = 0; i < group.Venues.length; i++){
        let venue = group.Venues[i];
        if(venue.address !== 'Online') inPersonVenues.push(venue)
       }
    }


    return ( 
        <div className='edit-event-container'>
            {event && loaded && (
                <form className='edit-event-form-wrapper' onSubmit={onSubmit}>
        <div className='edit-group-div-wrapper'>
               <h1 className='edit-group-h1-text'>Edit Event</h1> 
        </div>
        { validationErrors && submitted && (
            <ul className='create-group-errors'>
            {validationErrors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))} 
            </ul>
                )
            }
        {/* { ( (type === 'In person' || type === '') && group) && ( 
            <div className='edit-event-dropdown-wrapper'>
            { group.Venues.length >= 2 && (
               <div className="dropdown">
            <span>View Venues</span>
                <div className="dropdown-content">
                    {group && (
                        <div>
                         { inPersonVenues.map(venue => {
                            if(venue.name !== 'Online'){
                            return (
                            <div key={venue.id} className={venueId === venue.id ? `VenueCard-selected` : `VenueCard-not-selected`} onClick={() => setVenueId(venue.id)} >
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
            </div>
        )} */}
        {/* { ( (type === 'In person' || type === '') && group) && (
            <>
            {!inPersonVenues.length && (
                <div className='create-event-link-container'>
                <Link className='create-event-link-to-create-venue' to={`/groups/${groupId}/newVenue`}>For In person events you must have a Venue. Create one Here</Link>
            </div>
            )}
            </>
        )} */}
        <div className='edit-group-text-wrapper'>
        <div className='edit-group-div'>
            <input className='edit-group-input' type='text' onChange={(e) => setName(e.target.value)} value={name} required placeholder='Enter a name' minLength={5} maxLength={200}/>
            <input className='edit-group-input' type='text' onChange={(e) => setDescription(e.target.value)} value={description} required placeholder='Enter a description' maxLength={500}/>
            <input className='edit-group-input' onChange={(e) => setCapacity(e.target.value)} type='number' min='1' step='1' required placeholder='Enter a capacity' value={capacity}/>
            <input className='edit-group-input' onChange={(e) => setPrice(e.target.value)} type='number' min='1' step='.01' required placeholder='Enter a price' value={price}/>
        </div>
        <div className='edit-event-radio'>
            <h2 className='create-event-h2-text'>Type</h2>
            <div className='radio-wrapper3'>
            <label className='radio-text2'>Online</label>
            <input className='radio-input2' type='radio' onChange={(e) => setType(e.target.value)} value='Online' checked={type === 'Online'}/> 
            <div className='radio-wrapper3'>
                <label className='radio-text2'>In person</label>
                <input className='radio-input2' type='radio' onChange={(e) => setType(e.target.value)} value='In person' checked={type === 'In person'}/>  
            </div>
            </div>    
        </div>
        <div className='create-event-date'> 
            <label className='create-event-label-text'>Start Date</label>
            <input 
            className='create-event-startDate-input'
            type='date' 
            value={`${startYear}-${startMonth}-${startDay}`} 
            // min={`${year}-${month}-${day}`} 
            onChange={(e) => { 
                let dateArr = e.target.value.split('-'); 
                setStartYear(dateArr[0]);
                setStartMonth(dateArr[1]);
                setStartDay(dateArr[2])
                if(startHour && startMinutes) setStartDate(new Date(startYear, startMonth, startDay, startHour, startMinutes));
            }} 
            required/>
                <label className='create-event-label-text'> Start Time</label>
                <input
                className='create-event-startDate-input' 
                type='time' 
                // min={`${startHour}:${startMinutes}`} 
                value={`${startHour}:${startMinutes}`}
                onChange={(e) => {
                    let timeArr = e.target.value.split(':')
                    setStartHour(timeArr[0]);
                    setStartMinutes(timeArr[1]);
                    if(startYear && startMonth && startDay) setStartDate(new Date(startYear, startMonth, startDay, startHour, startMinutes));
                }} 
                required/>
        </div>
        <div className='create-event-date'>
         <label className='create-event-label-text'> End Date</label>
            <input type='date'
            className='create-event-startDate-input' 
            value={`${endYear}-${endMonth}-${endDay}`} 
            // min={`${year}-${month}-${day}`}
            onChange={(e) => { 
                let dateArr = e.target.value.split('-'); 
                setEndYear(dateArr[0]);
                setEndMonth(dateArr[1]);
                setEndDay(dateArr[2])

                if(endHour && endMinutes) setEndDate(new Date(endYear, endMonth, endDay, endHour, endMinutes));  
            }} 
            required/>
            <label className='create-event-label-text'> EndTime </label>
            <input
            className='create-event-startDate-input' 
            type='time' 
            // min={`${startHour}:${startMinutes + 1}`}
            value={`${endHour}:${endMinutes}`} 
            onChange={(e) => {
                let timeArr = e.target.value.split(':');
                setEndHour(timeArr[0]);
                setEndMinutes(timeArr[1]);
                if(endYear && endMonth && endDay) setEndDate(new Date(endYear, endMonth, endDay, endHour, endMinutes));
            }}
            required/>
        </div>
        
        </div>
        <div className='button-container'>
           <button className='nextButton-selected' type='submit'>
            Submit
            </button> 
        </div>
        </form>
            )}
        
        </div>
    )
}

export default EditEvent;