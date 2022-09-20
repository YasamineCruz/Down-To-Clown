import { GroupProvider } from "../../context/CreateGroupContext";

const NextButton = () => {
    const { page, setPage} = useContext(GroupProvider);
    
        
    return (
        <>
        <button onClick={()=> setPage(page + 1)} className='NextButton'>Next</button>
        </>
    )
}

export default NextButton;