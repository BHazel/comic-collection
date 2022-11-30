import cors from 'cors';
import express, { Express, Request, Response } from 'express';

import comics from './routes/comics'
import series from './routes/series';

const app: Express = express();

app.use(cors());

app.use('/comics', comics);
app.use('/series', series);

app.get('/', (req: Request, res: Response) => {
    res.status(200)
        .send('Comic Collection');
});

app.listen(8080, () => {
    console.log('Comic Collection API');
    console.log('Server listening on port 8080...');
});