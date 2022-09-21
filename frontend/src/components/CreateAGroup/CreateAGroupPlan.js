import React, { useEffect, useState } from "react";
import { useGroupContext } from "../../context/GroupContext";
import { useDispatch, useSelector } from "react-redux";
import * as groupActions from '../../store/groups';
import BackButton from './BackButton';
import { Redirect } from 'react-router-dom';


const GroupPlan = () => {
    const [errors, setErrors] = useState([]);
    const [organizerId, setOrganizerId] = useState(null)
    const { state, city, name, private_key, description, type} = useGroupContext();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)

    useEffect(()=> {
        setOrganizerId(sessionUser.id)
    },[sessionUser.id, setOrganizerId])

    const onSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
          dispatch(groupActions.createAGroup({ organizerId, name, description, type, private_key, city, state}))
          .catch(async (res) => {
            const data = await res.json();
            if(data && data.errors) setErrors(data.errors)
        })
        if(!errors.length){
            return(
                <Redirect to='/'/>
            )
        }
    }

    return ( 
        <div>
            <h1>Choose the best plan for you</h1>
            <div className='plans'>
                <button type='submit' onClick={onSubmit}>Create Group</button>
            </div>
            <div>
                <BackButton />
            </div>
        </div>
    )

}

export default GroupPlan;