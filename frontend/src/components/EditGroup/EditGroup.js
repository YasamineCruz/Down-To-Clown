import * as groupActions from "../../store/groups";
import { useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import './EditGroup.css'


const EditGroup = () => {
    const history = useHistory();
    const params = useParams()
    const dispatch = useDispatch();
    
    const sessionUser = useSelector(state => state.session.user);
    const group = useSelector(state => state.group.group)

    
    const { groupId } = params

    const [validationErrors, setValidationErrors] = useState([]);
    const [name, setName] = useState(null)
    const [description, setDescription] = useState(null)
    const [city, setCity] = useState(null)
    const [state, setState] = useState(null)
    const [type, setType] = useState(null)
    const [private_key, setPrivate_key] = useState(null)
    const [organizerId, setOrganizerId] = useState(null)
    const [ submitted, setSubmitted] = useState(false);

    useEffect(()=> {
        if(group){
            if(name === null) setName(group.name);
            if(description === null) setDescription(group.about);
            if(city === null) setCity(group.city);
            if(state === null) setState(group.state);
            if(type === null) setType(group.type)
            if(private_key === null) setPrivate_key(group.private)
            if(organizerId === null) setOrganizerId(group.organizerId)
        }
    },[name, description, city, state, type, private_key, organizerId, group])
   

    useEffect(()=>{
        dispatch(groupActions.getAGroup(groupId))
    },[dispatch, groupId])

    useEffect(() => {
        setOrganizerId(sessionUser.id)
    },[sessionUser.id])

    useEffect(()=> {
        let errors = [];

        if(!description || description.length < 50) errors.push('Description must be atleast 50 characters');
        if(!state) errors.push('You must enter a state');
        if(!city) errors.push('You must enter a city');
        if(!name) errors.push('You must enter a Group name');
        if(!type) errors.push('Type must be Online or In person');
        if(private_key !== 0 && private_key !== 1) errors.push('You must select private or public');

        setValidationErrors(errors);

    },[description, state, city, name, type, private_key])



    const onSubmit = (e) => {
        e.preventDefault();
        
       setSubmitted(true)
       if(validationErrors.length <= 0){
           dispatch(groupActions.editAGroup({ organizerId, name, description, type, private_key, city, state}, groupId))
           .catch(async (res) => {
               const data = await res.json();
               if(data && data.errors) setValidationErrors(data.errors)
           })
       }

        if(validationErrors.length <= 0) {
            history.push(`/groups/${groupId}`)
        }
    }

    return (
        <div className='edit-group-div-container'>
        <form  onSubmit={onSubmit}>
            <div className='edit-group-div-wrapper'>
               <h1 className='edit-group-h1-text'>Edit Group</h1> 
            </div>
            { validationErrors && submitted && (
                <ul className='create-group-errors'>
            {validationErrors.map((error, idx) => (
                <li key={idx}>{error}</li>
            ))} 
            </ul>
            )}
            { group && (
            <div className='edit-group-text-wrapper'>
                <div className='edit-group-div'>
                    <input className='edit-group-input' type='text' onChange={(e)=> setName(e.target.value)} value={name} required placeholder='Enter a name' maxLength={60}/>
                    <input className='edit-group-input' type='text' onChange={(e)=> setDescription(e.target.value)} value={description} required placeholder='Enter a description atleast 50 characters long' minLength={50} maxLength={500}/>
                    <input className='edit-group-input' type='text' onChange={(e) => setCity(e.target.value)} value={city} required placeholder='Enter a city'/>
                    <input className='edit-group-input' type='text' onChange={(e) => setState(e.target.value)} value={state} placeholder='Enter a state' required/>
                </div>  
                <form className='edit-group-form-wrapper'>
                <h1 className='edit-group-h1-text'>Select Type</h1>
                    <div className='radio-wrapper'>
                    <input className='radio-input' onChange={(e) => setType(e.target.value)} type='radio' value='Online' name='type' required checked={type === 'Online'}/>
                        <label className='radio-text' for='online'>Online</label> 
                    </div>
                    <div className='radio-wrapper'>
                    <input className='radio-input' onChange={(e) => setType(e.target.value)} type='radio' value='In person' name='type' required checked={type === 'In person'}/>
                        <label className='radio-text' for='in person'>In person</label>  
                    </div>
                </form> 
                <form className='edit-group-form-wrapper'>
                    <h1 className="edit-group-h1-text">Select Private or Public</h1>
                    <div className='radio-wrapper'>
                    <input className='radio-input' onChange={(e) => setPrivate_key(e.target.value)} type='radio' value={true} name='type' required checked={private_key === 'true' || private_key === 1}/>
                        <label className='radio-text' for='online'>Private</label>  
                    </div>
                    <div className='radio-wrapper'>
                    <input className='radio-input' onChange={(e) => setPrivate_key(e.target.value)} type='radio' value={false} name='type' required checked={private_key === 'false' || private_key === 0}/>
                    <label className='radio-text' for='in person'>Public</label>  
                    </div>
                </form>
            </div>
            )}                       
            <div className='button-container'>
              <button className={validationErrors.length <= 0 ? `nextButton-selected` : `nextButton-not-selected`} disabled={validationErrors.length >= 1} type='submit'>Edit Group</button>  
            </div> 
        </form>
        </div>
    )
}

export default EditGroup;