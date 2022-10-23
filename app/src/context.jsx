import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import config from './config.mjs';

const comicCollectionApiRootUrl = config.api.rootUrl;

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [comics, setComics] = useState([]);

    const getComics = async (url) => {
        try {
            const { data } = await axios(url);
            setComics(data._items);
        } catch (error) {
            console.error(error.response);
        }
    };

    useEffect(() => {
        getComics(`${comicCollectionApiRootUrl}/comics`);
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