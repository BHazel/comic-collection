import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { AppProvider } from './context';

createRoot(document.getElementById('app')).render(
    <StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </StrictMode>
);