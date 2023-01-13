import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as groupActions from '../../store/groups'
import './GroupImages.css'
import GetIndividualGroupImageModal from "../IndividualGroupImageModal";

const GroupImages = ({organizerId}) => {
    console.log("YEYEYEYYE", organizerId)
    const params = useParams();
    const { groupId } = params;
    const dispatch = useDispatch();
    const group = useSelector(state => state.group.group);

    useEffect(() => {
        dispatch(groupActions.getAGroup(groupId))
    },[dispatch, groupId])

    useEffect(()=> {
        if(group) return
    },[group])

  

    return ( 
        <div className='eventsForGroup-container'>
            {group && (
                <div className='images-container'>
                    {group.GroupImages.length >= 1 && (
                      <div className='fix-flex'>
                        {group.GroupImages.map(image => (
                            <div className='images-wrapper'>
                            <GetIndividualGroupImageModal image={image} groupId={groupId} organizerId={organizerId}/>
                            </div>
                        ))}
                      </div>  
                    )}
                </div>
            )}
        </div>
    )
}

export default GroupImages