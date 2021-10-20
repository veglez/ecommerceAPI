import cors from 'cors';
import express from 'express';
//third parties middlewares
import cookieParser from 'cookie-parser';
//utils
import './database.js';
import config from './config/index.js';
import DefineRoutes from './routes/index.js';
import handleErrors from './middlewares/handleErrors.js';
import handleNotFound from './middlewares/handleNotFound.js';

const app = express();

//Setings
// app.set('views', path.join(__dirname, 'views'));

//Middleware
app.use(cors());
app.use(cookieParser(config.cookies));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//router
DefineRoutes(app);
//finalMiddlewares
app.use(handleErrors);
app.use(handleNotFound);

app.listen(config.port, () => {
  console.log('Escuchando en el puerto: ', config.port);
});
