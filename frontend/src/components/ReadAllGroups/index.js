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
        <>
        <h2 className='GroupsTitle'>Groups</h2>
        <div className='GroupsMaster'>
        {groupArr && (
            <div className='GroupsDiv'>{groupArr.map(group => {
                    if(group.previewImage === 'No preview image at this time.') {
                        return (
                            <Link className='GroupsLink' key={group.id} to={`/groups/${group.id}`}>
                            <div className='GroupsDiv'>
                            <img className='GroupsImages' src='https://www.elegantthemes.com/blog/wp-content/uploads/2021/01/how-to-host-a-meetup-featured-image.jpg' alt=''/>
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
                        <div className='GroupsDiv'>
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
        </>
    )
}

export default TestPage;
