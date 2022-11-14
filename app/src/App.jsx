import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Comic from './pages/Comic';
import Comics from './pages/Comics';
import Nav from './components/Nav';
import Series from './pages/Series';
import SeriesLink from './pages/SeriesList';

const App = () => {
    return (
        <>
            <Router>
                <Nav />
                <Routes>
                    <Route path='/comics' element={<Comics />} />
                    <Route path='/comics/:id' element={<Comic />} />
                    <Route path='/series' element={<SeriesLink />} />
                    <Route path='/series/:id' element={<Series />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;