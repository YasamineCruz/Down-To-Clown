import React, { useState, useEffect } from "react";
import { useGroupContext } from "../../context/GroupContext";
import BackButton from './BackButton';
import NextButton from "./NextButton";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const GroupPrivate = () => {
    const { type, setType, private_key, setPrivate_key} = useGroupContext();
    const [ clickable, setClickable ] = useState(true)
    const [ validationErrors, setValidationErrors ] = useState('')
    const sessionUser = useSelector(state => state.session.user)
   
    useEffect(()=> {
        let errors = []
        if(!type) errors.push('Type must be Online or In person');
        if(!private_key) errors.push('You must select private or public')
        if(errors.length > 0) {
            setValidationErrors(errors)
            setClickable(true)
           } else {
            setValidationErrors([])
            setClickable(false)
           }
    }, [type, private_key])

    if(type === '') setType('Online')


    if(!sessionUser) return (<Redirect to='/'/>)
 
    return (
          <div className='create-group-div-container2'>
            <div className='create-group-percent-thing'>
                <div className='blue-line-page-4'></div>
            </div>
         <div className='create-group-steps'> Step 4 of 7</div>
            <form className='create-group-form'>
            { validationErrors && (
            <ul className='create-group-errors'>
            {validationErrors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))} 
            </ul>
            )}  
                <div className='create-group-text-wrapper2'>
                    <h1 className='create-group-h1-text-radio'>Select Type</h1>
                    <div className='radio-wrapper'>
                        <label className='radio-text' for='online'>Online</label>
                        <input className='radio-input' onChange={(e) => setType(e.target.value)} type='radio' value='Online' name='type' required checked={type === 'Online'}/>
                    </div>
                    <div className='radio-wrapper'>
                        <label className='radio-text' for='in person'>In person</label>
                        <input className='radio-input' onChange={(e) => setType(e.target.value)} type='radio' value='In person' name='type' required checked={type === 'In person'}/>
                    </div>   
                </div>
            </form> 
            <form>
                <div className='create-group-text-wrapper2'>
                   <h1 className='create-group-h1-text-radio'>Select Private or Public</h1>
                   <div className='radio-wrapper'>
                        <label className='radio-text' for='online'>Private</label>
                        <input className='radio-input' onChange={(e) => setPrivate_key(e.target.value)} type='radio' value={true} name='type' required checked={private_key === 'true' || private_key === 1}/>
                   </div>
                    <div className='radio-wrapper'>
                         <label className='radio-text' for='in person'>Public</label>   
                         <input className='radio-input'onChange={(e) => setPrivate_key(e.target.value)} type='radio' value={false} name='type' required checked={private_key === 'false' || private_key === 0}/>
                    </div>
                        
                </div>
            </form>
             <div className='button-container'>
                <BackButton />
                <NextButton clickable={clickable}/>
            </div>
        </div>
    )
}

export default GroupPrivate;