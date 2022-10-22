import * as eventActions from '../../store/events'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './CreateAEvent.css';
import * as groupActions from '../../store/groups'



const CreateEvent = () => {
    const [ venueId, setVenueId] = useState('');
    const [ name, setName] = useState('');
    const [ description, setDescription] = useState('');
    const [ type, setType] = useState('');
    const [ capacity, setCapacity] = useState('');
    const [ price, setPrice] = useState('');
    const [ startDate, setStartDate] = useState('');
    const [ endDate, setEndDate] = useState('');
    const [ validationErrors, setValidationErrors] = useState([]);
    let history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();
    const { groupId } = params;
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
    const [ submitted, setSubmitted] = useState(false)

    const sessionUser = useSelector(state => state.session.user)
    const group = useSelector(state => state.group.group);
    const fullDate = useMemo(() => { return new Date()}, [])

    if(!sessionUser) history.push('/')

    useEffect(() => {
        dispatch(groupActions.getAGroup(groupId))
    }, [dispatch, groupId])

    useEffect(() => {
        if(group){
            console.log(group)
            let venues = group.Venues;
            setVenueId(venues[0]?.id)
        } 
    },[group])


    useEffect(()=>{
        let errors = [];
        if(isNaN(venueId)) errors.push('There must be a venue selected') 
        if(name.length < 5) errors.push('Name must be 5 character or longer')
        if(!description.length) errors.push('Description is required')
        if(type !== 'Online' && type !== 'In person') errors.push('Type must be Online or In person')
        if(isNaN(capacity)) errors.push('Capacity must be an integer')
        if(isNaN(price)) errors.push('Price is invalid')

        setValidationErrors(errors)

    },[venueId, name, description, type, capacity, price, startDate, endDate, fullDate])

    const onSubmit = async(e) => {
        e.preventDefault();
        let errors = [];
        setSubmitted(true)
        if(startDate < fullDate) errors.push('Start Date must be in the future')
        if(endDate < startDate) errors.push('End Date must be greater than start Date')

        if(validationErrors.length <= 0 && errors.length <= 0){
            await dispatch(eventActions.createAEvent({venueId, name, description, type, capacity, price, startDate, endDate}, groupId))
            .catch(async (res) => {
                const data = await res.json();
                if(data && data.errors) {
                    let dataErrors = Object.values(data.errors)
                    errors.push(...dataErrors)
                }
            })
        } 

        if(validationErrors.length <= 0 && errors.length <= 0) {
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
        
        setValidationErrors(errors)
    }

  
    let year = fullDate.getFullYear();
    let month = fullDate.getMonth();
    let day = fullDate.getDate() + 1;
    let hour = fullDate.getHours();
    let minutes = fullDate.getMinutes()
    
    if(month < 10) month = `0${month}`
    if(day < 10) month = `0${day}`
    if(minutes < 10 && minutes !== 0) minutes = `00`
    if(minutes === 0) minutes = `00`
    if(hour < 10) hour = `0${hour}`

    if(fullDate){
      if(!startYear) setStartYear(year);
      if(!startMonth) setStartMonth(month);
      if(!startDay) setStartDay(day);
      if(!startHour) setStartHour(hour);
      if(!startMinutes) setStartMinutes(minutes);
      if(!endYear) setEndYear(startYear)
      if(!endMonth) setEndMonth(startMonth)
      if(!endDay) setEndDay(startDay) 
      if(!endHour && startHour) setEndHour(+startHour + 1)
      if(!endMinutes && startMinutes) setEndMinutes(+startMinutes + 1)   
    }

    // let inPersonVenues = [];
    // if(group) {
    //    for(let i = 0; i < group.Venues.length; i++){
    //     let venue = group.Venues[i];
    //     if(venue.address !== 'Online') inPersonVenues.push(venue)
    //    }
    // }
    

    return ( 
        <div className='edit-event-container'>
            <form className='edit-event-form-wrapper'onSubmit={onSubmit}>
            <div className='create-event-div-wrapper'>
               <h1 className='create-event-h1-text'>Create an Event</h1> 
            </div>
        { validationErrors && submitted && (
            <ul className='create-event-errors'>
            {validationErrors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))} 
            </ul>
                )
            }
        {/* { ( (type === 'In person' || type === '') && group) && ( 
            <div>
            { group.Venues.length >= 2 && (
               <div className="dropdown">
                <h3 className='create-event-h3'>In person events must have a venue.</h3>
            <span className='span-for-event-create'>Select a Venue Here</span>
                <div className="dropdown-content">
                    {group && (
                        <div>
                         { inPersonVenues.map(venue => {
                            if(venue.name !== 'Online'){
                            return (
                            <div key={venue.id} className={venueId === venue.id ? `VenueCard-selected` : `VenueCard-not-selected`} onClick={() => setVenueId(venue.id)} >
                                <div>{venue.address} {venue.city}, {venue.state}</div>
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
        )}
        { ( (type === 'In person' || type === '') && group) && (
            <>
            {!inPersonVenues.length && (
                <div className='create-event-link-container'>
                    For In person events you must have a Venue. Create one 
                <Link className='create-event-link-to-create-venue' to={`/groups/${groupId}/newVenue`}>Here</Link>
            </div>
            )}
            </>
        )} */}
        <div className='edit-group-text-wrapper'>
        <h2 className='event-details-Text'>Event Details</h2>
        <div className='edit-group-div'>
            <input className='edit-group-input' type='text' onChange={(e) => setName(e.target.value)} value={name} required placeholder='Enter a name' maxLength={200} minLength={5}/>
            <input className='edit-group-input' type='text' onChange={(e) => setDescription(e.target.value)} value={description} required placeholder='Enter a description' maxLength={500}/>
            <input className='edit-group-input' onChange={(e) => setCapacity(e.target.value)} type='number' min='1' step='1' required placeholder='Enter a capacity' value={capacity}/>
            <input className='edit-group-input' onChange={(e) => setPrice(e.target.value)} type='number' min='1' step='.01' required placeholder='Enter a price' value={price}/>
        </div>
        <div className='create-event-radio'>
            <h2 className='create-event-h2-text'>Type</h2>
            <div className='radio-wrapper2'>
            <label className='radio-text2'>Online</label>
            <input className='radio-input2' type='radio' onChange={(e) => setType(e.target.value)} value='Online' checked={type === 'Online'}/> 
                <label className='radio-text2'>In person</label>
                <input className='radio-input2' type='radio' onChange={(e) => setType(e.target.value)} value='In person' checked={type === 'In person'}/>  
            </div>    
        </div>
        <div className='create-event-date'> 
            <label className='create-event-label-text'>Start Date</label>
            <input 
            className='create-event-startDate-input'
            type='date' 
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
                <label className='create-event-label-text'> Start Time</label>
                <input
                className='create-event-startDate-input' 
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
        </div>
        <div className='create-event-date'>
         <label className='create-event-label-text'> End Date</label>
            <input type='date'
            className='create-event-startDate-input' 
            value={`${endYear}-${endMonth}-${endDay}`} 
            min={`${endYear}-${endMonth}-${endDay}`}
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
            min={`${hour}:${minutes + 1}`}
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
        </div>
    )
}

export default CreateEvent;