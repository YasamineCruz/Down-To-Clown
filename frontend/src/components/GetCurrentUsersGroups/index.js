import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as groupActions from "../../store/groups";
import { Link } from "react-router-dom";
const CurrentUsersGroups = () => {
    const dispatch = useDispatch();
    let sessionUser = useSelector(state => state.session.user);
    const groups = useSelector(state => state.group.groups);
    let groupArr;

    useEffect(()=> {
       dispatch(groupActions.getAllGroups())
    }, [dispatch]) 

    if(groups){
        groupArr = groups.Groups
    }
    
    let currentUsersGroups = [];

    if(groupArr) {
        groupArr.forEach(group => {
            if(group.organizerId === sessionUser.id) currentUsersGroups.push(group)
        })
    }

    return (
        <>
        <h3>Groups</h3>
        {currentUsersGroups && (
            <div className='GroupsDiv'>{currentUsersGroups.map(group => {
                    if(group.previewImage === 'No preview image at this time.') {
                        return (
                            <>
                            <img className='GroupImages' src='https://ensia.com/wp-content/uploads/2022/03/Voices_nature-positive_main-scaled.jpg' alt=''/>
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

export default CurrentUsersGroups;