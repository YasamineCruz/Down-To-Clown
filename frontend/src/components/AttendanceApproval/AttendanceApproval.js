import { useDispatch } from "react-redux"
import { editAAttendance } from "../../store/attendances"

const needingApproval = (attendanceObject) => {
    let approvalArray = []
    Object.values(attendanceObject).forEach(attendee => { if (attendee.Attendance.status === 'pending') approvalArray.push(attendee) })
    return approvalArray
}

export default function AttendanceApproval({ attendances, setShowModal, eventId }) {
    let pending = needingApproval(attendances)
    const dispatch = useDispatch()


    const Accept = async (memberId, eventId) => {
        let status = 'member'
        await dispatch(editAAttendance(memberId, eventId, status))
    }

    return (
        <div className='pending-attendance-wrapper'>
            <div className='Big-Pend-Text'>Pending Attendance</div>
            {pending.length >= 1 && (
                <div>{pending.map(member => {
                    return (
                        <div className='member-info-container'>
                            <div className='member-name2 profile-dropdown-text'>{member.firstName} {member.lastName}</div>
                            <div className='pending-buttons2'>
                                <i class="fa-solid fa-circle-check green pointer" onClick={() => Accept(member.id, eventId)}></i>
                            </div>
                        </div>
                    )
                })}</div>
            )}
            {pending.length <= 0 && (
                <div className='member-info-container'>
                    <div className='profile-dropdown-text'>No pending attendances...</div>
                </div>
            )}
        </div>
    )
}