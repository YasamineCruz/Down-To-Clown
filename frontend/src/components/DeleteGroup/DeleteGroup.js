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
    let sessionUser = useSelector(state => state.session.user)

    if(!sessionUser) history.push('/')
    if(group && sessionUser){
        if(group.organizerId !== sessionUser.id) history.push('/')
    }

    useEffect(() => {
        dispatch(groupActions.getAGroup(groupId))
    }, [dispatch, groupId])

    const onSubmit = () => {
        dispatch(groupActions.deleteGroup(groupId))
        history.push('/groups')
    }

    return (
        <div className='edit-event-container'>
              <form className='edit-event-form-wrapper' onSubmit={onSubmit}>
            {group && (
                <div className='edit-grouptext-wrapper'>
                    <div className='edit-group-div-wrapper'>
                        <h1 className='delete-group-h1-text'>Are you sure you want to delete "{group.name}"?</h1> 
                    </div>
                </div>
            )}
            <div className='button-container'>
                <button className='nextButton-selected' type='submit'>Delete Group</button>   
            </div>
        </form>  
        </div>
    
    )
}

export default DeleteGroup;