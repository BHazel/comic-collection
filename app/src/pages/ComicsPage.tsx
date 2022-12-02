import { Link } from 'react-router-dom';

import { useGlobalContext } from '../context';

const ComicsPage = (): JSX.Element => {
    const { comics } = useGlobalContext();

    return (
        <main className='container'>
            <h1>Comics</h1>
            <p><strong>Count:</strong> {comics.length}</p>
            <table className='table'>
                <thead>
                    <th scope='col'>Title</th>
                    <th scope='col'>Publication Date</th>
                    <th scope='col'>Story</th>
                </thead>
                <tbody>
                    {comics.map(comic => {
                        return (
                            <tr>
                                <td><Link to={`/comics/${comic.id}`}>{comic.title}</Link></td>
                                <td>{comic.publicationDate}</td>
                                <td>{comic.storyTitle}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </main>
    );
};

export default ComicsPage;