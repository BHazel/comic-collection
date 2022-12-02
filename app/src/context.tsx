import { Context, createContext, useContext, useEffect, useState } from 'react';

import type { Comic } from './types/comic';
import type { ComicCollectionContext } from './types/context';
import type { Series } from './types/series';

import { getComics } from './services/comicService';
import { getAllSeries } from './services/seriesService';

const AppContext: Context<ComicCollectionContext> = createContext<ComicCollectionContext | undefined>(undefined);

const AppProvider = ({ children }): JSX.Element => {
    const [comics, setComics] = useState<Comic[]>([]);
    const [series, setSeries] = useState<Series[]>([]);

    useEffect(() => {
        Promise.all<[Promise<Comic[]>, Promise<Series[]>]>([
            getComics().catch(error => undefined),
            getAllSeries().catch(error => undefined)
        ]).then(responses => {
            setComics(responses[0]);
            setSeries(responses[1]);
        });
    }, []);

    return (
        <AppContext.Provider value={{ comics, series }}>
            {children}
        </AppContext.Provider>
    );
};

const useGlobalContext = (): ComicCollectionContext => {
    return useContext(AppContext);
}

export {
    AppContext,
    AppProvider,
    useGlobalContext
};