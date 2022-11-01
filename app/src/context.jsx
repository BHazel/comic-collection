import React, { useContext, useEffect, useState } from 'react';

import { getComics } from './services/comicService';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [comics, setComics] = useState([]);

    useEffect(() => {
        getComics()
            .then(comics => {
                setComics(comics);
            });
    }, []);

    return (
        <AppContext.Provider value={{ comics }}>
            {children}
        </AppContext.Provider>
    );
};

const useGlobalContext = () => {
    return useContext(AppContext);
}

export {
    AppContext,
    AppProvider,
    useGlobalContext
};