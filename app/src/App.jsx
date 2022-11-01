import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Comics from './components/Comics';

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/comics' element={<Comics />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;