import { useDispatch } from "react-redux"
import { requestAAttendance } from "../../store/attendances"

export default function RequestAttendance({eventId, user}) {
    const dispatch = useDispatch()

    const requestAttendance = async(eventId, userId) => {
        await dispatch(requestAAttendance(eventId, userId))
    }

    return (
        <div>
            <button onClick={()=> requestAttendance(eventId, user.id)}></button>
        </div>
    )
}