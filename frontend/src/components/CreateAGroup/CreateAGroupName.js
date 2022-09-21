import React, { useState, useEffect} from "react";
import { useGroupContext } from "../../context/GroupContext";
import BackButton from './BackButton';
import NextButton from "./NextButton";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const GroupName = () => {
    const { name, setName } = useGroupContext();
    const [ clickable, setClickable ] = useState(true)
    const [ validationErrors, setValidationErrors ] = useState('')
    const sessionUser = useSelector(state => state.session.user)

    useEffect(()=> {
        let errors = []
        if(!name.length) errors.push('You must enter a Group name');
        if(errors.length > 0) {
            setValidationErrors(errors)
            setClickable(true)
           } else {
            setValidationErrors([])
            setClickable(false)
           }
    }, [name, setClickable])

    if(!sessionUser) return (<Redirect to='/'/>)
 
   return (
    <form>
         { validationErrors && (
            <ul>
            {validationErrors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))} 
            </ul>
        )}
        <h1>What will your group’s name be?</h1>
        <h3>
            Choose a name that will give people a clear idea of what the group is about. Feel free to get creative! You can edit this later if you change your mind.
        </h3>
        <input type='text' onChange={(e) => setName(e.target.value)} value={name} required/>
        <div>
            <BackButton />
            <NextButton clickable={clickable}/>
        </div>
    </form>
  )
}

export default GroupName;