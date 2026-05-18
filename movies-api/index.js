import 'dotenv/config';
import express from 'express';
import moviesRouter from './api/movies';
import tvRouter from './api/tv';
import personRouter from './api/person';
import './db';
import cors from 'cors';

import usersRouter from './api/users';
import authenticate from './authenticate';
import favoritesRouter from './api/favorites';

const errHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};


const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT;
app.use('/api/movies', moviesRouter);
app.use('/api/tv', tvRouter);
app.use('/api/person', personRouter);
app.use(express.static('public'));

app.use('/api/users', usersRouter);
app.use('/api/favorites', authenticate, favoritesRouter);



app.use(errHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
