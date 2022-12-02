import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import type { Comic } from '../types/comic';
import type { Series } from '../types/series';

import { getComics, getSeries } from '../services/seriesService';

const SeriesPage = (): JSX.Element => {
    const { id } = useParams<string>();
    const [series, setSeries] = useState<Series>();
    const [comics, setComics] = useState<Comic[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        Promise.all<[Promise<Series>, Promise<Comic[]>]>([
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
            <p><a href={series.url}>View Online</a></p>

            <div className='row'>
                <div className='col'>
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
                </div>

                <div className='col'>
                    <p><img className='img-fluid' src={series.imageUrl} /></p>
                </div>
            </div> 
        </main>
    )
};

export default SeriesPage;