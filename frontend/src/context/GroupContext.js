import { createContext, useContext, useState } from 'react';

export const GroupContext = createContext();

export const useGroupContext = () => useContext(GroupContext);

export const GroupProvider = ({children}) => {
    const [page, setPage] = useState(1);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [type, setType] = useState('');
    const [private_key, setPrivate_key] = useState('');

    return (
        <GroupContext.Provider
        value={{page,
                setPage,
                name,
                setName,
                description,
                setDescription,
                state,
                setState,
                city,
                setCity,
                type,
                setType,
                private_key,
                setPrivate_key 
                }}>
            {children}
        </GroupContext.Provider>
    );
};