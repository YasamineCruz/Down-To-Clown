import React, { useState } from "react";
import BackButton from './BackButton';
import NextButton from "./NextButton";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const GroupGuideLines = () => {
    const { clickable} = useState(false)
    const sessionUser = useSelector(state => state.session.user)
    if(!sessionUser) return (<Redirect to='/'/>)

    return (
        <div className='create-group-div-container'>
            <div className='create-group-percent-thing'>
                <div className='blue-line-page-5'></div>
            </div>
         <div className='create-group-steps'> Step 5 of 7</div>
         <div className='create-group-text-wrapper'>
            <h1 className='create-group-h1-text'>Almost done! Just take a minute to review our guidelines</h1>
            <p className='create-group-p-text'>
            Meetup is all about helping people live fuller, happier lives—with the help of strong communities. This means that all groups should:
            </p>
            <ul>
                <li className='create-group-li-text'>Provide growth opportunities for members</li>
                <li className='create-group-li-text'>Encourage real human interactions in person or online</li>
                <li className='create-group-li-text'>Have a host present at all events</li>
                <li className='create-group-li-text'>Be transparent about the group’s intentions</li>
                <li className='create-group-li-text'> You can read more about all of this in our community guidelines.</li>
            </ul>  
            <p className='create-group-p2-text'>Once you submit your group, a human at Meetup will review it based on these guidelines and make sure it gets promoted to the right people.</p>
         </div>
            
            <div className='button-container'>
                <BackButton />
                <NextButton clickable={clickable}/>
            </div>
        </div>   
      )
}

export default GroupGuideLines;