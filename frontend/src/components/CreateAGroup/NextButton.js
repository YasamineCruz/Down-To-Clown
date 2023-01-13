import { useGroupContext } from "../../context/GroupContext";
import './CreateAGroup.css'

const NextButton = ({clickable}) => {
    const { page, setPage} = useGroupContext();

    if(page === 5) {
        return (
            <button className='nextButton-selected' onClick={()=> setPage(page + 1)} disabled={clickable}>Agree and Continue</button>
        )
    } 

    return (
        <button className={clickable === false ? `nextButton-selected` : `nextButton-not-selected`} onClick={()=> setPage(page + 1)}  disabled={clickable}>Next</button>
    )
}

export default NextButton;