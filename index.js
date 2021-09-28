import cors from 'cors';
import express from 'express';
import productRouter from './routes/api/products.js';
import config from './config/index.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/products', productRouter);

app.listen(config.port, () => {
  console.log('Escuchando en el puerto: ', config.port);
});
