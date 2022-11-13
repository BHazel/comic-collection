import { Link } from 'react-router-dom';

import { useGlobalContext } from '../context';

const SeriesList = () => {
    const { series } = useGlobalContext();

    return (
        <main className='container'>
            <h1>Series</h1>
            <p><strong>Count:</strong> {series.length}</p>
            <table className='table'>
                <thead>
                    <th scope='col'>Title</th>
                </thead>
                <tbody>
                    {series.map(series => {
                        return (
                            <tr key={series.id}>
                                <td>
                                    <Link to={`/series/${series.id}`}>{series.title}</Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </main>
    );
};

export default SeriesList;