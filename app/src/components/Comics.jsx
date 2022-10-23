import { useGlobalContext } from '../context';

const Comics = () => {
    const { comics } = useGlobalContext();

    return (
        <>
            <h1>Comics</h1>
            <p><strong>Count:</strong> {comics.length}</p>
            <ul>
                {comics.map(comic => {
                    return <li key={comic.id}>{comic.label}</li>;
                })}
            </ul>
        </>
    );
};

export default Comics;