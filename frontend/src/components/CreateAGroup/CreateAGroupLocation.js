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
    <div className='create-group-div-container'>
      <div className='create-group-percent-thing'>
        <div className='blue-line-page-1'></div>
      </div>
      <div className='create-group-steps'> Step 1 of 7</div>
       <form className='create-group-form'>
        <div className='create-group-errors'>
          { validationErrors && (
            <ul className='error-ul'>
            {validationErrors.map((error, idx) => (
              <li className='error-li' key={idx}>{error}</li>
            ))} 
            </ul>
        )}  
        </div>
          <div className='create-group-text-wrapper'>
              <h1 className='create-group-h1-text'>First, set your group’s location.</h1>
              <h3 className='create-group-h3-text'>
              Meetup groups meet locally, in person and online. We'll connect you with people in your area, and more can join you online.
              </h3>
          </div>
            <div className='create-group-location-div'>
              <input className='s-c-input' type='text' onChange={(e) => setCity(e.target.value)} value={city} required placeholder='Enter a City' maxLength={500}/>
              <input className='s-c-input' type='text' onChange={(e) => setState(e.target.value)} value={state} required placeholder='Enter a State' maxLength={500}/>
            </div>
        <div className='next-button-container'>
            <NextButton clickable={clickable}/>
        </div>
    </form>
    </div>
   
  )
}

export default GroupLocation;