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
    const [ clickable, setClickable ]= useState(false)
    let history = useHistory();
    const sessionUser = useSelector(state => state.session.user)

    if(!sessionUser) history.push('/')
    

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
        <div className='create-group-div-container'>
            <div className='create-group-percent-thing'>
                <div className='blue-line-page-6'></div>
            </div>
            <div className='create-group-steps'> Step 6 of 7</div>
            <div className='create-group-wrapper'>
                <div className='create-group-plan-text-wrapper'>
                   <h1 className='create-group-h1-text2'>Choose the best plan for you</h1>
                   <span className='create-group-span-text2'>
                    <p className='br-text'>
                        Groups  
                    </p>
                    <p className='br-text'>
                    3
                    </p>
                    <p className='br-text'>
                    Unlimited
                    </p>
                    <p className='br-text'>
                    Unlimited events & attendees
                    </p>
                    <p className='br-text'>
                    Group & event promotion to interested members
                    </p>
                    <p className='br-text'>
                    Simple online and in person event organizing
                    </p>
                    <p className='br-text'>
                    Assign unlimited co-hosts
                    </p>
                    <p className='br-text'>
                    Ticket fees and group dues
                    </p>
                </span> 
                </div>
                <form onSubmit={onSubmit}>
                    <div className='create-group-plan-wrapper'>
                        <h3 className='create-group-plan-h3'>COMMUNITY ESSENTIALS</h3>
                        <h2 className='create-group-plan-h2'>Free</h2>
                        <h3 className='create-group-plan-h3-money'> 0$ / month</h3>
                        <div className='percentage-off'>100% off</div>
                       <button className='create-group-button' type='submit' disabled={clickable}>Create Group</button>
                        <h2 className='create-group-plan-h3-u'>Unlimited</h2>
                        <i class="fa-solid fa-check fa-lg check"></i>
                        <i class="fa-solid fa-check fa-lg check"></i>
                        <i class="fa-solid fa-check fa-lg check"></i>
                        <i class="fa-solid fa-check fa-lg check"></i>
                        <i class="fa-solid fa-check fa-lg check"></i>
                        <i class="fa-solid fa-check fa-lg check"></i>
                        <i class="fa-solid fa-check fa-lg check"></i>
                        <i class="fa-solid fa-check fa-lg check"></i>
                    </div>  
                </form>   
            </div>
            <div className='button-container'>
                <BackButton />
            </div>
        </div>
    )

}

export default GroupPlan;