import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect} from "react";
import * as groupActions from "../../store/groups";
import './GetGroup.css'
import { getAllMembersByGroupId } from "../../store/members";


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
    const members = useSelector(state => state.members.members)
    console.log('---members---', members)
    
    useEffect(()=> {
       dispatch(groupActions.getAGroup(groupId))
       dispatch(getAllMembersByGroupId(groupId))
    }, [dispatch, groupId]) 
  

    return (
        <div className='EGContainer'>
        <div className='EGInfoContainer'>
        {group && (
            <div className='EGInfoWrapper'>
                <div className='EGUpperDiv'>
                    <div className='EGImgDiv'>
                        <img className='EGImg' src={group.url} alt=''/>
                    </div>
                    <div className='EGTextContainer'>
                        <h1 className='EGName'>{group.name}</h1>
                        <div className='EG-state-city-container'>
                            <i className="fa-solid fa-location-dot icon"></i>
                            <h3 className='EGCity'>{group.city}</h3>
                            <h3 className='EGSTATE'>{group.state}</h3>  
                        </div>
                        <div className='EGUpMemberInfo'>
                            <div className='memberInfo'>
                            <i className="fa-solid fa-user-group"></i>
                                {group.numMembers > 1 ? `${group.numMembers} members` : `${group.numMembers} member`}
                            </div>
                            <h3>{group.type}</h3>
                        </div>
                        <div className='EGCreator'>
                        <i className="fa-regular fa-user"></i>
                            Organized By { members[group.organizerId] ? `${members[group.organizerId].firstName} ${members[group.organizerId].lastName[0]}.` : ``}
                        </div>
                    </div>
                </div>
                <div className='EGLowerDiv'>
                <div className='EgLinkContainer'>
                    <div className='EGLink aboutText'>About</div>
                { sessionUser && (
                    <div>
                    { check(sessionUser.id, group.organizerId) && (
                        <div>
                        <Link className='EGLink' to={`/groups/${group.id}/edit`}>Edit Group</Link>
                        <Link className='EGLink' to={`/groups/${group.id}/delete`}>Delete Group</Link>
                        { group.type === 'In person' && (
                            <Link className='EGLink' to={`/groups/${group.id}/newVenue`}>Create A Venue</Link>
                        )}
                        <Link className='EGLink' to={`/groups/${group.id}/newEvent`}>Create A Event</Link>
                        </div>
                        )}
                    </div>   
                    )}
                        <Link className='EGLink' to={`/groups/${group.id}/events`}>Events for this Group</Link>   
                </div>
                    <div className='AboutAndMemberDiv'>
                        <div className='aboutDiv'>
                            What we're about
                        <p className='aboutText2'>{group.about}</p>    
                        </div>
                        <div className='memberStuff'>
                            <div className='EGCreatorInfo'>
                                <div className='organizer'>Organizer</div>
                                <div className='EGCreatorName'>
                                    <i className="fa-regular fa-circle-user fa-2x dot"></i>
                                    { members[group.organizerId] ? `${members[group.organizerId].firstName} ${members[group.organizerId].lastName[0]}.` : ``}
                                    </div>
                            </div>
                            <div className='EGCreatorInfo'>   
                                <div className='EGMembers'>
                                    <div className='organizer'>Members</div>
                                    { members && group && ( 
                                        Object.values(members).map(member => (
                                            <div className='EGCreatorName'>
                                                <i className="fa-regular fa-circle-user fa-2x dot"></i>
                                                {`${member.firstName} ${member.lastName[0]}.`}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>   
                        </div>
                    </div>
                </div>
            </div>
        )}
        </div>
        </div>
    )

}

export default GroupPage;

