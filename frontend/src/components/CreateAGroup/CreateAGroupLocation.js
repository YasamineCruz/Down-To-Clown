import NextButton from "./NextButton";
import React, { useState,useEffect } from "react"
import { useGroupContext } from "../../context/GroupContext";
import './CreateAGroup.css'
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const GroupLocation = () => {
    const { state, setState, city, setCity } = useGroupContext();
    const [ clickable, setClickable ] = useState(true)
    const [ validationErrors, setValidationErrors ] = useState('')
    const sessionUser = useSelector(state => state.session.user)

    useEffect(()=> {
      let errors = []
     if(!state.length) errors.push('You must enter a state')
     if(!city.length) errors.push('You must enter a city')
     if(errors.length > 0) {
      setValidationErrors(errors)
      setClickable(true)
     } else {
      setValidationErrors([])
      setClickable(false)
     }
    }, [state, city])
 
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
            <h1>First, set your group’s location.</h1>
            <h3>
              Meetup groups meet locally, in person and online. We'll connect you with people in your area, and more can join you online.
            </h3>
            <div className='locationDiv'>
              <label>City</label>
              <input type='text' onChange={(e) => setCity(e.target.value)} value={city} required/>
              <label>State</label>
              <input type='text' onChange={(e) => setState(e.target.value)} value={state} required/>
            </div>
        <div>
            <NextButton clickable={clickable}/>
        </div>
    </form>
  )
}

export default GroupLocation;