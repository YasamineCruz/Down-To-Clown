import { useDispatch, useSelector } from "react-redux"
import { getAGroup } from "../../store/groups"
import { csrfFetch } from "../../store/csrf"
import { check } from "../GetGroup/GetGroup"

const GetAGroupImage = ({ id, url, setShowModal, groupId, organizerId }) => {
    let dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);

    const Delete = async (id) => {
        await csrfFetch(`/api/group-images/${id}`, {
            method: 'DELETE'
        })
        await
            setShowModal(false)
        dispatch(getAGroup(groupId))
    }

    return (
        <div className='indGroupImage-container'>
            <div className='exit-button-wrapper'>
                {sessionUser && (
                    <div>
                        {check(sessionUser.id, organizerId) && (
                            <button className='delete' onClick={() => Delete(id)}>Delete</button>
                        )}
                    </div>
                )}
                <button className='exit-button' onClick={() => setShowModal(false)}>X</button>
            </div>
            <div className='ingGroupImage-wrapper'>
                <img className='indGroupImage' src={url} alt='' />
            </div>

        </div>
    )
}

export default GetAGroupImage;