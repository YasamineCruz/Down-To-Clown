import React, { useState, useEffect } from "react";
import BackButton from './BackButton';
import NextButton from "./NextButton";

const GroupGuideLines = () => {

    
    return (
        <div>
            <h1>Almost done! Just take a minute to review our guidelines</h1>
            <p>
            Meetup is all about helping people live fuller, happier lives—with the help of strong communities. This means that all groups should:

            Provide growth opportunities for members
            Encourage real human interactions in person or online
            Have a host present at all events
            Be transparent about the group’s intentions
            You can read more about all of this in our community guidelines.

            Once you submit your group, a human at Meetup will review it based on these guidelines and make sure it gets promoted to the right people.</p>
            <div>
                <BackButton />
                <NextButton />
            </div>
        </div>   
      )
}

export default GroupGuideLines;