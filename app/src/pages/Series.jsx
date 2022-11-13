import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getSeries } from '../services/seriesService';

const Series = () => {
    const { id } = useParams();
    const [series, setSeries] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getSeries(id)
            .then(response => {
                setSeries(response);
                setIsLoading(false);
            });
    }, [id, isLoading]);

    if (isLoading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <main className='container'>
            <h1>{series.title}</h1>
        </main>
    )
};

export default Series;