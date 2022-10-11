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
        <form onSubmit={onSubmit}>

             { errors && (
            <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))} 
            </ul>
                )
            }
            <label>Address
                <input type='text' onChange={(e) => setAddress(e.target.value) } value={address}/>
            </label>
            <label>City
                <input type='text' onChange={(e)=> setCity(e.target.value)} value={city}/>
            </label>
            <label>State
                <input type='text' onChange={(e)=> setState(e.target.value)} value={state}/>
            </label>
            <label>Lat
                <input type='number' step='.01' onChange={(e) => setLat(e.target.value)} value={lat}/>
            </label>
            <label>Lng
                <input type='number' step='0.01' onChange={(e) => setLng(e.target.value)} value={lng}/>
            </label>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default CreateVenue