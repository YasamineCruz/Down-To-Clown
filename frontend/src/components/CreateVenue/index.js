import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState} from 'react';
import * as venueActions from '../../store/venues';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as groupActions from '../../store/groups'

const CreateVenue = () => {
    const [ address, setAddress] = useState('');
    const [ city, setCity] = useState('');
    const [ state, setState] = useState('');
    const [ lat, setLat] = useState('');
    const [ lng, setLng ] = useState('');
    const [ errors, setErrors ] = useState([]);
    const params = useParams()
    const history = useHistory();
    const dispatch = useDispatch();
    const { groupId } = params;
    const [submitted, setSubmitted] = useState(false)
    const sessionUser = useSelector(state => state.session.user)
    const group = useSelector(state => state.group.group)

    if(!sessionUser) history.push('/')

    if(group && sessionUser){
        if(group.organizerId !== sessionUser.id) history.push('/')
    }


    useEffect(() => {
        dispatch(groupActions.getAGroup(groupId))
    }, [dispatch, groupId])

    useEffect(()=> {
        let validationErrors = [];
        if(!address || address.length < 1 || address.length > 200) validationErrors.push('Address must be between 1 and 200 characters long.');
        if(!city || city.length < 1 || city.length > 200) validationErrors.push('City must be between 1 and 200 characters long.');
        if(!state || state.length < 1 || state.length > 200) validationErrors.push('State must be between 1 and 200 characters long.');
        if(isNaN(lat)) validationErrors.push('Latitude must be number.');
        if(isNaN(lng)) validationErrors.push('Longitude must be a number.');
        setErrors(validationErrors)
    }, [address, city, state, lat, lng, errors])

    const onSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true)
        setErrors([]);
        if(errors.length <= 0){
            dispatch(venueActions.createAVenue(groupId, { address, city, state, lat, lng}))
            .catch(async (res) => {
              const data = await res.json();
              if(data && data.errors) setErrors(data.errors)
            }
          )
        }
        if(errors.length <= 0) {
            setAddress('');
            setState('');
            setCity('');
            setLat('');
            setLng('');
            history.goBack();
        }
    }

    return ( 
        <div className='edit-event-container'>
            <form className='edit-event-form-wrapper' onSubmit={onSubmit}>
            <div className='edit-group-div-wrapper'>
               <h1 className='edit-group-h1-text'>Create a Venue</h1> 
            </div>
                { submitted && errors && (
                <ul className='create-group-errors'>
                {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
                ))} 
                </ul>
                    )
                }   
                    <div className='edit-group-text-wrapper'>
                        <div className='edit-group-div'>
                        <input className='edit-group-input' type='text' onChange={(e) => setAddress(e.target.value) } value={address} required placeholder='Enter a address' maxLength={200}/>
                        <input className='edit-group-input' type='text' onChange={(e)=> setCity(e.target.value)} value={city} required placeholder='Enter a city' maxLength={200}/>
                        <input className='edit-group-input' type='text' onChange={(e)=> setState(e.target.value)} value={state} required placeholder='Enter a state' maxLength={200}/>
                        <input className='edit-group-input' type='number' step='.01' onChange={(e) => setLat(e.target.value)} value={lat} required placeholder='Enter a Latitude'/>
                        <input className='edit-group-input' type='number' step='0.01' onChange={(e) => setLng(e.target.value)} value={lng} required placeholder='Enter a longitude'/>  
                        </div>  
                    </div> 
                <div className='button-container'>
                    <button className='nextButton-selected' type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CreateVenue