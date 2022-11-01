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
                    const { id, properties } = comic;
                    const title = properties.title[0].value
                    return (
                        <li key={id}>
                            <Link to={`/comics/${id}`}>{title}</Link>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default Comics;