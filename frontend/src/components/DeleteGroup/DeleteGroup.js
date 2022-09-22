import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as groupActions from "../../store/groups";
import { useSelector, useDispatch } from "react-redux";

const DeleteGroup = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { groupId } = params;
    const group = useSelector(state => state.group.group)
    const history = useHistory()

    useEffect(() => {
        dispatch(groupActions.getAGroup(groupId))
    }, [dispatch, groupId])

    const onSubmit = () => {
        dispatch(groupActions.deleteGroup(groupId))
        history.push('/groups/current')
    }

    return (
        <form onSubmit={onSubmit}>
            {group && (
             <label>Are you sure you want to delete {group.name}?</label>   
            )}
            <button type='submit'>Delete Group</button>
        </form>
    )
}

export default DeleteGroup;