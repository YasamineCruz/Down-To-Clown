// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'

function CreateAGroupButton() {
    const history = useHistory()

    const onSubmit = (e) => {
        e.preventDefault();
        history.push('/start/location')
    }
    return (
        <form onSubmit={onSubmit}>
            <label>Create a Group</label>
            <input type='submit' />
        </form> 
    )
}

export default CreateAGroupButton;