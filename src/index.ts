import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from './errors/errors';
import router from './routes';
import { config } from 'dotenv';

const app = express();

config();

app.use('/uploads', express.static('src/uploads'));

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errors);

app.listen(3333, () => {
  console.log(`Listening on http://localhost:3333`);
});
