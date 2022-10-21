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
    <div className='create-group-div-container'>
      <div className='create-group-percent-thing'>
          <div className='blue-line-page-3'></div>
      </div>
      <div className='create-group-steps'> Step 3 of 7</div>
     <form className='create-group-form'>
        { validationErrors && (
            <ul className='create-group-errors'>
            {validationErrors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))} 
            </ul>
        )}
        <div className='create-group-text-wrapper'>
          <h1 className='create-group-h1-text-description'>
          Now describe what {name} will be about</h1>
          <span className='create-group-span-text'>
          People will see this when we promote your group, but you’ll be able to add to it later, too.
          <br/>
          <br/>               
          1. What's the purpose of the group?<br/>
          2. Who should join?<br/>
          3. What will you do at your events?<br/>
          <br/>
          </span>  
        </div>
        <div className='create-group-description-div'>
            <input className='create-group-description-input' type='text' onChange={(e) => setDescription(e.target.value)} value={description} required placeholder='Please write atleast 50 characters' maxLength={500} minLength={50}/>
        </div>
        <div className='button-container'>
            <BackButton />
            <NextButton clickable={clickable}/>
        </div>
      </form> 
    </div> 
  )
}

export default GroupDescription;