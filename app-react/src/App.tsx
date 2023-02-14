import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ComicPage from './pages/ComicPage';
import ComicsPage from './pages/ComicsPage';
import Nav from './components/Nav';
import SeriesListPage from './pages/SeriesListPage';
import SeriesPage from './pages/SeriesPage';

const App = (): JSX.Element => {
    return (
        <>
            <Router>
                <Nav />
                <Routes>
                    <Route path='/comics' element={<ComicsPage />} />
                    <Route path='/comics/:id' element={<ComicPage />} />
                    <Route path='/series' element={<SeriesListPage />} />
                    <Route path='/series/:id' element={<SeriesPage />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;