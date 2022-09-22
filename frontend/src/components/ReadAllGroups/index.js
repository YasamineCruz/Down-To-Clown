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
        <h3>Groups</h3>
        {groupArr && (
            <div className='GroupsDiv'>{groupArr.map(group => {
                    if(group.previewImage === 'No preview image at this time.') {
                        return (
                            <>
                            <img className='GroupImages' src='https://www.elegantthemes.com/blog/wp-content/uploads/2021/01/how-to-host-a-meetup-featured-image.jpg' alt=''/>
                            <div id={group.id}>{group.name}</div>
                            <Link to={`/groups/${group.id}`}>Read More</Link>
                            </>
                        )
                    }
                    return (
                        <>
                        <img className='GroupImages' src={group.previewImage} alt=''/>
                        <div id={group.id}>{group.name}</div>
                        <Link to={`/groups/${group.id}`}>Read More</Link>
                        </>
                    )  
                    })}</div>
        )}      
        </>
    )
}

export default TestPage;
