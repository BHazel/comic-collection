import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.status(200)
        .send('Hello, World!');
});

app.listen(8080, () => {
    console.log('Comic Collection API');
    console.log('Server listening on port 8080...');
});