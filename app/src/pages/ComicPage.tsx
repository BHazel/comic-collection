import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import type { Comic } from '../types/comic';

import { getComic, getSequel } from '../services/comicService';

const ComicPage = (): JSX.Element => {
    const { id } = useParams<string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [comic, setComic] = useState<Comic>();
    const [sequelReading, setSequelReading] = useState<Comic | undefined>();
    const [sequelSeries, setSequelSeries] = useState<Comic | undefined>();

    function renderSequelLink(sequel: Comic): JSX.Element {
        if (sequel) {
            return <Link to={`/comics/${sequel.id}`}>{sequel.title}</Link>;
        } else {
            return <>No sequel.</>;
        }
    }

    useEffect(() => {
        Promise.all<[Promise<Comic>, Promise<Comic>, Promise<Comic>]>([
            getComic(id),
            getSequel(id, 'series').catch(error => undefined),
            getSequel(id, 'reading').catch(error => undefined)
        ]).then(responses => {
            setComic(responses[0]);
            setSequelSeries(responses[1]);
            setSequelReading(responses[2]);
            setIsLoading(false);
        });
    }, [id, isLoading]);

    if (isLoading) {
        return (
            <h1>Loading...</h1>
        );
    }

    return (
        <main className='container'>
            <h1>{comic.title}</h1>
            <p><a href={comic.url}>View Online</a></p>
            
            <div className='row'>
                <div className='col'>
                    <p><strong>Publication Date:</strong> {comic.publicationDate}</p>
                    <p><strong>Story:</strong> {comic.storyTitle}</p>
                    <p><strong>Issue: </strong> {comic.issue}</p>
                    <p><strong>Summary: </strong>{comic.summary ? comic.summary : "No Summary"}</p>
                    <p><strong>Sequel:</strong></p>
                    <ul>
                        <li><strong>Series: </strong>{renderSequelLink(sequelSeries)}</li>
                        <li><strong>Reading: </strong>{renderSequelLink(sequelReading)}</li>
                    </ul>
                </div>

                <div className='col'>
                    <p><img className='img-fluid' src={comic.imageUrl} /></p>
                </div>
            </div>
        </main>
    );
};

export default ComicPage;