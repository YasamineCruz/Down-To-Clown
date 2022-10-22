import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState} from "react";
import * as groupActions from "../../store/groups";
import './GetGroup.css'
import { getAllMembersByGroupId } from "../../store/members";
import GetEventsByGroup from '../GetEventByGroup';


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
    const [ info, setInfo] = useState('about')

    
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
                    <div className='EGTextContainer info'>
                        <h1 className='EGName'>{group.name}</h1>
                        <div className='EG-state-city-container default-cursor'>
                            <i className="fa-solid fa-location-dot icon"></i>
                            <h3 className='EGCity'>{group.city}, {group.state}</h3> 
                        </div>
                        <div className='EGUpMemberInfo'>
                            <div className='memberInfo info default-cursor'>
                            <i className="fa-solid fa-user-group icon"></i>
                                {group.numMembers > 1 ? `${group.numMembers} members` : `${group.numMembers} member`} · {group.type}
                                <img className='group-association-question'src='https://secure.meetupstatic.com/next/images/Question.svg?w=32' alt=''/>
                            </div>
                        </div>
                        <div className='EGCreator info default-cursor'>
                        <i className="fa-regular fa-user icon"></i>
                            Organized By<b className='please-give-space'> { members[group.organizerId] ? ` ${members[group.organizerId].firstName} ${members[group.organizerId].lastName[0]}.` : ``}</b>
                        </div>
                    </div>
                </div>
                <div className='EGLowerDiv'>
                <div className='EgLinkContainer'>
                    <div onClick={()=> setInfo('about')} className={info === 'about' ? `EGLink abouttext` : `EGLink`}>About</div>
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
                        <div onClick={()=> setInfo('events')} className={info === 'events' ? `EGLink abouttext` : `EGLink`}>Events for this Group</div>   
                </div>
                    { info === 'about' && (
                     <div className='AboutAndMemberDiv'>
                        <div className='aboutDiv default-cursor'>
                            What we're about
                        <p className='aboutText2'>{group.about}</p>    
                        </div>
                        <div className='memberStuff'>
                            <div className='EGCreatorInfo'>
                                <div className='organizer default-cursor'>Organizer</div>
                                <div className='EGCreatorName default-cursor'>
                                    <i className="fa-regular fa-circle-user fa-2x dot"></i>
                                    { members[group.organizerId] ? `${members[group.organizerId].firstName} ${members[group.organizerId].lastName[0]}.` : ``}
                                    </div>
                            </div>
                            <div className='EGCreatorInfo'>   
                                <div className='EGMembers'>
                                    <div className='organizer default-cursor'>Members</div>
                                    { members && group && ( 
                                        Object.values(members).map(member => (
                                            <div key={member.id} className='EGCreatorName default-cursor'>
                                                <i className="fa-regular fa-circle-user fa-2x dot"></i>
                                                {`${member.firstName} ${member.lastName[0]}.`}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>   
                        </div>
                    </div>    
                    )}
                   { info === 'events' && (
                    <GetEventsByGroup />
                   )}
                </div>
            </div>
        )}
        </div>
        </div>
    )

}

export default GroupPage;

