import React from "react";
import { useGroupContext } from "../../context/GroupContext";
import BackButton from './BackButton';
import NextButton from "./NextButton";

const GroupPrivate = () => {
    const { setType} = useGroupContext();
    return (
          <div>
            <form>
                <label>Select Type</label>
                <input onChange={(e) => setType(e.target.value)} type='radio' value='Online' name='type'/>
                <label for='online'>Online</label>
                <input onChange={(e) => setType(e.target.value)} type='radio' value='In person' name='type'/>
                <label for='in person'>In person</label>
            </form>
             <div>
                <BackButton />
                <NextButton />
            </div>
        </div>
    )
}

export default GroupPrivate;