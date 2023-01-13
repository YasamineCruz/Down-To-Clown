import { useDispatch } from "react-redux";
import { deleteAAttendance } from "../../store/attendances";

export default function DeleteAttendance({setShowModal, userId, eventId}) {
    const dispatch = useDispatch()

    const exit = () => {
        setShowModal(false)
    }

    const deleteAttendance = async(userId, eventId) => {
        await dispatch(deleteAAttendance(userId, eventId))
    }

    return (
        <div className='pending-attendance-wrapper'>
            <div className='Big-Pend-Text delete-text'>Would you like to stop Attending this Event?</div>
            <div className='delete-attendance-button-wrapper'>
                <button onClick={() => exit()} className='delete-no-button pointer'>No</button>
                <button onClick={() => deleteAttendance(userId, eventId)}className='delete-yes-button pointer'>Yes</button>
            </div>
        </div>
    )
}