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
//start mockup database
import init from './utils/createDB_data.js';
init();

const app = express();
//Setings
// app.set('views', path.join(__dirname, 'views'));

//Middlewaredocke
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use('/savedImages/', express.static('savedImages/'));
app.use(cookieParser(config.cookies));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//router
DefineRoutes(app);
//finalMiddlewares
app.use(handleErrors);
app.use(handleNotFound);

app.listen(config.port, () => {
  console.log('Escuchando en el puerto: ', config.port); // eslint-disable-line
});
