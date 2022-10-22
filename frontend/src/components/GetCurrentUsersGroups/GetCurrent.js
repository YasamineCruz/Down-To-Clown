import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as groupActions from "../../store/groups";
import { Link } from "react-router-dom";
import './currentUserGroups.css'

const CurrentUsersGroups2 = () => {
    const dispatch = useDispatch();
    const groups = useSelector(state => state.group.currentUserGroups);

    useEffect(()=> {
       dispatch(groupActions.getCurrentUsersGroups())
    }, [dispatch]) 


    return (
        <div className='EGWrapper'>
            <div className='EGTitles2'>
                <h1 className='EGTitle3 EGTitleColorGrey'>Your Groups</h1>
            </div>
        <div className='GroupsMaster'>
        {groups && (
            <div key={groups} className='GroupsDiv'>{groups.map(group => {
                    if(group.previewImage === 'No preview image at this time.') {
                        return (
                            <Link className='GroupsLink' key={group.city} to={`/groups/${group.id}`}>
                                <div className='GroupDiv'>
                                    <img key={group.id} className='GroupsImages' src='https://www.elegantthemes.com/blog/wp-content/uploads/2021/01/how-to-host-a-meetup-featured-image.jpg' alt=''/>
                                    <div className='GroupsInfo'>
                                        <div className='GroupsName'>{group.name}</div>
                                        <div className='GroupsCityAndState'>{group.city}, {group.state}</div>
                                        <div className='GroupsAbout'>{group.about}</div>  
                                    </div>
                                </div>
                            </Link>
                        )
                    } else {
                      return (
                        <Link className='GroupsLink' key={group.city} to={`/groups/${group.id}`}>
                        <div className='GroupDiv'>
                            <img key={group.id} className='GroupsImages' src={group.previewImage} alt=''/>
                            <div className='GroupsInfo'>
                                <div className='GroupsName'>{group.name}</div>
                                <div className='GroupsCityAndState'>{group.city}, {group.state}</div>
                                <div className='GroupsAbout'>{group.about}</div>  
                            </div>
                        </div>
                    </Link>
                    )    
                    }
                    })}
            </div>
        )}
        {!groups && (
            <div className='no-groups'>The are currently no groups for this user.</div>
        )}
        </div>
        </div>
    )
}

export default CurrentUsersGroups2;