import express from 'express';
import cors from 'cors'
import './config/dotenv.js';
import eventRouter from './routes/events.js';
import locationRouter from './routes/locations.js';

const app = express();

app.use(cors());
app.use('/events', eventRouter);
app.use('/locations', locationRouter);

app.get('/', (req, res) => {
    res.status(200).send('Concert Server');
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})