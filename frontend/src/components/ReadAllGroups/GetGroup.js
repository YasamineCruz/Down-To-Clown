import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect} from "react";
import * as groupActions from "../../store/groups";
import './ReadGroups.css'


const check = (id, id2) => {
    if(id === id2) return true;
    return false
}

const GroupPage = () => {
    const params = useParams();
    const { groupId } = params;
    const dispatch = useDispatch();
    const group = useSelector(state => state.group.group);
    const sessionUser = useSelector(state => state.session.user);


    useEffect(()=> {
       dispatch(groupActions.getAGroup(groupId))
    }, [dispatch, groupId]) 
    console.log(group)

    return (
        <>
        <div className=''>
        {group && (
            <div>
                <h1>{group.name}</h1>
                <h3>{group.city}</h3>
                <h3>{group.state}</h3>
                <img src={group.url} alt=''/>
                <p>{group.about}</p>
                <h3>{group.type}</h3>
                { sessionUser && (
                    <div>
                  { check(sessionUser.id, group.organizerId) && (
                    <>
                    <Link to={`/groups/${group.id}/edit`}>Edit Group</Link>
                    <Link to={`/groups/${group.id}/delete`}>Delete Group</Link>
                    { group.type === 'In person' && (
                         <Link to={`/groups/${group.id}/newVenue`}>Create A Venue</Link>
                    )}
                    <Link to={`/groups/${group.id}/newEvent`}>Create A Event</Link>
                    </>
                    )}
                    </div>   
                )}
                <Link to={`/groups/${group.id}/events`}>Events for this Group</Link>   
            </div>
        )}
        </div>
        </>
    )

}

export default GroupPage;

