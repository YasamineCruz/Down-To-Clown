import { useGroupContext } from "../../context/GroupContext";
import BackButton from './BackButton';
import NextButton from "./NextButton";

const GroupDescription = () => {
   const { description, setDescription} = useGroupContext();

   return (
    <form>
        <label> First, set your group's location.
            <input type='text' onChange={(e) => setDescription(e.target.value)} value={description}/>
        </label>
        <div>
            <BackButton />
            <NextButton />
        </div>
    </form>
  )
}

export default GroupDescription;