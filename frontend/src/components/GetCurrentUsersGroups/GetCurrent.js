import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as groupActions from "../../store/groups";
import { Link } from "react-router-dom";

const CurrentUsersGroups2 = () => {
    const dispatch = useDispatch();
    const groups = useSelector(state => state.group.currentUserGroups);

    useEffect(()=> {
       dispatch(groupActions.getCurrentUsersGroups())
    }, [dispatch]) 


    return (
        <div>
        <h3>Groups</h3>
        {groups && (
            <div key={groups} className='GroupsDiv'>{groups.map(group => {
                    if(group.previewImage === 'No preview image at this time.') {
                        return (
                            <div className='GroupsDiv'>
                            <Link className='navGroupLink' key={group.city} to={`/groups/${group.id}`}>
                            <img key={group.id} className='GroupsImages' src='https://www.elegantthemes.com/blog/wp-content/uploads/2021/01/how-to-host-a-meetup-featured-image.jpg' alt=''/>
                            <div className='GroupsInfo'>
                            <div key={group.name}>{group.name}</div>
                            </div>
                            </Link>
                            </div>
                        )
                    } else {
                      return (
                        <div className='GroupsDiv'>
                        <Link className='navGroupLink' key={group.city} to={`/groups/${group.id}`}>
                        <img key={group.id} className='GroupsImages' src={group.previewImage} alt=''/>
                        <div className='GroupsInfo'>
                         <div key={group.name}>{group.name}</div>   
                        </div>
                        </Link>
                        </div>
                    )    
                    }
                    })}</div>
        )}
        {!groups && (
            <div>The are currently no groups for this user.</div>
        )}      
        </div>
    )
}

export default CurrentUsersGroups2;