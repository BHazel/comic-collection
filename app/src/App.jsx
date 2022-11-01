import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Comic from './components/Comic';
import Comics from './components/Comics';

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/comics' element={<Comics />} />
                    <Route path='/comics/:id' element={<Comic />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;