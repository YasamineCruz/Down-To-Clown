import { useDispatch } from "react-redux"
import { requestAAttendance } from "../../store/attendances"
import './RequestAttendance.css'

export default function RequestAttendance({eventId, user, type}) {
    const dispatch = useDispatch()

    const requestAttendance = async(eventId, userId) => {
        await dispatch(requestAAttendance(eventId, userId))
    }

    return (
        <div className='attendance-wrapper'>
            <div className='attendance-button' onClick={()=> requestAttendance(eventId, user.id)}>Attend {type}</div>
        </div>
    )
}