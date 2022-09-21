import { useGroupContext } from "../../context/GroupContext";

const BackButton = () => {
    const { page, setPage} = useGroupContext();
    
    return (
        <>
        <button onClick={()=> setPage(page - 1)} className='BackButton'>Back</button>
        </>
    )
}

export default BackButton;