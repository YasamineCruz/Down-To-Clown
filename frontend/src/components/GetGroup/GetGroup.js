import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as groupActions from "../../store/groups";
import './GetGroup.css'
import { getAllMembersByGroupId } from "../../store/members";
import GetEventsByGroup from '../GetEventByGroup';
import CreateGroupImageModal from "../CreateGroupImage";
import GroupImages from "../GroupImages/GroupImages";
import CreateGroupMembershipModal from "../RequestMembership";
import ViewApprovedMembers from "../ViewMemberships";

const check = (id, id2) => {
    if (id === id2) return true;
    return false
}

const GroupPage = () => {
    const params = useParams();
    const { groupId } = params;
    const dispatch = useDispatch();
    const group = useSelector(state => state.group.group);
    const sessionUser = useSelector(state => state.session.user);
    const members = useSelector(state => state.members?.members[groupId])
    const membersArray = Object.values(members ? members : {})
    const [info, setInfo] = useState('about')

    let organizer;

    membersArray?.forEach(member => { if (member.id === group?.organizerId) organizer = member })


    useEffect(() => {
        dispatch(groupActions.getAGroup(groupId))
        dispatch(getAllMembersByGroupId(groupId))
    }, [dispatch, groupId])


    return (
        <div className='EGContainer'>
            <div className='EGInfoContainer'>
                {group && members && (
                    <div className='EGInfoWrapper'>
                        <div className='EGUpperDiv'>
                            <div className='EGImgDiv'>
                                <img className='EGImg' src={group.url} alt='' />
                            </div>
                            <div className='EGTextContainer info'>
                                <h1 className='EGName'>{group.name}</h1>
                                <div className='EG-state-city-container'>
                                    <i className="fa-solid fa-location-dot icon"></i>
                                    <h3 className='EGCity'>{group.city}, {group.state}</h3>
                                </div>
                                <div className='EGUpMemberInfo'>
                                    <div className='memberInfo info'>
                                        <i className="fa-solid fa-user-group icon"></i>
                                        {group.numMembers > 1 ? `${group.numMembers} members` : `${group.numMembers} member`} · {group.type}
                                        <img className='group-association-question' src='https://secure.meetupstatic.com/next/images/Question.svg?w=32' alt='' />
                                    </div>
                                </div>
                                <div className='EGCreator info'>
                                    <i className="fa-regular fa-user icon"></i>
                                    Organized By<b className='please-give-space'>{organizer?.firstName} {organizer?.lastName}</b>
                                </div>
                                <div>
                                    {sessionUser && (
                                        <div>
                                            {check(sessionUser.id, group.organizerId) && (
                                                <ViewApprovedMembers memberships={Object.values(members)} groupId={groupId} />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='EGLowerDiv'>
                            <div className='EgLinkContainer'>
                                <div onClick={() => setInfo('about')} className={info === 'about' ? `EGLink abouttext` : `EGLink`}>About</div>
                                <div onClick={() => setInfo('images')} className={info === 'images' ? `EGLink abouttext` : `EGLink`}>View Group Images</div>
                                {sessionUser && (
                                    <div class='Link-holder'>
                                        {check(sessionUser.id, group.organizerId) && (
                                            <div class='Link-holder'>
                                                <Link className='EGLink' to={`/groups/${group.id}/edit`}>Edit Group</Link>
                                                <Link className='EGLink' to={`/groups/${group.id}/delete`}>Delete Group</Link>
                                                {group.type === 'In person' && (
                                                    <Link className='EGLink' to={`/groups/${group.id}/newVenue`}>Create A Venue</Link>
                                                )}
                                                <Link className='EGLink' to={`/groups/${group.id}/newEvent`}>Create A Event</Link>
                                                <CreateGroupImageModal groupId={groupId} />
                                            </div>
                                        )}
                                        <div onClick={() => setInfo('events')} className={info === 'events' ? `EGLink abouttext` : `EGLink`}>Events for this Group</div>
                                        {
                                            !check(sessionUser.id, group.organizerId) && !membersArray.find(el => el.id === sessionUser.id) && (
                                                <div class='EGLink'>
                                                    <CreateGroupMembershipModal groupName={group.name} groupId={group.id} memberId={sessionUser.id} />
                                                </div>
                                            )
                                        }
                                    </div>
                                )}
                            </div>
                            {info === 'about' && (
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
                                                {members[group.organizerId] ? `${members[group.organizerId].firstName} ${members[group.organizerId].lastName[0]}.` : ``}
                                            </div>
                                        </div>
                                        <div className='EGCreatorInfo'>
                                            <div className='EGMembers'>
                                                <div className='organizer'>Members</div>
                                                <div className='members-container'>
                                                    {members && group && (
                                                        membersArray.map(member => {
                                                            if (member.Membership?.status !== 'pending') {
                                                                return (
                                                                    <div key={member.id} className='EGCreatorName member-member'>
                                                                        <i className="fa-regular fa-circle-user fa-2x dot"></i>
                                                                        {`${member.firstName} ${member.lastName[0]}.`}
                                                                    </div>
                                                                )
                                                            }
                                                            return <div></div>
                                                        })
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {info === 'events' && (
                                <GetEventsByGroup />
                            )}
                            {info === 'images' && (
                                <GroupImages />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )

}

export default GroupPage;

