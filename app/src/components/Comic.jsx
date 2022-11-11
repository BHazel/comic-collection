import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getComic, getSequel } from '../services/comicService';

const Comic = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [comic, setComic] = useState({});
    const [sequelReading, setSequelReading] = useState(false);
    const [sequelSeries, setSequelSeries] = useState(false);

    function renderSequelLink(sequel) {
        if (Object.keys(sequel).length > 0) {
            return <Link to={`/comics/${sequel.id}`}>{sequel.title}</Link>
        } else {
            return 'No sequel.'
        }
    }

    useEffect(() => {
        Promise.all([
            getComic(id),
            getSequel(id, 'series').catch(error => 'error'),
            getSequel(id, 'reading').catch(error => 'error')
        ]).then(responses => {
            setComic(responses[0]);
            setSequelSeries(responses[1] !== 'error' ? responses[1] : false);
            setSequelReading(responses[2] !== 'error' ? responses[2] : false);
            setIsLoading(false);
        });
    }, [id, isLoading]);

    if (isLoading) {
        return (
            <h1>Loading...</h1>
        );
    }

    return (
        <div className='container'>
            <h1>{comic.title}</h1>
            <p><a href={comic.url}>View Online</a></p>
            
            <div className='row'>
                <div className='col'>
                    <p><strong>Publication Date:</strong> {comic.publicationDate}</p>
                    <p><strong>Story:</strong> {comic.storyTitle}</p>
                    <p><strong>Issue: </strong> {comic.issue}</p>
                    <p><strong>Summary: </strong>{comic.story ? comic.story : "No Summary"}</p>
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
        </div>
    );
};

export default Comic;