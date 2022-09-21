import NextButton from "./NextButton";
import React, { useContext } from "react"
import { useGroupContext } from "../../context/GroupContext";


const GroupLocation = () => {
    const { state, setState, city, setCity } = useGroupContext();


  return (
    <form>
        <label> First, set your group's location.
            <input type='text' onChange={(e) => setState(e.target.value)} value={state}/>
            <input type='text' onChange={(e) => setCity(e.target.value)} value={city}/>
        </label>
        <div>
            <NextButton />
        </div>
    </form>
  )
}

export default GroupLocation;