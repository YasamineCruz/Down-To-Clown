import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState} from 'react';
import * as venueActions from '../../store/venues';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

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

    const onSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
          dispatch(venueActions.createAVenue(groupId, { address, city, state, lat, lng}))
          .catch(async (res) => {
            const data = await res.json();
            if(data && data.errors) setErrors(data.errors)
          }
        )
        if(errors.length <= 0) {
            setAddress('');
            setState('');
            setCity('');
            setLat('');
            setLng('');
            history.push(`/groups/${groupId}`)
        }
    }

    return ( 
        <div className='edit-event-container'>
            <form className='edit-event-form-wrapper' onSubmit={onSubmit}>
            <div className='edit-group-div-wrapper'>
               <h1 className='edit-group-h1-text'>Create a Venue</h1> 
            </div>
                { errors && (
                <ul className='create-group-errors'>
                {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
                ))} 
                </ul>
                    )
                }   
                    <div className='edit-group-text-wrapper'>
                        <div className='edit-group-div'>
                        <input className='edit-group-input' type='text' onChange={(e) => setAddress(e.target.value) } value={address} required placeholder='Enter a address'/>
                        <input className='edit-group-input' type='text' onChange={(e)=> setCity(e.target.value)} value={city} required placeholder='Enter a city'/>
                        <input className='edit-group-input' type='text' onChange={(e)=> setState(e.target.value)} value={state} required placeholder='Enter a state'/>
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