import { GroupContext } from "../../context/CreateGroupContext";

const BackButton = () => {
    const { page, setPage} = useContext(GroupContext);
    
    return (
        <>
        <button onClick={()=> setPage(page - 1)} className='BackButton'>Back</button>
        </>
    )
}

export default BackButton;