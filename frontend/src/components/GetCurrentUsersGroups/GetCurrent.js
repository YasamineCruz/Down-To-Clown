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
        <>
        <h3>Groups</h3>
        {groups && (
            <div key={groups} className='GroupsDiv'>{groups.map(group => {
                    if(group.previewImage === 'No preview image at this time.') {
                        return (
                            <>
                            <img key={group.id} className='GroupImages' src='https://www.elegantthemes.com/blog/wp-content/uploads/2021/01/how-to-host-a-meetup-featured-image.jpg' alt=''/>
                            <div key={group.name}>{group.name}</div>
                            <Link key={group.city} to={`/groups/${group.id}`}>Read More</Link>
                            </>
                        )
                    } else {
                      return (
                        <>
                        <img key={group.id} className='GroupImages' src={group.previewImage} alt=''/>
                        <div key={group.name}>{group.name}</div>
                        <Link key={group.city} to={`/groups/${group.id}`}>Read More</Link>
                        </>
                    )    
                    }
                    })}</div>
        )}      
        </>
    )
}

export default CurrentUsersGroups2;