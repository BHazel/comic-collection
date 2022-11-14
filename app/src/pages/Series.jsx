import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getComics, getSeries } from '../services/seriesService';

const Series = () => {
    const { id } = useParams();
    const [series, setSeries] = useState({});
    const [comics, setComics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            getSeries(id),
            getComics(id)
        ]).then(responses => {
                console.log(responses);
                setSeries(responses[0]);
                setComics(responses[1]);
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
            <h2>Comics</h2>
            <table className='table'>
                <thead>
                    <th scope='col'>Title</th>
                    <th scope='col'>Publication Date</th>
                    <th scope='col'>Story</th>
                </thead>
                <tbody>
                    {comics.map(comic => {
                        return (
                            <tr key={comic.id}>
                                <td><Link to={`/comics/${comic.id}`}>{comic.title}</Link></td>
                                <td>{comic.publicationDate}</td>
                                <td>{comic.storyTitle}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </main>
    )
};

export default Series;