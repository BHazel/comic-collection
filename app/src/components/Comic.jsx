import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getComic } from '../services/comicService';

const Comic = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [comic, setComic] = useState({});

    useEffect(() => {
        getComic(id)
            .then(comic => {
                setComic(comic);
                setIsLoading(false);
            });
    }, [isLoading]);

    if (isLoading) {
        return (
            <h1>Loading...</h1>
        );
    }

    return (
        <>
            <h1>{comic.title}</h1>
            <p><strong>Publication Date:</strong> {comic.publicationDate}</p>
        </>
    );
};

export default Comic;