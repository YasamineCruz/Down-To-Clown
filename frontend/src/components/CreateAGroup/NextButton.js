import { useGroupContext } from "../../context/GroupContext";

const NextButton = () => {
    const { page, setPage} = useGroupContext();
    console.log(page)
    if(page === 5) {
        return (
            <>
            <button onClick={()=> setPage(page + 1)} className='NextButton'>Agree and Continue</button>
            </>
        )
    }    
    return (
        <>
        <button onClick={()=> setPage(page + 1)} className='NextButton'>Next</button>
        </>
    )
}

export default NextButton;