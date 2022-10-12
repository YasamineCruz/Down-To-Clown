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
          <div>
            <form>
            { validationErrors && (
            <ul>
            {validationErrors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))} 
            </ul>
            )}        
                <h1>Select Type</h1>
                <input onChange={(e) => setType(e.target.value)} type='radio' value='Online' name='type' required checked={type === 'Online'}/>
                <label for='online'>Online</label>
                <input onChange={(e) => setType(e.target.value)} type='radio' value='In person' name='type' required checked={type === 'In person'}/>
                <label for='in person'>In person</label>
            </form> 
            <form>
                <h1>Select Private or Public</h1>
                <input onChange={(e) => setPrivate_key(e.target.value)} type='radio' value={true} name='type' required checked={private_key === 'true' || private_key === 1}/>
                <label for='online'>Private</label>
                <input onChange={(e) => setPrivate_key(e.target.value)} type='radio' value={false} name='type' required checked={private_key === 'false' || private_key === 0}/>
                <label for='in person'>Public</label>
            </form>
             <div>
                <BackButton />
                <NextButton clickable={clickable}/>
            </div>
        </div>
    )
}

export default GroupPrivate;