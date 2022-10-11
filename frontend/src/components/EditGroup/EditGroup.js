import * as groupActions from "../../store/groups";
import { useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";


const EditGroup = () => {
    const history = useHistory();
    const params = useParams()
    const dispatch = useDispatch();
    
    const sessionUser = useSelector(state => state.session.user);
    const group = useSelector(state => state.group.group)
    
    const { groupId } = params

    const [validationErrors, setValidationErrors] = useState([]);
    const [name, setName] = useState(group.name)
    const [description, setDescription] = useState(group.about)
    const [city, setCity] = useState(group.city)
    const [state, setState] = useState(group.state)
    const [type, setType] = useState(group.type)
    const [private_key, setPrivate_key] = useState(group.private)
    const [organizerId, setOrganizerId] = useState(group.organizerId)
    console.log(private_key)

    useEffect(()=>{
        dispatch(groupActions.getAGroup(groupId))
    },[dispatch, groupId])

    useEffect(() => {
        setOrganizerId(sessionUser.id)
    },[sessionUser.id])

    const onSubmit = (e) => {
        let errors = []
        e.preventDefault();
        if(description.length < 50) errors.push('Description must be atleast 50 characters')
        if(!state.length) errors.push('You must enter a state')
        if(!city.length) errors.push('You must enter a city')
        if(!name.length) errors.push('You must enter a Group name');
        if(!type) errors.push('Type must be Online or In person');
        if(!private_key) errors.push('You must select private or public')
        dispatch(groupActions.editAGroup({ organizerId, name, description, type, private_key, city, state}, groupId))
        .catch(async (res) => {
            const data = await res.json();
            if(data && data.errors) setValidationErrors(data.errors)
        })
        if(errors.length > 0) {
            setValidationErrors(errors)
           } else {
            setValidationErrors([])
            history.push(`/groups/${groupId}`)
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
            )}
            { group && (
            <>
            <label> 
            <input type='text' onChange={(e)=> setName(e.target.value)} value={name}/>
            </label>
            <label> Description
                <input type='text' onChange={(e)=> setDescription(e.target.value)} value={description}/>
            </label>
            <label>
                <input type='text' onChange={(e) => setCity(e.target.value)} value={city}/>
            </label>
            <label>
                <input type='text' onChange={(e) => setState(e.target.value)} value={state}/>
            </label>
            <form>
            <h1>Select Type</h1>
                <input onChange={(e) => setType(e.target.value)} type='radio' value='Online' name='type' required checked={type === 'Online'}/>
                <label for='online'>Online</label>
                <input onChange={(e) => setType(e.target.value)} type='radio' value='In person' name='type' required checked={type === 'In person'}/>
                <label for='in person'>In person</label>
            </form> 
            <form>
                <h1>Select Private or Public</h1>
                <input onChange={(e) => setPrivate_key(e.target.value)} type='radio' value={true} name='type' required checked={private_key === 'true' || private_key === 1}/>
                <label for='online'>Private</label>
                <input onChange={(e) => setPrivate_key(e.target.value)} type='radio' value={false} name='type' required checked={private_key === 'false' || private_key === 0}/>
                <label for='in person'>Public</label>
            </form>
            <button type='submit'>Edit Group</button>
            </>
            )}                
        </form>
        </>
    )
}

export default EditGroup;