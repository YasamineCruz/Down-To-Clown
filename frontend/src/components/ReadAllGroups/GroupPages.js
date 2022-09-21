import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as groupActions from "../../store/groups";

const GroupPage = () => {
    const params = useParams();
    const { groupId } = params;
    const dispatch = useDispatch();
    const groups = useSelector(state => state.group.groups);
    const sessionUser = useSelector(state => state.session.user);
    const [ edit, setEdit] = useState(false);
    let groupArr;

    useEffect(()=> {
       dispatch(groupActions.getAllGroups())
    }, [dispatch]) 
    console.log(groups)
    if(groups){
        groupArr = groups.Groups
    }

    if(sessionUser.id === group.organizerId) setEdit(true)

    let group;

    if(groupArr) group = groupArr.find(group => group.id === +groupId)


    return (
        <>
        {group && (
            <div>
                <h1>{group.name}</h1>
                <h3>{group.city}</h3>
                <h3>{group.state}</h3>
                <img src={group.img} alt='https://ensia.com/wp-content/uploads/2022/03/Voices_nature-positive_main-scaled.jpg'/>
                <p>{group.about}</p>
                <h3>{group.type}</h3>
                {edit === true (
                    <Link to={`/groups/${group.id}/edit`}></Link>
                )}
            </div>
        )}
        </>
    )

}

export default GroupPage;

