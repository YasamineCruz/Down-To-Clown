import * as eventActions from '../../store/events'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './CreateAEvent.css';
import * as groupActions from '../../store/groups'
import { Link } from 'react-router-dom';
import { addZero } from '../EditEvent';

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
    const [ submitted, setSubmitted] = useState(false)

    const sessionUser = useSelector(state => state.session.user)
    const group = useSelector(state => state.group.group);
    const fullDate = useMemo(() => { return new Date()}, [])
    const minStartDate = `${fullDate.getFullYear()}-${addZero(fullDate.getMonth() + 1)}-${addZero(fullDate.getDate() + 1)}T${addZero(fullDate.getHours())}:00`


    if(!sessionUser) history.push('/')

    useEffect(() => {
        dispatch(groupActions.getAGroup(groupId))
    }, [dispatch, groupId])

    useEffect(() => {
        if(type === 'Online' && group){
            let venues = group.Venues;
            for(let i = 0; i < venues.length; i++){
                let venue = venues[i];
                if(venue.address === 'Online') setVenueId(venue.id)
            }
        } 
    },[type, group])

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

        if(validationErrors.length <= 0){
            await dispatch(eventActions.createAEvent({venueId, name, description, type, capacity, price, startDate, endDate}, groupId))
            .catch(async (res) => {
                const data = await res.json();
                if(data && data.errors) {
                    let dataErrors = Object.values(data.errors)
                    errors.push(...dataErrors)
                }
            })
        } else {
            return
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



    let inPersonVenues = [];
    if(group) {
       for(let i = 0; i < group.Venues.length; i++){
        let venue = group.Venues[i];
        if(venue.address !== 'Online') inPersonVenues.push(venue)
       }
    }
    

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
        { ( (type === 'In person' || type === '') && group) && ( 
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
        )}
        <div className='edit-group-text-wrapper'>
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
            type='datetime-local' 
            value={startDate}
            min={minStartDate} 
            onChange={(e) => { 
                setStartDate(e.target.value)
            }} 
            required/>
        </div>
        <div className='create-event-date'>
         <label className='create-event-label-text'> End Date</label>
            <input type='datetime-local'
            className='create-event-startDate-input' 
            value={endDate}
            min={startDate} 
            onChange={(e) => { 
                setEndDate(e.target.value)
            }} 
            required/>
        </div>
        </div>
        <div className='button-container'>
            <button className='BackButton' type='button' onClick={() =>  history.push(`/groups/${groupId}`)}>Exit</button>
           <button className='nextButton-selected' type='submit'>
            Submit
            </button> 
        </div>
        </form>
        </div>
    )
}

export default CreateEvent;