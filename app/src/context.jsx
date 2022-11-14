import React, { useContext, useEffect, useState } from 'react';

import { getComics } from './services/comicService';
import { getAllSeries } from './services/seriesService';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [comics, setComics] = useState([]);
    const [series, setSeries] = useState([]);

    useEffect(() => {
        Promise.all([
            getComics().catch(error => 'error'),
            getAllSeries().catch(error => 'error')
        ]).then(responses => {
            setComics(responses[0] !== 'error' ? responses[0] : false);
            setSeries(responses[1] !== 'error' ? responses[1] : false);
        });
    }, []);

    return (
        <AppContext.Provider value={{ comics, series }}>
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