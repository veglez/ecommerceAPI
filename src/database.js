import mongoose from 'mongoose';
import config from './config/index.js';

const { mongoURL } = config;

mongoose
  .connect(mongoURL)
  .then((db) => {
    console.log('im connected to DB in:', db.connection.host);
  })
  .catch((err) => console.log('ha habido un error: ', err));
