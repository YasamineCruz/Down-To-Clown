import React, { useState, useEffect } from "react";
import NextButton from "./NextButton";

const GroupLocation = () => {
    const [ state, setState ] = useState('');
    const [ city, setCity ] = useState('');

  return (
    <form>
        <label> First, set your group's location.
            <input/>
            <input />
        </label>
    </form>
  )
}

export default GroupLocation;