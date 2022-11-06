import { Link } from 'react-router-dom';

import { useGlobalContext } from '../context';

const Comics = () => {
    const { comics } = useGlobalContext();

    return (
        <>
            <h1>Comics</h1>
            <p><strong>Count:</strong> {comics.length}</p>
            <ul>
                {comics.map(comic => {
                    return (
                        <li key={comic.id}>
                            <Link to={`/comics/${comic.id}`}>{comic.title}</Link>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default Comics;