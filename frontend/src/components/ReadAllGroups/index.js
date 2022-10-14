import React, { useEffect } from "react";
import * as groupActions from "../../store/groups";
import { useDispatch, useSelector } from "react-redux";
import './ReadGroups.css'
import { Link } from 'react-router-dom'

const TestPage = () => {
    const dispatch = useDispatch();
    const groups = useSelector(state => state.group.groups);
    let groupArr;

    useEffect(()=> {
       dispatch(groupActions.getAllGroups())
    }, [dispatch]) 

    if(groups){
        groupArr = groups.Groups
    }

    return (
        <div className='EGWrapper'>
        <div className='EGTitles'>
         <h2>
            <Link className='EGTitle EGTitleColorGrey' to='/events'>Events</Link>
        </h2>
        <h2 className='EGTitle EGTitleColorBlue'>Groups</h2>   
        </div>
        <div className='GroupsMaster'>
        {groupArr && (
            <div className='GroupsDiv'>{groupArr.map(group => {
                    if(group.previewImage === 'No preview image at this time.') {
                        return (
                            <Link className='GroupsLink' key={group.id} to={`/groups/${group.id}`}>
                            <div className='GroupDiv'>
                            <img className='GroupsImages' src='https://media.istockphoto.com/photos/coming-soon-neon-sign-the-banner-shining-light-signboard-collection-picture-id1332167985?b=1&k=20&m=1332167985&s=170667a&w=0&h=O-084eNJBhGZGJbJvNvUC1P6d4aSo6XkV4Kom7ZZcIQ=' alt=''/>
                            <div className='GroupsInfo'>
                               <div className='GroupsName'>{group.name}</div>
                               <div className='GroupsCityAndState'>{group.city}, {group.state}</div>
                               <div className='GroupsAbout'>{group.about}</div>  
                            </div>
                            </div>
                            </Link>
                        )
                    }
                    return (
                        <Link className='GroupsLink' key={group.id} to={`/groups/${group.id}`}>
                        <div className='GroupDiv'>
                        <img className='GroupsImages' src={group.previewImage} alt=''/>
                        <div className='GroupsInfo'>
                            <div className='GroupsName'>{group.name}</div>
                            <div className='GroupsCityAndState'>{group.city}, {group.state}</div>
                            <div className='GroupsAbout'>{group.about}</div>  
                        </div>
                        </div>
                        </Link>
                    )  
                    })}</div>
        )}
        </div>      
        </div>
    )
}

export default TestPage;
