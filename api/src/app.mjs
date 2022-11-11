import cors from 'cors';
import express from 'express';

import comics from './routes/comics.mjs';

const app = express();

app.use(cors());

app.use('/comics', comics);

app.get('/', (req, res) => {
    res.status(200)
        .send('Comic Collection');
});

app.listen(8080, () => {
    console.log('Comic Collection API');
    console.log('Server listening on port 8080...');
});