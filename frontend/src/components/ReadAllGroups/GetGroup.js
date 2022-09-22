import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect} from "react";
import * as groupActions from "../../store/groups";


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
    console.log(group)

    useEffect(()=> {
       dispatch(groupActions.getAGroup(groupId))
    }, [dispatch, groupId]) 


    return (
        <>
        {group && (
            <div>
                <h1>{group.name}</h1>
                <h3>{group.city}</h3>
                <h3>{group.state}</h3>
                <img src={group.url} alt=''/>
                <p>{group.about}</p>
                <h3>{group.type}</h3>
                { check(sessionUser.id, group.organizerId) && (
                    <>
                    <Link to={`/groups/${group.id}/edit`}>Edit Group</Link>
                    <Link to={`/groups/${group.id}/delete`}>Delete Group</Link>
                    </>
                )}
            </div>
        )}
        </>
    )

}

export default GroupPage;

