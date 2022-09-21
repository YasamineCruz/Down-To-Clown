import { useEffect, useState } from "react";
import { useGroupContext } from "../../context/GroupContext";
import BackButton from './BackButton';
import NextButton from "./NextButton";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const GroupDescription = () => {
   const { description, setDescription, name} = useGroupContext();
   const [ clickable, setClickable ] = useState(true)
   const [ validationErrors, setValidationErrors ] = useState('')
   const sessionUser = useSelector(state => state.session.user)

   useEffect(()=> {
    let errors = []
    if(description.length < 50) errors.push('Description must be atleast 50 characters')

    if(errors.length > 0) {
        setValidationErrors(errors)
        setClickable(true)
       } else {
        setValidationErrors([])
        setClickable(false)
       }
   }, [description])

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
        <h1>
        Now describe what {name} will be about</h1>
        <span>
        People will see this when we promote your group, but you’ll be able to add to it later, too.
        <br/>
        <br/>               
        1. What's the purpose of the group?<br/>
        2. Who should join?<br/>
        3. What will you do at your events?<br/>
        <br/>
        </span>
        <input type='text' onChange={(e) => setDescription(e.target.value)} value={description}/>
        <div>
            <BackButton />
            <NextButton clickable={clickable}/>
        </div>
    </form>
  )
}

export default GroupDescription;