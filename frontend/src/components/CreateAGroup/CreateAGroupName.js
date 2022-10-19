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
    <div className='create-group-div-container'>
        <div className='create-group-percent-thing'>
            <div className='blue-line-page-2'></div>
        </div>
        <div className='create-group-steps'> Step 2 of 7</div>
        <form className='create-group-form'>
                { validationErrors && (
                    <ul className='create-group-errors'>
                    {validationErrors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                    ))} 
                    </ul>
                )}
                <div className='create-group-text-wrapper'>
                    <h1 className='create-group-h1-text'>What will your group’s name be?</h1>
                    <h3 className='create-group-h3-text'>
                    Choose a name that will give people a clear idea of what the group is about. Feel free to get creative! You can edit this later if you change your mind.
                    </h3>
                </div>
                <div className='create-group-location-div'>
                      <input className='create-group-name-input' type='text' onChange={(e) => setName(e.target.value)} value={name} required placeholder='Enter a name'/>
                </div>
                <div className='button-container'>
                    <BackButton />
                    <NextButton clickable={clickable}/>
                </div>
            </form>
    </div>
   
  )
}

export default GroupName;