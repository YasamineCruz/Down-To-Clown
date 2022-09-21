import React from "react";
import { useGroupContext } from "../../context/GroupContext";
import BackButton from './BackButton';
import NextButton from "./NextButton";

const GroupName = () => {
    const { name, setName } = useGroupContext();
    
   return (
    <form>
        <label> First, set your group's location.
            <input type='text' onChange={(e) => setName(e.target.value)} value={name}/>
        </label>
        <div>
            <BackButton />
            <NextButton />
        </div>
    </form>
  )
}

export default GroupName;