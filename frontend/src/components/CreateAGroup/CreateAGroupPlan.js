import React, { useEffect, useState } from "react";
import { useGroupContext } from "../../context/GroupContext";
import { useDispatch, useSelector } from "react-redux";
import * as groupActions from '../../store/groups';
import BackButton from './BackButton';
import { useHistory } from 'react-router-dom';


const GroupPlan = () => {
    const [errors, setErrors] = useState([]);
    const [organizerId, setOrganizerId] = useState(null)
    const { setPage, state, setState, city, setCity, name, setName, private_key, setPrivate_key, description, setDescription, type, setType} = useGroupContext();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [ clickable, setClickable ]= useState(false)
    let history = useHistory();
    

    useEffect(()=> {
        setOrganizerId(sessionUser.id)
        if(state.length && city && name && private_key && description && type) setClickable(false)
    },[sessionUser.id, setOrganizerId, state, city, name, description, private_key, type])


    const onSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
          dispatch(groupActions.createAGroup({ organizerId, name, description, type, private_key, city, state}))
          .catch(async (res) => {
            const data = await res.json();
            console.log(data)
            if(data && data.errors) setErrors(data.errors)
        })

        if(errors.length <= 0) {
            setPage(1);
            setCity('');
            setState('');
            setName('');
            setPrivate_key('');
            setDescription('');
            setType('');
            setOrganizerId(null);
            history.push('/start/groupimage')
        }
    }


    return ( 
        <div>
            <h1>Choose the best plan for you</h1>
            <form onSubmit={onSubmit}>
                <button type='submit' disabled={clickable}>Create Group</button>
            </form>
            <div>
                <BackButton />
            </div>
        </div>
    )

}

export default GroupPlan;