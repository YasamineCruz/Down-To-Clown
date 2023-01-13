import { useDispatch } from "react-redux"
import { getAGroup } from "../../store/groups"
import { csrfFetch } from "../../store/csrf"

const GetAGroupImage = ({id, url, setShowModal, groupId}) => {
    let dispatch = useDispatch()

    const Delete = async(id) => {
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
                <button className='delete' onClick={() => Delete(id)}>Delete</button>
                <button className='exit-button' onClick={() => setShowModal(false)}>X</button>
            </div>
            <div className='ingGroupImage-wrapper'>
              <img className='indGroupImage' src={url} alt=''/>  
            </div>
            
        </div>
    )
}

export default GetAGroupImage;