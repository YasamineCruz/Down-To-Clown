import * as eventActions from "../../store/events";
import * as groupActions from '../../store/groups'
import { useSelector, useDispatch} from 'react-redux'
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import './EditEvent.css';

export const addZero = (num) => num < 10 ? `0${num}` : num;

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
    const [ submitted, setSubmitted] = useState(false);
   const [ loaded, setLoaded] = useState(false)

    const fullDate = useMemo(() => { return new Date()}, [])
    const minStartDate = `${fullDate.getFullYear()}-${addZero(fullDate.getMonth() + 1)}-${addZero(fullDate.getDate() + 1)}T${addZero(fullDate.getHours())}:00`

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
            if(capacity === null) setCapacity(event.capacity);
            if(price === null) setPrice(event.price);
            let newStartDate = new Date(event.startDate)
            if(startDate === null) setStartDate(`${newStartDate.getFullYear()}-${addZero(newStartDate.getMonth() + 1)}-${addZero(newStartDate.getDate())}T${addZero(newStartDate.getHours())}:${addZero(newStartDate.getMinutes())}`)
            let newEndDate = new Date(event.endDate)
            if(endDate === null) setEndDate(`${newEndDate.getFullYear()}-${addZero(newEndDate.getMonth() + 1)}-${addZero(newEndDate.getDate())}T${addZero(newEndDate.getHours())}:${addZero(newEndDate.getMinutes())}`)
            }
    },[event, venueId, name, description, type, capacity, price])
   

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
        console.log(name)
        if(isNaN(venueId)) errors.push('There must be a venue selected') 
        if(!name || name.length < 5) errors.push('Name must be 5 character or longer')
        if(!description) errors.push('Description is required')
        if(type !== 'Online' && type !== 'In person') errors.push('Type must be Online or In person')
        if(isNaN(capacity)) errors.push('Capacity must be an integer')
        if(isNaN(price)) errors.push('Price is invalid')
        if(new Date(startDate) < fullDate) errors.push('Start Date must be in the future')
        if(new Date(endDate) < new Date(startDate)) errors.push('End Date must be greater than start Date')
        
        setValidationErrors(errors)
        
    },[fullDate, venueId, name, description, type, capacity, price, startDate, endDate])
    console.log(validationErrors,'---valErrors')

    const onSubmit = async(e) => {
        e.preventDefault();
        let errors = [];
        setSubmitted(true)
        
        if(validationErrors.length <=0 ){
            console.log('yeeet')
            await dispatch(eventActions.editAEvent({venueId, name, description, type, capacity, price, startDate, endDate}, eventId))
        .catch(async (res) => {
            const data = await res.json();
            if(data && data.errors) {
                let dataErrors = Object.values(data.errors)
                errors.push(...dataErrors)
                setValidationErrors(errors)
            }
        })}

   
        if(validationErrors.length <= 0 && errors.length <= 0) {
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
        <div className='edit-group-text-wrapper'>
        <div className='edit-group-div'>
            <input className='edit-group-input' type='text' onChange={(e) => { setName(e.target.value); console.log(name) }} value={name} required placeholder='Enter a name' minLength={5} maxLength={200}/>
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
            <button className='BackButton' onClick={()=>  history.push(`/events/${eventId}`)}type='button'>Exit</button>
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